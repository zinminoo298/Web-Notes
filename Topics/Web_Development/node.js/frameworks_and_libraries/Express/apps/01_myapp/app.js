const express = require("express");
const app = express();

const port = 3000;

app.get("/", (req, res) => {
  res.send("HOME");
});
app.get("/search", (req, res) => {
  // #1
  const { q } = req.query;
  // #2
  if (!q) {
    res.send("IF NOTHING SEARCH NOTHING FOUND");
  }
  // #3
  res.send(`You Searched for ${q}`);
});
app.get("*", (req, res) => {
  res.send("Error 404 not found");
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
