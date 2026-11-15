import express from "express";
import { getAllMovies, getMovieById, createMovie } from "../controller/movie.controller.js";
import multer from "../middlewares/multer.middleware.js"
import authMiddleware from "../middlewares/auth.middleware.js";
<<<<<<< Updated upstream
const movie_router = express.Router()
=======
import authorized from "../middlewares/authorisation.middleware.js";
const movie_router = express.Router();
>>>>>>> Stashed changes

movie_router.get("/", getAllMovies);
movie_router.get("/:id", getMovieById);
movie_router.post("/create", multer.single("poster"), createMovie);

export default movie_router