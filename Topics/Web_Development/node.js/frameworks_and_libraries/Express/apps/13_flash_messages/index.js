const express = require("express");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");

const Farm = require("./models/farm");

const app = express();
const port = 3000;

const sessionOption = {
  secret: "thisisnotagoodsecret",
  resave: false,
  saveUninitialized: false,
};

mongoose
  .connect("mongodb://localhost:27017/farmStand2")
  .then(() => {
    console.log("Mongoose Running");
  })
  .catch((error) => console.log(`Connection Error : ${error}`));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(session(sessionOption));
app.use(flash());

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/farms", async (req, res) => {
  const farms = await Farm.find({});
  res.render("farms/index", { farms, messages: req.flash("success") });
});

app.get("/farms/new", (req, res) => {
  res.render("farms/new");
});

app.post("/farms", async (req, res) => {
  const farm = new Farm(req.body.farm);
  await farm.save();
  req.flash("success", "successfully made a new farm");
  res.redirect("/farms");
});

app.get("/farms/:id", async (req, res) => {
  const farm = await Farm.findById(req.params.id);
  res.render("farms/show", { farm });
});

app.delete("/farms/:id", async (req, res) => {
  await Farm.findByIdAndDelete(req.params.id);
  res.redirect("/farms");
});

app.listen(port, () => console.log(`Flash Message on port ${port}`));
