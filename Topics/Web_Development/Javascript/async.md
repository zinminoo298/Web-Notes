[NodeJS](../node.js/node.md) || [Javascript Basics](./js.md) || [DOM](./dom.md) || [**Async**](./async.md) || [AJAX](ajax.md) || [Prototypes, Classes & OOP](prototype_classes_oop.md)

# **Async Javascript**

1. [The Call Stack](#the-call-stack)
2. [Single Threaded JS and Web Apis](#single-threaded-js-and-web-apis)
3. [Callback Hell](#callback-hell)
4. [Upgrades from callback -> promises -> async/await](#upgrades-from-callback-to-promises-to-async-and-await)
5. [FakeRequest using **Callbacks** (Real Life Scenario Callback Hell example)](#fakerequest-using-callbacks)
6. [FakeRequest using **Promises**[New to Js]](#promises)
7. [Creating Our Own Promises (Not as important as using them)](#creating-our-own-promises)
8. [Async Functions(New to Js)](#async-functions)
9. [Handling Error in Async Functions](#handling-error-in-async-functions)

### **The Call Stack**

<br>

Its a mechanism the javascript interpeter use to keep track of its place in a script that call multiple functions.
That is, what function is currently being run and what functions are called from within that function, etc.

> The call stack is not the physical thing that we look at, it's underlying all of our code. It's a structured tool that help javascript keep its place in our code and our function calls. It is just a representation and tool for us to view.

```javascript
const multiply = (x, y) => x * y;
const square = (x) => multiply(x, x);
const isRightTriangle = (a, b, c) => {
  square(a) + square(b) === square(c);
};

//use the code at Loupe to visualize the call stack
```

> Use LOUPE (http://latentflip.com/loupe/) to visualize/check the call stack/event loop/callback queue.

---

### **Single Threaded JS and Web Apis**

##### [Start](#)

<br>

Javascrpit is **Single Threaded** - at any given time, JS can run at most one line of code.

```javascript
console.log("This is the first line");
setTimeout(function () {
  console.log("This is third line after 3 seconds");
}, 3000);
console.log("This is the second");

// The output of this code

// > This is the first line
// > This is the second line
// > This is the third line after 3 seconds
```

If JS **is single threaded** how does it works when there is a function like `setTimeout` that wait for cetain amount of time before it runs.

It is because the **broswer does the work(web APIs)**. The js will tell the broswer that the code has the `setTimeout function` and the browser counts the time, while the rest of the code in js is running. Then when the times up the browser will remind JS for the callback function, and the js will run that callback.

> Agaub Use LOUPE (http://latentflip.com/loupe/) to visualize/check the call stack and webAPIS.

---

### **Callback Hell**

##### [Start](#)

<br>

We gonna change the background color of web page every 1 second.

```javascript
// most dumb way to do.
setTimeout(() => {
  document.body.style.backgroundColor = "red";
}, 1000);
setTimeout(() => {
  document.body.style.backgroundColor = "green";
}, 2000);
setTimeout(() => {
  document.body.style.backgroundColor = "blue";
}, 3000);
```

Nest them inside

```javascript
setTimeout(() => {
  document.body.style.backgroundColor = "red";
  setTimeout(() => {
    document.body.style.backgroundColor = "green";
    setTimeout(() => {
      document.body.style.backgroundColor = "blue";
    }, 1000);
  }, 1000);
}, 1000);

// If setTimeout of another function is inside the setTimeout, they will run after one another instead of simultaneously.
```

Make a generic function in case of different time out and usabilty.

```javascript
const colorChange = (newColor, delay) => {
  setTimeout(() => {
    document.body.style.backgroundColor = newColor;
  }, delay);
};

// and we can call the function and it works
colorChange("red", 1000);
// only green gonna display if 1000
// colorChange("green", 1000);

//same dumb way as above\
colorChange("green", 2000);
colorChange("blue", 3000);
```

We nest these functions inside and make a lot of callback functions

```javascript
const colorChange = (newColor, delay, doNext) => {
  setTimeout(() => {
    document.body.style.backgroundColor = newColor;
    // incase if the doNext is not passed in in colorChnage function
    doNext && doNext();
  }, delay);
};

colorChange("red", 1000, () => {
  colorChange("green", 1000, () => {
    colorChange("blue", 1000, () => {
      colorChange("yellow", 1000, () => {
        colorChange("indigo", 1000, () => {
          // here we do not pass doNext function anymore
          colorChange("violet", 1000);
        });
      });
    });
  });
});
```

### **Upgrades from callback to promises to async and await**

^ [**Upgrading the callbacks to promises.**](#creating-our-own-promises)

^ ^ [**Upgrading the promises with async and await.**](#2-await)

[comparing all 3 methods](explanations.md#e2)

---

### **FakeRequest using callbacks**

##### [Start](#)

<br>

Refs :[E1](./explanations.md#e1)

> The callback hell of Javascript

```javascript
const fakeRequestCallback = (url, success, failure) => {
  const delay = Math.floor(Math.random() * 4500) + 500;
  setTimeout(() => {
    if (delay > 4000) {
      // if delay is > 4000, passed the string to failure callback function
      failure("Error '404' not found");
    } else success(`Here is your fake data from ${url}`);
  }, delay);
};

//callback hell
fakeRequestCallback(
  "books.com",
  (response) => {
    console.log("Connection Successful!");
    console.log(response);
    fakeRequestCallback(
      "books.com/witcher",
      (response) => {
        console.log("Connection Successful!");
        console.log(response);
        fakeRequestCallback(
          "books.com/witcher/page1",
          (response) => {
            console.log("Connection Successful!");
            console.log(response);
          },
          (err) => {
            console.log("Connection Timeout!");
            console.log(err);
          }
        );
      },
      (err) => {
        console.log("Connection Timeout!");
        console.log(err);
      }
    );
  },
  (err) => {
    console.log("Connection Timeout!");
    console.log(err);
  }
);
```

---

### **Promises**

##### [Start](#)

<br>

A **`Promise`** is an object representing the eventual **completion** or **failure** of an **asynchronous operation**.

**fakeRequest Using Promises**

> The nesting and complexity will be resolved in [next](#clearing-the-nestings) codeblock

```javascript
// promise function
const fakeRequestPromise = (url) => {
  return new Promise((resolve, reject) => {
    const delay = Math.floor(Math.random() * 4500) + 500;
    setTimeout(() => {
      if (delay > 4000) {
        reject("Error '404' not found.");
      } else resolve(`Here is your fake data from ${url}`);
    }, delay);
  });
};

// Same nesting and complexity but this will be resolved in next codeblock
fakeRequestPromise("books.com/witcher/page1")
  .then(() => {
    console.log("Connection Successful");
    fakeRequestPromise("books.com/witcher/page2")
      .then(() => {
        console.log("Connection Successful");
        fakeRequestPromise("books.com/witcher/page3")
          .then(() => {
            console.log("Connection Successful");
          })
          .catch(() => {
            console.log("Connection Timeout!");
          });
      })
      .catch(() => {
        console.log("Connection Timeout!");
      });
  })
  .catch(() => {
    console.log("Connection Timeout!");
  });
```

#### **Clearing the nestings**

Simply return the promise function in **`.then `** and we can use **`.then`** one after another to request multiple data. Also we only need one **`.catch`**.

```javascript
// promise function
const fakeRequestPromise = (url) => {
  return new Promise((resolve, reject) => {
    const delay = Math.floor(Math.random() * 4500) + 500;
    setTimeout(() => {
      if (delay > 4000) {
        reject("Error '404' not found.");
      } else resolve(`Here is your fake data from ${url}`);
    }, delay);
  });
};

fakeRequestPromise("books.com/witcher/page1")
  // data here is the String argument that we passed in the resolve
  .then((data) => {
    console.log("Connection Successful!");
    console.log(data);
    return fakeRequestPromise("books.com/witcher/page2");
  })
  .then((data) => {
    console.log("Connection Successful!");
    console.log(data);
    return fakeRequestPromise("books.com/witcher/page3");
  })
  .then((data) => {
    console.log("Connection Successful!");
    console.log(data);
  })
  // err here is the String argument that we passed in the reject
  .catch((err) => {
    console.log("Connection Timeout!");
    console.log(err);
  });
```

---

### **Creating Our Own Promises**

##### [start](#) / [colorChange with callback](#callback-hell)

<br>

```javascript
// Creating our own Promises
const colorChange = (newColor, delay) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      document.body.style.backgroundColor = newColor;
      resolve();
    }, delay);
  });
};

// Using Promises

colorChange("red", 1000)
  // we could return like this
  .then(() => {
    return colorChange("green", 1000);
  })
  // or we can use explicit return for single line arrow function
  .then(() => colorChange("blue", 1000))
  .then(() => colorChange("yellow", 1000))
  .then(() => colorChange("indigo", 1000))
  .then(() => colorChange("violet", 1000))
  .then(() => colorChange("orange", 1000))
  .then(() => colorChange("teal", 1000));
```

---

### **Async Functions**

##### [Start](#)

<br>

Newer and cleaner syntax to work with async code! Syntax "**`makeup`**" for ["**`promises`**"](#promises).

#### **TWO KEYWORDS**

1.  [**ASYNC**](#1-async)
2.  [**AWAIT**](#2-await)

#### **1. Async**

- Async functions always return a **promise**.
- If function returns a value, the promise will be resolved/fullfilled with that value
- If function throws an exception, the promise will be rejected

```javascript
async function greet()=>{
  return "Hey Mister!"
}
hello(); // promise {<fullfilled>: "Hey Mister!"}
hello().then(greeting => console.log(greeting)); // "Hey Mister"

async function antag()=>{
  throw new Error("You ain't scaring anybody!")
}
antag(); // Promise {<rejected>: Error: "You ain't scaring anybody!"}
antag().catch(error => console.log(error)); // "You ain't scaring anybody!"
```

Demo login scenario

```javascript
const login = async (username, password) => {
  if (!username || !password) throw Error("Missing Credentials");
  if (password === "admin") return "Welcome";
  throw Error("Invalid Password");
};

login("test", "admin")
  .then((msg) => {
    console.log("Logged In : ", msg);
  })
  .catch((err) => {
    console.log("ERROR", err);
  });
```

---

#### **2. Await**

##### [Start](#) / [async functions](#async-functions)

<br>

- **Await** will pause the execution of the function, **waiting for a promise to be resolved**.

```javascript
// setTimeout does not automatically return promises, so We still need to create promises and return a resolve value
const colorChange = (newColor, delay) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      document.body.style.backgroundColor = newColor;
      resolve();
    }, delay);
  });
};

// We create async function here to call the colorChange and return resolve when its done chaning the color.
async function shifts() {
  colorChange("red", 1000);
}
// this will change the background to red after 1 second and return resolved

// But if we do this they are not gonna wait each other and happen at the same time
async function shifts() {
  colorChange("red", 1000);
  colorChange("green", 1000);
}

// So we put await infront of the colorChange and it will pause the execution until current function is resolved and till we get the value back.
async function shifts() {
  await colorChange("red", 1000);
  await colorChange("green", 1000);
  await colorChange("blue", 1000);
  await colorChange("yellow", 1000);
  await colorChange("indigo", 1000);
  await colorChange("violet", 1000);
  await colorChange("orange", 1000);
  await colorChange("teal", 1000);
}

// **** DONT FORGET TO CALL THE FUNCTION ****
shifts();

const printColorChange = async () => {
  await shifts();
  console.log("The Color Chaning is Complete");
};
```

Why not change the colorChange into Async too? But its not gonna work.

```javascript
const colorChange = async (color, delay) {
  // but notice that setTimeout is inside the async function, and it does not return resolve and reject on its own
  // so we still need to ceate promise
    setTimeout(function() {
        document.body.style.backgroundColor = color;
        console.log(`${color} worked! for ${delay}ms`);
        return 'async worked';
    }, delay)

}
async function shifts() {
  await colorChange("red", 1000);
  await colorChange("green", 1000);
  await colorChange("blue", 1000);
  await colorChange("yellow", 1000);
  await colorChange("indigo", 1000);
  await colorChange("violet", 1000);
  await colorChange("orange", 1000);
  await colorChange("teal", 1000);
}
```

---

### **Handling Error in Async Functions**

##### [Start](#) / [async functions](#async-functions)

<br>

Use [**`Try/Catch`**](js.md#try-and-catch) to handle the error in async functions

```javascript
const fakeRequest = (url) => {
  return new Promise((resolve, reject) => {
    const delay = Math.floor(Math.random() * 4500) + 500;
    if (delay > 4000) {
      reject("Cannot find the contents.");
    } else {
      resolve(`Here is your data from fake Request : ${url}`);
    }
  });
};

const makeTwoRequest = async () => {
  try {
    let data0 = await fakeRequest(
      "Https://www.mangakanta.com/Omniscient_Reader_View_Point/page1"
    );
    console.log(data0);
    let data1 = await fakeRequest(
      "Https://www.mangakanta.com/Omniscient_Reader_View_Point/page2"
    );
    console.log(data1);
  } catch (error) {
    console.log("Caungt an error :", error);
  }
};
```

---

##### [Start](#)
