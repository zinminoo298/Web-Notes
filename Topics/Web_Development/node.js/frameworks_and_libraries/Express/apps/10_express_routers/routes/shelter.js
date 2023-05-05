const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("ALL SHETERS");
});

router.post("/", (req, res) => {
  res.send("Creating Shelter");
});

router.get("/:id", (req, res) => {
  res.send("ONE SHELTER");
});

router.get("/:id/edit", (req, res) => {
  res.send("EDITING ONE SHELTER");
});

module.exports = router;
