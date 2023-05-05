// https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png
// firstgen: 1 - 151;
// secondgen: 152 - 251;
// thirdgen: 252 - 386;
// 4: 387 - 493;
// 5: 494 - 649
// 6: 650 - 721;
// 7: 722 - 809
// 8: 810 - 898

const pokeGen = document.querySelectorAll(
  "#firstGen, #secondGen, #thirdGen, #fourthGen, #fifthGen, #sixthGen, #seventhGen, #eighthGen"
);
const baseUrl =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

// convert Nodelist into array with spread
// const pokeGenArray = [...pokeGen];

// or use Array.from() method
const pokeGenArray = Array.from(pokeGen);

// function to generate pokemons
const createPokemon = (num, currentGen) => {
  const pokemon = document.createElement("div");
  pokemon.classList.add("poke-slot");

  const pokeID = document.createElement("span");
  pokeID.textContent = `#${num}`;

  const newImg = document.createElement("img");
  newImg.src = `${baseUrl}${num}.png`;

  pokemon.append(newImg, pokeID);
  currentGen.append(pokemon);
};

// loop pokeGenArray to go through each gen
pokeGenArray.forEach((gen) => {
  if (gen.id === "firstGen") {
    for (let i = 1; i < 152; i++) {
      createPokemon(i, gen);
    }
  } else if (gen.id === "secondGen") {
    for (let i = 152; i < 252; i++) {
      createPokemon(i, gen);
    }
  } else if (gen.id === "thirdGen") {
    for (let i = 252; i < 387; i++) {
      createPokemon(i, gen);
    }
  } else if (gen.id === "fourthGen") {
    for (let i = 387; i < 494; i++) {
      createPokemon(i, gen);
    }
  } else if (gen.id === "fifthGen") {
    for (let i = 494; i < 650; i++) {
      createPokemon(i, gen);
    }
  } else if (gen.id === "sixthGen") {
    for (let i = 650; i < 722; i++) {
      createPokemon(i, gen);
    }
  } else if (gen.id === "seventhGen") {
    for (let i = 722; i < 809; i++) {
      createPokemon(i, gen);
    }
  } else if (gen.id === "eighthGen") {
    for (let i = 810; i < 898; i++) {
      createPokemon(i, gen);
    }
  }
});
