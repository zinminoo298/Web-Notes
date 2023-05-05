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
