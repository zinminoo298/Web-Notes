// #2
const joke = require("give-me-a-joke");
const colors = require("colors");

// #3
joke.getRandomCNJoke(function (joke) {
  // #4
  console.log(joke.rainbow);
});
