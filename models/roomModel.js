const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },

    host: {
      host_id: { type: String },
      name: { type: String },
      profile_image: { type: String },
      is_superhost: { type: Boolean, default: false },
      response_time: { type: String },
      response_rate: { type: Number },
      total_listings: { type: Number },
      verified: { type: Boolean, default: false },
    },

    location: {
      address: { type: String, required: true },
      latitude: { type: Number },
      longitude: { type: Number },
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
      zip_code: { type: String },
      neighborhood: { type: String },
    },

    room_details: {
      property_type: { type: String, required: true },
      room_type: { type: String, required: true },
      accommodates: { type: Number, required: true },
      bedrooms: { type: Number, required: true },
      beds: { type: Number, required: true },
      bathrooms: { type: Number, required: true },
    },

    pricing: {
      price_per_night: { type: Number, required: true },
      currency: { type: String, default: "USD" },
      cleaning_fee: { type: Number },
      service_fee: { type: Number },
      security_deposit: { type: Number },
      weekly_discount: { type: Number },
      monthly_discount: { type: Number },
    },

    availability: {
      minimum_nights: { type: Number, required: true },
      maximum_nights: { type: Number, required: true },
      available_dates: { type: [String], default: [] },
    },

    amenities: { type: [String], default: [] },
    images: { type: [String], default: [] },
    amount: { type: Number, required: true },
    safety_features: { type: [String], default: [] },
    room_status: { type: String, default: "available" },
    status: { type: String, default: "pending" },
    email: { type: String },
  },
  { timestamps: true }
);

const Room = mongoose.model("Room", roomSchema);
module.exports = Room;
