const express = require("express");
const route = express.Router();
route.use(express.json());
const mongoose = require("mongoose");
const UserModel = mongoose.model("User");
const MovieModel = mongoose.model("Movies");
//auth is a middleware for verifying the token
const auth = require("../middleware/auth");
const _ = require("lodash");
const api = require("../api/MoviesAPI");

//gets a movie from the api
route.get("/", auth, async (req, res) => {
  try {
    const movies = await MovieModel.find();
    res.send(movies);
  } catch (e) {
    res.send(e);
  }
});

// const Movie = (movie) =>
//   new Promise(async (resolve, reject) => {
//     try {
//       let {
//         data: {
//           data: {
//             artworks,
//             translations,
//             genres,
//             id,
//             release_dates: release_date,
//             trailers: trailer,
//           },
//         },
//       } = await movie;

//       const Poster = (URL) => `https://artworks.thetvdb.com${URL}`;

//       const poster = Poster(artworks[0].url);

//       if (genres.length) genres = genres.map((item) => item.name);

//       if (release_date.length) {
//         release_date = release_date.filter(
//           (item) => item.country == "global"
//         )[0];
//       }

//       const eng_translation = _.find(
//         translations,
//         (item) => item.language_code == "eng"
//       );
//       if (poster == null || eng_translation == null || release_date == null) {
//         reject();
//       }

//       if (Date.parse(release_date.date) < Date.parse("2019-1-1")) reject();

//       if (trailer.length) trailer = trailer[0];

//       let _movie = {
//         id,
//         name: eng_translation.name,
//         poster,
//         overview: eng_translation.overview,
//         genres,
//         release_date: release_date.date,
//         trailer,
//       };

//       resolve(_movie);
//     } catch (e) {
//       console.log(e);
//       reject("something went wrong");
//     }
//   });

// const charging = async () => {
//   for (i = 2608; i < 3525; i++) {
//     let id = i;
//     await Movie(api.get(`movies/${id}`))
//       .then(async (_movie) => {
//         let movie = new MovieModel(_movie);
//         await movie.save();
//         console.log(id);
//       })
//       .catch((e) => {
//         console.log(id, e);
//       });
//   }
// };
// charging();

module.exports = route;
