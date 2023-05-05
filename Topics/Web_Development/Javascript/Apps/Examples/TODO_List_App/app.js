let userInput = prompt("What would you like to do?");
const todo = ["House chores", "Walk the dog", "Car wash", "Groceries"];

// we can't use ||(or) in this situation, since it is while loop, we are testing inequality. If we use || here, one of the condition will be true and the loop will never stop! Thus we use &&
while (
  userInput.toLowerCase().trim() !== "quit" &&
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

// while (true && false)-> false -> end the loop
// while (true && true)-> true -> loop
