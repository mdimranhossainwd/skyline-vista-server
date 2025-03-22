const Offer = require("../models/offerModel");
const Room = require("../models/roomModel");

const AddToOffer = async (req, res) => {
  const {
    rooms_id,
    offerId,
    offer_amount,
    offer_date,
    name,
    offer_status,
    email,
  } = req.body;
  try {
    const offer = await Room.findById(rooms_id);
    if (!offer) {
      return res.status(404).send({ message: "Offer not found" });
    }

    const newOffer = new Offer({
      offer,
      offerId,
      offer_amount,
      offer_date,
      email,
      name,
      offer_status,
    });
    await newOffer.save();
    res.status(200).send({
      success: true,
      message: "Offer added successfully",
      data: newOffer,
    });
  } catch (err) {
    console.log("Error:", err),
      res.status(400).send({
        message: "Error in adding offer",
        error: err,
      });
  }
};

const GetOfferRoomUser = async (req, res) => {
  const email = req.query.email;
  try {
    const userOfferRoom = await Offer.find({ email: email });
    res.status(200).send({
      message: "User Offer Romm fetched Successfully",
      data: userOfferRoom,
    });
  } catch (error) {
    res.status(400).send({
      message: "Error in fetching offers",
      error: err,
    });
  }
};

const GetAgentOwnOfferRoom = async (req, res) => {
  try {
    const agentEmail = req.query.email;
    if (!agentEmail) {
      return res.status(404).send("Agent Email Not Found");
    }
    const offersRoom = await Offer.find({ "offer.email": agentEmail });
    res.status(200).send({
      status: true,
      messge: "Agent Offer Room fetch successfully",
      data: offersRoom,
    });
  } catch (error) {
    res.status(400).send({
      message: "Error in fetching data",
      error: error,
    });
  }
};

const GetAllOfferRoom = async (req, res) => {
  try {
    const offers = await Offer.find();
    res.status(200).send({
      success: true,
      message: "Offers fetched successfully",
      data: offers,
    });
  } catch (err) {
    console.log("Error:", err),
      res.status(400).send({
        message: "Error in fetching offers",
        error: err,
      });
  }
};

const UpdateOfferStatus = async (req, res) => {
  try {
    const offer = await Offer.findByIdAndUpdate(
      req.params.id,
      { offer_status: req.body.offer_status },
      {
        new: true,
      }
    );
    if (!offer) {
      return res.status(404).send({ message: "Offer not found" });
    }
    res.status(200).send({
      success: true,
      message: "Offer fetched successfully",
      data: offer,
    });
  } catch (err) {
    console.log("Error:", err),
      res.status(400).send({
        message: "Error in fetching offer",
        error: err,
      });
  }
};

module.exports = {
  AddToOffer,
  GetAllOfferRoom,
  UpdateOfferStatus,
  GetOfferRoomUser,
  GetAgentOwnOfferRoom,
};
