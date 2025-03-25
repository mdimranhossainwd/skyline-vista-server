const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const AddUser = async (req, res) => {
  const { name, email, role, photo } = req.body;
  try {
    const user = new User({
      name,
      email,
      role,
      photo,
    });
    await user.save();
    const token = jwt.sign(
      { id: user._id },
      process.env.SKYLINE_VISTA_JWT_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    res.cookie("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Secure in production
      sameSite: "Strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    res.status(200).send({
      success: true,
      message: "User added successfully",
      data: {
        name: user.name,
        email: user.email,
        role: user.role,
        photo: user.photoURL,
        token,
      },
    });
  } catch (error) {
    res.status(400).send({
      message: "Error in adding user",
      error: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({
        message: "User not found",
      });
    }
    if (user.password !== password) {
      return res.status(400).send({
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.SKYLINE_VISTA_JWT_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    res.cookie("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Secure in production
      sameSite: "Strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(200).send({
      message: "User logged in successfully",
      data: {
        name: user.name,
        email: user.email,
        role: user.role,
        photo: user.photoURL,
        token,
      },
    });
  } catch (error) {
    res.status(400).send({
      message: "Error in logging in",
      error: error.message,
    });
  }
};

const logoutUser = (req, res) => {
  res.clearCookie("auth-token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 0, // Expire the cookie immediately
  });

  res.status(200).send({
    message: "User logged out successfully",
  });
};

const getUserRole = async (req, res) => {
  const { email } = req.params;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({
        message: "User not found",
      });
    }
    res.status(200).send({
      message: "User role fetched successfully",
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(400).send({
      message: "Error in getting user role",
      error: error.message,
    });
  }
};

const getAllUser = async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).send({
      success: true,
      message: "Users fetched successfully",
      data: allUsers,
    });
  } catch (error) {
    res.status(400).send({
      message: "Error in getting All user",
      error: error.message,
    });
  }
};

const updateUserRole = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true }
    ).select("role");
    if (!user) {
      return res.status(404).send({
        message: "User not found",
      });
    }

    res.status(200).send({
      message: "User role updated successfully",
      data: {
        role: user.role,
      },
    });
  } catch (error) {
    res.status(400).send({
      message: "Error in updating user role",
      error: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).send({
        message: "User not found",
      });
    }
    res.status(200).send({
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(400).send({
      message: "Error in deleting user",
      error: error.message,
    });
  }
};

const updateUserInfo = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!user) {
      return res.status(404).send({
        message: "User not found",
      });
    }
    res.status(200).send({
      message: "User info updated successfully",
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(400).send({
      message: "Error in updating user info",
      error: error.message,
    });
  }
};

module.exports = {
  AddUser,
  loginUser,
  getAllUser,
  getUserRole,
  updateUserRole,
  deleteUser,
  logoutUser,
  updateUserInfo,
};
