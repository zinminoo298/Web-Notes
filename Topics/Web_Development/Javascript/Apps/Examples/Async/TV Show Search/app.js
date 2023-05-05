const form = document.querySelector("#searchForm");
const display = document.querySelector("#display");
const st = document.querySelector("#searchTerm");
// with .then
// form.addEventListener("submit", function (e) {
//   e.preventDefault();
//   console.log(form.elements.Q.value);
//   const userInput = form.elements.Q.value;
//   axios
//     .get(`https://api.tvmaze.com/singlesearch/shows?q=${userInput}`)
//     .then((res) => {
//       return res.data.image.medium;
//     })
//     .then((img) => {
//       const newImg = document.createElement("IMG");
//       newImg.src = img;
//       document.body.append(newImg);
//     });
// });

// with async

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  // reset the movie list
  const movieList = Array.from(display.childNodes);
  reset(movieList);
  try {
    const userInput = form.elements.Q.value;
    // we can sperate the params from url and put them in an object for more usability
    const config = { params: { q: userInput } };
    const res = await axios.get(`https://api.tvmaze.com/search/shows`, config);
    displayImages(res.data);
    console.log(res.data);
    setTitle(userInput);
    form.elements.Q.value = "";
  } catch (error) {
    console.log("Error : ", error);
  }
});

// Display search term
const setTitle = (title) => {
  st.textContent = `TV shows list for: "${title}"`;
};

// // Display images as result of search term (SIMPLE)
// const displayImages = (results) => {
//   for (let result of results) {
//     // make sure to display any other shows even if one show didnt have image
//     if (result.show.image) {
//       const img = document.createElement("IMG");
//       img.src = result.show.image.medium;
//       display.append(img);
//     }
//   }
// };

// Display images as result of search term (COMPLEX)
const displayImages = (results) => {
  for (let result of results) {
    // make sure to display any other shows even if one show didnt have image
    if (result.show.image) {
      const img = document.createElement("IMG");
      const showTitle = document.createElement("H6");
      const div = document.createElement("DIV");
      const card = document.createElement("DIV");
      const cardBody = document.createElement("DIV");

      showTitle.innerHTML = result.show.name;
      img.src = result.show.image.medium;

      display.append(div);
      div.classList.add("col-3", "mb-1");
      div.append(card);
      card.classList.add("card", "h-100");
      card.style.width = "18rem";
      card.append(img, cardBody);
      img.classList.add("card-img-top");
      cardBody.classList.add("card-body");
      cardBody.append(showTitle);
      showTitle.classList.add("card-title");
    }
  }
};

// function to reset the movie list
const reset = (cNodes) => {
  // removing each childnodes from the display section
  for (let node of cNodes) {
    node.remove();
  }
};
