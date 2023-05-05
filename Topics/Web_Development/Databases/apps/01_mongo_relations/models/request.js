const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/relationDemo")
  .then(() => {
    console.log("Mongoose Running");
  })
  .catch((error) => console.log(`Connection Error : ${error}`));

const requestSchema = new mongoose.Schema({});
