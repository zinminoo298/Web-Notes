const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/movieApp")
  .then(() => {
    console.log("Mongoose Running");
  })
  .catch((error) => console.log(`Connection Error : ${error}`));

const movieSchema = new mongoose.Schema({
  title: String,
  year: Number,
  score: Number,
  rating: String,
  netflix: Boolean,
});

const Movie = mongoose.model("Movie", movieSchema);

// const theAdamProject = new Movie({
//   title: "The Adam Project",
//   year: 2022,
//   score: 6.7,
//   rating: "PG-13",
//   netflix: true,
// });

// // #3
// theAdamProject.save();

// const arr = [
//   {
//     title: "The Batman",
//     year: 2022,
//     score: 8.3,
//     rating: "G",
//     netflix: false,
//   },
//   {
//     title: "Spider-Man: No Way Home",
//     year: 2021,
//     score: 8.5,
//     rating: "G",
//     netflix: false,
//   },
//   {
//     title: "Dune",
//     year: 2021,
//     score: 8.1,
//     rating: "PG-13",
//     netflix: false,
//   },
//   {
//     title: "Don't Look Up",
//     year: 2021,
//     score: 7.2,
//     rating: "R",
//     netflix: true,
//   },
//   {
//     title: "Amadeus",
//     year: 1984,
//     score: 8.2,
//     rating: "R",
//     netflix: false,
//   },
// ];

// Movie.insertMany(arr)
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((e) => {
//     console.log("Error @_@", e);
//   });
