[NodeJS](../node.js/node.md) || [Javascript Basics](./js.md) || [DOM](./dom.md) || [Async](./async.md) || [AJAX](ajax.md) || [**Prototypes, Classes & OOP**](prototype_classes_oop.md)

1. [Prototypes](#prototypes)
2. [Factory Function](#factory-function)
   - [why factory function is not ideal](#why-factory-function-is-not-ideal)
3. [Constructor function and new operator](#this-is-where-constructor-function-comes-in)
4. [Javascript Classes](#javascript-classes)
   - [more classes related](#some-more-classes)

---

### Prototypes

##### [Start](#)

<br>

In javascript, objects can have a prototype object, which acts as template object that inherit methods and properties from.

**read this after the end**

> **`_proto_`** is not the **prototype object** itself, it is just referencing to the actual prototype object which is **`Array.prototype`** or **`String.prototype`** or `SomeObject.prototype`.

Some **prototypes** that we used before and how normal method is different from the prototype method:

```javascript
// in javascript array is also an object
const arr = [1, 2, 3];
const arr2 = [5, 6, 7];

// these are the methods defined on prototypes
arr.push(4);
arr2.push(8);
arr.pop();
arr2.pop();

// we can define a method/function that belongs to arr
arr.someMethod = function () {
  console.log("This method is for arr");
};

// but methods we defined on arr wont works on other arrays like proto object does
arr.someMethod(); // "This method is for arr"
arr2.someMethod(); // Error : arr2.someMethod is not a function
```

Making our own prototype methods or overwritting the existing one

```javascript
// creating prototype method
Array.prototype.shout = function () {
  console.log("This method affects all of the arrays");
};

// now every arrays can access our prototype method
arr.shout(); // "This method affects all of the arrays"
arr2.shout(); // "This method affects all of the arrays"
[].shout(); //"This method affects all of the arrays"

// overwriting existing prototype method ( not pratical )

Array.prototype.pop = function () {
  console.log("I no longer remove things for u!!");
};

// now pop method no longer remove and instead it will just show our message
arr.pop(); //"I no longer remove things for u!!"

//some more
String.prototype.yell = function () {
  return `Yelling .. ......${this.toUpperCase()}!!!!!`;
};
```

---

### **Factory Function**

##### [Start](#)

<br>

We can make a factory function which can make an object, and that object include below functions as its properties.

#### 1

```javascript
// convert rgb into hex
function hex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString().slice(1);
}

// show rgb string
function rgb(r, g, b) {
  return `rgb(${r},${g},${b})`;
}

// make an object that can convert back and forth from rgb to hex, without having to pass the value each time
```

#### 2

```javascript
// factory function -> object making function

// this function makes us an object
function colorMaker(r, g, b) {
  // starts with an empty object, in this case color object
  const color = {};
  // add rgb value to object
  color.r = r;
  color.g = g;
  color.b = b;
  // add rgb method to object
  color.rgb = function () {
    // destructurize to keep updating rgb value if we change them
    const { r, g, b } = this; // w/o destructuring, the value cannot be update and stuck at the first given value.
    return `rgb(${r},${g},${b})`;
  };
  // add hex method to object
  color.hex = function () {
    const { r, g, b } = this;
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString().slice(1);
  };

  return color;
}

// remember colorMaker is a function not an object!! You seems to forget this
```

references: [keyword "this"](js.md#keyword-this), [destructuring object](js.md#destructuring-objects)

#### 3

```javascript
const frenchBlue = colorMaker(0, 114, 187);

frenchBlue; // is now an object
frenchBlue.rgb(); // "rgb(0, 114, 187)"
frenchBlue.hex(); // '#6806587'

const black = colorMaker(0, 0, 0);
```

[Upgrade from factory to constructor](#upgrade-to-constructor)

#### **Why factory function is not ideal!**

##### [Start](#)/ [Factory Function](#factory-function)

<br>

if we look at the factory function above

```javascript
// frenchBlue, and black is now an object
black; // {r: 0, g: 0, b: 0, rgb: ƒ, hex: ƒ, __proto__}
```

And we can see that methods `rgb: f`, and `hex: f` are **unique copies to each object** which means

```javascript
// if we check the reference types with triple equal (functions are reference types)
black.rgb === frenchBlue.rgb; // false

//eventho they are the same identical functions, they are unique to each object

// Unlike prototypes methods, which are inside the prototypes and not in individual object
"hi".slice === "bye".slice; // true
[1, 2, 3].pop === [3, 4, 5].pop; // true
```

#### This is where **constructor** function comes in.

Reference back to the keyword [`this`](js.md#keyword-this), if we use `this` in regular function, `this` will be referencing the global object.

But using "**`this`**" in constructor function, along with the "**`new`**" operator, we can create an object

```javascript
// if we don't use the "new" Keyword, "this" refers to the global object(window object)

// constructor function
function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}

// the new keyword creates a blank, plain js Object
const car1 = new Car("TOYOTA", "Kluger", "2009");

console.log(car1.make); // "TOYOTA"
```

> **We always use Capital in variable naming to indicate the function is the constructor.**

for example : `function Something(){...}`,` function Color(){...}`, `function Play(){...}`

<br>

[colorMaker factory function](#factory-function)

#### upgrade to constructor

```javascript
// create base constructor for new objects
const Color = (r,g,b){
   // clearer way to see : object.r = r
  this.r = r;
  this.g = g;
  this.b = b;

  // we can still create methods here but they will become unique method like factory function
}

// create rgb prototype method to the color objects
Color.prototype.rgb = function(){
const {r,g,b} = this;
return `rgb(${r},${g},${b})`
}

// create hex prototype
Color.prototype.hex = function(){
  const {r,g,b} = this;
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

// create rgba prototype - alpha channel(change color opacity) see references for a=1.0 (default params)
Color.prototype.rgba = function(a=1.0){
  const {r,g,b} = this;
  return `rgb(${r},${g},${b},${a})`
}
```

references: [default params](js.md#default-parameters)

```javascript
const white = new Color(255, 255, 255);
const black = new Color(0, 0, 0);

white.rgb(); // 'rgb(255,255,255)'
white.hex(); // '#ffffff'
white; // Color {r: 255, g: 255, b: 255}

// no more unique methods inside.

white.hex === black.hex; //true
```

> **new keyword** is the one that create an object, constructor function does not create the object

---

### Javascript Classes

##### [Start](#) / [Factory Function](#factory-function) / [Construcotr with New Keyword](#this-is-where-constructor-function-comes-in)

This is javascript class:

1. First we define the class with **`class` keyword** :` class Color()` in this case
   > We always capitalize the name when defining class **C**olor() same as defining constructor
2. Inside the class, first thing we need to add is the constructor function
   > This constructor function will run instantly whenever we instantiate new instance of class. I.e. whenever we make a new object
3. Then we add prototypes, methods that our object can use.
4. Keyword "this" refers to individual objects.

```javascript
// #1
class Color {
  // #2
  constructor(r, g, b, name) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.name = name;
  }
  // #3
  rgb() {
    const { r, g, b } = this;
    return `rgb(${r},${g},${b})`;
  }
  rgba(a = 1.0) {
    const { r, g, b } = this;
    return `rgb(${r},${g},${b}, ${a})`;
  }
  hex() {
    const { r, g, b } = this;
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }
}
```

!# Refactor the `rgb()` and `rgba()` methods with `innerRGB()`. By **accessing the method inside the class**

> Notice that rgb() and rgba() use the same structure, we can refactor that same part of the two methods by creating a new method, and use that method inside the rgb and rgba functions.

```javascript
class Color {
  constructor(r, g, b, name) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.name = name;
  }
  // !#
  innerRGB() {
    const { r, g, b } = this;
    return `${r},${g},${b}`;
  }
  // !#
  rgb() {
    return `rgb(${this.innerRGB})`;
  }
  // !#
  rgba(a = 1.0) {
    return `rgb(${this.innerRGB},${a})`;
  }
  hex() {
    const { r, g, b } = this;
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }
}
```

```javascript
const black = new Color(0, 0, 0);

console.log(`RGB for black : ${black.rgb()}`);
console.log(`Hex for black : ${black.hex()}`);
```

---

### Some More Classes

##### [Start](#) / [Javascript Classes](#javascript-classes)

<br>

We gonna add Hsl calculation to our `Color()`class.

> took this code from https://css-tricks.com/converting-color-spaces-in-javascript/

```javascript
// hsl calculation function
function RGBToHSL(r, g, b) {
  // Make r, g, and b fractions of 1
  r /= 255;
  g /= 255;
  b /= 255;

  // Find greatest and smallest channel values
  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;
  // Calculate hue
  // No difference
  if (delta == 0) h = 0;
  // Red is max
  else if (cmax == r) h = ((g - b) / delta) % 6;
  // Green is max
  else if (cmax == g) h = (b - r) / delta + 2;
  // Blue is max
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  // Make negative hues positive behind 360°
  if (h < 0) h += 360;
  // Calculate lightness
  l = (cmax + cmin) / 2;

  // Calculate saturation
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  // Multiply l and s by 100
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return "hsl(" + h + "," + s + "%," + l + "%)";
}
```

Add HSL to our Color class:

1. Insert RGBToHSL() function into our class
2. Destructure rgb value into HSL class
   > we have to use **`let`** here instead of **`const`**, since the value gonna change later in the function RGBToHSL()
3. Assing the **"`h`"**, **"`s`"**, **"`l`"** values directly to our object
4. We can call method inside the constructor.
   > Since constructor runs as soon as we initiate a new color, the method RGBToHSL() run and give our object the **"`h`"**, **"`s`"**, **"`l`"** properties.
5. Create `hsl()` method
6. Create `fullSaturation()` method
   > we dont to declare s, since we will be giving 100% saturation

```javascript
class Color {
  constructor(r, g, b, name) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.name = name;
    // #4
    this.RGBToHSL();
  }
  innerRGB() {
    const { r, g, b } = this;
    return `${r},${g},${b}`;
  }
  rgb() {
    return `rgb(${this.innerRGB()})`;
  }
  rgba(a = 1.0) {
    return `rgb(${this.innerRGB()}, ${a})`;
  }
  hex() {
    const { r, g, b } = this;
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }
  // #5
  hsl() {
    const { h, s, l } = this;
    return `hsl(${h},${s}%,${l}%)`;
  }
  // #6
  fullSaturation() {
    const { h, l } = this;
    return `hsl(${h},100%,${l}%)`;
  }
  // #1
  RGBToHSL() {
    // #2
    let { r, g, b } = this;
    r /= 255;
    g /= 255;
    b /= 255;

    let cmin = Math.min(r, g, b),
      cmax = Math.max(r, g, b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;

    if (delta == 0) h = 0;
    // Red is max
    else if (cmax == r) h = ((g - b) / delta) % 6;
    // Green is max
    else if (cmax == g) h = (b - r) / delta + 2;
    // Blue is max
    else h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    if (h < 0) h += 360;
    l = (cmax + cmin) / 2;

    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);
    // #3
    this.h = h;
    this.s = s;
    this.l = l;
  }
}
```

---
