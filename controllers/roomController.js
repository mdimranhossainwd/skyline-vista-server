const Room = require("../models/roomModel");

// This function is used to add a new room to the database.
const AddRoom = async (req, res) => {
  const {
    title,
    description,
    host,
    location,
    room_details,
    pricing,
    availability,
    amenities,
    images,
    safety_features,
    status,
  } = req.body;

  try {
    const newRoom = new Room({
      title,
      description,
      host,
      location,
      room_details,
      pricing,
      availability,
      amenities,
      images,
      safety_features,
      status,
    });
    await newRoom.save();
    res.status(200).send({
      success: true,
      message: "Room added successfully",
      data: newRoom,
    });
  } catch (err) {
    console.log("Error:", err),
      res.status(400).send({
        message: "Error in adding room",
        error: err,
      });
  }
};

module.exports = {
  AddRoom,
};
