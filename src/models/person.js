const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
    min: [6, "Password length should be at least 6"],
  },
  confirmPassword: {
    type: String,
    min: [6, "Password length should be at least 6"],
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],
  },
});

PersonSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
    this.confirmPassword = undefined
  }
  next();
});

module.exports = mongoose.model("Person", PersonSchema);
