const mongoose = require("mongoose");
require('dotenv').config()

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWWORD}@curdoperation.qbqwp.mongodb.net/PersonData?retryWrites=true&w=majority`
  )
  .then(() => console.log("Database is connected"))
  .catch((err) => console.log(err));
