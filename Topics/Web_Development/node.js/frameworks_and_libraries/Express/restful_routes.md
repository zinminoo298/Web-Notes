[Javascript](../../../Javascript/js.md) || [NodeJS](../../node.md) || [Express](express.md) || [**RESTful Routes**](restful_routes.md)

1. [Get Vs Post Requests](#get-vs-post-request)
2. [Defining Express Post Routes](#defining-express-post-routes)
3. [Parsing The Request Body (extract data from req)](#parsing-the-request-body)
4. [Intro to REST](#intro-to-rest)
5. [RESTful comments](#restful-comments)
   - [Overview](#overview)
   - [Index](#restful-comments-index)
   - [New](#restful-comments-new--create)
   - [Show](#restful-comments-show)
   - [Update](#restful-comments-update--edit)
   - [Delete](#restful-comments-delete)

---

### Get Vs Post Request

**GET**

- Used to retrieve information
- Data is send via [query String](express.md#working-with-query-strings)
- Information is plainly visible in URL
- Limited amount of data can be sent
- We never create stuffs with the GET request

HTMl forms by default is set to GET request

```html
<form action="/taco" method="get">
  <input type="text" name="meat" />
  <input type="text" name="qty" />
  <button>Submit</button>
</form>
```

If we sbumit the form, in url we get : /tacos?meat=carnitas&qty=3, and our app will try to go there. [fix](../../../Javascript/dom.md#form-events)

---

**POST**

- Used to post data to the server (to create things)
- Used to **write**/**create**/**update**
- Data is sent **via request body**, not a [query string](express.md#working-with-query-strings)
- Can send any sort of Data and (**JSON**)

```html
<form action="/taco" method="post">
  <input type="text" name="meat" />
  <input type="text" name="qty" />
  <button>Submit</button>
</form>
```

Our app still try to get to /tacos, but we will not see a query string, instead the data from our form is passed into the body.

> If you have no clue what a body is just go into postman and there is a body tag.

---

### Defining Express Post Routes

##### [Start](#)

<br>

To define post routes in express; use app.post().

```javascript
const express = require('express');
const app = express();
...
app.post("/tacos" ,(req,res)=>{
   console.log("Response to /tacos post request.")
})
app.listen(3000,()=>console.log("App on port 3000"))
```

The data sent to the post request will be in the body of request object.

    `app.post(url, (request,response))`

---

### Parsing the Request body

#### [Start](#)

<br>

To get the data from the request body. We have to use `req.body` method.

1. `req.body` method is undefined by default
   > Which means the object is undefined no matter what information it has, if we look at it without parsing middleware.
2. Use body-parsing-middleware to populate the req.body.
   > You can safely put both json and url middle-ware in app
3. Now we can access our data from body

```javascript
const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
// #2
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/tacos", (req, res) => {
  res.send("/tacos GET response");
});
app.post("/tacos", (req, res) => {
  // #1 and #3
  console.log(req.body);
  const { meat, qty } = req.body;
  res.send(
    `You ordered : ${qty} x ${meat} taco${qty.toString() > 1 ? "s" : ""} `
  );
});

app.listen(port, () => {
  console.log(`RESTful Routes running on ${port}`);
});
```

---

### Intro to REST

REST

- Representational State Transfer : "architectural style for disturbed hypermedia system" ~ @\_@
- Its basically a set of guidelines for how a client and server should communicate and perform CRUD operation on a given resource.

- The main idea of REST is treating data on the server side as resources that can be CRUDed.

- The most common way of appraoching REST is in formatting the URLs and HTTP verbs in your application.

      1. CRUD operations : Create, read, update, delete
      2. resource : it could be a tweet, a user, a faceook post, an image

The idea is to **combine the base url**(/blogs) with **different HTTP methods (GET, POST, PUT, PATCH, DELETE)** to expose **CRUD operations** over HTTP.

### RESTful Comments

##### [Start](#)

<br>

Create a RESTful comments app with the CRUDE operation.

[Full app](#full-app)

### Overview

##### [Start](#) / [RESTful comments](#restful-comments)

<br>

| Description                                                     | HTTP verb | BaseURL(resource)  | Name    |
| --------------------------------------------------------------- | --------- | ------------------ | ------- |
| [List all comments](#restful-comments-index)                    | GET       | /comments          | Index   |
| [Form to create new comment](#restful-comments-new--create)     | GET       | /comments/new      | New     |
| [Create a new comment](#restful-comments-new--create)           | POST      | /comments          | Create  |
| [Show specific comment](#restful-comments-show)                 | GET       | /comments/:id      | Show    |
| [Form to edit specific comment](#restful-comments-update--edit) | GET       | /comments/:id/edit | Edit    |
| [Updates specific comment](#restful-comments-update--edit)      | PATCH/PUT | /comments/:id      | Update  |
| [Deletes specific comment](#restful-comments-delete)            | DELETE    | /comments/:id      | Destroy |

---

### RESTful comments index

##### [Start](#) / [Overview](#overview)

<br>

1. We will start by creating the index.ejs for comments and a route to it.
2. Pass in the fakedata that we created into the index(list of all comments)

```terminal
/views$mkdir comments
/views/comments$touch index.ejs
```

```javascript
const express = require("express");
const path = require("path");
const app = express();
const comments = require("./fakeData.json");
const port = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("home");
});

// #1
app.get("/comments", (req, res) => {
  // #2
  res.render("comments/index", { comments });
});

app.listen(port, () => {
  console.log(`RESTful Comments App on port ${port}`);
});
```

---

### RESTful comments new + create

##### [Start](#) / [Overview](#overview)

<br>

Here we will make a form that can create new comments.

1.  Create new.ejs to make a form where we can create new comments
2.  Add form in new to make comments
    > Since we are creating new comments, we have to use POST method and the url should be the resource itself (comment).
3.  Make route to new with app.get()
4.  Make post route create new commet with the data we receive from form

    > We destructurize the data recieved from the request body, and push our new comment into the comments array.

5.  Redirect the user to index page after making a new comment.

<!-- prettier-ignore -->
```html
<!-- #2 -->
<form action="/comments" method="post">
  <label for="username">Enter your username:</label>
  <input type="text" id="username" name="username" placeholder="username" />
  <textarea
    name="comment"
    id="comment"
    cols="30"
    rows="10"
    placeholder="Comment here"
  ></textarea>
</form>
```

```javascript
const express = require("express");
const path = require("path");
const app = express();
const comments = require("./fakeData.json");
const port = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("home");
});
app.get("/comments", (req, res) => {
  res.render("comments/index", { comments });
});

// #3
app.get("/comments/new", (req, res) => {
  res.render("comments/new");
});

// #4
app.post("/comments", (req, res) => {
  // we can just push the req.body, but unwanted data can be sent through url and postman so we will destructre it
  // comments.push(req.body);
  const { username, comment } = req.body;
  comments.push({ username, comment });
  // #5
  res.redirect("/comments");
});

app.listen(port, () => {
  console.log(`RESTful Comments App on port ${port}`);
});
```

---

### RESTful comments show

##### [Start](#) / [Overview](#overview)

<br>

Look up each comments by id. Its not gonna work for new comments since we do not have database, and we are just working around with fake json data.

1. Create new route to view each comments by id.
   > give path variable for our comment id.
2. Get the id from path parameter
3. Use `array.find()` to look for our comment with the matching id from path parameter.
   > `Array.find(callback)` method returns the first element in the provided array that satisfies the provided testing function
4. Render the show page and pass the matched comment from array.find
   > Spread the comment object, so we don't have to use comment.username in ejs.

```javascript
// #1
app.get("/comments/:id", (req, res) => {
  // #2
  const { id } = req.params;
  // #3
  const comment = comments.find((c) => c.id === parseInt(id));
  // #4
  res.render("comments/show", { ...comment });
});
```

5. Show our comment in show page

show.ejs

```html
<h4><%= username %></h4>
<p><%= comment %></p>
```

6. Create an anchor tag to show page for each comment in index page.

index.ejs

```html
<%for (c of comments){ %>
<div>
  <h5><%= c.username %></h5>
  <p><%= c.comment %></p>
  <a href="/comments/<%= c.id %> "><button>View</button></a>
</div>
<% } %>
```

---

### RESTful comments update + edit

##### [Start](#) / [Overview](#overview)

<br>

We have two options to update our contents with: **`PUT`** or **`PATCH`**.

**PUT method** replaces all current representations of target resource with the request payload

**PATCH method** used to apply partial modification to a resource.

\*\* But the real problem is we cannot directly use `PATCH`, `PUT` or `DELETE` inside our html. So we have to get around it by using `method-override` npm.

1. Install method-override npm into our app
2. Require method-override in our app
3. Set the method-override with app.use()
4. Create the route to and form for edit
5. Use method-override in our edit form to use `PATCH` method

   > We still have to put the POST inside the method

6. Create the patch route to update comment from edit form.

```terminal
npm i method-override
```

```javascript
...
// #2
const methodOverride = require("method-override");
...
// #3
app.use(methodOverride("_method"));

// #4
app.get("/comments/:id/edit", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === parseInt(id));
  res.render("comments/edit", { ...comment });
});

// #6
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
```

#4

<!-- prettier-ignore -->
```html
<!-- #5 -->
<form action="/comments/<%= id %>?_method=PATCH" method="post">
  <textarea name="comment" id="comment" cols="30" rows="10">
          <%= comment %> 
      </textarea>
  <button type="submit">Save</button>
</form>
```

---

### RESTful comments delete

##### [Start](#) / [Overview](#overview)

<br>

To delete the comment, we gonna have to use array.filter() method and filter out the comment we want to delete and make new array for the rest of the comments. But later in with databases, deleting stuffs will be easier.

1. Create delete route in our app
2. Make a form in show page to send delete request with method-override
3. Since we will be changing the array, change the declaration of comments from `const` to `let`
4. Filter out comments without the id of comment from delete request and make them a new array.
   > Making/Copying a new array is better practice than mutating the array/object

```javascript
// #3
let comments = require("./fakeData.json");
// #1
app.delete("/comments/:id", (req, res) => {
  const { id } = req.params;
  // #4
  comments = comments.filter((c) => c.id !== parseInt(id));
  res.redirect("/comments");
});
```

```html
<!-- #3 -->
<form action="/comments/<%= id %>?_method=DELETE" method="post">
  <button type="submit">Delete</button>
</form>
```

---

### Full App

##### [Start](#) / [Overview](#overview)

<br>

```javascript
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
```
