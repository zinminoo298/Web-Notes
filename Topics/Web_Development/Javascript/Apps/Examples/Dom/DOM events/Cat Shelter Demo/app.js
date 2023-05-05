const shelterForm = document.querySelector("#shelterForm");
const newCat = document.querySelector("#newCat");
const catList = document.querySelector("#cats");

shelterForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // get cat name from text input
  const catName = newCat.value;

  // create new li for the cat
  const newLi = document.createElement("LI");
  newLi.innerText = catName;

  // add new cat to the list
  catList.append(newLi);

  // set the text input to blank again after submit
  newCat.value = "";
});
