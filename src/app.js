const express = require("express");
const PORT = process.env.PORT || 5000;
app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`The app is running on PORT: ${PORT}`);
});
