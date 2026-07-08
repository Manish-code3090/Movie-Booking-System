import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: String,
  description: String,
  duration: Number, // minutes
  language: [String],
  genre: [String],
  releaseDate: Date,

  formats: [
    {
      type: String,
      enum: ["2D", "3D", "IMAX"]
    }
  ],

  posterUrl: String,
  trailerUrl: String
});

const Movie = mongoose.model("Movie", movieSchema);
export default Movie;