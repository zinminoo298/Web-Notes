const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

app.use(cookieParser("thisismysecret"));

app.get("/", (req, res) => {
  res.send("Express Cookies");
});
app.get("/petdog", (req, res) => {
  res.cookie("name", "Till");
  res.cookie("breed", "Golden Retriever");
  res.send("you got some cookies");
});

app.get("/getproduct", (req, res) => {
  res.cookie("product", "rtx3090", { signed: true });
  res.send("Got signed cookie");
});

app.get("/checkout", (req, res) => {
  res.send(`Checkout ${req.signedCookies.product}`);
});

app.listen(3000, () => console.log("Port 3000"));
