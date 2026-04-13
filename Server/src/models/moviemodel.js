import mongoose from "mongoose";

const movieSchima = new mongoose.Schema({

  title: String,
  description: String,
  duration: Number, // minutes
  language: [String],
  genre: [String],
  releaseDate: Date,

  formats: ["2D", "3D", "IMAX"],

  posterUrl: String,
  trailerUrl: String
  
})