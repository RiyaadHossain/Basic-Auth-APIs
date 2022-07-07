const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

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
    required: true,
    min: [6, "Password length should be at least 6"],
  },
  confirmPassword: {
    type: String,
    required: true,
    min: [6, "Password length should be at least 6"],
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  gender: {
    type: String,
    enum: ["Male", "Female"],
  },
});

// Instance Method - Generate Token
PersonSchema.methods.generateToken = async function () {
  try {

    const token = jwt.sign({ _id: this._id.toString() }, process.env.JWT_SECRET_TOKEN);
    this.tokens = await this.tokens.concat({token}) // Add the tokens in the Schema
    await this.save() // Save the Tokens Info
    return token;

  } catch (error) {
    
    res.send(error);
  }
};

// Hashed the Password Before the Save Method
PersonSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = bcrypt.hash(this.password, 10);
    this.confirmPassword = bcrypt.hash(this.password, 10);
  }
  next();
});

module.exports = mongoose.model("Person", PersonSchema);
