const User = require("../models/userModel");

const AddUser = async (req, res) => {
  const { name, email, password, role, image } = req.body;
  try {
    const user = new User({
      name,
      email,
      password,
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

module.exports = { AddUser };
