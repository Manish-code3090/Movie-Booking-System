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

const updateMovie = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const movieData = req.body;
  const movie = await Movie.findByIdAndUpdate(id, movieData, { new: true });
  if (!movie) {
    throw new apiError("Movie not found", 404);
  }
  res.json(movie);
});

const editMoviePoster = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const posterPath = req.file ? req.file.path : null;
  if (!posterPath) {
    throw new apiError("Poster image is required", 400);
  }
  const posterUploadResult = await uploadImage(posterPath);
  if(!posterUploadResult || !posterUploadResult.secure_url) {
    throw new apiError("Failed to upload poster image", 500);
  }
  const movie = await Movie.findByIdAndUpdate(id, { posterUrl: posterUploadResult.secure_url }, { new: true });
  if (!movie) {
    throw new apiError("Movie not found", 404);
  }
  res.json(movie);
});

const deleteMovie = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const movie = await Movie.findByIdAndDelete(id);
  if (!movie) {
    throw new apiError("Movie not found", 404);
  }
  res.json({"message": "Movie deleted successfully"});
});

export { getAllMovies, getMovieById, createMovie, updateMovie, editMoviePoster, deleteMovie };