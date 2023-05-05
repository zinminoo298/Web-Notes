const container = document.querySelector("#container");
const button = document.querySelector("#colorButton");

const randomColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
};

button.addEventListener("click", function (e) {
  container.style.backgroundColor = randomColor();
  e.stopPropagation();
});

container.addEventListener("click", function (e) {
  container.classList.toggle("hide");
});
