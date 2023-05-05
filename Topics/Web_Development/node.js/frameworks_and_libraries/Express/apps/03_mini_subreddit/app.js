const express = require("express");
const path = require("path");
const app = express();

// require the json data
const subData = require("./data.json");

const port = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("landing");
});

app.get("/r/:subreddit", (req, res) => {
  const { subreddit } = req.params;

  // accessing object data ( object literals in basic js)
  const data = subData[subreddit];
  if (data) {
    // spread the data object, so we dont have to access data properties like data.name, data.description. We can just use name, description.
    res.render("subreddit", { ...data });
  } else {
    res.send(`<h1>Subreddit ${subreddit} Does Not Exist</h1>`);
  }
});

app.get("*", (req, res) => {
  res.send("Noting to see here");
});

app.listen(port, () => {
  console.log(`Mini Subreddit on Port ${port}`);
});
