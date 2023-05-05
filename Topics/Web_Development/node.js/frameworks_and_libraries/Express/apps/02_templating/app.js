const express = require("express");
const path = require("path");
const app = express();

const port = 3000;
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/", (req, res) => {
  res.render("home");
});
app.get("/randomNumber", (req, res) => {
  const num = Math.floor(Math.random() * 3000) + 1;
  res.render("rand", { num: num });
});

app.get("/twd", (req, res) => {
  const chars = ["Rick", "Daryl", "Carol", "Megan", "Glenn"];
  res.render("twd", { chars });
});

app.get("/r/:subreddit", (req, res) => {
  const { subreddit } = req.params;
  res.render("subreddit", { subreddit: subreddit });
});
app.get("*", (req, res) => {
  res.send("<h1>Nothing Here</h1>");
});

app.listen(port, () => {
  console.log(`App Launched on port ${port}`);
});
