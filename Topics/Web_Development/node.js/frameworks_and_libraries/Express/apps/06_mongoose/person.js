const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/shopApp")
  .then(() => {
    console.log("Mongoose Running");
  })
  .catch((error) => console.log(`Connection Error : ${error}`));

const personSchema = new mongoose.Schema({
  first: String,
  last: String,
});

personSchema.virtual("fullName").get(function () {
  return `${this.first} ${this.last}`;
});
personSchema.pre("save", async function () {
  this.first = "Yo";
  this.last = "MaMa";
  console.log("Before Save!");
});

personSchema.post("save", async function () {
  console.log("After Save!");
});

const Person = mongoose.model("Person", personSchema);

// #
