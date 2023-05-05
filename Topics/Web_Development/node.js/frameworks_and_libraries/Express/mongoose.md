[**Mongoose**](mongoose.md) || [Express](express.md) || [MongoDB](../../../Databases/mongodb.md)

1. [Mongoose](#mongoose)
2. [Getting Started](#getting-started-with-mongoose)
   - [Important!! Queries are not promises](https://mongoosejs.com/docs/queries.html)
   - [Connecting mongoose to mongodb](#connecting-mongoose-to-mongo)
   - [Making schema and model](#making-mongoose-model)
   - [Insert many](#insert-many)
   - [Finding with mongoose](#finding-with-mongoose)
   - [Updating with mongoose](#updating-with-mongoose)
   - [Deleting with mongoose](#deleting-with-mongoose)
   - [Schema validations](#schema-validations)
   - [Additional schema constraints](#additional-schema-constraints)
   - [Validating mongoose updates](#validating-mongoose-updates)
   - [Adding custom methods to schema (model instance methods)](#adding-custom-methods-to-schema-model-instance-methods)
   - [Adding model static methods](#adding-model-static-methods)
   - [Mongoose virtuals (save db storage)](#mongoose-virtuals)
   - [Defining mongoose middlewares](#defining-mongoose-middlewares)
3. [Mongoose with Express](#mongo-with-express)
4. [Designing Mongoose Shcema]
5. []
6. []
7. []

---

### **Mongoose**

##### [Start](#)

<br>

[Mongoose docs](https://mongoosejs.com/)

Mongoose is an **ODM** : **Object Data/Document Mapper**, maps the **documents** coming from/to a database **into** usable **javascript Objects**.

It provides ways for us to model our application data and define a schema.

---

### **Getting Started with Mongoose**

##### [Start](#)

<br>

- [Connecting Mongoose to Mongo Database](#connecting-mongoose-to-mongo)
- [Making Schema and Model](#making-mongoose-model)
- [Insert Many](#insert-many)
- [Finding with Mongoose](#finding-with-mongoose)
- [Updating with Mongoose](#updating-with-mongoose)
- [Deleting with Mongoose](#deleting-with-mongoose)
- [Schema Validations](#schema-validations)
- [Additional Schema Constraints](#additional-schema-constraints)
- [Validating Mongoose Updates](#validating-mongoose-updates)
- [Adding Custom Methods To Schema (Model Instance Methods)](#adding-custom-methods-to-schema-model-instance-methods)
- [Adding Model Static Methods](#adding-model-static-methods)
- [Mongoose Virtuals](#mongoose-virtuals)
- [Defining Mongoose Middlewares](#defining-mongoose-middlewares)

---

### **Connecting Mongoose to Mongo**

##### [Start](#) / [Getting Started](#getting-started-with-mongoose)

<br>

Obviously, we have to install the mongoose first - `npm i mongoose`

1.  require mongoose
2.  Connect mongoose to mongodb at default port 27017 and provide the database name (default is test)

        As of mongoose v6 these two are no longer necessary.
        useNewUrlParser: true,
        useUnifiedTopology: true

```javascript
// #1
const mongoose = require("mongoose");

// #2
mongoose
  .connect("mongodb://localhost:27017/movieApp")
  .then(() => {
    console.log("Mongoose Running");
  })
  .catch((error) => console.log(`Connection Error : ${error}`));
```

---

### **Making Mongoose Model**

##### [Start](#) / [Getting Started](#getting-started-with-mongoose)

<br>

Before making model, gotta start with the **SCHEMA** first. **Schema maps to collection** and **defines the shape of documents within that collection**.

1.  Defining Schema
    ```json
    Creates a movie schema for mongoose
    {
        title: 'The Adam Project'
        year: 2022,
        score: 6.7,
        rating: 'PG-13',
        netflix: true
    }
    ```
2.  Create a model class - which creates a collection with the given name

    > Must be `Capitalize single name` and it will pluralize the name in the process ('Movie') -> `collection(movies)`

3.  Instantiate a new movie and save it to the movies collection in the movieApp database using `save()` middleware.

4.  Checking database

```javascript
// #1
const movieSchema = new mongoose.Schema({
  title: String,
  year: Number,
  score: Number,
  rating: String,
  netflix: Boolean,
});

// #2
const Movie = mongoose.model("Movie", movieSchema);

// #3
const theAdamProject = new Movie({title: 'The Adam Project'
        year: 2022,
        score: 6.7,
        rating: 'PG-13',
        netflix: true})

// #3
theAdamProject.save();
```

#4

```powershell
movieApp> db.movies.find()
[
  {
    _id: ObjectId("6244845533b74565ac19ceea"),
    title: 'The Adam Project',
    year: 2022,
    score: 6.7,
    rating: 'PG-13',
    netflix: true,
    __v: 0
  }
]
```

---

### **Insert Many**

##### [Start](#) / [Getting Started](#getting-started-with-mongoose)

<br>

[docs](https://mongoosejs.com/docs/api/model.html#model_Model.insertMany)

- We do not need to use `save()` middleware with `insertMany()` method.

- It returns a promise (since inserting many documents at once gonna take time) so we can do `then/catch`.

```javascript
const arr = [{
        title: 'The Batman'
        year: 2022,
        score: 8.3,
        rating: 'G',
        netflix: false
    }, ... ,{
        title: 'Amadeus'
        year: 1984,
        score: 8.2,
        rating: 'R',
        netflix: false
    }]

Movie.insertMany(arr)
  .then((data) => {
    console.log(data);
  })
  .catch((e) => {
    console.log("Error @_@", e);
  });

```

### **Finding With Mongoose**

##### [Start](#) / [Getting Started](#getting-started-with-mongoose)

<br>

Not gonna write code in index.js. Just load the index.js and try these out.

1. To find all movies, just like mongo: type `Model.find({}).then(data=>console.log(data))`
2. We can do findOne, findMany, findById

```powershell
 >Movie.find({}).then(movies=>console.log(movies))
  [
  {
    _id: new ObjectId("624495ecf1ee074cb6fd3ec4"),
    title: 'The Batman',
    year: 2022,
    score: 8.3,
    rating: 'G',
    netflix: false,
    __v: 0
  }, ...,
  {
    _id: new ObjectId("624495ecf1ee074cb6fd3ec3"),
    title: 'The Adam Project',
    year: 2022,
    score: 6.7,
    rating: 'PG-13',
    netflix: true,
    __v: 0
  }
]
```

#2 Finding a movie with ID is a common practice and we can do it two ways.

- findById does not need to provide an object, just an id

```powershell
>Movie.find({_id: "624495ecf1ee074cb6fd3ec3"}).then(m=>console.log(m))

>Movie.findById("624495ecf1ee074cb6fd3ec3").then(m=>console.log(m))

```

---

### **Updating With Mongoose**

##### [Start](#) / [Getting Started](#getting-started-with-mongoose)

<br>

`updateOne()`

      Model.updateOne(query, update).then()

```powershell
 Movie.updateOne({title: 'Amadeus'}, {score:9.5}).then(res=>console.log(res))
Promise {
  <pending>,
  [Symbol(async_id_symbol)]: 1600,
  [Symbol(trigger_async_id_symbol)]: 1598,
  [Symbol(destroyed)]: { destroyed: false }
}
> {
  acknowledged: true,
  modifiedCount: 1,
  upsertedId: null,
  upsertedCount: 0,
  matchedCount: 1
}
```

`updateMany()`

```powershell
>Movie.updateMany({title: {$in["The Adam Project", "Don't Look Up"]}}, {score: 7}).then(res=>console.log(res))
```

`findOneAndUpdate()`

      Model.findOneAndUpdate(query, update, option).then()

1. by default this method return us an original document rather than update
2. To get updated document pass in option {new:true}

#1

```powershell
Movie.findOneAndUpdate({title: "The Adam Project"}, {score:6}).then(m=>console
.log(m))
Promise {
  <pending>,
  [Symbol(async_id_symbol)]: 5907,
  [Symbol(trigger_async_id_symbol)]: 5905,
  [Symbol(destroyed)]: { destroyed: false }
}
> {
  _id: new ObjectId("624495ecf1ee074cb6fd3ec3"),
  title: 'The Adam Project',
  year: 2022,
  score: 7,
  rating: 'PG-13',
  netflix: true,
  __v: 0
}
```

#2

```powershell
> Movie.findOneAndUpdate({title: "The Adam Project"}, {score:6.4}, {new:true}).t
hen(m=>console.log(m))
Promise {
  <pending>,
  [Symbol(async_id_symbol)]: 6426,
  [Symbol(trigger_async_id_symbol)]: 6424,
  [Symbol(destroyed)]: { destroyed: false }
}
> {
  _id: new ObjectId("624495ecf1ee074cb6fd3ec3"),
  title: 'The Adam Project',
  year: 2022,
  score: 6.4,
  rating: 'PG-13',
  netflix: true,
  __v: 0
}
```

---

### **Deleting With Mongoose**

##### [Start](#) / [Getting Started](#getting-started-with-mongoose)

<br>

Theres tons of ways to delete things, just use the [docs](https://mongoosejs.com/docs/api/model.html#model_Model.deleteMany)

As for example we gonna use:

- [`Model.deleteMany()`](https://mongoosejs.com/docs/api/model.html#model_Model.deleteMany)
- [`Model.deleteOne()`](https://mongoosejs.com/docs/api/model.html#model_Model.deleteOne)

Use `findOneAndDelete()` to get back the movie data while deleting.

```powershell
> Movie.deleteMany({score: {$lt: 8}}).then(msg=>console.log(msg))
Promise {
  <pending>,
  [Symbol(async_id_symbol)]: 3025,
  [Symbol(trigger_async_id_symbol)]: 3023,
  [Symbol(destroyed)]: { destroyed: false }
}
> { acknowledged: true, deletedCount: 2 }
```

```powershell
> Movie.deleteOne({title: 'Amadeus'}).then(m=>console.log(m))
Promise {
  <pending>,
  [Symbol(async_id_symbol)]: 3375,
  [Symbol(trigger_async_id_symbol)]: 3373,
  [Symbol(destroyed)]: { destroyed: false }
}
> { acknowledged: true, deletedCount: 1 }
```

```powershell
> Movie.findOneAndDelete({title:"Dune"}).then(m=>console.log(m))
Promise {
  <pending>,
  [Symbol(async_id_symbol)]: 4108,
  [Symbol(trigger_async_id_symbol)]: 4106,
  [Symbol(destroyed)]: { destroyed: false }
}
> {
  _id: new ObjectId("624495ecf1ee074cb6fd3ec6"),
  title: 'Dune',
  year: 2021,
  score: 8.1,
  rating: 'PG-13',
  netflix: false,
  __v: 0
}
```

---

### **Schema Validations**

##### [Start](#) / [Getting Started](#getting-started-with-mongoose)

<br>

[**Note: The validations and constraints won't work on updating without runValidators option.**](#validating-mongoose-updates)

By default we make schema like this

```javascript
const productShcema = new mongoose.Schema({
  name: String,
  price: Number,
});
```

But we can further put validations in like this to our schema

```javascript
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});
```

Making a new product with the validations

1. Now with the required validations on both price and name, we must pass the values for them, otherwise we will get validations error.
2. For pirce, We can put the number or string that can be parse into number, but not the letters.

```javascript
const Product = mongoose.model("Product", productSchema);

// #1
const bike = new Product({
  name: "Mountain Bike",
  price: 599.99,
  // #2
  // price: "599.99",
  // price: "hello", validations error
});

bike
  .save()
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
```

> Note: `Model.insertMany()` will fail entirely by default if one of the new product fails to pass the validation

---

### **Additional Schema Constraints**

##### [Start](#) / [Getting Started](#getting-started-with-mongoose)

<br>

[**Note: The validations and constraints won't work on updating without runValidators option.**](#validating-mongoose-updates)

Go to [docs](https://mongoosejs.com/docs/schematypes.html).(Scroll down to 'All Schema Types')

And keep going down for particular constraints for each types (String, Number, Boolean, ...,etc.)

Used some constraints here

1. Make the name uppercase
2. Set the minimum length for name
3. Minium price for the item
4. Set sale status
5. Create a category list with arrays of String
6. Nested objects

```javascript
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    // #1
    uppercase: true,
    // #2
    minLength: 20,
  },
  price: {
    type: Number,
    required: true,
    // #3
    min: 1,
  },
  // #4
  onSale: {
    type: Boolean,
    default: false,
  },
  // #5
  categories: [String],
  // #6
  qty: {
    online: {
      type: Number,
      default: 0,
    },
    inStock: {
      type: Number,
      default: 0,
    },
  },
});
```

```javascript
const bike = new Product({
  name: "bike helmet",
  price: 23.99,
  onSale: true,
  categories: ["Cycling", "Bike Parts", "Safety"],
});
```

---

### **Validating Mongoose Updates**

##### [Start](#) / [Getting Started](#getting-started-with-mongoose)

<br>

[Docs](https://mongoosejs.com/docs/api/model.html#model_Model.findOneAndUpdate)

For the validations and constraints that we defined in Schema to work, we have to **pass in the option called `runValidator`** in our update.

```powershell
Model.findOneAndUpdate(query, update, option)
```

To go through validations set the runvalidator option

1. (Optional) `new` : if `true`, return the modified document rather than the original
2. `runValidators`: if `true`, runs update validators on this command. Update validators validate the update operation against the model's schema.

```powershell
Products.findOneAndUpdate({name: "BIKE HELMET"},{price: -9},{new: true, runValidator: true})
```

This should throw us a validation error since our price minimun price is 1 and currently is negative.

---

### **Mongoose Validations Errors**

##### [Start](#) / [Getting Started](#getting-started-with-mongoose)

<br>

[Docs](https://mongoosejs.com/docs/validation.html)

1. Making validation error msg
   > in this case 1 would be the min value and the string is the msg.
2. enum (useful) is an array.
   > enum creates a validator that checks if the value is in the given array

```javascript
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    // #1
    min: [1, "Price cannot be lower than $1."],
  },
  // #2
  size: {
    type: String,
    enum: ['S', 'M', 'L'] // Make sure that you are picking one of these sizes. Not XL nor XS nor anything else
  }
```

---

### **Adding Custom Methods To Schema (Model Instance Methods)**

##### [Start](#) / [Getting Started](#getting-started-with-mongoose)

<br>

**Use method on individual documents if you want to manipulate the individual document like adding tokens etc.** Use the statics approach if you want query the whole collection.

[Docs](https://mongoosejs.com/docs/guide.html#methods)

Making our own instance method and using it

```javascript
productSchema.methods.greet = function () {
  console.log("Helooo");
  console.log(`- from ${this.name}`);
};

const findProduct = async () => {
  const foundProduct = await Product.findOne({ name: "bike helmet" });
  foundProduct.greet();
};

findProduct();
```

Toggling onSale property of products

- Set the boolean value to opposite (true to false, false to true)
- Wait for product to save in database.

```javascript
productSchema.methods.toggleOnSale = function () {
  // #1
  this.onSale = !this.onSale;
  return this.save();
};
const findProduct = async () => {
  const foundProduct = await Product.findOne({ name: "bike helmet" });
  console.log(foundProduct);
  // #2
  await foundProduct.toggleOnSale();
  console.log(foundProduct);
};

findProduct();
```

Add additional categories

```javascript
productSchema.methods.addTag = function (tag) {
  this.categories.push(tag);
  return this.save();
};
const findProduct = async () => {
  const foundProduct = await Product.findOne({ name: "bike helmet" });
  await foundProduct.addTag("helmets");
};
```

---

### **Adding Model Static Methods**

##### [Start](#) / [Getting Started](#getting-started-with-mongoose)

<br>

Use method on individual documents if you want to manipulate the individual document like adding tokens etc. **Use the statics approach if you want query the whole collection.**

Create a fireSale static method that sets all the products onSale: true and price to 1.

- Keyword `this` in static methods refers to entire model (which is Product)

```javascript
productSchema.statics.fireSale = function () {
  // #  Product.updateMany()
  return this.updateMany({}, { onSale: true, price: 1 });
};

Product.fireSale().then((res) => console.log(res));
```

---

### **Mongoose Virtuals**

##### [Start](#) / [Getting Started](#getting-started-with-mongoose)

<br>

[Docs](https://mongoosejs.com/docs/guide.html#virtuals)

- Creates a virtual, and virtual does not exists in the database.
  > getter and setter, see the docs for full explanation.

```javascript
const personSchema = new mongoose.Schema({
  first: String,
  last: String,
});

// #
personSchema.virtual("fullName").get(function () {
  return `${this.first} ${this.last}`;
});

const Person = mongoose.model("Person", personSchema);
```

In node REPL

1. create new person

```powershell
> const arthur = new Person({first:"Arthur", last:"Morgan"})
> arthur
{
  first: 'Arthur',
  last: 'Morgan',
  _id: new ObjectId("62596d0de227730ac898753f")
}
```

2. Acess the virtual (fullName)
   > The virtual does not exists in the database, so you can save the space this way.

```powershell
> arthur.fullName
'Arthur Morgan'

```

---

### **Defining Mongoose Middlewares**

##### [Start](#) / [Getting Started](#getting-started-with-mongoose)

<br>

[Docs](https://mongoosejs.com/docs/middleware.html)

Some trolling **pre and post middlewares**

1. pre middleware runs before save()
2. post middleware runs after save()

```javascript
const personSchema = new mongoose.Schema({
  first: String,
  last: String,
});

// #1
personSchema.pre("save", async function () {
  this.first = "Yo";
  this.last = "MaMa";
  console.log("Before Save!");
});
// #2
personSchema.post("save", async function () {
  console.log("After Save!");
});
const Person = mongoose.model("Person", personSchema);
```

Create new person

```powershell
> const p = new Person({first:"Pyae", last:"Thant"})
undefined
> p.save().then(p=>console.log(p))
Promise {
  <pending>,
  [Symbol(async_id_symbol)]: 1333,
  [Symbol(trigger_async_id_symbol)]: 1331,
  [Symbol(destroyed)]: { destroyed: false }
}
> Before Save!
After Save!
{
  first: 'Yo',
  last: 'MaMa',
  _id: new ObjectId("625975502a4045f8477cf815"),
  __v: 0
}

```

> You could create something like averaging the reviews/rating of the game or movie with pre middleware before saving it to the database.

---

### **Mongo With Express**

##### [Start](#)

<br>

1. [Create mongoose + express index for the app](#mongoose--express)
   > npm i express ejs mongoose
2. [Create folder to store our mongoose models and create models](#models)
3. [Create a seed file in root to populate our model(for development purpose only)](#create-a-seed-file)
4. [Create routes](#create-routes)

#### **Mongoose + Express**

Create an express app

```javascript
const express = require("express");
const path = require("path");
const app = express();

const port = 3000;

app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.send("Express with Mongoose");
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
```

Then put mongo stuffs in it.

```javascript
const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const port = 3000;

mongoose
  .connect("mongodb://localhost:27017/shopApp")
  .then(() => {
    console.log("Mongoose Running");
  })
  .catch((error) => console.log(`Connection Error : ${error}`));

app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.send("Express with Mongoose");
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
```

---

#### Models

##### [Start](#) / [Mongoose With Express](#mongo-with-express)

<br>

Mkdir models in root dir. Then we create our model files in this models dir.

```powershell
07_mongoose_and_express> mkdir models
07_mongoose_and_express> cd models
07_mongoose_and_express/models> touch product.js
```

Product.js

1. Create schema
2. Create model based on schema
3. Export the model to main app.js
4. [Require the model in main app.js](#4-require-the-model-in-root-appjs)

```javascript
const mongoose = require("mongoose");

// #1
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    enum: ["fruit", "vegetable", "dairy"],
  },
});

// #2
const Product = mongoose.model("Product", productSchema);

// #3
module.exports = Product;
```

#### #4 Require the model in root app.js

```javascript
const express = require("express");
const path = require("path");
const Product = require("./models/product.js");
...
app.listen(port,()=>console.log(`App running on port${port}`))
```

---

#### **Create a seed file**

##### [Start](#) / [Mongoose with Express](#mongo-with-express)

<br>

To populate our database with fakedata, we need to create a seed file in root folder and run it.

```javascript
const mongoose = require("mongoose");
const Product = require("./models/product");

mongoose
  .connect("mongodb://localhost:27017/farmStand")
  .then(() => {
    console.log("Mongoose Running");
  })
  .catch((error) => console.log(`Connection Error : ${error}`));

const seedProducts = [
  {
    name: "Fairy Eggplant",
    price: "3",
    category: "vegetable",
  },
  ...{
    name: "Blue Beets",
    price: "3",
    category: "fruit",
  },
];

Product.insertMany(seedProducts)
  .then((res) => console.log(res))
  .catch((e) => console.log(e));
```

Then run the file - node seed.js

---

#### **Create Routes**

##### [Start](#) / [Mongoose With Express](#mongo-with-express)

<br>

- [Index Route (show all products)](#index-route)
- [Show Route (detail view of each product)](#show-route)
- [New Route (creating new products)](#new-route)
- [Update Route (edit and update products)](#update-route)
- [Tangent On Category Selector](#tangent-on-category-selector)
- [Delete Route](#delete)
- [Filter By Category](#filter-by-category)

---

#### **Index Route**

1. Index route for all products
2. Since getting all products from the database gonna take time, we make the callback to be async. And await the `Model.find()`.
3. Pass in our products that we get back from db into our ejs file.

```javascript
const express = require("express");
const path = require("path");
const app = express();

const port = 3000;

app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.send("Express with Mongoose");
});

// #1 + #2
app.get("/products", async (req, res) => {
  // #2
  const products = await Product.find();
  // #3
  res.render("products/index", { products });
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
```

---

#### **Show Route**

##### [Start](#) / [Create Routes](#create-routes)

<br>

Detail Product Route (Show route)

1. Get id from the url
2. Find the related item by id.
   > We could also do, `findOne({id: id})`
3. Pass the found product into detail page.

```javascript
app.get("/products/:id", async (req, res) => {
  // #1
  const { id } = req.params;
  // #2
  const product = await Product.findById(id);
  // #3
  res.render("products/show", { product });
});
```

---

#### **New Route**

##### [Start](#) / [Create Routes](#create-routes)

<br>

Creating Products - We need two routes for creating new product.

1. Route to the form page ("new.ejs" where we can create new products)
2. And the POST route to actually create the product from the form.
3. Add url and json parser to parse information coming thru Post request.

Note: The order matters, `"products/new"` won't work if `"products/:id"` comes before.

```javascript
// #3
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// #1
app.get("/products/new", (req, res) => {
  res.render("products/new");
});

// #2
app.post("/products", async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.redirect(`/products/${newProduct.id}`);
});

app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render("products/show", { product });
});
```

---

#### **Update Route**

##### [Start](#) / [Create Routes](#create-routes)

<br>

Create route to edit form, and route to update the products and in order to do this **we have to install method override** first.

```powershell
>npm i method-override
```

Then we require it and use it in our express app.

```javascript
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
```

Creating routes for editing and updating

1. Edit interface route
2. Update route to save edited data.
   > For validations, add `runValidators` as third argument and set `true`.

```javascript
app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render("products/show", { product });
});

// #1
app.get("/products/:id/edit", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render("products/edit", { product });
});

// #2
app.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
    runValidators: true,
  });
  res.redirect(`products/${updatedProduct.id}`, { product });
});
```

ejs form for updating

```html
<form action="/products/<%= product.id %>?_method=PUT" method="post">...</form>
```

---

#### **Tangent On Category Selector**

##### [Start](#) / [Create Routes](#create-routes)

<br>

We gonna create category array in our main app.js and loop it over `options` in `Selector` html to get dynamic option selector.

1. Create an array(categories) of the product categories
2. Pass in the categories in new and edit pages.

app.js

```javascript
const port = 3000;

const categories =  ['fruit', 'vegetable', 'dairy']
...

app.get("/products/new", (req, res) => {
  res.render("products/new", { categories });
});

...

app.get("/products/:id/edit", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render("products/edit", { product, categories });
});

app.listen(port, () => console.log(`App running on port ${port}`));
```

new.ejs

```html
<select name="category" id="category">
  <% for (let tag of categories) {%>
  <option value="<%= tag %>"><%= tag %></option>
  <% } %>
</select>
```

edit.ejs

```html
<select name="category" id="category">
  <% for (let tag of categories) {%>
    <option value="<%= tag %>" <%= product.category === tag? "selected" : "" %>><%= tag %></option>
  <%  }  %>
</select>
```

---

#### **Delete**

##### [Start](#) / [Create Routes](#create-routes)

<br>

Main app.js

```javascript
.
.
.
app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);
  res.redirect("/products");
});

app.listen(port, () => console.log(`App running on port ${port}`));
```

show.ejs

```html
. . .
<form action="/products/<%= product.id %>?_method=DELETE" method="post">
  <button type="submit">Destroy</button>
</form>
```

---

#### **Filter by Category**

##### [Start](#) / [Create Routes](#create-routes)

<br>

We have multiple approaches to this:

```
/products/fruit

/products?category=fruit (We gonna use query strings)
```

First in show page, we gonna make clickable category and set our query string
show.ejs

```html
<h1><%= product.name %></h1>
<h3>Price: <%= product.price %> auro</h3>
<!-- <p>Tags :  product.category </p> -->
<p>
  Tags :
  <a href="/products?category=<%= product.category %> "
    ><%= product.category %></a
  >
</p>
```

Then we gonna fix our index routes for all products to filter by category.

1. Destructure and get the category from query string
2. If there is a category inside the query string, find products that has the same category value
   > `Product.find({category:category})` same as `Product.find({category})`
3. And we pass the category value into index page ( for naming )
4. If there is no value in category, simply find all products
5. Pass in category with value 'All' ( for naming ).

   app.js

```javascript
app.get("/products", async (req, res) => {
  // #1
  const { category } = req.query;
  if (category) {
    // #2
    const products = await Product.find({ category });
    // #3
    res.render("products/index", { products, category });
  } else {
    // #4
    const products = await Product.find();
    // #5
    res.render("products/index", { products, category: "All" });
  }
});
```

In products/index.ejs

```html
...
<h1>Magical Ingridients & Cooking Supplies</h1>

<h3>Category: <%= category %></h3>
...
```

---

### Designing Mongoose Schema

##### [Start](#)

<br>

**Embedded**

- Small Subdocuments
- Data that does not change often
- Eventual consistency is acceptable
- Documents that grow slowly
- Data that will require more than one queries to fetch
- Fast reads

**References**

- Large Subdocuments
- Volatile data
- Immediate consistency is necessary
- Documents that grow fast
- Data often excluded from desired results
- Fast Writes

**Other things to keep in mind:**

A nested (embedded) doc can go up to 100 levels.

One document can be up to 16 MB.
