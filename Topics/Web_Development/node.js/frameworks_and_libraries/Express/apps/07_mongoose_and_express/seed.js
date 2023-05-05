const mongoose = require("mongoose");
const Product = require("./models/product");

mongoose
  .connect("mongodb://localhost:27017/farmStand")
  .then(() => {
    console.log("Mongoose Running");
  })
  .catch((error) => console.log(`Connection Error : ${error}`));

const seedProducts = [
  {
    name: "Fairy Eggplant",
    price: "3",
    category: "vegetable",
  },
  {
    name: "Magical Grapes",
    price: "0.5",
    category: "fruit",
  },
  {
    name: "Glowing Milk",
    price: "15",
    category: "dairy",
  },
  {
    name: "Flaming Carrots",
    price: "2",
    category: "vegetable",
  },
  {
    name: "Dragon Fruit",
    price: "20",
    category: "fruit",
  },
  {
    name: "Ordinary Cheese",
    price: "1",
    category: "dairy",
  },
  {
    name: "Blue Beets",
    price: "3",
    category: "fruit",
  },
];

Product.insertMany(seedProducts)
  .then((res) => console.log(res))
  .catch((e) => console.log(e));
