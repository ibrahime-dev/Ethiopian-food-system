const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/mernApp")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});