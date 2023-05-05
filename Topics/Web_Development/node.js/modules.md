[Javascript](../Javascript/js.md) || [NodeJS](#) || [**Modules and npm**](modules.md) || [Express](./frameworks_and_libraries/Express/express.md) || [React](./frameworks_and_libraries/React/react.md)

1. [Working with module.export](#working-with-moduleexport)
2. [Introducing to NPM](#introducing-npm)
3. [In case of version control on npm packages go watch wdbc:32:331](https://www.udemy.com/course/the-web-developer-bootcamp/learn/lecture/22053088#questions)
4. [Node Apps](#node-apps)
5. [Errors](#errors)

---

### Working with module.export

##### [Start](#)

<br>

1. [Export a single file](#exporting-a-file)
2. [Export entire directory](#exporting-a-directory)

---

### Exporting a file

<br>

We can require codes from other files, just like we can require code from built-in modules like [file system module ("fs")](node.md/#file-system-module)

We create a file - math.js

- module.exports is an object. Even if we don't include module.exports in our code, if another file calls math.js, by default module.export will be an empty object

math.js

```javascript
const add = (x, y) => x + y;
const PI = 3.14159;
const square = (x) => x * x;
```

We gonna use the math.js in our app.js file

1. Requiring the math.js file to our code

   > When we are referencing a file rather than a module like (fs), we need to make it clear that we are referencing something in the directory. So we have to write ("./math") instead of ("math")

2. When we look at math, we get empty object "`{}`", since we didn't export anything but default from math.js

app.js

```javascript
// #1
const math = require("./math");
// #2
console.log(math);
```

In order to work for this we have to export our functions in math.js

math.js

1. Exporting functions

   > Since module.exports is an object, we are giving properties to that object `module.exports{add:f, PI: 3.14159, square:f}`

2. We can explicitly set the module.exports to return other than object
   > In this case, module.exports will just return String "Hello"
3. Or you can simply do this.
4. Or this.

```javascript
const add = (x, y) => x + y;
const PI = 3.14159;
const square = (x) => x * x;

// #1
module.exports.add = add;
module.exports.PI = PI;
module.exports.square = square;
// #2
// module.exports = "Hello";

//#3
// const math = {
//   add: add,
//   PI: PI,
//   square: square,
// };
// module.exports = math;

// ======================

// #4
// module.exports = {
//   add,
//   PI,
//   square
// };
```

app.js

- Now we get our object back

       { add: [Function: add], PI: 3.14159, square: [Function: square] }
       4

```javascript
const math = require("./math");
// 1
console.log(math);
console.log(math.add(2, 2));
```

- We can Structure like this too

```javascript
const { PI, square } = require("./math");
console.log(PI);
console.log(squae(3));
```

---

### Exporting a directory

##### [Start](#) / [Working with the module.exports](#working-with-moduleexport)

<br>

We have five files in survivor directory including index.js, but when we export the entire directory Node will be looking at the index.js

rest of the files (IN SURVIVOR DIRECTORY)

- I'm gonna put only one file here for the sake of clarity, you can look it up in My_notes\Topics\Web_Development\node.js\apps\modules\survivors

rick.js

```javascript
module.export = {
  name: "Rick",
  speciality: "Shooter",
  gender: "male",
};
```

When exporting the directory, node will be looking for index.js in the target directory. So we have to create **index.js** in the directory that we want to export.

> index.js - sort of like main file or entry point for node in most cases

index.js (IN SURVIVOR DIRECTORY)

1. We require each person(file)
2. Make a single array out of them

```javascript
const rick = require("./rick");
const daryl = require("./daryl");
const carol = require("./carol");
const megan = require("./megan");

const survivors = [rick, daryl, carol, megan];

module.exports = survivors;
```

This is where our main file app.js is and we gonna require entire directory into this file.

app.js

1.  just like that we required the whole directory

2.  `[ { name: 'Rick', speciality: 'Shooter', gender: 'male' }, { name: 'Daryl', speciality: 'Range', gender: 'male' }, { name: 'Carol', speciality: 'Scout', gender: 'female' }, { name: 'Megan', speciality: 'Range', gender: 'female' } ]`

```javascript
// #1
const survivors = require("./survivors");
// #2
console.log(survivors);
```

---

### Introducing NPM

##### [Start](#)

<br>

NPM is really two things:

- **A Library** of thounsands of packages published by other developers that we can use for free.
- **A command line tool** to easily install and manage those packages in our Node projects

---

Why dont we try out some of the packages on npm:

- We will make an app that gives us jokes in colored text.
- We can use these two packages for our app
  1.  [give-me-a-joke](https://www.npmjs.com/package/give-me-a-joke) for jokes
  2.  [colors](https://www.npmjs.com/package/colors) for text colors
  3.  [More about packages.json and metadata of our app](#pacakgejson-and-metada)

#### Jokes with colored text app

<br>

Reading the document is the key here. SO, Read the damn docs.

1.  First off we will install both packages in our app directory with npm
2.  Require the packages in our app
3.  Get our joke from give-me-a-joke
    > Seems like give-me-a-joke is based on the callback method as per document
4.  apply colors to the joke

terminal

```terminal
<!-- #1 -->
$npm i give-me-a-joke
$npm i colors
```

app.js

```javascript
// #2
const joke = require("give-me-a-joke");
const colors = require("colors");

// #3
joke.getRandomCNJoke(function (joke) {
  // #4
  console.log(joke.rainbow);
});
```

Thats it

---

### pacakge.json and metada

##### [Start](#) / [Introducing Npm](#introducing-npm)

<br>

package.json contain the metadata of our node applications. To make a node application with package.json just type `npm init` first thing in our app folder.

```terminal
$npm init
```

Then fill out app-name, versions, descriptions, licene, ...,etc. And we get our own package.json

All the packages that we installed will be stored under the dependencies tab in packages.json. Remember this is just metadata, so we can still execute our code without it but this is necessary when we start sharing the code with other people or deploy it on a new machine. With pacakge.json everything the app need will be downloaded in one shot.

---

### **Installing all dependencies at once**

So this is one our code on another computer without the node_modules folder but we have package.json in root of our app.

Then we can easily install all the dependencies needed with `npm install`. This will install all the packages that is listed in dependencies in package.json file, and create node_module folder for the app to use.

```terminal
$npm install
```

<`--save`> or <`-S`> is no longer required in latest version of npm. The packages will be automatically save on the packages.json.

Use <`--no-save`> to not save on packages.json

---

### **Whats the difference between framework and library**

##### [Start](#)

<br>

#### **Library**

When u use the library, you are in charge. You control the flow of the application code, and you decide when to use the library. Node modules are library.
Some libraries that we use:

- [Axios](../Javascript/ajax.md/#axios)
- [Bootstrap]()

#### **Framework**

With frameworks, that control is reverted. The framework is in chrage, and you are a merely participant! The framework tells you where to plugin the code.

Some framework that we use:

- [Express](./frameworks_and_libraries/Express/express.md)
- [React](./frameworks_and_libraries/React/react.md)

---

### **Node Apps**

##### [Start](#)

Language-gusser app with franc, langs and colors packages - [link](./apps/npm/language_gusser/)

---

### **Errors**

##### [Start](#)

If u run into error :

> SyntaxError: Cannot use import statement outside a module

Insert "type": "module" into package.json file.

```json
{
  "name": "language_gusser",
  "version": "1.0.0",
  "description": "Guess the lanugage of the text",
  "main": "app.js",
  //   #
  "type": "module",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "psThant",
  "license": "ISC",
  "dependencies": {
    "franc": "^6.0.0"
  }
}
```
