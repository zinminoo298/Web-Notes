### **E1**

#### [back](./async.md#fakerequest-using-callbacks)

<br>

**SELF**

```javascript
const fakeRequestCallback = (url, success, failure) => {
  const delay = Math.floor(Math.random() * 4500) + 500;
  setTimeout(() => {
    if (delay > 4000) {
      // if delay is > 4000, passed the string to failure callback function
      failure("Connection Time Out!");
    } else success(`Here is your fake data from ${url}`);
  }, delay);
};

// failure("Connection Time Out!"); And success(`Here is your fake data from &{url)`) are both arguments to passed into success and failure callback functions

fakeRequestCallback(
  "books.com",
  // success callback function, where response is the argument `Here is ... ${url}` from above.
  (response) => {
    console.log("Connection Successful!");
    console.log(response);
  },
  // failure callback function, where err is the argument `Connection Time Out!` from above.
  (err) => {
    console.log("404 Not Found");
    console.log("err");
  }
);
```

> Note: Its simple yet mind boggling if overthink.

**UDEMY**

guys, i finally understood why in **`failure('Connection Timeout')`** he passed string in.

And the root of missunderstanding is laid on our perception of simple (regular) understanding of function which imply that function has to be decalred with parameter first, and only after that executed with value of parameter.

it looks like that:

declaring f with parameter "para":

```javascript
function myFunction(para) {
  console.log(para);
}

//and execution (calling):
```

```javascript
myFunction("i am a value of para"); // results 'i am a value of para'
```

That was the pattern in our brains to use functions (declaration, then execution).

But in the function **`"fakeRequestCallBack"`** Colt uses inner execution of function "**`failure("Connection Timeout")`**" with paranthesis with value in. So it is not declaration, it is execution of inner function failure.

And then when Colt calls the outer function fakeRequestCallBack with inner functions, he like assigns parameter for the function and call it response. response is a parameter, the value of which is that f\*\*\*g string

---

### **E2**

#### [back](async.md#upgrades-from-callback-to-promises-to-async-and-await)

callbacks method

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

Using [Promises](async.md#creating-our-own-promises)

```javascript
// Creating our own promises
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

Promises with Async and [Await](async.md#2-await)

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
  colorChange("teal", 1000);
}

// Dont forget to call the function!!
shifts();
```

---

### E3

To understand this, Just consider an array Eg : numbers = [1,2,3,4,5,6].

Now when we want to access any element particularly, we use its index.

Like numbers[0] gives 1.

Now let me put that index in a variable named index.

let index = 0

Now when I do the same numbers[index] .

Here instead of mentioning 0 directly, I am using the variable index. So when executing this line the compiler gets the value of variable index and then gets the value of numbers at that index.

Now consider the same thing for objects.

suppose I have a object obj={ 2020: 'BAD'} , to get the value of 2020 in the obj object, I can directly write obj[2020] which gives BAD or instead I can put that 2020 in a variable birthYear or any other name and try and access it like:

let birthYear = 2020;
obj[birthYear]
The compiler then gets the value of variable birthYear and then gets the value obj with that key.

Similarly, subreddit here is a variable. So we need to use [] notation so that the value of subreddit is retrieved before evaluating the whole expression.

When I use a dot notation, like subData.subreddit, compiler will not understand that subreddit is a variable that has the property name we are searching for. Instead it will search for a property named subreddit directly in reddit data. As there is no property called subreddit in subData, the compiler evaluates that to undefined.

---

### E4

```javascript
module.exports  = fn =>{
    return(req,res,next){
        fn(req,res,next).catch(next)
    }
}
```

It returns a new function that accepts (req, res, next), and inside of it, we invoke the passed func argument with those (req, res, next) values (which we get from the Express.js middleware when we use it in our routes).

Then, we attach the .catch() method which will be executed if an error happens in the route function that we pass to catchAsync as the func argument (for example, let's say a mongoose database query fails and triggers an error). Then, in .catch() we have it call the next function where the error object will be passed and our app error handler is going to be triggered.

In short, we created catchAsync so we can use it as a wrapper for callback functions when defining our routes (in app.js), so it can catch any errors and pass them to next, i.e. the Express.js error handler.

---

### E5

`join() `and `map()` are two known JavaScript array methods. `join()` concatenates all elements of an array into a single string, using a separator to that string that is passed as the argument of that method (if there's any argument; if no argument is passed, the strings are concatenated with a comma between them, the default separator of that method). For example:

```javascript
const elements = ['Fire', 'Air', 'Water'];
elements.join() // expected output: "Fire,Air,Water"
elements.join('') // expected output: "FireAirWater"
elements.join('-') // expected output: "Fire-Air-Water"
Examples and further explanations are found here.
```

`map()` iterates through an array and applies a function passed to that method to each element of the array, one at a time, returning a new array with the modifications. For example:

```javascript
const numbers = [1, 2, 3, 4];
const doubled = numbers.map(item => item \* 2); // each item of the numbers array is multiplied by 2
console.log(doubled); // [2, 4, 6, 8]
```
