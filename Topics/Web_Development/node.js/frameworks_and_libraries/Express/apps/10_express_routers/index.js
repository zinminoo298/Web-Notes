const express = require("express");
const app = express();

// Routes
const shelterRoutes = require("./routes/shelter");

// Use Routes
app.use("/shelters", shelterRoutes);

app.listen(3000, () => console.log("App on 3000"));
