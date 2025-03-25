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
    amount,
    room_status,
    status,
    email,
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
      amount,
      images,
      safety_features,
      room_status,
      status,
      email,
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

// This function is used to fetch all the rooms from the database.
const GetRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).send({
      success: true,
      message: "Rooms fetched successfully",
      data: rooms,
    });
  } catch (err) {
    console.log("Error:", err),
      res.status(400).send({
        message: "Error in fetching rooms",
        error: err,
      });
  }
};

const GetRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).send({
      success: true,
      message: "Room fetched successfully",
      data: room,
    });
  } catch (err) {
    console.log("Error:", err),
      res.status(400).send({
        message: "Error in fetching room",
        error: err,
      });
  }
};

const GetRoomByUserEmail = async (req, res) => {
  const email = req.query.email;
  try {
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    const usersRoom = await Room.find({ email: email });
    res.status(200).send({
      success: true,
      message: "Rooms retrieved successfully",
      data: usersRoom,
    });
  } catch (err) {
    console.log("Error", err);
    res.status(401).send({
      message: "Something is Wrong",
      error: err,
    });
  }
};

const UpdateRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).send({
      success: true,
      message: "Room updated successfully",
      data: room,
    });
  } catch (err) {
    console.log("Error:", err),
      res.status(400).send({
        message: "Error in updating room",
        error: err,
      });
  }
};

// ----------- This function is used to update the status of a room (ADMIN-----------------).
const UpdateRoomStatus = async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(
      req.params.id,
      { room_status: req.body.room_status },
      {
        new: true,
      }
    );
    res.status(200).send({
      success: true,
      message: "Room status updated successfully",
      data: room,
    });
  } catch (err) {
    console.log("Error:", err),
      res.status(400).send({
        message: "Error in updating room status",
        error: err,
      });
  }
};

// This function is used to delete a room from the database. (AGENT || ADMIN)
const DeleteRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      message: "Room deleted successfully",
      data: room,
    });
  } catch (err) {
    console.log("Error:", err),
      res.status(400).send({
        message: "Error in deleting room",
        error: err,
      });
  }
};

module.exports = {
  AddRoom,
  GetRooms,
  GetRoomById,
  UpdateRoom,
  UpdateRoomStatus,
  DeleteRoom,
  GetRoomByUserEmail,
};
