import express from "express";
import {
  getAllMovies,
  getMovieById,
  createMovie,
  editMoviePoster,
  updateMovie,
  deleteMovie,
} from "../controller/movie.controller.js";
import multer from "../middlewares/multer.middleware.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import authorized from "../middlewares/authorized.middleware.js";
const movie_router = express.Router();

movie_router.get("/", authMiddleware, getAllMovies);
movie_router.get("/:id", authMiddleware, getMovieById);
movie_router.patch(
  "/:id/edit-poster",
  authMiddleware,
  authorized("ADMIN", "SUPER_ADMIN"),
  multer.single("poster"),
  editMoviePoster,
);
movie_router.patch(
  "/:id/update",
  authMiddleware,
  authorized("ADMIN", "SUPER_ADMIN"),
  updateMovie,
);
movie_router.delete(
  "/:id/delete",
  authMiddleware,
  authorized("ADMIN", "SUPER_ADMIN"),
  deleteMovie
);
movie_router.post(
  "/create",
  authMiddleware,
  authorized("ADMIN", "SUPER_ADMIN"),
  multer.single("poster"),
  createMovie,
);

export default movie_router;
