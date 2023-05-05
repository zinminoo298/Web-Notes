const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const app = express();
let comments = require("./fakeData.json");
const port = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// We gonna have to use method-override to use PATCH/PUT/DELETE and some more methods that isnt supported
// override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.render("home");
});
app.get("/comments", (req, res) => {
  res.render("comments/index", { comments });
});

app.get("/comments/new", (req, res) => {
  res.render("comments/new");
});

app.post("/comments", (req, res) => {
  // we can just push req.body but, unwanted things can be sent directly from routes and postman so we will destructre it
  //   comments.push(req.body);
  const { username, comment } = req.body;
  comments.push({ username, comment });
  res.redirect("/comments");
});

app.get("/comments/:id", (req, res) => {
  // destruce the id passed from the url
  const { id } = req.params;
  // Array.find() method returns the first element in the provided array that satisfies the provided testing function
  const comment = comments.find((c) => c.id === parseInt(id));
  res.render("comments/show", { ...comment });
});

app.get("/comments/:id/edit", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === parseInt(id));
  res.render("comments/edit", { ...comment });
});

app.patch("/comments/:id", (req, res) => {
  // find the comment with id from request param
  const { id } = req.params;
  const foundComment = comments.find((c) => c.id === parseInt(id));
  // get the edited comment from request body
  const newComment = req.body.comment;
  // set/change the comment value of the old comment with edited one
  foundComment.comment = newComment;
  res.redirect("/comments");
});

app.delete("/comments/:id", (req, res) => {
  const { id } = req.params;
  // user array.filter() method to filter out the comments that does not have the id from params and set a new comments array
  comments = comments.filter((c) => c.id !== parseInt(id));
  res.redirect("/comments");
});
app.listen(port, () => {
  console.log(`RESTful Comments App on port ${port}`);
});
