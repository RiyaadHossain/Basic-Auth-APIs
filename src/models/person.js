const mongoose = require("mongoose");

const PersonSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    min: [6, "Password length should be at least 6"]
  },
  gender: {
    type: String,
    enum : ["Male", "Female"]
  }
});

module.exports = mongoose.model("Person", PersonSchema)
