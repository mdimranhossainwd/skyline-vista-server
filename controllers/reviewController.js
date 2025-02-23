const mongoose = require("mongoose");

const AddReview = async (req, res) => {
  const { name, profile_image, is_verified, rating, comment, review_date } =
    req.body;

  try {
    const newReview = new Review({
      name,
      profile_image,
      is_verified,
      rating,
      comment,
      review_date,
    });
    await newReview.save();
    res.status(200).send({
      success: true,
      message: "Review added successfully",
      data: newReview,
    });
  } catch (err) {
    console.log("Error:", err),
      res.status(400).send({
        message: "Error in adding review",
        error: err,
      });
  }
};

module.exports = { AddReview };
