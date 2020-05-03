const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  name: String,
  poster: String,
  overview: String,
  genres: [String],
  trailer: {
    url: String,
    name: String,
  },
  release_date: String,
});

mongoose.model("Movies", movieSchema);
