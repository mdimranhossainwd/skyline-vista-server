const Offer = require("../models/offerModel");
const Room = require("../models/roomModel");

const AddToOffer = async (req, res) => {
  const { rooms_id, amount } = req.body;
  try {
    const offer = await Room.findById(rooms_id);
    if (!offer) {
      return res.status(404).send({ message: "Offer not found" });
    }

    const newOffer = new Offer({
      offer,
      amount,
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
      { order_Status: req.body.order_Status },
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

module.exports = { AddToOffer, GetAllOfferRoom, UpdateOfferStatus };
