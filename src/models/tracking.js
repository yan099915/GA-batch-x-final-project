const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Users = require("./users");

const trackingSchema = new Schema({
  userId: {
    type: String,
    ref: Users,
  },
  time: { type: String, required: true },
  distance: { type: Number, required: true },
  speed: { type: Number, required: true },
  category: { type: Number, required: true },
  startPoint: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      default: "Point", // 'location.type' must be 'Point'
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  endPoint: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      default: "Point", // 'location.type' must be 'Point'
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  createdAt: { type: String, required: true },
});

module.exports = mongoose.model("Tracking", trackingSchema);
