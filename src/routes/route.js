const PersonModel = require("../models/person");
const express = require("express");
const { findOne } = require("../models/person");
const router = express.Router();

router.post("/signup", async (req, res) => {
  try {

    // Check weather the email is exist or not
    const email = req.body.email;
    const personExist = await PersonModel.findOne({email});
    if (personExist) {
      return res.status(401).json({ message: "Person Already Exist" });
    }

    // Create New Person
    const newPerson = new PersonModel(req.body);
    const personCreated = await newPerson.save();
    return res.status(200).json(personCreated);

  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/signin", async(req, res) => {
  try {
    const email = req.body.email
    const password = req.body.password
    const personInfo = await PersonModel.findOne({email})
    
    if(personInfo.password === password){
      return res.status(200).json({message: "Person Log in Successfully"})
    }
    return res.status(301).json({message: "Person credentials didn't match"})
    
  } catch (error) {
    res.status(401).json({message: "Something Went wrong"})
  }
})


module.exports = router;
