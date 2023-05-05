// #1
const args = process.argv.slice(2);

// #2
const greet = (args) => {
  for (arg of args) {
    console.log(`Hello ${arg}`);
  }
};

greet(args);
