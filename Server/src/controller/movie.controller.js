import Movie from "../models/movie.model.js";
import asyncHandler from "../util/asyncHandler.util.js";
import { uploadImage } from "../util/cloudinary.util.js";
import apiError from "../util/error.util.js";
import fs from "fs/promises";

const getAllMovies = asyncHandler(async (req, res) => {
  const movies = await Movie.find();
  if(!movies || movies.length === 0) {
    throw new apiError("No movies found", 404);
  }
  res.json(movies);
})

const getMovieById = asyncHandler(async (req, res) => {
  const movie = await Movie.findById(req.params.id);  
  if(!movie) {
    throw new apiError("Movie not found", 404);
  }
  res.json(movie);
})

const createMovie = asyncHandler(async (req, res) => {

  const movieData = req.body;
  console.log("Movie data:", movieData);
  const posterPath = req.file ? req.file.path : null; // Assuming the image is sent as a file in the request
  if (!posterPath) {
    throw new apiError("Poster image is required", 400);
  }
  // console.log("Poster path:", posterPath);
  const posterUploadResult = await uploadImage(posterPath); 
  if(!posterUploadResult || !posterUploadResult.secure_url) {
    throw new apiError("Failed to upload poster image", 500);
  }

  const movie = new Movie({
    ...movieData,
    posterUrl: posterUploadResult.secure_url,
  });
   console.log("Movie object to be saved:", movie);
  const createdMovie = await movie.save();
  await fs.unlink(posterPath); // Delete the temporary file after uploading
  res.status(201).json({"movie has been created":createdMovie._id});
});


export { getAllMovies, getMovieById, createMovie };