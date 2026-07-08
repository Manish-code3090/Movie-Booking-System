import express from "express";
import { getAllMovies, getMovieById, createMovie } from "../controller/movie.controller.js";
import multer from "../middlewares/multer.middleware.js"
const movie_router = express.Router()

movie_router.get("/", getAllMovies);
movie_router.get("/:id", getMovieById);
movie_router.post("/create", multer.single("poster"), createMovie);

export default movie_router