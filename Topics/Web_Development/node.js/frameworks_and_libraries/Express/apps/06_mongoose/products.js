const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/shopApp")
  .then(() => {
    console.log("Mongoose Running");
  })
  .catch((error) => console.log(`Connection Error : ${error}`));

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    // #1
    uppercase: true,
    // #2
    maxlength: 20,
  },
  price: {
    type: Number,
    required: true,
    // #3
    min: 1,
  },
  // #4
  onSale: {
    type: Boolean,
    default: false,
  },
  // #5
  categories: [String],
  // #6
  qty: {
    online: {
      type: Number,
      default: 0,
    },
    inStock: {
      type: Number,
      default: 0,
    },
  },
});

const Product = mongoose.model("Product", productSchema);

// const newProduct = new Product({
//   name: "Bike Helmet",
//   price: 39.99,
//   onSale: true,
//   categories: ["Cycling", "Bike Parts", "Safety"],
// });

// newProduct
//   .save()
//   .then((data) => console.log(data))
//   .catch((error) => console.log(error));

productSchema.methods.greet = function () {
  console.log("Helooo");
  console.log(`- from ${this.name}`);
};

const findProduct = async () => {
  const foundProduct = await Product.findOne({ name: "bike helmet" });
  foundProduct.greet();
};

findProduct();
