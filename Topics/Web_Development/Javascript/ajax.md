[NodeJS](../node.js/node.md) || [Javascript Basics](./js.md) || [DOM](./dom.md) || [Async](./async.md) || [**AJAX**](ajax.md) || [Prototypes, Classes & OOP](prototype_classes_oop.md)

# **AJAX and API's**

    AJAX - Asynchronous Javascript and XML :: old
    AJAJ - Asynchronous Javascript and JSON(javascript object notation) :: new, current

> JSON formatter - https://jsonformatter.curiousconcept.com/

1. [JSON](#json)

### Useful API's

#### **Making Requests**

1. [**fetch**](#fetch) - buit-in, easy request making, fetch data from urls, works with **[promises](async.md#promises)**.
2. [**Axios**](#axios) - newer/popular way of making request, and it is a library(Yes it is more of a library than an API). **Also better than fetch**.

#### **_Customer Experience_**

1. Send Message(sms), direct phone calls, emails, videos, ...etc : [twilio](https://www.twilio.com/)

---

[**TV Show Search App**](#tv-show-search-app)

---

### **JSON**

##### [Start](#)

<br>

#### How to turn **json string into js object** or **js object into json string**

```javascript
// a string of JSON
const data = {...}

// turn JSON string into js Object
const parsedData = JSON.parse(data)

// turn js Object into JSON string
const jsonData = JSON.stringify(parsedData)
// By default, all instances of "undefined" are replaced with "null".
```

---

### **fetch**

##### [Start](#) / [Useful API's](#useful-apis)

<br>

Fetching JSON data from swapi website using **`fetch`**

```javascript
// fetch api return promise, and it is resolved immediately as soon as it gets the headers
fetch("https://swapi.dev/api/people/1")
  .then((res) => {
    // we need the json from the res, so we must call this function after fetch
    res.json().then((data) => {
      // res.json()also return a promise, and the JSON is already parsed.
      console.log(`This is json data`, data);
    });
  })
  .catch((e) => {
    console.log(`Error`, e);
  });
```

Refactored and make second fetch

```javascript
fetch("https://swapi.dev/api/people/1")
  .then((res) => {
    // we can just return this JSON data we get from res for next .then
    return res.json();
  })
  .then((data) => {
    console.log("This is JSON data from first fetch", data);
    return fetch("https://swapi.dev/api/people/2");
  })
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log("This is JSON data from second fetch", data);
  })
  .catch((e) => {
    console.log(`Error`, e);
  });

// dont trip yourself! its simple
```

With [async/await](async.md#async-functions)

```javascript
const getSwChars = async () => {
  const res = await fetch("https://swapi.dev/api/people/1");
  const data = await res.json();
  console.log(data);
  const res2 = await fetch("https://swapi.dev/api/people/2");
  const data2 = await res2.json();
  console.log(data2);
};

// dont forget to call the function
getSwChars();
```

### **DON'T FORGET** to use `try/catch` in async function to handle error

```javascript
const getSwChars = async () => {
  try {
    const res = await fetch("https://swapi.dev/api/people/1");
    const data = await res.json();
    console.log(data);
    const res2 = await fetch("https://swapi.dev/api/people/2");
    const data2 = await res2.json();
    console.log(data2);
  } catch (e) {
    console.log("Error :", e);
  }
};

// dont forget to call the function
getSwChars();
```

---

### **Axios**

##### [Start](#) / [Useful API's](#useful-apis)

<br>

Link to Axio Library ("https://github.com/axios/axios")

After installing axio to our app, we can use it to make requests just like [fetch](#fetch). And it will be alot easier and less steps to get our data.

```javascript
axios
  .get("https://swapi.dev/api/people/1")
  .then((res) => {
    // axios return an object
    console.log(res);
    // and if you look at the res object in console
    // you will see it already contains the JSON object in the key named "data"
    // and that JSON object is already parsed
    // and we can look at JSON object directly from res
    console.log(res.data);
  })
  .catch((e) => {
    console.log("error", e);
  });
```

Making async function, and add custom id

```javascript
const getSwChars = async (id) => {
  try {
    const res = await axios.get(`https://swapi.dev/api/people/${id}`);
    console.log(res.data);
  } catch (e) {
    console.log(e);
  }
};

getSwChars(10);
```

---

### **Setting Headers with Axios**

##### [Start](#)/ [Useful API's](#useful-apis)

<br>

To get the json from https://icanhazdadjoke.com/ we have to configure the header as stated in [api document](https://icanhazdadjoke.com/api). Otherwise we will just get the html as data.

Configuring the header:

```javascript
// we have to pass in the header as second argument in axios.get (other types can pass in too)
const getDadJoke = async () => {
  // to make header more clear to pass in we put it in config variable which contain header object that contain Accept
  const config = { headers: { Accept: "application/json" } };
  const res = await axios.get("https://icanhazdadjoke.com/", config);
  // to view joke
  console.log(res.data.joke);
};
```

[ Dad Joke App](./Apps/Examples/Async/Dad%20Joke/dad_joke.html) (Dont make too many requests in small APIs (be respectful))

```javascript
const getDadJoke = async () => {
  const config = { headers: { Accept: "application/json" } };
  const res = await axios.get("https://icanhazdadjoke.com/", config);
  return res.data.joke;
};

const updateJoke = async () => {
  const jokeText = await getDadJoke();
  const joke = document.querySelector("#joke");
  joke.textContent = jokeText;
};

const button = document.querySelector("#jButton");
button.addEventListener("click", updateJoke);
```

---

### **TV Show Search App**

##### [Start](#)
