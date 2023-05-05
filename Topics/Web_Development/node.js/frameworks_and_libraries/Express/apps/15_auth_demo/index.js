const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const session = require("express-session");
const path = require("path");
const app = express();
const port = 3000;

const User = require("./models/user");

const sessOptions = {
  secret: "donnotusethissecret",
  resave: false,
  saveUninitialized: true,
};

mongoose
  .connect("mongodb://localhost:27017/15authDemo")
  .then(() => {
    console.log("Mongoose Running");
  })
  .catch((error) => console.log(`Connection Error : ${error}`));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session(sessOptions));

const requireLogin = (req, res, next) => {
  if (!req.session.user_id) {
    return res.redirect("/login");
  }
  next();
};

app.get("/", (req, res) => {
  res.send("Auth Demon");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.redirect("/");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const foundUser = await User.findAndValidate(username, password);
  if (foundUser) {
    req.session.user_id = foundUser._id;
    return res.redirect("/dashboard");
  } else {
    res.send("Invalid username or password");
  }
});

app.post("/logout", (req, res) => {
  req.session.user_id = null;
  res.redirect("/login");
});

app.get("/dashboard", requireLogin, (req, res) => {
  res.render("dashboard");
});

app.listen(port, () => console.log(`Auth Demo on Port ${port}`));
