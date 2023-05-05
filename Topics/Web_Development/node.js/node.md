[Javascript](../Javascript/js.md) || [**NodeJS**](#) || [Modules and npm](modules.md) || [Express](./frameworks_and_libraries/Express/express.md) || [React](./frameworks_and_libraries/React/react.md)

1.  [Intro to Node](#intro-to-node)
2.  [File System Module (**fs**)](#file-system-module)

---

### Intro to Node

- [what is node](#what-is-node)
- [node REPL](#node-repl)
- [Process and argv](#process-and-argv)

#### **What is Node?**

<br>

**Node** is a **javascript runtime**. Until recently, we could only run javascript code in a web browser. Node make it possible so that we can **execute javascript code outside of the browser**.

> we can use the same javascript syntax we know and love to write server-side code.

---

#### Node **REPL**

<br>

REPL is bascially a javascript console in our browser, the one we've been using to test out new codes, debugging, and play around.

1. Just type `node` in terminal and you are in it.
2. To exit type `.exit` or double ctrl C or just ctrl D
3. DOM do not exist in node.js so we cannot do things that we could in browser console

   > Like using doucment object - document.body. ...

4. The global object is different too

   > In browser, we have our window object as a global object, in node it is called global(yep global object)

5. To run a node app, just type `node app.js`

```
$node
<!-- in repl -->
>1 + 1
2
>console.log("In REPL")
"In REPL"
>setTimeOut(()=>console.log("same ol' js"), 3000)
<!-- after 3 seconds -->
"same ol' js"
>.exit
$node app.js
```

#### Process and argv

##### [Start](#) / [Intro to Node](#intro-to-node)

<br>

The real deal here is that you can **pass in arguments through terminal** and use them with the process object [(**process.argv**)](#process-argv).

But first, lets go through some of the commands that you can use in REPL for the process object.

---

#### **Process** ("big ol' object with bunch of methods and properties")

The process is an object available in global scope (`global`), that includes information about, and control over, the current Node.js process. Some commands for process:

1. Check node version (`process.version`)
2. Detail node version release (`process.release`)
3. Check current working directory (`process.cwd()`)

```node
$node
<!-- #1 -->
>process.version
'v16.14.2'
<!-- #2 -->
>process.release
{
  name: 'node',
  lts: 'Gallium',
  sourceUrl: 'https://nodejs.org/download/release/v16.14.2/node-v16.14.2.tar.gz',
  headersUrl: 'https://nodejs.org/download/release/v16.14.2/node-v16.14.2-headers.tar.gz',
  libUrl: 'https://nodejs.org/download/release/v16.14.2/win-x64/node.lib'
}
<!-- #3 -->
>process.cwd()
'C:\\Users\\pyaes\\Desktop\\Notes\\My_notes'
```

---

#### **process-argv**

##### [Start](#) / [Intro to Node](#intro-to-node) / [Process and argv](#process-and-argv)

<br>

The `process.argv` **returns an array containing the command line argument passed** when the Node.js process was lauched.
app.js

```javascript
console.log(process.argv);
```

if we run this app.js, we get back two elements in an array

1. The execute path, where node is executing from (`process.execPath`)
2. Path to the js file that is being executed.(app.js)

```terminal
$node app.js
[
  'C:\\Program Files\\nodejs\\node.exe',
  'C:\\Users\\pyaes\\Desktop\\Notes\\My_notes\\Topics\\Web_Development\\node.js\\apps\\node_intro\\app.js'
]
```

Passing arguments through process.argv

1. Make an array and slice the first 2 elements of the argv, since we are going for the arguments after the first 2 values
2. Make some generic function

```javascript
// #1
const args = process.argv.slice(2);

// #2
const greet = (args) => {
  for (arg of args) {
    console.log(`Hello ${arg}`);
  }
};

greet(args);
```

run the app with node and pass in the arguments.

```terminal
$ node app.js Geralt Arthur Deek Price
Hello Geralt
Hello Arthur
Hello Deek
Hello Price
```

---

### File System Module

##### [Start](#)

<br>

Node has a file system module that we can use to create/remove/manage files.

First off, we can make a small [**node script**]() that can create set of files that we normally need in a new folder :

    app.js, app.css, index.html

There is two ways to make these files and folder:

1.  Synchronous way
    > Block the entire process until they complete. Halting all conenctions.
    > But if we want the files/folder to created first before we do something else we have to use synchronous.
2.  Asynchornous way
    > In busy process, use asynchronous version.

#### Asynchronous Version (Folder)

<br>

boilerplate.**mjs** ( We have to create .mjs to run the module, not .js )

1.  mkdir("dog", callback function)

```javascript
import { mkdir } from "fs";

// #1
// Creates /tmp/a/apple, regardless of whether `/tmp` and /tmp/a exist.
mkdir("dog", { recursive: true }, (err) => {
  console.log("I'm in callback");
  if (err) throw err;
});

console.log("I am after mkdir but I come first since it is aysnc");
```

Terminal

1. We run the boilerplate.mjs
2. Now the folder dog is created in the same directory

```terminal
<!-- #1 -->
$node boilerplate.mjs
I am after mkdir but I come first since it is aysnc
I'm in callback

<!-- #2 -->
$ls
boilerplate.mjs  dog/
```

#### Synchronous Version (Folder)

1.  We dont need the callback like async version, we just need to pass in the folder we want to create.

boilerplate.mjs

```javascript
import { mkdir } from "fs";
// #1
mkdirSync("Cats");
console.log("Cats folder is created");
```

Terminal

```
$node boilerplate.mjs
Cats folder is created
$ls
Cats/ boilerplate.mjs dog/
```

---

#### Create set of files in folder

##### [Start](#) / [File System Module](#file-system-module)

boilerplate.mjs

1. Make folderName variable through [process.argv](#process-argv) set the third element of the array as the name

2. Create folder
3. Create files
   > We need to pass in the data argument after the file name( !! It is requirement), so we put empty string to pass in "".
4. Try and catch, since we are not using callback like async

```javascript
import { fstat, mkdir, mkdirSync, writeFileSync } from "fs";
import { writeFile } from "fs";
import { Buffer } from "buffer";

const folderName = process.argv[2] || "Project";

try {
  mkdirSync(folderName);
  writeFileSync(`${folderName}/app.js`, "");
  writeFileSync(`${folderName}/app.css`, "");
  writeFileSync(`${folderName}/index.html`, "");
} catch (e) {
  console.log(e);
}
```

terminal

```
$node boilerplate.mjs portfolio
$ls
boilerplate.mjs /portfolio
$ls portfolio
app.js app.css index.html
```

---
