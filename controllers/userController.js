const User = require("../models/userModel");

const AddUser = async (req, res) => {
  const { name, email, role, image } = req.body;
  try {
    const user = new User({
      name,
      email,
      role,
      image,
    });
    await user.save();
    res.status(200).send({
      success: true,
      message: "User added successfully",
      data: {
        name: user.name,
        email: user.email,
        role: user.role,
        image: user.image,
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
    res.status(200).send({
      message: "User logged in successfully",
      data: {
        name: user.name,
        email: user.email,
        role: user.role,
        image: user.image,
      },
    });
  } catch (error) {
    res.status(400).send({
      message: "Error in logging in",
      error: error.message,
    });
  }
};

const getUserRole = async (req, res) => {
  const { email } = req.params;
  try {
    const user = await User.findOne({ email }).select("role");
    if (!user) {
      return res.status(404).send({
        message: "User not found",
      });
    }
    res.status(200).send({
      message: "User role fetched successfully",
      data: {
        role: user.role,
      },
    });
  } catch (error) {
    res.status(400).send({
      message: "Error in getting user role",
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
module.exports = {
  AddUser,
  loginUser,
  getUserRole,
  updateUserRole,
  deleteUser,
};
