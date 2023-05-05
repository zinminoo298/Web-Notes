// Refactored

// create player one and player two objects
const p1 = {
  score: 0,
  button: document.querySelector("#p1Button"),
  display: document.querySelector("#p1Display"),
};
const p2 = {
  score: 0,
  button: document.querySelector("#p2Button"),
  display: document.querySelector("#p2Display"),
};

// variables for target score and reset button
const resetButton = document.querySelector("#reset");
const targetScore = document.querySelector("#targetScore");

// default winning score and game status
let wScore = 3;
let isGameOver = false;

// set winning score with the target score select
targetScore.addEventListener("change", function () {
  wScore = parseInt(this.value);
  reset();
});

// Generic function for updating scores
function updateScores(player, opponent) {
  if (!isGameOver) {
    player.score += 1;
    if (player.score === wScore) {
      isGameOver = true;
      player.display.classList.add("has-text-success");
      opponent.display.classList.add("has-text-danger");
      player.button.disabled = true;
      opponent.button.disabled = true;
    }
    player.display.textContent = player.score;
  }
}

// Reset function
function reset() {
  isGameOver = false;
  for (let p of [p1, p2]) {
    p.score = 0;
    p.display.textContent = p.score;
    p.display.classList.remove("has-text-success", "has-text-danger");
    p.button.disabled = false;
  }
}

p1.button.addEventListener("click", function () {
  updateScores(p1, p2);
});

p2.button.addEventListener("click", function () {
  updateScores(p2, p1);
});

resetButton.addEventListener("click", reset);

// Previous code

// const p1Display = document.querySelector("#p1Display");
// const p2Display = document.querySelector("#p2Display");
// const p1Button = document.querySelector("#p1Button");
// const p2Button = document.querySelector("#p2Button");
// const resetButton = document.querySelector("#reset");
// const targetScore = document.querySelector("#targetScore");

// let p1Score = 0;
// let p2Score = 0;
// let wScore = 3;
// let isGameOver = false;

// targetScore.addEventListener("change", function (e) {
//   wScore = parseInt(this.value);
//   reset();
// });
// p1Button.addEventListener("click", function (e) {
//   if (!isGameOver) {
//     p1Score += 1;
//     if (p1Score === wScore) {
//       isGameOver = true;
//       p1Display.classList.add("has-text-success");
//       p2Display.classList.add("has-text-danger");
//       p1Button.disabled = true;
//       p2Button.disabled = true;
//     }
//     p1Display.textContent = p1Score;
//   }
// });

// p2Button.addEventListener("click", function (e) {
//   if (!isGameOver) {
//     p2Score += 1;
//     if (p2Score === wScore) {
//       isGameOver = true;
//       p1Display.classList.add("has-text-danger");
//       p2Display.classList.add("has-text-success");
//       p1Button.disabled = true;
//       p2Button.disabled = true;
//     }
//     p2Display.textContent = p2Score;
//   }
// });

// resetButton.addEventListener("click", reset);

// function reset() {
//   p1Score = 0;
//   p2Score = 0;
//   p1Display.textContent = p1Score;
//   p2Display.textContent = p2Score;
//   isGameOver = false;
//   p1Display.classList.remove("has-text-success", "has-text-danger");
//   p2Display.classList.remove("has-text-success", "has-text-danger");
//   p1Button.disabled = false;
//   p2Button.disabled = false;
// }
