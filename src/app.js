const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const personRoute = require("./routes/route")
require("./db/connect") // Conntect Database

app.use(express.json()) // Parse the BSON Data
app.use("/api", personRoute) // Define the Router

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`The app is running on PORT: ${PORT}`);
});
