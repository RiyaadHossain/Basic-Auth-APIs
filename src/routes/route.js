const PersonModel = require("../models/person");
const express = require("express");
const { findOne } = require("../models/person");
const router = express.Router();
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser"); // To parse the cookie Data

router.post("/signup", async (req, res) => {
  try {
    // Check weather the email is exist or not
    const email = req.body.email;
    const personExist = await PersonModel.findOne({ email });
    if (personExist) {
      return res.status(401).json({ message: "Person Already Exist" });
    }

    // Create New Person
    if (req.body.password === req.body.confirmPassword) {
      const newPerson = new PersonModel(req.body);

      // Generate Token using Instance Method
      const token = await newPerson.generateToken();
      const personCreated = await newPerson.save();

      // Store in Cookie
      res.cookie("jwt", token, {
        expires: new Date(Date.now() + 60000),
        httpOnly: true,
      });

      return res.status(200).json(personCreated);
    } else {
      return res.status(200).json({ message: "Password didn't match" });
    }
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/signin", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const personInfo = await PersonModel.findOne({ email });

    const passMatched = await bcrypt.compare(password, personInfo.password); // Compare the password by bcrypt
    
    if (passMatched) {
      // Generate Token using Instance Method
      const token = await personInfo.generateToken();
      
      // Store in Cookie
      res.cookie("jwt", token, {
        expires: new Date(Date.now() + 60000),
        httpOnly: true,
      });

      return res
        .status(200)
        .json({ message: "Person Log in Successfully" });
    }
    return res.status(301).json({ message: "Person credentials didn't match" });
  } catch (error) {
    res.status(401).json({ message: "Something Went wrong" });
  }
});

module.exports = router;
