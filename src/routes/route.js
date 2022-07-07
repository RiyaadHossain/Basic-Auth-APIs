const PersonModel = require("../models/person");
const express = require("express");
const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const email = req.body.email;
    const personExist = await PersonModel.findOne({email});
    if (personExist) {
      return res.status(401).json({ message: "Person Already Exist" });
    }
    const newPerson = new PersonModel(req.body);
    const personCreated = await newPerson.save();
    return res.status(200).json(personCreated);
  } catch (error) {
    return res.status(400).json(error);
  }
});


module.exports = router;
