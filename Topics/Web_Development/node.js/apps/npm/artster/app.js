const colors = require("colors");
const figlet = require("figlet");

figlet("GooxBump", function (err, data) {
  if (err) {
    console.log("Something went wrong...");
    console.dir(err);
    return;
  }
  console.log(data.rainbow);
});
