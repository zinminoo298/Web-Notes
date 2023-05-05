[NodeJS](../node.js/node.md) || [**Javascript Basics**](./js.md) || [DOM](./dom.md) || [Async](./async.md) || [AJAX](ajax.md) || [Prototypes, Classes & OOP](prototype_classes_oop.md)
<br>

# Javascript

1. [Primitive data type](#primitive-data-types)
   - [String](#string)
   - [Number](#number)
   - [Boolean](#boolean)
   - [Null and Undefined](#null-and-undefined)
2. [Variables](#variables)
3. [Math Objects](#math-object)
4. [Javascript Decision Making](#js-decision-making)
5. [Arrays](#arrays)
6. [Object Literals](#object-literals)
7. [Loops](#loops)
8. [\*Functions](#functions) (\*crucial)
9. [Advance Functions](#advance-functions)
   - [Keyword 'this'](#keyword-this) (\*crucial)
   - [Using Try/Catch](#try-and-catch)
10. [Callbacks and Array Methods](#callbacks-and-array-methods)
11. [Newer JS Features](#newer-js-features)
    - [Default Params](#default-params)
    - [Spread](#spread) (\*crucial)
    - [Rest Params](#rest)
    - [Destructuring](#destructuring) (\*crucial)

## **Primitive Data Types**

---

**Data** that has **no** object/method.

There are **6 primitive** data type:

- [string](#string)
- [number](#number)
- [boolean](#boolean)
- bigint
- [undefined](#null-and-undefined)
- symbol
  > Null - seemingly primitive, but indeed is a special case for every OBJECT

### **String**

###### [Start](#javascript) \ [Primitive Data Types](#primitive-data-types)

<br>

- Represent **text** and must be used in quotes "" or ''.
- **Strings** are indexed.  
  "EGG" - each charcater (even spaces" " and special characers) has a corresponding index.  
  E - 0, G - 1, G - 2

```javascript
//Indecies
let ingredient = "EGG";
console.log(ingredient[0]);

---> E
//Length
let id = "112304";
console.log(id.length);

---> 6
// adding a string and a number, the result is string
5+"Egg"

---> "5Egg"
```

- **String** Methods

  - Searching withing a string
  - Replacing part of a string
  - Changing the casing of a string

```javascript
// Casing
let msg = "message";
// don't forget the parantheses!!
msg.toUpperCase();

---> msg = "MESSAGE"

// Trim, really useful when you want to remove unecessary spacing and indentations you get from the user

let phoneNumber = "  09xxxxxxx    " ;
phoneNumber.trim();
// not gonna work on non-space chars
---> phoneNumber = "09xxxxxxx"

// Multiple methods can be used in one line

let firstName = "   henry      ";
firstName.trim().toUppercase();

---> firstName = "HENRY"


```

- Some **methods** accept **arguments/inputs** (that we can pass in) that modify their behavior.

```javascript
// indexOf (might be useful)
let pets = "catdog";

pets.indexOf("cat"); // returns 0, but these are not array just indexOf Strings
pets.indexOf("dog"); // returns 3
pets.indexOf("z"); // returns -1(not found)

// slice (very useful)

let article =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

// slice accept 1 or 2 inputs, (?start, ?end), you can use negative number as well.


sliceArticle = article.slice(0,120).trim() + " ...";


---> sliceArticle = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard ..."

// replace (useful)

let phoneNumber = "09797626678";
phoneNumber.replace("0", "+95 " ); // replace only works on first letter.

---> phoneNumber = "+95 9797626678"
```

- **String** template literal (**SUPER USEFUL**)

```javascript
// example
let product = "Duct Tape";
let price = 2.5;
let qty = 3;

let checkout = "Reciept: " + qty + "x " + product + " for $" + qty*price

---> checkout = "Reciept: 3x Duct Tape for $7.5"
// Using string template literal, don't forget back-tip ` ${} `

let checkout = `Reciept: ${qty}x ${product} for $${qty*price}`;

---> checkout = "Reciept: 3x Duct Tape for $7.5"
```

### **Number**

###### [Start](#javascript) \ [Primitive Data Types](#primitive-data-types)

<br>

---

Order of operation (**PEMDAS**) from left -> right.

    paranthesis, exponent, multiplication, division, addition, subtraction

**Updating variable**

```javascript
let score = x;

score += y;
score -= y;
score *= y;
score /= y;
score++;
score--;
```

**Other operators**

    modulo - x % y // even, odd situations 10 % 2 -> 0, 1888 % 2 -> 0, 33 % 2 -> 1
    exponential - x ** y

**NaN** - not a number

    0/0
    NaN + x
    Nan * x
    ...

---

### **Boolean**

###### [Start](#javascript) \ [Primitive Data Types](#primitive-data-types)

<br>

**Booleans** are very simple.

You have two possible options: **true** or **false**. Thats it!

```javascript
let isLoggedIn = true;

let gameOver = false;

const isWaterWet = true;

//ture and false are lowercase in js. But in python they are uppercase.
```

---

### **Null and Undefined**

###### [Start](#javascript) \ [Primitive Data Types](#primitive-data-types)

<br>

**Null**

- Intentional absence of any value.
- Must be assigned.

```javascript
// no one is logged in yet...
let loggedInUser = null;

// a user logged in

loggedInUser = "aaron";
```

**Undefined**

- Variables that do not have an assigned values are undefined.

```javascript
// no values assigned to x
let x;

---> x // undefined, but it does not mean nothingness

```

---

### **Variables**

###### [Start](#javascript)

<br>

Basic syntx

```javascript
let
const
var
```

"**const**" -- works just like **let**, except you **cannot** change the value or the reference type.

```javascript
const num = 10;
num = 20; // Error!
num += 1; // Error!

const age = 20;
age = age + 1; // Error!

const a = "Hello";
a = "Bye"; // Error!
```

So, Why use **const**? You will know once you know the arrays and objects. [Array+Const](#array-plus-const)

 <br>

"**var**" -- the old variable keyword. Before **let** and **const**, **var** was the only way of decalring variables. These days, there isn't really a reason to use it.

And you will see clearly why var is not a good way to declare variable in [block scope](#block-scope)

---

### **Math Object**

###### [Start](#javascript)

```javascript
Math.PI; // 3.141592653589793

// Rounding a number:
Math.round(4.9); // 5
Math.ceil(4.1); // 5

// Absolute value:
Math.abs(-33); // 33

// Raises 2 to the 5th power:
Math.pow(2, 5); // 32

// Removes decimal:
Math.floor(3.999999); // 3
```

### **Random numbers**

```javascript
Math.random(); // 0.312234... gives us a random decimal between 0 and 1 (non-inclusive) JS SUCKS

// To get a random number between
Math.floor(Math.random() * 10); // 0-9
Math.floor(Math.random() * 10 + 1); // 1-10
Math.floor(Math.random() * 100 + 1); // 1-100
Math.floor(Math.random() * 3 + 20); // 20-22
Math.ceil(Math.random() * 10); // 1-10
```

---

## **JS Decision Making**

###### [Start](#javascript)

<br>

**Boolean Logic** : Making decisions with javascript

- [Comparison operators (very important)](#comparison-operators)
- [Conditionals: If, Else-If, and Else](#conditionals)
- [The ? ternery operator : alternative to if-else ](#ternery)
- [Truth-y and False-y Values (very important)](#truthy-and-falsy-values)
- [Logical Operators](#logical-operators)
- [Swtich case](#switch)

---

### **Comparison Operators**

###### [Start](#javascript) \ [JS Decision Making](#js-decision-making)

<br>

```javascript
> // greater than
< // less than
>= // greater than or equal to
<= // less than or equal to
== // equality
!= // not equal
=== // strict equality
!== // strict non-equality
```

Some examples : These all returns a **boolean**

```javascript
10 > 1; // true
0.2 > 0.3; // false
-10 < 0; // true
50.5 < 5; // false
99 >= 4; // false
99 >= 99; // true

// Though its uncommon, you can compare strings by using their unicode values. Eg. a = 61, b = 62, A = 41

"a" < "b"; // true
"A" > "a"; // false
```

#### **Equality operators**

**== (double equals)**

- Check for equality of value, but not equality of type.
- Coerce both values to the same type and then compare them.
- This can lead to some unexpected results!!

== weirdness

```javascript
5 == 5; // true
"a" == "b"; // false
1 == "1"; // true
0 == ""; // true
true == false; // false
0 == false; // true
null == undefined; // true
```

**=== (triple equals, strict equality)**

- Check for equality of both value and type.

```javascript
5 === 5; // true
5 === "5"; // false
1 === 3; // false
false === 0; // false

// some applies for != and !==

10 != "10"; // false
10 !== "10"; // true
```

---

### **Conditionals**

###### [Start](#javascript) \ [JS Decision Making](#js-decision-making)

<br>

**if statement** : only runs code if given condition is true.

**else if** : if not the first thing, maybe this other thing.

**else** : if nothing else is true do this.

```javascript
const mark = Math.floor(Math.random() * 100 + 1);

if (mark >= 80) {
  console.log(`Your mark is ${mark}. You got distinction!`);
} else if (mark >= 40) {
  console.log(`Your mark is ${mark}. You passed`);
} else console.log(`Your mark is ${mark}. You failed`);
```

#### **Nesting Conditionals**

```javascript
// example

const password = prompt("Enter your new password");

// password must be at least 8 characters and not more than 16
if (password.length >= 8 andand password.length <= 16) {
  // password must not contain space
  if (password.indexOf(" ") === -1) {
    console.log("You are all set!");
  } else console.log("Password must not contain any spaces");
} else {
  console.log("Password must be at least 8 characters and not more than 16");
}
```

---

### **Ternery Operator (?)**

#### [Start](#) \ [JS Decision Making](#js-decision-making)

<br>

The **conditional (ternary) operator** is the only JavaScript operator that takes **three operands**

      condition ? true : false

```javascript
function getFee(isMember) {
  return isMember ? "$2.00" : "$10.00";
}

console.log(getFee(true));
// expected output: "$2.00"

console.log(getFee(false));
// expected output: "$10.00"

console.log(getFee(null));
// expected output: "$10.00"

const isEvenOdd = () => {
  const num = Math.floor(Math.random() * 10) + 1;
  const result = num % 2 === 0 ? "EVEN" : "ODD";
  return `Your number is ${result}`;
};
isEvenOdd();
```

---

### **Truthy and Falsy values**

###### [Start](#javascript) \ [JS Decision Making](#js-decision-making)

<br>

All JS values have an inherent truthyness or falsyness about them.  
**Falsy values** :

- false
- 0
- ""(empty string)
- null
- undefined
- NaN

**Truthy values** : Everything else is **truthy**!

```javascript
const userInput = prompt("Enter something");

// Notes: if user didn't type anything which is ""(empty string), then if statesment won't run since the input is false. Otherwise return the user input.
if (userInput) {
  console.log(userInput);
} else console.log("User didn't provide anything! FALSY!!");
```

---

### **Logical Operators**

###### [Start](#javascript) \ [JS Decision Making](#js-decision-making)

<br>

- [Logical AND "andand"](#Logical-AND)
- [Logical OR "||"](#Logical-OR)
- [Logical NOT "!"](#Logical-NOT)

#### **Logical-AND**

Both side must be true for entire thing to be true.

```javascript
true andand true; // true
true andand false; // false

1 <= 4 andand "a" === "a"; // true
9 > 10 andand 9 >= 9; // false
"Spock".length === 5 andand 1 + 1 === 3; // false
```

#### **Logical-OR**

If one side is true, the entire thing is true.

```javascript
true || true; // true
true || false; // true
false || false; // false

0 || undefined; // false

const age = 3400;

if (age < 6 || age >= 100) {
  console.log("You get the service for free");
} else console.log("That will be $3000");
```

#### **Logical-NOT**

! expression returns true if expression is false

```javascript
!true; // false
!false; // true

!null; // true
!(1 === 1); // false
!(3 <= 4); // false

// Some examples

const firstName = prompt("Enter your first name");
if (!firstName) {
  console.log("You must enter your first name!");
} else console.log(firstName);

//

const age = prompt("Enter your age");

if (!((age > 0 andand age <= 15) || age >= 65)) {
  console.log("You are eligible to enter the tournament");
} else console.log("You are not eligible to enter the tournament");
```

### **Switch**

###### [Start](#javascript) \ [JS Decision Making](#js-decision-making)

<br>

Switch is another control-flow statement that can replace multiple if statements.

```javascript
const day = 2;
switch (day) {
  case 1:
    console.log("MONDAY");
    break;
  case 2:
    console.log("TUESDAY");
    break;
  case 3:
    console.log("WEDNESDAY");
    break;
  case 4:
    console.log("THURSDAY");
    break;
  case 5:
    console.log("FRIDAY");
    break;
  case 6:
  case 7:
    console.log("WEEKEND!!");
    break;
  default:
    console.log("INVALID");
}
```

---

## **Arrays**

###### [Start](#javascript)

<br>

- [Array Basics - Creating and Updating (v.important)](#array-basics)
- [Array Methods](#array-methods)
- [Array+Const](#array-plus-const)
- [Multi Dimensional Arrays (Nested Arrays)](#multi-dimensional-arrays)

---

### **Array Basics**

###### [Start](#javascript) \ [Arrays](#arrays)

<br>

**Arrays** - Ordered collections of values.

- List of comments on reddit threads.
- Collections of levels in a game.
- Songs in playlist.

```javascript
// to make an empty array
let students = [];

// an array of srings
let colors = ["red", "orange", "yellow"];

// an array of numbers
let rating = [3, 4, 5];

// a mixed array
let random = [true, "cat", 69, null]; // only in javascript, in other language array can only be one type or explicitly declare the type

// like string, array also has length

students.length; // 0
colors.length; // 3
random.length; // 4

// arrays are indexed too

colors[0]; // "red"
colors[0][0]; // "r", from left to right
```

**Modifying array**

```javascript
// this does not work on string

let colors = ["rad", "yallowo", "dark"];

colors[0] = "red";
colors[1] = "yellow";
colors[2] = 0;

// colors = ["red", "yellow", 0]

colors[11] = "cyan";

// colors = ["red", "yellow", 0, empty x 7, "cyan"]

colors.length; // 12
colors[3]; // undefined
colors[8]; // undefined
```

### **Array Methods**

###### [Start](#javascript) \ [Arrays](#arrays)

<br>

Mostly used methods :

- [**Push**](#push-and-pop)- add to the end

- [**Pop**](#push-and-pop) - remove from the end

- [**Shift**](#shift-and-unshift) - remove from the start

- [**Unshift**](#shift-and-unshift) - add to the start

Commonly used :

- [**concat**](#concat) - merge arrays
- [**includes**](#includes) - look for a value
- [**indexOf**](#indexof) - just like string indexOf
- [**join**](#join) - creates a string from an array
- [**reverse**](#reverse) - reverse an array
- [**slice**](#slice) - copies a portion of an array
- [**splice**](#splice) - remove/replace elements
- [**sort**](#sort) - sorts an array

---

#### **Push and Pop**

###### [Start](#javascript) \ [Arrays](#arrays) \ [Array Methods](#array-methods)

<br>

```javascript
// PUSH

let guestList = ["Barry", "Moira", "Claire", "Chris", "Leon"];

guestList.push("Jill");

// guestList - ["Barry", "Moira", "Claire", "Chris", "Leon",  "Jill"]

guestList.push("Rebecca", "Ethan");

// guestList - ["Barry", "Moira", "Claire", "Chris", "Leon",  "Jill", "Rebecca", "Ethan"]

// POP, it does not require any arguments
guestList.pop(); // "Ethan" --> and you can capture this in a variable
let removedPerson = guestList.pop(); // "Rebecca"

removedPerson; // "Rebecca"
guestList; // ["Barry", "Moira", "Claire", "Chris", "Leon",  "Jill"]
```

---

#### **Shift and Unshift**

###### [Start](#javascript) \ [Arrays](#arrays) \ [Array Methods](#array-methods)

<br>

```javascript
// shift
guestList.shift(); // "Barry"

let arrivedGuest = guestList.shift(); // "Moira"

guestList; // ["Claire", "Chris", "Leon", "Jill"]

// unshift

guestList.unshift("VIP");

guestList; // ["VIP", "Claire", "Chris", "Leon", "Jill"]
```

---

#### **Concat**

###### [Start](#javascript) \ [Arrays](#arrays) \ [Array Methods](#array-methods)

<br>

The **concat()** method is used to merge two or more arrays. This methods does not change the existing array, but instead returns a **new array**.

```javascript
const array1 = ["a", "b", "c"];
const array2 = ["e", "f", "g"];

// concat
const array3 = array1.concat(array2);
console.log(array3); // array3 - ['a', 'b', 'c', 'd', 'e', 'f', 'g']
```

---

#### **Includes**

###### [Start](#javascript) \ [Arrays](#arrays) \ [Array Methods](#array-methods)

<br>

The **includes()** method determines whether an array includes a certain value among its entries, returning **true** or **false** as appropriate.

```javascript
const array1 = [1, 2, 3, 4];
console.log(array1.include(2)); // true

const mons = ["Tiana", "Triana", "Nana", "Diana"];
console.log(mons.include("Jeanne")); // false
```

---

#### **indexOf**

###### [Start](#javascript) \ [Arrays](#arrays) \ [Array Methods](#array-methods)

<br>

The indexOf() method returns the first index at which a given element can be found in the array, or -1 if it is not present.

```javascript
const ships = ["Type-10", "Corvett", "Anaconda", "Sidewinder", "Type-10"];

console.log(ships.indexOf("Corvett")); // 1

// start from index 2
console.log(ships.indexOf("Type-10"), 2); // 4

console.log(ships.indexOf("Imperial Cutter")); // -1
```

---

#### **Join**

###### [Start](#javascript) \ [Arrays](#arrays) \ [Array Methods](#array-methods)

<br>

The join() methods creates and returns a new string by concentrating all of the elements in an array (or an **array-like object**), seperated by commas or a specified seperator string. If the array has only one item, then that item will be returned without using the string seperator.

```javascript
const elements = ["Fire", "Air", "Water"];

console.log(elements.join()); // String - "Fire, Air, Water"

console.log(elements.join("")); // String - "FireAirWater"

console.log(elements.join("-")); // String - "Fire-Air-Water"
```

---

#### **Reverse**

###### [Start](#javascript) \ [Arrays](#arrays) \ [Array Methods](#array-methods)

<br>

The reverse() method reverses an array **in place**. The first array element becomes the last, and the last array element becomes the first.

> Splice is destructive

```javascript
const original = ["one", "two", "three"];

const reversed = array1.reverse();
console.log(reversed); // ["three", "two", "one"]

// IMPORTANT :: reverse() is destructive --- it changes the original array unlike concat().

console.log(original); // ["three", "two", "one"]
```

---

#### **Slice**

###### [Start](#javascript) \ [Arrays](#arrays) \ [Array Methods](#array-methods)

<br>

The **slice()** method returns a shallow copy of a portion of an array into a **new array** object selected from **start** to **end** (**end** not included) where **start** and **end** represents the index of items in that array.

```javascript
const animals = ["wolf", "bison", "camel", "duck", "elephant"];

console.log(animals.slice(2)); // animals - ["camel", "duck", "elephant"]

console.log(animals.slice(2, 4)); // animals - ["camel", "duck"]

console.log(animals.slicec(1, 5)); // animals - ["bison", "camel", "duck", "elephant"]

// you can also use negative index
console.log(animals.slice(-2)); // ["duck", "elephant"]

// fact :: (?start, ?end) in suggesting box, ? means completely optional
```

---

#### **Splice**

###### [Start](#javascript) \ [Arrays](#arrays) \ [Array Methods](#array-methods)

<br>

The **splice()** method changes the contents of an array by removing or replacing existing elements and/or adding new elements **in place**.

> Splice is destructive

```javascript
const months = ["Jan", "March", "April", "June"];

// start at index 1 and deletes nothing
months.splice(1, 0, "Feb");
console.log(months);
// ["Jan", "Feb", "March", "April", "June"]

// replace 1 element at index 4
const removedMonths = months.splice(4, 1, "May");
console.log(months);
// ["Jan", "Feb", "March", "April", "May"]
console.log(removedMonths);
// ["June"]

const numbers = [1, 2, 4, 5, 6];
numbers.splice(2, 0, 3);
console.log(numbers); // [1, 2, 3, 4, 5, 6]

// adding several items
numbers.splice(6, 0, 7, 8, 9, 0);
console.log(numbers); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
```

**Syntax**

```javascript

let arrayDeletedItems = array.splice(start, ?deleteCount, ... items)

```

---

#### **Sort**

###### [Start](#javascript) \ [Arrays](#arrays) \ [Array Methods](#array-methods)

<br>

The **sort()** method sorts the elements of an array **-in place-** and returns sorted array. The default sort order is ascending, built upon converting the elements into string, then compressing their sequences of UTF-16 code units values.  
<br><br>
The time and space complexity of the sort cannot be guaranteed as it depends on the implementation.

**Important**:: Not a reliable numeric sort

```javascript
const months = ["March", "Jan", "Feb", "Dec"];
months.sort();
console.log(months);
// expected output: Array ["Dec", "Feb", "Jan", "March"]

const array1 = [1, 30, 4, 21, 100000];
array1.sort();
console.log(array1);
// expected output: Array [1, 100000, 21, 30, 4]
```

---

### **Array plus Const**

###### [Start](#javascript) \ [Arrays](#arrays)

<br>

Check on [**const**](#variables)

Equality and reference types testing:

```javascript
"hi" === "hi"; // true
"hi" == "hi"; // true

["hi", "bye"] === ["hi", "bye"]; // false
["hi", "bye"] == ["hi", "bye"]; // false
[] === [] // false
[] == [] // false

// arrays do not equal to each other since they have different referenec types
```

JS create a **different reference** value when you assing a variable

```javascript
let nums = [1, 2, 3, 4]; // it has its own reference value
let secondNums = [1, 2, 3, 4]; // different reference value
nums === secondNums; // false
```

These two variables have the same contents but differ in their reference values.

```javascript
let newNums = [5, 6, 7, 8];
let copyNums = newNums;

copyNums === newNums; // true
copyNums.push(9);
console.log(newNums); // [5, 6, 7, 8, 9]
console.log(copyNums); // [5, 6, 7, 8, 9]
```

**const** is ok as long as the reference value remains the same.

```javascript
// The difference between const and let
let nums = [1, 2, 3, 4];
nums = "one, two, three, four";
console.log(nums); // "1, 2, 3, 4"

const newNums = [1, 2, 3, 4];
newNums = "one, two, three, four"; // Error, constant value
console.log(newNums); // [1, 2, 3, 4]

// const is ok as long as the reference value remains the same
newNums.push(5);
// No error, cus we are changing the contents inside a constant reference value
console.log(newNums); // [1, 2, 3, 4, 5]
```

---

### **Multi-Dimensional-Arrays**

###### [Start](#javascript) \ [Arrays](#arrays)

<br>

We can store arrays inside other arrays!

```javascript
const charPairs = [
  ["Claire Redfield", "Moira Burton"],
  ["Barry Burton", "Natalia"],
  ["Chris Redfield", "Jill Valentine"],
];
```

---

## **Object Literals**

###### [Start](#javascript)

<br>

- [Creating and working with object literals](#objects)
- [Nesting arrays and objects](#nesting-arrays-and-objects)

### Objects

- **Objects** are collections of **properties**.
- **Properties** are a **key-value pair**.
- Rather than acessing data using an index, we use **custom keys**.
- **Objects** doesn't have **length**, meaing:

```
Object.length does not exist
```

- **Objects** are **not iterable** but you can use some **methods** to iterate an Object, learn more about this in [iterating over objects](#iterating-over-objects)

---

#### Using an **Object**:

###### [Start](#javascript) \ [Object Literals](#object-literals)

<br>

```javascript
const fitBitData = {
  totalSteps: 307891,
  totalMiles: 211.7,
  avgCalorieBurn: 5775,
  workoutThisWeek: "5 of 7",
  avgGoodSleep: "2:13",
};

// All types are welcome!!

const comment = {
  username: "GooxBumps",
  downVotes: 69,
  upVotes: 420,
  netScore: 199,
  commentText: "That's 420",
  tags: ["#funny", "#randomShits", "#subtle"],
  isGilded: false,
};
```

---

#### Accessing data out of **Objects**:

```javascript
const person = { firstName: "Mick", lastName: "Jagger" };

// first option,

person["lastName"]; // "Jagger" . Same as array, put key instead of an index.

// sencond and most used

person.lastName; // "Jagger"
```

All **keys** are converted to **Strings**. \*Except for **symbols**.

---

#### Modifying an **Object**:

```javascript
const midterms = { danielle: 78, thomas: 82 };

midtemrs.thomas = 62;
// { danielle: 78, thomas: 62 };

midterms.danielle = "B+";
midterms.thomas = "C";
// {danielle: "B+", thomas: "C"}

midterms.ezra = "A";
midterms["antonio"] = "B-";
// {danielle: "B+", thomas: "C", ezra: "A", antonio: "B-"}
```

---

### Nesting Arrays And Objects

###### [Start](#javascript) \ [Object Literals](#object-literals)

<br>

Arrays + Objects

```javascript
const shoppingCart = [
  { product: "Jenga Classic", price: 6.88, quantity: 1 },
  { product: "Echo Dot", price: 29.99, quantity: 3 },
  { product: "Fire Stick", price: 39.99, quantity: 2 },
];
```

Nested Objects + Arrays

```javascript
const student = {
  firstName: "David",
  lastName: "Jones",
  activities: ["Music", "Art"],
  grading: {
    midterms: "B-",
    final: "A",
  },
};
```

---

## Loops

###### [Start](#javascript)

<br>

Loops allow us to repeat code, for example: Print "Hello" **10 times**, **sum all numbers** in an array.

- [For Loops](#for-loops) (very important)
- [While Loops](#while-loops)
- [For ... Of Loop](#for-of) (nice way of looping things)
- [Iterating Over Objects](#iterating-over-objects)
- [To Do List App](#to-do-list-app)

---

### **For Loops**

###### [Start](#javascript) \ [Loops](#loops)

<br>

1. [syntax](#syntax) and some examples
2. [Infinite loops](#infinite-loops) (never do this)
3. [Looping over arrays](#looping-and-iterating-over-arrays)
4. [Nested loops](#nested-loops) (Important)

<br>

#### Syntax

###### [Start](#javascript) \ [Loops](#loops) \ [For Loops](#for-loops)

<br>

```javascript
for (
  [initialExpression];
  [condition];
  [incrementExpression];
  ){
  //Code Here
}
```

Some examples:

```javascript
// start at 1; stop at 10; add 1 each time
for (let i = 1; i <= 10; i++) {
  console.log(i);
}

// hello six times
for (let i = 1; i <= 6; i++) {
  console.log("hello");
}

// even and odd numbers from 1 to 20

for (let i = 1; i <= 20; i++) {
  if (i % 2 === 0) {
    console.log("Even: " + i);
  } else console.log("Odd: " + i);
}

// 100 to 0 (-10)

for (i = 100; i >= 0; i -= 10) {
  console.log(i);
}
```

#### Infinite loops

###### [Start](#javascript) \ [Loops](#loops) \ [For Loops](#for-loops)

<br>

```javascript
// Super BAD!!
for (let i = 20; i >= 0; i++) {
  console.log(i);
}
// never run this on your computer
```

#### Looping And Iterating Over Arrays

###### [Start](#javascript) \ [Loops](#loops) \ [For Loops](#for-loops)

<br>

```javascript
const animals = ["lion", "tiger", "bears"];

for (let i = 0; i < animals.length; i++) {
  console.log(i, animals[i]);
}

// 0 lion
// 1 tiger
// 2 bears

for (let i = animals.length - 1; i >= 0; i--) {
  console.log(i, animals[i]);
}

// 2 bears
// 1 tiger
// 0 lion
```

#### Nested Loops

###### [Start](#javascript) \ [Loops](#loops) \ [For Loops](#for-loops)

<br>

```javascript
let string = "HELLO";

for (let i = 0; i <= 3; i++) {
  console.log(`Outer:: ${i}`);
  for (let j = 0; j < string.length; j++) {
    console.log(`          Inner:: ${string[j]}`);
  }
}

// Outer:: 0
//            Inner:: H
//            Inner:: E
//            Inner:: L
//            Inner:: L
//            Inner:: O
// ...

const charChart = [
  ["Rebecca", "Jill", "Chris"],
  ["Leon", "Claire", "Ada"],
  ["Barry", "Moira", "Natalia"],
];

for (let i = 0; i < charChart.length; i++) {
  const episode = charChart[i];
  console.log(`Episode ${i + 1}:`);
  for (let j = 0; j < episode.length; j++) {
    console.log(`             ${episode[j]}`);
  }
}

// Episode 1:
//               Rebecca
//               Jill
//               Chris
// Episode 2:
//               Leon
//               Claire
//               Ada
// Episode 3:
//               Barry
//               Moira
//               Natalia
```

---

### **While Loops**

###### [Start](#javascript) \ [Loops](#loops)

<br>

While loops continue running as long as the condition is true.

1. [The break keyword](#the-break-keyword)
2. [Creating a guessing game](#guessing-game)

```javascript
let num = 0;
while (num <= 10) {
  console.log(num);
  num++;
}
// 0
// 1
// ...
// 10
```

Some examples, where while loop is commonly used:

```javascript
// a chess game

while (!gameOver) {
  // player 1 move
  // player 2 move
}

// log in system

const password = "itsaSecret";
let userInput = prompt("Enter the password");
while (userInput != password) {
  userInput = prompt("Enter the password");
}
console.log("You are in");
```

#### The break keyword

###### [Start](#javascript) \ [loops](#loops) \ [While Loop](#while-loops)

<br>

```javascript
let jackPot = Math.floor(Math.random() * 10);
let roll = Math.floor(Math.random() * 10);

//  Without a break your code will run endlessly
while (true) {
  roll = Math.floor(Math.random() * 10);
  if (roll === jackPot) {
    console.log(`You hit the jackPot !! ${jackpot}`);
    break; // Important!
  } else {
    console.log("No JackPot for you!");
  }
}

// You can even use break in for-loop. Not pratical tho

for (let i = 0; i <= 1000; i++) {
  console.log(i);
  if (i === 69) {
    console.log(`Heh :) ${i}`);
    break;
  }
}
```

#### Guessing game

###### [Start](#javascript) \ [loops](#loops) \ [While Loop](#while-loops)

<br>

```javascript
let maximum = parseInt(prompt("Enter a maximum number"));

while (!maximum) {
  let maximum = parseInt(prompt("Enter a valid number"));
}
let secret = Math.floor(Math.random() * maximum) + 1;

let userInput = parseInt(prompt("What is your guess"));
let attempts = 1;
while (parseInt(userInput) !== secret) {
  if (userInput.toString().toLowerCase() === "q") {
    break;
  }
  attempts++;
  if (userInput > secret) {
    userInput = prompt("Too high");
  } else {
    userInput = prompt("Too low");
  }
}
if (userInput.toString().toLowerCase() === "q") {
  console.log("You quit.");
} else
  console.log(
    `You guessed it right after ${attempts} attempts! The secret number is ${secret}`
  );
```

---

### **For Of**

###### [Start](#javascript) \ [Loops](#loops)

<br>

A nice and easy way of iterating over arrays (or other iterable objects).

Syntax:

```javascript
for (variables of iterable) {
  statement;
}

// example
for (let char of "hello world") {
  console.log(char);
}

// h
// e
// l
// l
// o
//
// w
// o
// r
// l
// d
```

for ...of is a lot better in iterating things:

```javascript
const subreddit = [
  "books",
  "games",
  "anmie",
  "cartoon",
  "manga",
  "esports",
  "dogs",
  "cars",
];

// using for loop

for (let i = 0; i < subreddit.length; i++) {
  console.log(`https://www.reddit.com/r/${subreddit[i]}`);
}

// using for of loop

for (let sub of subreddit) {
  console.log(`https://www.reddit.com/r/${sub}`);
}

// https://www.reddit.com/r/books
// https://www.reddit.com/r/games
// https://www.reddit.com/r/anmie
// https://www.reddit.com/r/cartoon
// https://www.reddit.com/r/manga
// https://www.reddit.com/r/esports
// https://www.reddit.com/r/dogs
// https://www.reddit.com/r/cars
```

###### [Start](#javascript) \ [Loops](#loops) \ [For ... of](#for-of)

<br>

more examples:

```javascript
const charChart = [
  ["Rebecca", "Jill", "Chris"],
  ["Leon", "Claire", "Ada"],
  ["Barry", "Moira", "Natalia"],
];

// for loop
for (let i = 0; i < charChart.length; i++) {
  const episode = charChart[i];
  console.log(`Episode ${i + 1}:`);
  for (let j = 0; j < episode.length; j++) {
    console.log(`             ${episode[j]}`);
  }
}

// for of loop

for (let episode of charChart) {
  let i = 1;
  console.log(`Episode ${i++}`);
  for (char of episode) {
    console.log(`          ${char}`);
  }
}
```

---

### **Iterating Over Objects**

###### [Start](#javascript) \ [Loops](#loops)

<br>

[Object](#objects) it self is mostly uniterable. But :

```javascript
const testScore = {
  jill: 99,
  chris: 83,
  leon: 98,
  claire: 84,
  barry: 93,
  moira: 82,
};

// this does not work on object!!!
for (let person of testScore) {
  console.log(person);
}

// this does works but gives only keys in the object
for (let person in testScore) {
  console.log(person);
}
// jill
// ...
// moira

// to access values
for (let person in testScore) {
  console.log(`${person} scored ${testScore[person]}`);
}
// jill scored 99
// ...
// moria scored 82

// far more useful methods ahead
```

Another option (a **method**) to iterate over object

```javascript
// gives all the keys
Object.keys(testScore);
// ["jill", "chris", ..., "moira"]

// give all the values
Object.values(testScore);
// [99, 83, ..., 82]

// gives all key-value pair
Object.entries(testScore);
// [["jill", 99], ["chris", 83], ..., ["moira", 82]]
```

Some examples:

###### [Start](#javascript) \ [Loops](#loops) \ [Iterating over objects](#iterating-over-objects)

```javascript
const testScore = {
  jill: 99,
  chris: 83,
  leon: 98,
  claire: 84,
  barry: 93,
  moira: 82,
};

// to get the total sum of all scores
let totalScore = 0;
for (let score of Object.values(testScore)) {
  totalScore += score;
}
console.log(`The total score is: ${totalScore}`);
// The total score is: 539

// to get the average we need total length of an Object
// since object doesn't have length (Object.length does not exist)
let totalParticipants = Object.keys(testScore).length;

// or just Simply,

let totalScore = 0;
let scores = Object.values(testScore);
for (let score of scores) {
  totalScore += score;
}
console.log(
  `The total score is ${totalScore} and the average is ${
    totalScore / scores.length
  }`
);
```

---

### To Do List App

###### [Start](#javascript) \ [Loops](#loops)

<br>

Write a broswer based To Do List application:

- "new" - add a new todo.
- "list" - list all todos.
- "delete" - remove specific todo.
- "quit" - quit app.

```javascript
let userInput = prompt("What would you like to do?");
const todo = ["House chores", "Walk the dog", "Car wash", "Groceries"];

// we can't use ||(or) in this situation, since it is while loop, we are testing inequality. If we use || here, one of the condition will be true and the loop will never stop! Thus we use andand
while (
  userInput.toLowerCase().trim() !== "quit" andand
  userInput.toLowerCase().trim() !== "q"
) {
  userInput = prompt("What would you like to do?");
  if (userInput.toLowerCase().trim() === "list") {
    console.log("==========================");
    if (todo.length === 0) {
      console.log("TODO is empty");
    } else
      for (let i = 0; i < todo.length; i++) {
        console.log(`${i}: ${todo[i]}`);
      }
    console.log("==========================");
  } else if (userInput.toLowerCase().trim() === "new") {
    const newTodo = prompt("Create a new TODO");
    todo.push(newTodo);
    console.log(`'${newTodo}' has been added to the list.`);
  } else if (userInput.toLowerCase().trim() === "delete") {
    let index = parseInt(
      prompt("Enter index for the TODO that you wish to delete!")
    );

    // if index is not a number OR index is undefined  run this code
    // while (true || true) : run this code
    // while (false || false) : end this code
    // unlike 'q' and 'quit' above I need both of the conditons to be false to end the code
    while (Number.isNaN(index) || todo[index] === undefined) {
      console.log("Invalid index!!");
      index = parseInt(prompt("Enter a valid index!!"));
    }
    const deletedTodo = todo.splice(index, 1);
    console.log(`${deletedTodo} has been removed from the TODO list.`);
  }
}

console.log("Good Bye!");

// more explanation

// while (true andand false)-> false -> end the loop
// while (true andand true)-> true -> loop
```

---

## **Functions**

###### [Start](#javascript)

<br>

Functions are **reusable procedures** (just reusable chunks of codes).

- Funtions allow us to write reusable modular codes.
- We define a chunk of codes that we can then execute at a later point.
- We can use them **ALL THE TIME**.
- Not all functions have names.

---

1. [Defining functions](#defining-functions)
2. [Working with arguments](#arguments)
3. [Functions and return values](#return-keyword)

---

### **Defining Functions**

###### [Start](#javascript) \ [Back to title](#functions)

<br>

Some simple example:

```javascript
// Since this is wonky JS, you can use function before defining it:
singSong(); // even if this works you should not do it!!!

// define a function
function singSong() {
  console.log("DO");
  console.log("RE");
  console.log("MI");
}

// execute the function
singSong();
```

---

### **Arguments**

###### [Start](#javascript) \ [Back to title](#functions)

<br>

We can also write functions that accepts inputs, called **arguments**.

```javascript
// without arguments

function greet() {
  console.log("Hello");
}
greet(); // "Hello"

// with argument

// the person is called parameter (not Argument) and it does not work outside of the function

function greet(person) {
  console.log(`Hello ${person}`);
}

// "Tim", 1234, undefined are arguments
greet("Tim"); // "Hello Tim"

// weird
greet(1234); // "Hello 1234"
greet(); // "Hello undefined"
```

#### **Multiple Arguments**

###### [Start](#javascript) \ [Back to title](#functions) \ [Arguments](#arguments)

<br>

The function with multiple parameters can still run even if we don't provide all the arguments as long as that argument is not necessary to run the function.

```javascript
function greet(firstName, midName, lastName) {
  console.log(`Hi, ${firstName[0]}${midName[0]}-${lastName}}`);
}
// we can ignore lastName argument in this function but not the first two.
greet("pyae", "sone", "thant"); // Hi, ps-thant

// another example

function repeat(msg, numTimes) {
  let finalMsg = "";
  for (let times of numTimes) {
    finalMsg += msg;
  }
  console.log(finalMsg);
}
```

---

#### **Return Keyword**

###### [Start](#javascript) \ [Back to title](#functions)

<br>

Built-in methods **return** values when we call them. When **Return** is called, the function will **stop the execution** and we can **store** the **return values**.

```javascript
// Without Return Values

function add(x, y) {
  console.log(x + y);
}

add(2, 2); // 4 -> this is just console.log

let total = add(2, 2);

console.log(total); // this will output undefined not 4 since we are not returning any values from the function, just console.logging
```

```javascript
// With Return Value

function add(x, y) {
  return x + y; // Return!!
}

const sum = add(10, 20);
sum; // 30

const answer = add(1, 2);
answer; // 3

// Return in condition

function add(x, y) {
  // better use typeof here instead of Number.isNan
  if (!Number.isNaN(x) || typeof y !== "number") {
    console.log(`x and y must be numbers`);
    return false;
  }
  let sum = x + y;
  return sum;
}
```

---

## Advance Functions

###### [Start](#javascript)

<br>

- [Scope](#scope)
  - [Function Scope](#function-scope)
  - [Block Scope](#block-scope)
  - [Lexical Scope](#lexical-scope)
- [Function Expressions](#function-expressions)
- [Higher Order Functions (Concentrate)](#higher-order-functions)
- [Returning Functions](#returning-functions)
- [Defining Methods](#defining-methods)
- [Keyword 'this' (Very Important)](#keyword-this)
- [Using Try/Catch](#try-and-catch)
- [Arrow Functions](#arrow-functions)

---

### **Scope**

###### [Start](#javascript) \ [Advance Functions](#advance-functions)

<br>

**Variable "Visibility"**

The **location** where a variable is defined dictates **where we have access to that variable**

- [Function Scope](#function-scope)
- [Block Scope](#block-scope)
- [Lexical Scope](#lexical-scope)

```javascript
function collectEggs() {
  let totalEggs = 6; // we define this variable inside the function
  console.log(`${totalEggs} eggs collected`);
}
collectEggs(); // 6 eggs collected
```

You cannot access the totalEggs variable from outside of the function

```javascript
function collectEggs() {
  let totalEggs = 6;
}
collectEggs();
console.log(`${totalEggs} eggs collected`); // totalEggs is not defined
```

```javascript
let totalEggs = 0;
function collectEggs() {
  totalEggs = 6;
}
collectEggs();
console.log(`${totalEggs} eggs collected`); // 6 eggs collected
```

---

#### **Function Scope**

###### [Start](#javascript) \ [Advance Functions](#advance-functions) \ [Scope](#scope)

<br>

msg is **scoped** to the helpMe() function

```javascript
function helpMe() {
  let msg = "I'm on fire";
  msg; // "I'm on fire"
}

msg; // NOT DEFINED!
```

bird is scoped to birdWatch() function

```javascript
const bird = "Sigmarus";

function birdWatch() {
  const bird = "Perna"; // we can use const since the variables are in different scope.!!
  console.log(bird);
}
birdWatch(); // "Perna"
console.log(bird); // "Sigmarus"
```

---

#### **Block Scope**

###### [Start](#javascript) \ [Advance Functions](#advance-functions) \ [Scope](#scope)

<br>

```javascript

if()/for()/while() {
  ...

   // Any variables inside the block '{}'; stay inside the block '{}'.

   ...
}

```

Some examples:

```javascript
for (let i = 0; i < 5; i++) {
  let msg = "GG";
  console.log(msg); // 5 x "GG"
}
console.log(msg); // ERROR!: msg is not defined

// another example
let radius = 10;
if (radius > 0) {
  const PI = 3.14;
  let circ = 2 * PI * radius;
}
console.log(radius); // 10
console.log(PI); // NOT DEFINED!
console.log(circ); // NOT DEFINED!

// PI and circ are scoped to BLOCK{}
```

What if we use **var** to delcare the [variable](#variables) instead of **let** or **const**

```javascript
for (var i = 0; i < 5; i++) {
  var msg = "GG";
  console.log(msg); // 5 x "GG"
}
console.log(msg); // "GG"

// IT WORKS!! What about i?

console.log(i); // 5

// This is why we don't use var and you shouldn't be.
```

---

#### **Lexical Scope**

###### [Start](#javascript) \ [Advance Functions](#advance-functions) \ [Scope](#scope)

<br>

Nested inner functions have access to the variables from the parent/outer functions, but not the other way around.

```javascript
function outer() {
  const nums = [1, 2, 3, 4, 5];
  function inner() {
    for (num of nums) {
      console.log(num);
    }
  }
  inner();
}
outer(); // 1 2 3 4 5
```

```javascript
function iliad() {
  const heroes = ["Archilies", "Hector", "Paris", "Menelaus"];
  function hallOfHeroes() {
    function list() {
      for (hero of heroes) {
        console.log(`Mighty ${hero}`);
      }
    }
    list();
  }
  hallofHeroes();
}

iliad();
```

---

### **Function Expressions**

###### [Start](#javascript) \ [Advance Functions](#advance-functions)

<br>

```javascript
// function with name as usual
function square(num) {
  return num * num;
}
square(3); // 9

// Function cannot exist without name/identifier; you will get a syntax error.
function (num){
  return num * num;
}

// but funtion without name works if it is in a variable
const square = function (num) {
  return num * num;
};
square(3); // 9


```

---

### **Higher Order Functions**

###### [Start](#javascript) \ [Advance Functions](#advance-functions)

<br>

Functions that **operates on/with** other functions. They can :

- Accepts other functions as arguments.
- [Return a function.](#returning-functions)

Function as arguments :

```javascript
function callTwice(func) {
  func();
  func();
}
function attack() {
  console.log("You attack the target.");
}
function rollDie() {
  const die = Math.floor(Math.random() * 6) + 1;
  console.log(die);
  return die;
}

callTwice(attack); // pass a function as an arg!

// "You attack the target."
// "You attack the target."

callTwice(rollDie);

// 1
// 3

// when passing function as an arg! You don't need parantheses!
callTwice(rollDie()); // This is very different

// if we put () when declaring arg! The function rollDie() will execute immediately and returns the number!

// So, it will end up like this
callTwice(4);
```

---

### **Returning Functions**

###### [Start](#javascript) \ [Advance Functions](#advance-functions) \ [Higher Order Functions](#higher-order-functions)

<br>

```javascript
function someFunction() {
  const rand = Math.random();
  if (rand > 0.5) {
    return function () {
      console.log("You are a big guy");
    };
  } else {
    return function () {
      console.log("Pretty small eh!");
    };
  }
}

const returnValue = someFunction();

returnValue; // now the return value hold the function

// To execute it

returnValue(); // "You are a big guy" or "Pretty small eh!"
```

Some more example: **factory function**

```javascript
// return true if num is between 1 and 10
function isNumBetween(num) {
  return num >= 1 andand num <= 10;
}

// between 50 and 100
function isNumBetween(num) {
  return num >= 50 andand num <= 100;
}

// instead of writing the isNumBetween functions above by ourselves, we gonna make a factory function.

// lets make a factory function called makeBetweenFunc
function makeBetweenFunc(min, max) {
  return function (num) {
    return num >= min andand num <= 10;
  };
}

// if we call makeBetweenFunc
// makeBetweenFunc(1, 18);

// // we get
// function (num) {
//     return num >= 1 andand num <= 18;
//   }

// So we save the return value
const isUnderage = makeBetweenFunc(1, 18);
isUnderage(20); // false
isUnderage(10); // true

const isAdult = makeBetweenFunc(18, 64);
isAdult(20); // true
isAdult(10); // false
```

---

### **Defining Methods**

###### [Start](#javascript) \ [Advance Functions](#advance-functions)

<br>

Functions that are stored in object properties are called “methods”.
We can add functions as properties on **objects**. We call them **methods**!

- **[Shortcut](#shorthand/shortcut)** for adding methods

**Fact** : Every method is a function but not all functions are methods.

```javascript
const math = {
  multiply: function (x, y) {
    return x * y;
  },
  divide: function (x, y) {
    return x / y;
  },
  square: function (x) {
    return x * x;
  },
};

// using function as a method on object
const someMath = math.multiply(2, 3); // 6

// function becomes a method if we put . infront of it
```

```javascript
const myMath = {
  PI: 3.14159,
  areaOfRectangle: function (s, l) {
    return s * l;
  },
  cube: function (x) {
    return x ** 3;
  },
};
```

#### **Shorthand/Shortcut**

###### [Start](#javascript) \ [Advance Functions](#advance-functions) \ [Defining Methods](#defining-methods)

<br>

We do this so often that there's a new shorthand way of adding methods.

```javascript
const myMath = {
  PI: 3.14159,
  areaOfRectangle(s, l) {
    return s * l;
  },
  cube(x) {
    return x ** 3;
  },
};

myMath.cube(2); // 8

const square = {
  area(side) {
    return side * side;
  },
  perimeter(side) {
    return side * 4;
  },
};
square.area(10); // 100;
```

---

### **Keyword This**

###### [Start](#javascript) \ [Advance Functions](#advance-functions)

<br>

> Before going to keyword "this", we have to know the difference between the method and the function and the object.

#### **Difference between method and regular function**

If function is part of the object it is called method, and if that function is in object, **"`this`"** keyword refers to the object

```javascript
// method -> object
// keyword "this" refers to the object itself

const video = {
  title: "a video object",
  // make play method
  play() {
    console.log(this);
  },
};
// stop method
video.stop = function () {
  console.log(this);
};

video.play(); // {title: 'a video object', play: ƒ, stop: ƒ}
video.stop(); // {title: 'a video object', play: ƒ, stop: ƒ}
```

Otherwise, if function is a regular function, i.e not a part of an object, **"`this`"** keyword refers to the global object (which is **window object** in **browsers** // or **global object** in **node**)

```javascript
function playVideo() {
  console.log(this);
}

playVideo(); // Window {window: Window, self: Window, document: document, name: '', location: Location, …}
```

<br>

Use the keyword **this** to access other properties on the same object.

> '**this**' is different in arrow function. [Learn more about this](#arrow-function-and-this)

```javascript
const person = {
  first: "Robert",
  last: "Junior",
  fullName() {
    return `${this.first} ${this.last}`;
  },
};

person.fullName(); // "Robert Junior"
person.last = "Downey Junior";
person.fullName(); // "Robert Downey Junior"
```

This is where the keyword '**this**' got more confusing.

> The value of **'this'** depends on the **invocation context** of the function it is used in.

```javascript
const car = {
  name: "Mercedes-Benz",
  year: "2020",
  model: "G-Wagon",
  buy() {
    return `You bought a  \`${this.name}\`: ${this.model}-${this.year}`;
  },
};

car.buy(); // " You bought a  `Mercedes-Benz`: G-Wagon-2020"

// but what if we store the function in another variable?

const buyAnother = car.buy;

buyAnother(); // "You bought a  ``: undefined-undefined,"

// this is becuase of the invocation of context
```

###### [Start](#javascript) \ [Advance Functions](#advance-functions)

When you are invoking differently '**this**' change its reference object.

```javascript
car.buy(); // in here "this" is referring to the object "car", left of the dot(.)

// "You bought a  `Mercedes-Benz`: G-Wagon-2020"
```

When calling buyAnother(), 'this' is referring to the object called '**window**' instead of '**car**', so you lost access to the properties from the car.

> "window" is the top level object in javascript. All the methods you write goes into the window object.

```javascript
buyAnother();

// you can see it like this

window.buyAnother(); // "this" referring window

// "You bought a  ``: undefined-undefined"
```

---

### **Try and Catch**

###### [Start](#javascript) \ [Advance Functions](#advance-functions)

<br>

Try/Catch is really important in [Async functions](async.md#handling-error-in-async-functions), nodes, express and AJAX.

```javascript
// hello is not defined and when you try to run this code you'll get

hello.toUpperCase(); // Uncaught Reference Error: hello is not defined

// this does not run since your code got into error.
console.log("After");

// Using try/catch can bypass your error and continues your code
try {
  hello.toUpperCase();
} catch {
  console.log("Some error");
}

console.log("After");

// output :: "Some error"
//        :: "After"
```

```javascript
function echoes(msg) {
  console.log(msg.toUpperCase().repeat(3));
}

ehoes("Hey "); // HEY HEY HEY
echoes(11221); // Uncaught TypeError

// So we can add try/catch to that
function echoes(msg) {
  try {
    console.log(msg.toUpperCase().repeat(3));
  } catch (e) {
    console.log("Please pass a String next time!");
    // console.log(e);
  }
}

echoes(11221); // "Please pass a String next time!"
```

---

## **Callbacks and Array Methods**

###### [Start](#javascript)

<br>

- [**ForEach**](#foreach-method) method. (**useful**)
- The [**map**](#map) method. (**Super useful**and use allover the place)
- [**Arrow functions**](#arrow-functions). (**Crucial**, but doesn't really realated to methods)
- [**setTimeout and setInterval**](#settimeout-and-setinterval)
- The [**filter**](#the-filter-method) method.
- [**Some and every**](#some-and-every-methods) methods.
- The [**reduce**](#the-notorious-reduce-method) method. (Nice but **intimidating**!!)
- [**Arrow function and 'this'**.](#arrow-function-and-this)

---

### ForEach method

###### [Start](#javascript) \ [Callbacks and Array Methods](#callbacks-and-arrays-methods)

<br>

Accepts a callback function. Calls the function once per element in the array.

```javascript
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// forEach pass the elements of an array directy into function
nums.forEach(function (n) {
  console.log(n * n);
  // 1, 4, 9, 16, 25, 49, 64, 81
});

nums.forEach(function (el) {
  console.log(el);
  // 1, 2, 3, 4, 5, 6, 7, 8, 9
});

// using arrow function
nums.forEach((el) => {
  if (el % 2 !== 1) {
    console.log(`${el} is even number`);
  }
  // 1, 2, 3, 4, 5, 6, 7, 8, 9
});

// using for of instead
for (let el of nums) {
  console.log(el);
  // 1, 2, 3, 4, 5, 6, 7, 8, 9
}

// otherway around, not necessary
function add5(n) {
  console.log(n + 5);
}
nums.forEach(add5);
// 6, 7, 8, 9, 10, 11, 12, 13, 14
```

Some movie example:  
example 1, example [2](#movie-example-2)

```javascript
const movies = [
  {
    title: "Extraction",
    score: 95,
  },
  {
    title: "John Wick",
    score: 100,
  },
  {
    title: "The Old Guard",
    score: 80,
  },
  {
    title: "James Bond",
    score: 85,
  },
  {
    title: "Mission Impossible",
    score: 75,
  },
];

movies.forEach((movie) => {
  console.log(`${movie.title} : ${movie.score}/100`);
});
```

---

### **Map**

###### [Start](#javascript) \ [Callbacks and Array Methods](#callbacks-and-array-methods)

<br>

**Create a new array** with the result of calling a **callback** on every element in the array.

> Fact: **Map** is very s**imilar to forEach** in a sense that it accepts **callback**. What difference is, it creates a new array.

```javascript
const randomTexts = ["lol", "ezpz", "ggwp", "nc try"];

const caps = randomTexts.map(function (t) {
  return t.toUpperCase(); // don't forget to return!!
});
randomTexts; // ["lol", "ezpz", "ggwp", "nc try"];
caps; // ["LOL", "EZPZ", "GGWP", "NC TRY"]
```

#### movie example 2

```javascript
const movies = [
  {
    title: "Extraction",
    score: 95,
  },
  {
    title: "John Wick",
    score: 100,
  },
  {
    title: "The Old Guard",
    score: 80,
  },
  {
    title: "James Bond",
    score: 85,
  },
  {
    title: "Mission Impossible",
    score: 75,
  },
];

movies.forEach((movie) => {
  console.log(`${movie.title} : ${movie.score}/100`);
});

// part 2 Map

const titles = movies.map((movie) => {
  return movie.title;
});

titles; // ["Extraction", "John Wick", "The Old Guard", "James Bond", "Mission Impossible"]
```

###### [Start](#javascript) \ [Callbacks and Array Methods](#callbacks-and-array-methods) \ [Map](#map)

<br>

**Map** is useful in situations where you need to alter the data of starting array without affecting it; you can use map to create a new array based on the data of starting array.

Some **map** pratices:

```javascript
function cleanNames(array) {
  return array.map((name) => {
    return name.trim();
  });
}
const names = cleanNames(["  john", " helen ", "bob ", "stuart     "]);
// ["john", "helen", "bob", "stuart"]
```

---

### **Arrow Functions**

###### [Start](#javascript) \ [Callbacks and Array Methods](#callbacks-and-array-methods) \ [Advance Functions](#advance-functions)

<br>

- [Implicit Return](#implicit-return)
  > Fact: No Internet Explore Support!

```javascript
// normal function
const square = function (num) {
  return num * num;
};

// arrow function
const square = (num) => {
  return num * num;
};

const add = (x, y) => {
  return x + y;
};

const rollDie = () => {
  return Math.floor(Math.random() * 6) + 1;
};
```

---

#### **Implicit Return**

###### [Start](#javascript) \ [Callbacks and Array Methods](#callbacks-and-array-methods) \ [Advance Functions](#advance-functions)

Arrow functions have implicit return, that does not work on normal functions.

All these functions do the same thing:

```javascript
const isEven = function (num) {
  return num % 2 === 0;
};

const isEven = (num) => {
  return num % 2 === 0;
};

// IMPLICIT RETURN
const isEven = (num) => (
  num % 2 === 0;
  )
// ONE-LINER IMPLICIT RETURN
const isEven = (num) => num % 2 === 0;

// Remember!Implicit returns does not work on normal functions.

// And they only works with just a single line of code, 1 return value

const rollDie = () => Math.floor(Math.random() * 6) + 1;
```

```javascript
const movies = [
  {
    title: "Extraction",
    score: 95,
  },
  {
    title: "John Wick",
    score: 100,
  },
  {
    title: "The Old Guard",
    score: 80,
  },
  {
    title: "James Bond",
    score: 85,
  },
  {
    title: "Mission Impossible",
    score: 75,
  },
];

movies.forEach((movie) => {
  console.log(`${movie.title} : ${movie.score}/100`);
});

// part 2 Map

const titles = movies.map((movie) => {
  return movie.title;
});

titles; // ["Extraction", "John Wick", "The Old Guard", "James Bond", "Mission Impossible"]

// IMPLICIT RETURN

const newFormat = movies.map((movie) => `${move.title} - ${movie.score / 10}`);

newFormat;
//["Extraction - 9.5", "John Wick - 10", "The Old Guard - 8", "James Bond - 8.5", "Mission Impossible - 7.5"]
```

---

### **setTimeout and setInterval**

###### [Start](#javascript) \ [Callbacks and Array Methods](#callbacks-and-array-methods)

<br>

**setTimeout** needs to pass two things in; first a **callback** and second the number of miliseconds to **delay** the execution of the function.

syntax:

```javascript
setTimeout(callback, timeout?:number)
```

```javascript
setTimeout(() => {
  console.log("GoodBye");
}, 3000);

console.log("Helllo");

// this code prints "Hello" immediately and after 3 sec it prints "GoodBye"
```

setInterval also needs to pass two thing, callback and delay.

syntax:

```javascript
setInterval(callback, timeout?:number)
```

```javascript
setInterval(() => {
  console.log(Math.random());
}, 2000);

// this generate a random number every two seconds

// to stop the execution, we need another method called clearInterval()

const id = setInterval(() => {
  console.log(Math.random());
}, 2000);

clearInterval(id); // this stops the code
```

---

### **The Filter Method**

###### [Start](#javascript) \ [Callbacks and Array Methods](#callbacks-and-array-methods)

<br>

Creates a new array with all elements that pass the test (**true** or **false**) implemented by the provided function.

[Some filter exercises](#filter-ex)

```javascript
const nums = [9, 8, 7, 6, 5, 4, 3, 2, 1];
const odds = nums.filter((n) => {
  return n % 2 === 1; // our callback return true or false.
  // if it returns true, n is added to the filtered array.
});
odds; // [9, 7, 5, 3, 1]

const smallNums = nums.filter((n) => n < 5);
smallNums; // [4, 3, 2, 1]
```

```javascript
const games = [
  { title: "The Last Of Us", score: 94, year: 2013 },
  { title: "Assassin's Creed IV: Black Flag", score: 96, year: 2013 },
  { title: "Kingdom Come: Deliverance", score: 91, year: 2018 },
  { title: "The Witcher 3: Wild Hunt", score: 100, year: 2015 },
  { title: "Fallout 4", score: 93, year: 2015 },
  { title: "Skyrim", score: 96, year: 2011 },
  { title: "Horizon Zero Dawn", score: 95, year: 2017 },
  { title: "No Man's Sky", score: 60, year: 2016 },
  { title: "Fallout 76", score: 43, year: 2018 },
  { title: "Warcraft III: Reforged", score: 21, year: 2020 },
];

const wge = games.filter((game) => game.score <= 60;);

const bge = games.filter((game) => {
  return game.score >= 95;
});

console.log(`Worst games ever`);
for (games of wge) {
  console.log(`${games.title}`);
}

console.log(`Best games ever`);
for (games of bge) {
  console.log(`${games.title}`);
}
// Worst games ever:
//           No Man's Sky
//           Fallout 76
//           Warcraft III: Reforged
// Best games ever:
//           Assassin's Creed IV: Black Flag
//           The Witcher 3: Wild Hunt
//           Skyrim
//           Horizon Zero Dawn

// using map
const bestGameTitles = bge.map(game => game.title);

// map + filter

const bgt = games.filter(game=> game.score>= 95;).map(game=> game.title);

// and you can indent it like this

const bgt = games
              .filter(game=> game.score>= 95;)
              .map(game=> game.title);


```

#### _Filter Ex_

###### [Start](#javascript) \ [Callbacks and Array Methods](#callbacks-and-array-methods) \ [The Filter Method](#the-filter-method)

<br>

Write a function called validUserNames() that accepts an array of usernames(strings). **It should return a new array, containing only the usernames that are less than 10 characters.**

```javascript
//for example :
validUserNames([
  "mark",
  "staceysmom19821121",
  "qwwq22123141",
  "carrie98",
  "MoanaFan",
]);
// ["mark", "carrie98", "MoanaFan"]
```

```javascript
const validUserNames = (userNames) => {
  return userNames.filter((userName) => userName.length < 10);
};
```

---

### Some And Every Methods

###### [Start](#javascript) \ [Callbacks and Array Methods](#callbacks-and-array-methods)

<br>

#### **Some**

Similar to **[every](#every)**, but returns true if **ANY** of the array elements pass the test function.

```javascript
const words = ["dog", "log", "cabbage", "sweet tooth", "jep"];

// Are there any words longer than 4 characters?
words.some((word) => word.length > 4); // true

// Do any words start with 'Z'
words.some((word) => word[0] === "Z"); // false

// Do any words contain tooth
words.some((word) => word.includes("tooth")); // true
```

---

#### **Every**

Test whether **all elements** in the array pass the provided function. It returns a **[boolean](#boolean)** value.

```javascript
const words = ["dog", "log", "bag", "wag"];

words.every((word) => word.length === 3); // true

words.every((word) => word[0] === "d"); // false

// lastletter === g

words.every((word) => word[2] === "g"); // true

// or

words.every((word) = >{
  let lastLetter = word[word.length-1];
  return lastLetter === 'g';
}); // true
```

###### [Start](#javascript) \ [Callbacks and Array Methods](#callbacks-and-array-methods) \ [Some and Every Methods](#some-and-every-methods)

<br>

```javascript
// Every

const allEvens = (nums) => {
  return nums.every((num) => num % 2 === 0);
};

allEvens(2, 4, 6, 8); // true
allEvens(1, 2, 4, 6, 8); // false
```

---

### **The Notorious Reduce Method**

###### [Start](#javascript) \ [Callbacks and Array Methods](#callbacks-and-array-methods)

<br>

Executes a reducer function on each element of the array, **resulting in a single value**.

> [Examples](#examples)

### Syntax

```javascript
reduce(calbackfn, initialValue);

// the callbackfn needs to parameters

reduce((previousValue, currentValue) => {
  fn;
}, initialValue);
```

#### Summing an arry

```javascript
[3, 5, 7, 9, 11].reduce((accumulator, currentValue) => {
  return accumulator + currentValue;
});
```

| Callback    | accumulator | currentValue | return value |
| :---------- | :---------: | :----------: | :----------: |
| first call  |      3      |      5       |      8       |
| second call |      8      |      7       |      15      |
| third call  |     15      |      9       |      24      |
| fourth call |     24      |      11      |      35      |

---

#### Examples

###### [Start](#javascript) \ [Callbacks and Array Methods](#callbacks-and-array-methods) \ [Reduce Method](#the-notorious-reduce-method)

<br>

- [sum](#sum-the-total-price)
- [min/max](#finding-minimum-and-maximum-price)
- [best game](#find-best-game)
- [initial value](#giving-initial-value)

#### Sum the total prices

```javascript
const prices = [9.99, 4.99, 1.5, 12.99, 49.99, 35];

// without reduce, we can do for loop
let total = 0;
for (let price of prices) {
  total = +price;
}
console.log(Math.floor(total)); // 114

// With reduce method

const total = prices.reduce((total, currentPrice) => {
  return total + currentPrice;
});

console.log(Math.floor(total)); // 114
```

#### Finding minimum and maximum price

###### [Start](#javascript) \ [Callbacks and Array Methods](#callbacks-and-array-methods) \ [Reduce Method](#the-notorious-reduce-method) \ [Examples](#examples)

<br>

```javascript
const prices = [9.99, 4.99, 1.5, 12.99, 49.99, 35];

const minPrice = prices.reduce((min, price) => {
  if (price < min) {
    return price;
  }
  return min;
});

const maxPrice = prices.reduce((max, price) => {
  if (price > max) {
    return price;
  }
  return max;
});
console.log(`Lowest price - ${minPrice}`);
console.log(`Highest price - ${maxPrice}`);
```

#### Find best game

###### [Start](#javascript) \ [Callbacks and Array Methods](#callbacks-and-array-methods) \ [Reduce Method](#the-notorious-reduce-method) \ [Examples](#examples)

<br>

```javascript
const games = [
  { title: "The Last Of Us", score: 94, year: 2013 },
  { title: "Assassin's Creed IV: Black Flag", score: 96, year: 2013 },
  { title: "Kingdom Come: Deliverance", score: 91, year: 2018 },
  { title: "The Witcher 3: Wild Hunt", score: 100, year: 2015 },
  { title: "Fallout 4", score: 93, year: 2015 },
  { title: "Skyrim", score: 96, year: 2011 },
  { title: "Horizon Zero Dawn", score: 95, year: 2017 },
  { title: "No Man's Sky", score: 60, year: 2016 },
  { title: "Fallout 76", score: 43, year: 2018 },
  { title: "Warcraft III: Reforged", score: 21, year: 2020 },
];

const bestGame = games.reduce((best, current) => {
  if (current.score > best.score) {
    return current;
  }
  return best;
});

bestGame; // {title: "The Witcher 3: Wild Hunt", score: 100, year: 2015}
```

#### Giving Initial Value

###### [Start](#javascript) \ [Callbacks and Array Methods](#callbacks-and-array-methods) \ [Reduce Method](#the-notorious-reduce-method) \ [Examples](#examples)

<br>

```javascript
const evens = [2, 4, 6, 8];

// const sum = evens.reduce((total, current) => {
//   return total + current;
// });
// sum; // 20

const sum = evens.reduce((total, current) => total + current, 100);
sum; // 120
```

---

### **Arrow function and this**

###### [Start](#javascript) \ [Callbacks and Array Methods](#callbacks-and-array-methods) \ [Keyword 'This'](#keyword-this)

<br>

'**this**' in normal function:

```javascript
const person = {
  firstName: "Viggo",
  lastName: "Mortensen",
  fullName: function () {
    console.log(this); // person{firstName, lastName, fullName: f}
    return `${this.firstName} ${this.lastName}`;
  },
};

person.fullname(); // "Viggo Mortensen"
```

'**this**' in arrow function:

```javascript
const person = {
  firstName: "Viggo",
  lastName: "Mortensen",
  fullName: () => {
    console.log(this); // Window
    return `${this.firstName} ${this.lastName}`;
  },
};

person.fullname(); // "undefined undefined"
```

###### [Start](#javascript) \ [Callbacks and Array Methods](#callbacks-and-array-methods) \ [Keyword 'This'](#keyword-this) \ [Arrow Function and 'this'](#arrow-function-and-this)

<br>

> If we look at the setTimeout(), 'this' is working. It is because we declared the shoutName() as a normal function.

```javascript
const person = {
  firstName: "Viggo",
  lastName: "Mortensen",
  fullName: () => {
    console.log(this); // Window
    return `${this.firstName} ${this.lastName}`;
  },
  shoutName: function () {
    setTimeout(() => {
      console.log(this); // person{firstName, lastName, fullName: f}
      console.log(this.fullName());
    }, 3000);
  },
};
```

###### [Start](#javascript) \ [Callbacks and Array Methods](#callbacks-and-array-methods) \ [Keyword 'This'](#keyword-this) \ [Arrow Function and 'this'](#arrow-function-and-this)

<br>

> This is why, we don't use arrow functions while defining methods.

```javascript
const person = {
  firstName: "Viggo",
  lastName: "Mortensen",
  fullName: function () {
    console.log(this); // person{firstName, lastName, fullName: f}
    return `${this.firstName} ${this.lastName}`;
  },
  shoutName: function () {
    setTimeout(() => {
      console.log(this); // person{firstName, lastName, fullName: f}
      console.log(this.fullName());
    }, 3000);
  },
};

person.shoutName(); // "Viggo Mortensen" after 3 sec delay
```

---

## **Newer Js Features**

###### [Start](#javascript)

<br>

- [Default Params](#default-params)
- [Spread](#spread) (crucial)
  - [Spread in Function Calls](#spread-in-function-calls)
  - [Spread with Array Literals](#spread-with-array-literals)
  - [Spread with Objects](#spread-with-objects)
- [Rest Params](#rest)
- [Destructuring](#destructuring) (crucial)
  - [Destructuring Arrays](#destructuring-arrays)
  - [\*Destructuring Objects](#destructuring-objects) (pratical and commonly used)
  - [Destructuring Params](#destructuring-params)

---

### **Default Parameters**

###### [Start](#javascript) \ [Newer JS Features](#newer-js-features)

<br>

Often when we write a function, we'll have some **parameter** and it may be **optional**. If a user passes it in, we'll use it. And if they dont, we'd like to give it a **default value**.

```javascript
// With no default param
function rollDie(numSides) {
  return Math.floor(Math.random() * numSides) + 1;
}
rollDie(); // NaN

// With default param
function rollDie(numSides = 6) {
  return Math.floor(Math.random() * numSides) + 1;
}
rollDie(); // 1-6
rollDie(20); // 1-20
```

> The order matters in giving default params. The default parameters must always come after the first parameter or second or ... .

```javascript
const greet = (msg, person) => {
  console.log(`${msg}, ${person}!`);
};

greet("Hello", "Bear"); // "Hello, Bear!"

// Giving msg a default value of "Hi"
const greet = (msg = "Hi", person) => {
  console.log(`${msg}, ${person}!`);
};

greet("Bear"); // "Bear, undefined!"

// The order matter and since default param (msg) is the first param, "Bear" is going to be msg and the person will be undefined.

// fix
const greet = (person, msg = "Hi") => {
  console.log(`${msg}, ${person}!`);
};
greet("Bear"); // "Hi, Bear!"
```

---

### Spread

###### [Start](#javascript) \ [Newer JS Features](#newer-js-features)

<br>

Spread syntax allows an iterable such as an array to be **expended** in places where zero or more arguments (for function calls), or eletements (for array literals) are expected. Or an object expression to expanded in places where zero or more key-value pairs (for object literal) are expected.

- [Spread in Function Calls](#spread-in-function-calls)
- [Spread in Array Literals](#spread-in-array-literals)
- [Spread with Objects](#spread-with-objects)

Syntax

```javascript
( ... iterable\String\array etc )
```

---

#### **Spread in Function Calls**

###### [Start](#javascript) \ [Newer JS Features](#newer-js-features) \ [Spread](#spread)

<br>

```javascript
const nums = [9, 3, 2, 8];
// Without Spread!
Math.max(nums); // NaN
// Math.max([9, 3, 2, 8])

// With Spread!
Math.max(...nums); // 9
// Math.max(9, 3, 2, 8)

// Strings
console.log("Hello"); // 'Hello'
// With Spread!
console.log(..."Hello"); // H e l l o
```

---

### Spread in Array Literals

###### [Start](#javascript) \ [Newer JS Features](#newer-js-features) \ [Spread](#spread)

<br>

**Creates a new array** using an existing array. Spreads the elements from one array into a new array.

```javascript
const melee = ["Machete", "Dagger", "Bludgeon"];
const range = ["Bow", "Pistol", "Sniper Rifle", "Revolver"];

const allWeapons = [...melee, ...range];
allWeapons; //["Machete", "Dagger", "Bludgeon", "Bow", "Pistol", "Sniper Rifle", "Revolver"];

// you can manually add new things to array too
const allWeapons = [...melee, ...range, "Assult Rifle", "Baseball Bat"];
allWeapons; //["Machete", "Dagger", "Bludgeon", "Bow", "Pistol", "Sniper Rifle", "Revolver", "Assult Rifle", "Baseball Bat"];

// copying
const meleeCopy = [...melee];

// ["Hello"]
// [..."Hello"]
// ["H", "e", "l", "l", "o"]
```

---

### Spread in Objects Literals

###### [Start](#javascript) \ [Newer JS Features](#newer-js-features) \ [Spread](#spread)

<br>

Copies properties from one object to another object literal.

```javascript
const feline = { legs: 4, family: "Felidae" };
const canine = { isFurry: true, family: "Caninae" };

const catDog = { ...feline, ...canine, isLoyal: true };

catDog; // {legs: 4, family: "Caninae", isFurry: true, isLoyal: true}

// canine comes last, overwritting the family of feline
```

An example why we copy objects with spread

```javascript
// When someone sign up in your website, and you want to add some extra information to the registrating data.
const registrationData = {
  userName: "klanman",
  email: "Jamee.fraser@gmail.com",
  password: "000010110claire",
};

// you can add the additional information with spread in object
const newUser = { ...registrationData, id: 12345, isAdmin: false };
```

---

### Rest

###### [Start](#javascript) \ [Newer JS Features](#newer-js-features)

<br>

_Looks like [spread](#spread), but it's not!!_

**Rest parameter(...)** collect all the remaining elements (passing arguments) into an array.

```javascript

function add (arg1, arg2){
  reutrn arg1 + arg2
}
add(1,2); // 3

add(1,2,2,5); // 3
```

Js allow us to call **any numbers of arguments** but only the first two arguments are counted and the **rest is ignored**.

---

###### [Start](#javascript) \ [Newer JS Features](#newer-js-features) \ [Rest Param](#rest)

<br>

With rest parameter(...), we can gather any number of arguments into an array and do what we want with them.

We can modify the add() function with rest(...) like this:

```javascript
function add(...args) {
  return args.reduce((total, arg) => total + arg);
}

add(1, 2, 2, 5); // 10
```

**Note**: Rest param(...) have to be the last argument. Since it collects all the remaining/excess arguments into array. So having a function like this would not make sense and it errors out:

```javascript

function add(x, ...args, y){
  ...
  return;
}
```

Since rest param(...) gives us an array, we can use array methods like array.find etc.

```javascript
function xyz(x, y, ...z) {
  console.log(x, " ", y); // hey hello

  console.log(z); // ["wassup", "goodmorning", "hi", "howdy"]
  console.log(z[0]); // wassup
  console.log(z.length); // 4
}

xyz("hey", "hello", "wassup", "goodmorning", "hi", "howdy");
```

---

### Destructuring

###### [Start](#javascript) \ [Newer JS Features](#newer-js-features)

<br>

A short clean syntax to **unpack**:

- [values from arrays](#destructuring-arrays)
- [properties from objects](#destructuring-objects) (more commonly used and pratical then destructuring array)

into distinct variables.

---

#### Destructuring arrays

###### [Start](#javascript) \ [Newer JS Features](#newer-js-features) \ [Destructuring](#destructuring)

<br>

```javascript
const score = [993, 921, 839, 832, 819, 787, 782, 756];

const mvp = score[0]; //993
const second = score[1]; // 921
const third = score[2]; //839
```

It's a tedious job to manually reassign these values from array into distinct variables. Luckily, we can use destructuring to make it easy.

```javascript
const score = [993, 921, 839, 832, 819, 787, 782, 756, 612, 589];

// The '*order' matters in array destructuring
const [mvp, second, third, ...rest] = score;
mvp; // 993
second; // 921
third; // 839
rest; // [832, 819, 787, 782, 756, 612, 589]
```

---

#### Destructuring Objects

###### [Start](#javascript) \ [Newer JS Features](#newer-js-features) \ [Destructuring](#destructuring)

<br>

```javascript

const user = {
  username: 'klansman',
  email: 'johndoe@gmail.com'
  password: '12201039jd'
  pin: 9432,
  phone: 99381123,
  firstName: "John",
  lastName: "Doe",
  birthDay: "12/March/1992"
  bio: "Lorem ipsum dolar sit amat."
  city: "San Francisco",
  state: "California"
}
```

Usually we extract the key value pair of an object like this:

```javascript
const firstName = user.firstName;
const lastName = user.lastName;
const email = user.email;
...
```

But we can easily fetch the necessary data with **destructuring**:

```javascript
const email = user.email;
// is equalvilance to
const { email } = user;

// to fetch multiple values
const { firstName, lastName, email, bio, phone } = user;

// to rename variables
const { birthDay: dateOfBirth, phone: tel } = user;
birthDay; // not defined! error
dateOfBirth; // "12/March/1992"
```

To give default value

```javascript
const user2 = {
  username: 'birdie',
  email: 'birdie@gmail.com'
  password: '22039bd'
  pin: 1154,
  firstName: "Jane",
  lastName: "Doe",
  birthDay: "21/June/1996"
};

const {username, email, birthDay, bio} = user2;
bio;// undefined
```

Since we do not have bio in user2, bio is undefined and thus we can give it a default value.

```javascript
const { bio = "This user does not have a bio", phone: tel = "N/A" } = user2;
tel; // "N/A" default value
```

---

### Destructuring Params

###### [Start](#javascript) \ [Newer JS Features](#newer-js-features) \ [Destructuring](#destructuring)

<br>

```javascript
const jacobite = { firstName: "James",
middleName: "Alexander Malcolm",
secondClanName: "Mackenzie"
clan: "Fraser",
country: "Scottland"
};

// Destructuring param ({})
const fullName = ({firstName, middleName, secondClanName, clan})=>{
  return `{${firstName} ${middleName} ${secondClanName} ${clan}}`
}

fullName(jacobite);
// James Alexander Malcolm Mackenzie Fraser
```

some example:

```javascript
const games = [
  { title: "The Last Of Us", score: 94, year: 2013 },
  { title: "Assassin's Creed IV: Black Flag", score: 96, year: 2013 },
  { title: "Kingdom Come: Deliverance", score: 91, year: 2018 },
  { title: "The Witcher 3: Wild Hunt", score: 100, year: 2015 },
  { title: "Fallout 4", score: 93, year: 2015 },
  { title: "Skyrim", score: 96, year: 2011 },
  { title: "Horizon Zero Dawn", score: 95, year: 2017 },
  { title: "No Man's Sky", score: 60, year: 2016 },
  { title: "Fallout 76", score: 43, year: 2018 },
  { title: "Warcraft III: Reforged", score: 21, year: 2020 },
];
```

Using destructuring param in [filtering](#the-filter-method)

```javascript
games.filter((game) => {
  return game.score >= 90;
});

// to

games.filter(({ score }) => score >= 90);
```

In [map](#map)

```javascript
games.map((game) => {
  return `${game.title}(${game.year}) is rated ${game.score}`;
});

// to

games.map(({ title, year, score }) => {
  return `${title}(${year}) is rated ${score}`;
});
```

---
