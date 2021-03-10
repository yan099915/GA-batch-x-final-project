const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    trim: true,
    unique: true,
    required: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please enter a valid email",
    ],
  },
  password: {
    type: String,
    required: true,
    minlength: [5, "Password can't be shorter than 5 character"],
  },
  name: {
    type: String,
    required: true,
    maxlength: 25,
  },
  gender: {
    type: String,
    default: 0,
  },
  level: {
    type: String,
    default: 0,
  },
  images: {
    type: String,
    default: 0,
  },
  roles: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
  },
  salt: {
    type: String,
  },
  social_media: {
    type: Boolean,
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
module.exports = function UsersModel() {
  return mongoose.model("users", usersSchema);
};
