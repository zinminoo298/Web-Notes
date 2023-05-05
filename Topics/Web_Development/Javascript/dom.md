[NodeJS](../node.js/node.md) || [Javascript Basics](./js.md) || [**DOM**](./dom.md) || [Async](./async.md) || [AJAX](ajax.md) || [Prototypes, Classes & OOP](prototype_classes_oop.md)

# Document Object Model

1. [What is DOM?](#what-is-dom)
2. [Selecting Elements](#selecting-elements)
3. [DOM Manipulation, Manipulating the Selected Elements](#dom-manipulation)
4. [DOM Events](#dom-events)

---

## **What is DOM?**

The DOM is a javascript representation of a webpage. It is a **gateway** into the contents of a webpage.

The webpage(HTML + CSS) is constructed with a bunch of JS Objects and, you can interact with those objects via js.

```html
<body>
  <h1 class="header">Hello</h1>
  <ul>
    <li>...</li>
    <li>...</li>
  </ul>
</body>
```

These html and css are turned into JS objects once the webpage is loaded and, we can manipulate them via js. The top level object is called **[document object](#document-object)**.

---

### **Document Object**

##### [Start](#)

<br>

The document object is our entry point into the world of dom. It contains representations of all the contents of a webpage, plus tons of useful methods and properties.

```javascript
console.dir(document);
// #document: object

document > all: HTMLAllCollections(130) > [0-99] > 0: html, 1:head, 2:meta, ..., 6:body, 7:h1, 8:ul ...etc
```

---

## **Selecting Elements**

##### [Start](#)

<br>

Common selecting methods in document:

- document.[getElementById](#select-element-by-id)
- document.[getElementsByTagName](#select-elements-by-tag)
- document.[getElementsByClassName](#select-elements-by-class)

Better/newer way of selecting elements - [querySelector and querySelectorAll](#queryselector-and-queryselectorall)

---

### **Select Element by ID**

##### [Start](#) \ [Selecting Elements](#selecting-elements)

<br>

Syntax:

```javascript
const element = document.getElementById("id");

// return null if id does not exist
```

### **Select Element\*s by Tag**

##### [Start](#) \ [Selecting Elements](#selecting-elements)

<br>

Syntax:

```javascript
const allImages = document.getElementsByTagName("img");

allImages; // HTMLCollection [], not an array but it is iterable

for (let img of allImages) {
  console.log(img.src);
  // or
  img.src = "url";
}

const allPara = document.getElementsByTagName("p");
```

### **Select Element\*s by Class**

##### [Start](#) \ [Selecting Elements](#selecting-elements)

<br>

Syntax:

```javascript
const class = document.getElementsByClassName("class");

// return empty HTMLCollection [], if class does not exist
```

---

### **querySelector and querySelectorAll**

##### [Start](#) \ [Selecting Elements](#selecting-elements)

<br>

**querySelector** - a newer, **all-in-one** method to select a **single element**.

```javascript
// Select first h1 element:
document.querySelector("h1");

// Select second img element:
documnet.querySelector("img:nth-of-type(2)");

// Select element with attribute:
document.querySelector("a[title="home"]");
  // <a href="/" title="home">Home</a>


// Select first element with ID of red:
document.querySelector("#red");

// Select first element with class of big:
document.querySelector(".big");
```

##### [Start](#) \ [Selecting Elements](#selecting-elements)

<br>

**querySelectorAll** - same as querySelector, but returns a **collection** of matching elements

```javascript
// Consider webpage has 24 anchor tag and 17 of them is inside a paragraph

// Select all anchor tag:
document.querySelectorAll("a");
// NodeList(24) [a, a, a, a, ..., a]

// Select all anchor tag INSIDE paragraph
document.querySelectorAll("p a");
// NodeList(17) [a, a, a, a, ..., a]
```

Also, we can iterate those anchor tag:

```javascript
const links = document.querySelecotrAll("a");
for (let link of links) {
  console.log(link.href); // log all the links
}
```

---

## **DOM Manipulation**

##### [Start](#)

The most commonly used and **important** **properties and methods** for the DOM manipulation.

[**Text** and **HTML** manipulation :](#texts-and-html-manipulation)

- [**innerText**](#innertext)
- [**textContent**](#textcontent)
- [**innerHTML**](#innertext)

[**Attributes**(type, href, name, title, ...etc) manipulation :](#attributes-manipulation)

- [**getAttribute**()](#accessing-attributes)
- [**setAttribute**()](#accessing-attributes)

[For **CSS** and **style** manipulation :](#css-and-style-manipulation)

- [**style**](#style) - HTML inline styling
- [**classList**](#classlist) - best way to manipulate classes, and commonly used in events/animations.

[Traversing relative elements (parent/child/siblings) :](#traversing-relative-elements)

- [**parentElement**](#parent)
- [**children**](#child)
- [**nextSibling**](#sibling)
- [**previousSibling**](#sibling)

[Create new elements from js :](#create-new-elements-from-js) (from scratch)

- [**createElement()**](#createelement)
- [**appendChild()**](#appendchild)
- [**append()**](#append)
- [**prepend()**](#prepend)
- [**insertAdjacentElement()**](#insertadjacentelement)
- [**Node.removeChild()**]()
- [**ChildNode.remove()**]()
- [**value**]()
- [**100 Buttons Example**](#100-buttons-example)

[**Pokemon Sprites Demo**](#pokemon-sprites-demo)

---

### **Texts and HTML Manipulation**

##### [Start](#) \ [Dom Manipulation](#dom-manipulation)

<br>

We can manipulate the texts and html with this three methods.

- [innerText](#innertext)
- [textContent](#textcontent) (best way to add text)
- [innerHTML](#innerhtml)

Whats the different between the three?

Example HTML:

```html
<h1>Test</h1>
<p>
  <b style="dislpay:none;">Lorem ipsum</b> dolor sit amet, consectetur
  adipiscing elit.
</p>
```

---

#### **_innerText_**

##### [Start](#) \ [Dom Manipulation](#dom-manipulation) \ [Texts and HTML Manipulation](#texts-and-html-manipulation)

<br>

shows only 'human-readable' elements. innerText is aware of sytling and won't return the text of 'hidden' elements.

```javascript
document.querySelector("p").innerText;

// dolor sit amet, consectetur adipiscing elit.

document.querySelector("p").innerText = "Gibberish";

// Gibbersh
```

> ** Trigger a **reflow** to ensure up-to-date computed styles. (Reflows can be **computationally expensive\*\*, and thus should be avoided when possible)

---

#### **_textContent_**

##### [Start](#) \ [Dom Manipulation](#dom-manipulation) \ [Texts and HTML Manipulation](#texts-and-html-manipulation)

<br>

gets the content of all elements, including script and style.

```javascript
document.querySelector("p").textContet;
// Lorem ipsum dolor sit amet, consectetur adipiscing elit.
```

> textContent doesn't have security issues like innerHTML as it doesn't parse HTML like innerText. Besides, it is also light due to which performance increase.

---

#### **_innerHTML_**

##### [Start](#) \ [Dom Manipulation](#dom-manipulation) \ [Texts and HTML Manipulation](#texts-and-html-manipulation)

<br>

returns HTML as its name indicates. Sometimes, people use **innerHTML** to retrive or write text inside an element, but **textContent** has better performance because its value is not parsed as HTMl.

```javascript
document.querySelector("p").innerHTML;

// <b style="dislpay:none;">Lorem ipsum</b> dolor sit amet, consectetur adipiscing elit.

document.querySelector("h1").innerHTML += " <b>BOLD</b>";
```

Result: Test **BOLD**

> \*\* The **disadvantage** of this method(**innerHTML**), it has **cross site security attacks**. So for adding text, its better to avoid this for security reasons.

---

### **Attributes Manipulation**

##### [Start](#) \ [Dom Manipulation](#dom-manipulation)

<br>

Example HTML:

```html
<a id="main" href="https://www.example.com" title="Example"> example link </a>
```

Acessing the **attributes** in the old way,

```javascript
document.querySelector("#main").id; // main
document.querySelector("#main").id = "egLink";
document.querySelector("a").id; // egLink
document.querySelector("#egLink").id; // egLink

document.querySelector("a").title; // Example
document.querySelector("a").href; // files://https://www.example.com
```

Another way of doing this is with **getAttribute()**

```javascript
const egLink = document.querySelector("#main");

// The difference between normal and getAttribute()

egLink.getAttribute("href");
// https://www.example.com > returns link only

egLink.href;
// files://https://www.example.com > reutrn js file system
```

**setAttribute()**

```javascript
egLink.setAttribute("href", "http://www.google.com");

eglink.getAttribute("href");
// http://www.google.com
```

---

### **CSS and Style Manipulation**

##### [Start](#) \ [Dom Manipulation](#dom-manipulation)

<br>

You can manipulate the design(style) of an element with the use of [**style object**](#style) and [**classList**](#classlist).

---

#### **Style**

The problem with style object is that it **does not contains** the properties from the **stylesheet(css)**. Only inline-styles declared directly within the HTML went into the properties.

> TLDR: Inline-styles goes into the **style object** properties but not from stylesheet.

- [using window method to get all the properties of style of an element](#getcomputedstyle)
- [pratical use for style](#pratical-use-for-style)
- [rainbow letter](#rainbow-letter)

Example:

```html
<h1 class="blue">DOM Manipualtion</h1>
```

```css
.blue {
  color: blue;
}
```

When selecting h1, even tho we make our h1 "blue", we don't get color 'blue' and instead we got an empty string "".

```javascript
const h1 = documnet.querySelector("h1");

h1.style.color; // ""
```

---

Then we hardcode style in our HTML:

```HTML
<h1 class="blue" style="color: red;"> DOM Manipulation
```

And we got "red" in our style object, not an empty string or "blue".

```javascript
const h1 = documnet.querySelector("h1");

h1.style.color; // "red"

// the other properties are still empty strings
h1.style.fontFamily; // ""
h1.style.margin; // ""
```

#### **getComputedStyle**

##### [Start](#) \ [Dom Manipulation](#dom-manipulation) \ [CSS and Style Manipulation](#css-and-style-manipulation) \ [Style](#style)

<br>

We can use special method on **window** object to get the style properties out of elements.

> It returns CSSStyleDeclaration, which contains all the style properties of the targeted element.

```javascript
const h1 = document.querySelector("h1");

h1.style.fontSize; // ""

window.getComputedStyle(h1).fontSize; // "34px"
window.getComputedStyle(h1).fontFamily; // "times"
window.getComputedStyle(h1).marginLeft; // "0px"
```

---

#### **Pratical use for style**

##### [Start](#) \ [Dom Manipulation](#dom-manipulation) \ [CSS and Style Manipulation](#css-and-style-manipulation) \ [Style](#style)

<br>

We can use Style to change the value of properties.

```javascript
const h1 = document.querySelector("h1");
h1.style.color = "blue";
h1.style.fontSize = "60px";
h1.style.border = "2px solid black";
```

But you got a bunch of **inline-style** in your HTML, which is not ideal and should be avoided.

```html
<h1 style="color: blue; font-size: 60px; border: 2px solid black;">
  DOM Manipualtion
</h1>
```

If you have a **lot of styles** you want to apply through javascript, there is a **better way to make changes**, which is to use a **[class](#classlist)**.

---

#### Rainbow Letter

##### [Start](#) \ [Dom Manipulation](#dom-manipulation) \ [CSS and Style Manipulation](#css-and-style-manipulation) \ [Style](#style)

<br>

Write some javascript to make **h1** rainbow-colored!!

HTML:

```html
<!DOCTYPE html>

<head>
    <title>Rainbow</title>
    <!--LEAVE THESE LINES ALONE, PLEASE! THEY MAKE THE LIVE PREVIEW WORK!-->
    <script src="node_modules/babel-polyfill/dist/polyfill.js" type="text/javascript"> </script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

</head>

<body>
    <!--DON'T TOUCH THIS FILE PLEASE!-->
    <h1>
        <span>R</span>
        <span>A</span>
        <span>I</span>
        <span>N</span>
        <span>B</span>
        <span>O</span>
        <span>W</span>
    </h1>
</body>

</html>
```

Javascript:

```javascript
const h1 = document.querySelectorAll("h1 span");

const colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];

for (let i = 0; i < h1.length; i++) {
  h1[i].style.color = colors[i];
}

// let i = 0;
// for (let letter of h1) {
//   letter.style.color = colors[i];
//   i++;
// }
```

---

### ClassList

##### [Start](#) \ [Dom Manipulation](#dom-manipulation) \ [CSS and Style Manipulation](#css-and-style-manipulation)

<br>

(**Optioanl**) You can also [add class or classes with attribute methods](#adding-class-with-attribute)

**ClassList** has several methods that you can use,

- classList.add
- classList.remove
- classList.replace
- classList.toggle (best one)
- ...

html :

```html
<h1 class="hide">Add some class here, and remove hide class</h1>
```

css :

```css
.red {
  color: red;
}
.border {
  border: 2px solid green;
}
.hide {
  display: none;
}
```

javascript:

```javascript
const h1 = document.querySelector("h1");
h1.classList.add("red", "border");

// remove hide class
if (h1.classList.contains("hide")) {
  h1.classList.remove("hide");
}
// change text
h1.textContent = "Final Result";
```

Result:

```html
<h1 class="red border">Final Result</h1>
```

---

#### Adding class with attribute

##### [Start](#) \ [Dom Manipulation](#dom-manipulation) \ [CSS and Style Manipulation](#css-and-style-manipulation) \ [ClassList](#classlist)

<br>

We can also add single or multiple classes with setAttribute() method but its a tedious job.

```javascript
const h1 = document.querySelector("h1");
h1.setAttribute("class", "red");
h1.setAttribute("class", "border");
```

But only one class at a time can be assigned with setAttribute().

```html
<!-- first setAttribute -->
<h1 class="red">Add some class here</h1>

<!-- second time -->
<h1 class="border">Add some class here</h1>
```

To add multiple classes with setAttribute(), we need to use getAttribute()

```javascript
let currentClass = h1.getAttribute("class");
h1.setAttribute("class", `${currentClass} red`);
```

```html
<!-- finally -->
<h1 class="border red">Add some class here</h1>
```

---

### **Traversing Relative Elements**

##### [Start](#) \ [Dom Manipulation](#dom-manipulation)

<br>

Every element has **only one** parent, but can have multiple children.

- [Parent](#parent)
- [Child](#child)
- [Sibling](#sibling)

HTML

```html
<div>
  <h2>Relatives</h2>
  <p>
    <b>Lorem ipsum</b> dolar sit amat. <i>Lorem Ipsum</i> is simply dummy text
    of the printing and typesetting industry.
    <a href="https://www.lipsum.com/" title="lipsum"
      >visit Lipsum for more lorem ipsum</a
    >
  </p>
</div>
```

---

#### **Parent**

##### [Start](#) \ [Dom Manipulation](#dom-manipulation) \ [Relatives](#traversing-relative-elements)

<br>

```javascript
const firstBold = document.querySelector("b");

firstBold;
// <b>Lorem ipsum</b>

firstBold.parentElement;
// <p>...<p>

firstBold.parentElement.parentElement;
// <body>...<body>

firstBold.parentElement.parentElement.parentElement;
// <html lang="en">...</html>
```

---

#### **Child**

##### [Start](#) \ [Dom Manipulation](#dom-manipulation) \ [Relatives](#traversing-relative-elements)

<br>

```javascript
const paragraph = firstBold.parentElement;

paragraph.children; // HTMLColecttion(3) [b, i, a]

paragraph.children[0]; // <b>Lorem ipsum</b>
```

---

#### **Sibling**

##### [Start](#) \ [Dom Manipulation](#dom-manipulation) \ [Relatives](#traversing-relative-elements)

<br>

Example Html

```html
<body>
  <p>...</p>
  <img class="first" src="..." alt="a" />
  <img class="second" src="..." alt="b" />
  <img class="third" src="..." alt="c" />
</body>
```

Sibling has four methods:

- previousElementSibling (**element**)
- nextElementSibling (**element**)
- previousSibling (**node**)
- nextSibling (**node**)

---

**element**: has pratical use

```javascript
const firstImg = document.querySelector(".first");

firstImg.previousElementSibling;
// <p>...</p>

firstImg.nextElementSibling;
// <img class="second" src="..." alt="b" />
```

**note**: It sort of represent text and has no value (not really useful)

```javascript
const firstImg = document.querySelector(".first");

firstImg.previousSibling;
// #text

firstImg.nextSibling;
// #text
```

> These text nodes has no data in them, and mostly whitespace or new line created by some browsers

---

### **Create new elements from js**

##### [Start](#) \ [Dom Manipulation](#dom-manipulation)

<br>

- To create a new HTML element use [createElement()](#createelement) method.
- Then append the created element to display it on the page.

List of appends:

- [Node.appendChild()](#appendchild) - accepts only one node, last child
- [**Element.append()**](#append) - multiple nodes and DOMStrings, last child
- [**Element.prepend()**](#prepend) - multiple nodes and DOMStrings, first child
- [**Element.insertAdjacentElement()**](#insertadjacentelement) - insert nodes as adjacent element to the target element.

[100 buttons example](#100-buttons-example)

Removing elements:

- [Node.removeChild()](#removechild) - remove a child node from DOM, returns removed childNode.
- [**Element.remove()**](#remove) - removes the element from the tree(parentNode) it belongs to. **(less complicated compare to removeChild())**

#### **createElement**

##### [Start](#) \ [Dom Manipulation](#dom-manipulation) \ [Create new elements from js](#create-new-elements-from-js)

<br>

You can create an element from scratch with this.

```javascript
document.createElement("img");
//<img>
```

But this only gives you an empty element with no soruce or alt, ...etc.  
Giving attributes to this new element can simply be done like this, and for the image to appear on the page we need to [append](#appendchild) it.

```javascript
const newImg = document.createElement("img");
newImg.src = "...";
newImg.alt = "d";
```

#### **appendChild**

##### [Start](#) \ [Dom Manipulation](#dom-manipulation) \ [Create new elements from js](#create-new-elements-from-js)

<br>

Now we have the img with a src, but the image is not on the page yet. We have to append it to the page as a child element.

Select something to append the image to.

```javascript
document.body.appendChild(newImg);

//then we can add some classes to it
newImg.classList.add("fourth", "responsive", "square");
```

> **appendChild** accepts **only one node**. Returns appended node.

Result:

```HTML
<body>
  <p>...</p>
  <img class="first" src="..." alt="a" />
  <img class="second" src="..." alt="b" />
  <img class="third" src="..." alt="c" />
  <img class="fourth responsive square">
</body>
```

some [appendChild](#appendchild) example;

```javascript
const newH3 = document.createElement("h3");
newH3.textContent = "I'm new h3!";
document.body.appendChild(newH3);
```

---

#### **append**

##### [Start](#) \ [Dom Manipulation](#dom-manipulation) \ [Create new elements from js](#create-new-elements-from-js)

## <br>

Append is more flexible then appendChild. You can also append multiple elements.

Appending an element will make that element the last child of the parent.

```HTML
<body>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  </p>
</body>
```

```javascript
const p = document.querySelector("p");
p.append("This is a new Text.", " Hello World");

const div = document.createElement("div");
const secondP = document.createElement("p");
secondP.append("This is a new paragraph in a div.");
div.append(secondP);
```

> **append** accepts a **set of nodes** and **domStrings**. Does not return anything.

Result:

```HTML
<body>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. This is a new Text. Hello World
  </p>
  <div>
    <p>This is a new paragraph in a div.</p>
  </div>
</body>
```

> You can't do this with appendChild

```javascript
p.appendChild("This is a new Text.");

// this will gives u a typeError!
// 'appendChild' on 'Node': parameter 1 is not of type 'Node'
```

---

#### **prepend**

##### [Start](#) \ [Dom Manipulation](#dom-manipulation) \ [Create new elements from js](#create-new-elements-from-js)

<br>

Append the element before the first child of a parent.

```HTML
<body>
  <p>Lorem ipsum <b>dolor</b> sit amet, consectetur adipiscing elit.
  </p>
</body>
```

```javascript
const newBold = document.createElement("b");
// append HELLO into newBold or use textContent
newBold.append("HELLO!");
// newBold.textContent = "HELLO!";

// then append it to paragraph
p.prepend(newBold);
```

Result:

```HTML
<body>
  <p><b>HELLO<b>Lorem ipsum <b>dolor</b> sit amet, consectetur adipiscing elit.
  </p>
</body>
```

---

#### **insertAdjacentElement**

##### [Start](#) \ [Dom Manipulation](#dom-manipulation) \ [Create new elements from js](#create-new-elements-from-js)

<br>

Inserts a given element node at a given postion relative to the element it is invoked upon.

Syntax:

```javascript
targetElement.insertAdjacentElement(position, element);
```

### Parameters

Position:

- 'beforebegin' - before the **targetElement** itself.
- 'afterbegin' - just inside the **targetElement**, before its first child.
- 'beforeend' - just inside the **targetElement**, after its last child.
- 'afterend' - after the **targetElement** itself.

element: The element to be inserted into the tree.

---

Example HTML - **insertAdjacentElement()**

```HTML
<body>
  <h1>Main Title</h1>
  <h3>I'm H3!!</h3>
</body>
```

```javascript
// First select the targetElement
const h1 = document.querySelector("h1");

// Create the element to insert
const h2 = document.createElement("h2");
// Use either append or textContent or innerText
h2.append("I'm adjacent H2!");

// insert the created element using insertAdjacentElement()
h1.insertAdjacentElement("afterend", h2);
```

Result:

```HTML
<body>
  <h1>Main Title</h1>
  <h2>I'm adjacent H2!</h2>
  <h3>I'm H3!!</h3>
</body>
```

---

#### 100 Buttons Example

##### [Start](#) \ [Dom Manipulation](#dom-manipulation) \ [Create new elements from js](#create-new-elements-from-js)

<br>

Use js to create exactly new 100 button elements. Add each new button inside the container element provided in index.html. Use appendChild for this exercise. (It'll be easier with append but some browsers doesn't fully support append)

- Create exactly 100 new button elements.
- Each button must have some text inside it.
- Each button must be appended inside the container div.

index.html

```HTML
<!DOCTYPE html>

<head>
    <title>100 Buttons!</title>
</head>

<body>
    <!--DO NOT TOUCH THIS FILE PLEASE!-->
    <h1>Look At All My Buttons!</h1>
    <div id="container">
       <!-- 100 BUTTONS HERE -->
    </div>
</body>

</html>
```

app.js

```javascript
const container = document.querySelector("#container");

for (let i = 0; i < 100; i++) {
  let newButton = document.createELement("button");
  newButton.textContent = "Button";
  container.appendChild(newButton);
}
```

---

#### **removeChild**

##### [Start](#) \ [Dom Manipulation](#dom-manipulation) \ [Create new elements from js](#create-new-elements-from-js)

<br>

Removes a child node from the DOM and **return** the removed child.

syntax:

```javascript
node.removeChild(child);

// Can save it to a varaible since the method returns the removed child

const removedChild = node.removeChild(child);
```

Example HTML

```HTML
<body>
  <ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
  </ul>
</body>
```

1. To remove a child when knowing its parent node:

```javascript
const li = document.querySelector("li");
const ul = li.parentElement; // can use either parentNode or parentElement

ul.removeChild(firstLi);

// one line
li.parentElement.removeChild(li);
```

2. To remove a child without knowing its parent node:

```javascript
const li = document.querySelector("li");
if (li.parentNode) {
  li.parentNode.removeChild(li);
}
```

Result for 1 and 2:

```HTML
<body>
  <ul>
    <li>2</li>
    <li>3</li>
  </ul>
</body>
```

3. Remove all children from an element:

```javascript
let ul = document.querySelector("ul");

while (ul.firstChild) {
  ul.removeChild(ul.firstChild);
}
```

---

#### **remove**

##### [Start](#) \ [Dom Manipulation](#dom-manipulation) \ [Create new elements from js](#create-new-elements-from-js)

<br>

Removes the element from the DOM, parentNode or tree it belongs to.

Example HTML :

```HTML
<div>
  <h2>Some Content</h2>
  <img id="cover "class="responsive square" src="..." alt="...">
  <p>...</p>
<div>
```

To remove img element:

```javascript
const img = document.querySelector("#cover");
img.remove();
```

Result:

```HTML
<div>
  <h2>Some Content</h2>
  <p>...</p>
<div>
```

---

### **Pokemon Sprites Demo**

##### [Start](#) \ [Dom Manipulation](#dom-manipulation) \ [Create new elements from js](#create-new-elements-from-js)

<br>

HTML

```HTML
<!doctype html>
<html lang="en">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">

    <link rel="stylesheet" href="app.css">

    <title>Pokemon Sprites</title>
</head>

<body>
    <header>
        <div class="container p-5">
            <h1 class="text-center">Pokmeon Sprites</h1>
        </div>

    </header>
    <main class="container p-2">
        <header>
            <ul class="nav nav-pills nav-fill mb-3" id="pills-tab" role="tablist">
                <li class="nav-item" role="presentation">
                    <button class="nav-link active" id="firstGen-tab" data-bs-toggle="pill" data-bs-target="#firstGen"
                        type="button" role="tab" aria-controls="firstGen" aria-selected="true">First Generation</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="secondGen-tab" data-bs-toggle="pill" data-bs-target="#secondGen"
                        type="button" role="tab" aria-controls="secondGen" aria-selected="false">Second
                        Generation</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="thirdGen-tab" data-bs-toggle="pill" data-bs-target="#thirdGen"
                        type="button" role="tab" aria-controls="thirdGen" aria-selected="false">Third
                        Generation</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="fourthGen-tab" data-bs-toggle="pill" data-bs-target="#fourthGen"
                        type="button" role="tab" aria-controls="fourthGen" aria-selected="false">Fourth
                        Generation</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="fifthGen-tab" data-bs-toggle="pill" data-bs-target="#fifthGen"
                        type="button" role="tab" aria-controls="fifthGen" aria-selected="false">Fifth
                        Generation</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="sixthGen-tab" data-bs-toggle="pill" data-bs-target="#sixthGen"
                        type="button" role="tab" aria-controls="sixthGen" aria-selected="false">Sixth
                        Generation</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="seventhGen-tab" data-bs-toggle="pill" data-bs-target="#seventhGen"
                        type="button" role="tab" aria-controls="seventhGen" aria-selected="false">Seventh
                        Generation</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="eighthGen-tab" data-bs-toggle="pill" data-bs-target="#eighthGen"
                        type="button" role="tab" aria-controls="eighthGen" aria-selected="false">Eighth
                        Generation</button>
                </li>
            </ul>
        </header>
        <div class="tab-content" id="pills-tabContent">
            <div class="tab-pane fade show active" id="firstGen" role="tabpanel" aria-labelledby="firstGen-tab">
            </div>
            <div class="tab-pane fade" id="secondGen" role="tabpanel" aria-labelledby="secondGen-tab">
            </div>
            <div class="tab-pane fade" id="thirdGen" role="tabpanel" aria-labelledby="thirdGen-tab">
            </div>
            <div class="tab-pane fade" id="fourthGen" role="tabpanel" aria-labelledby="fourthGen-tab">
            </div>
            <div class="tab-pane fade" id="fifthGen" role="tabpanel" aria-labelledby="fifthGen-tab">
            </div>
            <div class="tab-pane fade" id="sixthGen" role="tabpanel" aria-labelledby="sixthGen-tab">
            </div>
            <div class="tab-pane fade" id="seventhGen" role="tabpanel" aria-labelledby="seventhGen-tab">
            </div>
            <div class="tab-pane fade" id="eighthGen" role="tabpanel" aria-labelledby="eighthGen-tab">
            </div>
        </div>


    </main>
    <footer>

    </footer>


    <script src="app.js"></script>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
        crossorigin="anonymous"></script>

</body>

</html>
```

CSS

```css
.poke-slot {
  display: inline-block;
  text-align: center;
}

.poke-slot img {
  display: block;
}
```

javascript

```javascript
// https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png
// firstgen: 1 - 151;
// secondgen: 152 - 251;
// thirdgen: 252 - 386;
// 4: 387 - 493;
// 5: 494 - 649
// 6: 650 - 721;
// 7: 722 - 809
// 8: 810 - 898

const pokeGen = document.querySelectorAll(
  "#firstGen, #secondGen, #thirdGen, #fourthGen, #fifthGen, #sixthGen, #seventhGen, #eighthGen"
);
const baseUrl =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

// convert Nodelist into array with spread
// const pokeGenArray = [...pokeGen];

// or use Array.from() method
const pokeGenArray = Array.from(pokeGen);

// function to generate pokemons
const createPokemon = (num, currentGen) => {
  const pokemon = document.createElement("div");
  pokemon.classList.add("poke-slot");

  const pokeID = document.createElement("span");
  pokeID.textContent = `#${num}`;

  const newImg = document.createElement("img");
  newImg.src = `${baseUrl}${num}.png`;

  pokemon.append(newImg, pokeID);
  currentGen.append(pokemon);
};

// loop pokeGenArray to go through each gen
pokeGenArray.forEach((gen) => {
  if (gen.id === "firstGen") {
    for (let i = 1; i < 152; i++) {
      createPokemon(i, gen);
    }
  } else if (gen.id === "secondGen") {
    for (let i = 152; i < 252; i++) {
      createPokemon(i, gen);
    }
  } else if (gen.id === "thirdGen") {
    for (let i = 252; i < 387; i++) {
      createPokemon(i, gen);
    }
  } else if (gen.id === "fourthGen") {
    for (let i = 387; i < 494; i++) {
      createPokemon(i, gen);
    }
  } else if (gen.id === "fifthGen") {
    for (let i = 494; i < 650; i++) {
      createPokemon(i, gen);
    }
  } else if (gen.id === "sixthGen") {
    for (let i = 650; i < 722; i++) {
      createPokemon(i, gen);
    }
  } else if (gen.id === "seventhGen") {
    for (let i = 722; i < 809; i++) {
      createPokemon(i, gen);
    }
  } else if (gen.id === "eighthGen") {
    for (let i = 810; i < 898; i++) {
      createPokemon(i, gen);
    }
  }
});
```

---

## **DOM Events**

##### [Start](#)

<br>

1. [Introducing to DOM Events](#intro-to-dom-events)
2. [addEventListener](#event-listener)
3. [Keyword 'this'](#keyword-this)
4. [Event Object and Keyboard Events](#event-object)
5. [Forms Events](#form-events)
6. [Input and Change Event](#input-and-change-events)
7. [Event Bubbling](#event-bubbling)
8. [Event Delegation (just go and watch this on udemy, I'm bore)](#event-delegation)
9. [Score Keeper App - look for this app in dom/dom events](#)

---

### **Intro to DOM Events**

##### [Start](#) \ [Dom Events](#dom-events)

<br>

**Events**: responding to user inputs and actions! (clicks, drag, drop, hover, ...etc.)

**Inline Events**(Should **Avoid**): Inserting javascript directly into HTML
to trigger the events.

```html
<!-- Try to avoid inline events as much as you can -->
<body>
  <h1 onclick="alert('boo')">Inline Events Suck...</h1>
  <button id="btn" onclick="alert('clicked')">Click Me</button>
</body>
```

**Using properties**

We can use different types of events properties such as onlick to trigger the events from the script

```html
<body>
  <!-- OnClick Properties -->
    <button id="v2">Click Me</button>
    <button id="v3">Dont Come Near Me</button>

    <script src="app.js"></script>
</body>

</html>
```

Javascript

```javascript
const btn2 = document.querySelector("#v2");
const btn3 = document.querySelector("#v3");

btn2.onclick = function () {
  alert("NOT INLINE anymore, I'm in script!!");
};

function scream() {
  alert("Go AWAY!");
}
// **All** the events properties need  `function` to operate.

// Valid
btn3.onmouseenter = scream;

// This is invalid
btn3.onmouseenter = alert("Go AWAY!");
```

> **All** the events properties need `function` to operate.

---

### **Event Listener**

##### [Start](#) \ [Dom Events](#dom-events)

Using properties like `onclick`, `onmouseenter` works fine in normal situation. But to trigger multiple events by one element, we have to use `addEventListener`.

`addEventListener` also has other arguments that we can pass in. It has differnt types of options in options objects, such as `once`, `capture` and `passive`.

Overall we have more control over `EventListener` and can configure it as we like.

```html
<body>
 <!-- Event Listenenr -->
    <button id="v4">Cick Here</button>
    <button id="tas">TWIST & SHOUT</button>
    <script src="app.js"></script>
</body>

</html>
```

```javascript
const btn4 = document.querySelector("#v4");
btn4.addEventListener("click", () => {
  alert("this is Event Listener");
});

// Multiple events
const tasbtn = document.querySelector("#tas");

const twist = () => {
  console.log("TWIST");
};
const shout = () => {
  console.log("SHOUT");
};

tasbtn.addEventListener("click", twist);
tasbtn.addEventListener("click", shout);
```

**Random Color example in Apps**

---

### **Keyword 'this'**

##### [Start](#) \ [Dom Events](#dom-events)

<br>

When running the same piece of function to different types of elements use keyword `'this'` to make it more dry.

> Keyword `this` does not work with arrow function!!!.

HTML

```html
...

<div>
  <button>color<button>
    ...
  <button>color<button>
</div>

<div>
  <h3>color<h3>
    ...
  <h3>color<h3>
</div>

```

Javascript

```javascript
// Color radomizing function
const randomColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
};

const buttons = document.querySelectorAll("button");

for (let button of buttons) {
  button.addEventListener("click", () => {
    button.style.backgroundColor = randomColor();
    button.style.color = randomColor();
  });
}

const h3s = document.querySelectorAll("h3");

for (let h3 of h3s) {
  h3.addEventListener("click", () => {
    h3.style.backgroundColor = randomColor();
    h3.style.color = randomColor();
  });
}
```

Instead of using h1 and button we can replace them with keyword '`this`'.

> Keyword `this` does not work with arrow function!!!.

```javascript
// add new function colorize to make it more dry

function colorize() {
  this.style.backgroundColor = randomColor();
  this.style.color = randomColor();
}

// and we can easily call colorize function in EventListener
for (let button of buttons) {
  button.addEventListener("click", colorize);
}
for (let h3 of h3s) {
  h3.addEventListener("click", colorize);
}
```

---

### **Event Object**

##### [Start](#) \ [Dom Events](#dom-events)

<br>

The event object is automatically passed in everytime into our `callback function`.

```javascript
// event object example

document.querySelector("button").addEventListener("click", function () {
  console.log("Clicked!");
});
```

Since the event object is already passed in by itself, we just need to capture it with a parameter.

```javascript
// event object is now capture with parameter 'e'
document.querySelector("button").addEventListener("click", function (e) {
  console.log("Clicked!");
});
```

we can console.log `e` to see all the information related to the event.

```javascript
document.querySelector("button").addEventListener("click", function (e) {
  console.log(e);
});

// for example, from the event information we can check which key is pressed on keyboard by utilizing the keydown event.

const input = document.querySelector("input");
input.addEventListener("keydown", function (e) {
  // key is output key, eg . shift
  console.log(e.key);
  // code is the actual button that is pressed, eg. left Shift
  console.log(e.code);

  // the key and code are part of the event object
});
```

Mini game using the event object

```javascript
// add eventlistener to the whole window (webpage)
window.addEventListener("keydown", (e) => {
  switch (e.code) {
    case "ArrowUp":
      console.log("Going Up!");
      break;
    case "ArrowDown":
      console.log("Going Down!");
      break;
    case "ArrowRight":
      console.log("Going Right!");
      break;
    case "ArrowLeft":
      console.log("Going Left!");
      break;
    default:
      console.log("Ignored!");
  }
});
```

---

### **Form Events**

##### [Start](#) \ [Dom Events](#dom-events)

The default operation of a form is that when we click submit, the form will bring us to `/shelter`(with the data from input) away from the page that we're in.

Whenever we press submit button, we will be redirected to /shelter. And this is the default mode

```html
<form action="/shelter" id="shelterForm">
  <input type="text" />
  <button>Submit</button>
</form>
```

In order to prevent the default mode and stays on the main page, we can use `preventDefault()` from event objects.

```javascript
const shelterForm = document.querySelector("#shelterForm");

shelterForm.addEventListener("submit", function (e) {
  // this will stop the page from going to /shelter
  e.preventDefault();
  console.log("Submitted!");
});
```

**Look up `Cat Shelter` in `Dom/Dom events/Cat Shelter demo`**

---

### **Input and Change Events**

##### [Start](#) \ [Dom Events](#dom-events)

<br>

Responding to the user actions and inputs, such as displaying the text in live from the input box.

```html
<h1>Enter Your Name</h1>
<input type="text" />
```

This will display the current text in input live at the h1.

> Typing Rick in input will display "Welcome, Rick"

```javascript
const name = document.querySelector("input");
const heading = document.querySelector("h1");

name.addEventListener('input', function()=>{
  heading.innerText = `Welcome, ${name.value}`;
  if(!name.value){
    heading.innerText = "Enter Your Name"
  }
})

```

---

### **Event Bubbling**

##### [Start](#) \ [Dom Events](#dom-events)

<br>

If we nest the `EventListener`/`onclick(inline event)` throughout the html event bubbling will occurs.

As below, if we trigger an event in div, the section event will also trigger and so the header and then the body. This is called event bubbling.

```html
<body>
  body event
  <header>
    header event
    <section>
      section event
      <div>div event</div>
    </section>
  </header>
</body>
```

Use `e.stopPropagation()` to stop events from bubbling up.

```html
<div id="container">
  <p>Click here to hide the container</p>
  <button id="colorButton">Change Color</button>
</div>
```

```javascript
const container = document.querySelector("#container");
const button = document.querySelector("#colorButton");

const randomColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
};

// propagation here to stop bubbling
button.addEventListener("click", function (e) {
  container.style.backgroundColor = randomColor();
  e.stopPropagation();
});

// this will trigger everytime without stopPropagtion in button
container.addEventListener("click", function (e) {
  container.classList.toggle("hide");
});
```

---
