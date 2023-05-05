const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const AppError = require("./AppError");

const app = express();
const port = 3000;

const mongoose = require("mongoose");
const ObjectID = require("mongoose").Types.ObjectId;

const Product = require("./models/product");
const Farm = require("./models/farm");

mongoose
  .connect("mongodb://localhost:27017/farmStand2")
  .then(() => {
    console.log("Mongoose Running");
  })
  .catch((error) => console.log(`Connection Error : ${error}`));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const categories = ["fruit", "vegetable", "dairy"];

function wrapAsync(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch((e) => next(e));
  };
}

app.get("/", (req, res) => {
  res.render("index");
});

// Farms Routes
app.get("/farms", async (req, res) => {
  const farms = await Farm.find({});
  res.render("farms/index", { farms });
});

app.get("/farms/new", (req, res) => {
  res.render("farms/new");
});

app.post("/farms", async (req, res) => {
  const farm = new Farm(req.body);
  await farm.save();
  res.redirect("/farms");
});

app.get("/farms/:id", async (req, res) => {
  const { id } = req.params;
  const farm = await Farm.findById(id).populate("products");
  res.render("farms/show", { farm });
});

app.get("/farms/:id/products/new", async (req, res) => {
  const { id } = req.params;
  const farm = await Farm.findById(id);
  res.render("products/new", { categories, farm });
});

app.post("/farms/:id/products", async (req, res) => {
  const { id } = req.params;
  const farm = await Farm.findById(id);
  const { name, price, category } = req.body;
  const product = new Product({ name, price, category });
  farm.products.push(product);
  product.farm = farm;
  await farm.save();
  await product.save();
  res.redirect(`/farms/${farm._id}`);
});

app.delete("/farms/:id", async (req, res) => {
  await Farm.findByIdAndDelete(req.params.id);
  res.redirect("/farms");
});

// Products Routes
app.get(
  "/products",
  wrapAsync(async (req, res, next) => {
    const { category } = req.query;
    if (category) {
      const products = await Product.find({ category });
      // w/o return "Cannot set headers after they are sent to client" Error
      return res.render("products/index", { products, category });
    }
    const products = await Product.find();
    // same here
    return res.render("products/index", { products, category: "All" });
  })
);

app.get("/products/new", (req, res) => {
  res.render("products/new", { categories });
});

app.post(
  "/products",
  wrapAsync(async (req, res, next) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${newProduct.id}`);
  })
);

app.get(
  "/products/:id",
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    if (!ObjectID.isValid(id)) {
      throw new AppError("Invalid Product ID", 400);
    }
    const product = await Product.findById(id).populate("farm", "name");
    if (!product) {
      throw new AppError("Product Not Found", 404);
    }
    res.render("products/show", { product });
  })
);

app.get(
  "/products/:id/edit",
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    if (!ObjectID.isValid(id)) {
      throw new AppError("Invalid Product ID", 400);
    }
    const product = await Product.findById(id);
    if (!product) {
      throw new AppError("Product Not Found", 404);
    }
    res.render("products/edit", { product, categories });
  })
);

app.put(
  "/products/:id",
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {
      runValidators: true,
    });
    res.redirect(`/products/${product.id}`);
  })
);

app.delete(
  "/products/:id",
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.redirect("/products");
  })
);

// Error Handling
app.use((err, req, res, next) => {
  const { message = "Something Went Wrong", status = "500" } = err;
  res.status(status).send(message);
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
