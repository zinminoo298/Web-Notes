const express = require("express");
const path = require("path");
const app = express();

const port = 3000;
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/tacos", (req, res) => {
  res.send("/tacos GET response");
});
app.post("/tacos", (req, res) => {
  console.log(req.body);
  const { meat, qty } = req.body;
  res.send(
    `You ordered : ${qty} x ${meat} taco${qty.toString() > 1 ? "s" : ""} `
  );
});

app.listen(port, () => {
  console.log(`RESTful Routes running on ${port}`);
});
