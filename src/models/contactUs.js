const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactusSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  suggest: {
    type: String,
    required: true,
    maxlength: 250,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Contactus", contactusSchema);
