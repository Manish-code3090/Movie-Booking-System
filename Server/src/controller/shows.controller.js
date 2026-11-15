import Show from "../models/showmodel.js";
import Movie from "../models/movie.model.js";
import Screen from "../models/screen.model.js";
import asyncHandler from "../util/asyncHandler.util.js";
import apiError from "../util/error.util.js";
import { checkShowConflicts } from "../util/show.util.js";

export const createShow = asyncHandler(async (req, res) => {
  const {
    movie,
    theater,
    screen,
    startTime,
    bufferTime = 15 * 60 * 1000,
  } = req.body;
  if (!movie || !theater || !screen || !startTime) {
    throw new apiError("Missing required fields", 400);
  }
  await checkShowConflicts(screen, theater, startTime, movie, bufferTime);

  if (overlappingShow) {
    throw new apiError("Show time conflicts with existing show", 400);
  }

  const show = new Show({
    movie,
    theater,
    screen,
    startTime,
    endTime: endTimeDate,
  });

  const createdShow = await show.save();
  res.status(201).json(createdShow);
});

export const getAllShows = asyncHandler(async (req, res) => {
  const shows = await Show.find()
    .populate("movie", "title duration")
    .populate("screen", "name");
  res.json(shows);
});
export const getShowById = asyncHandler(async (req, res) => {
  const show = await Show.findById(req.params.id)
    .populate("movie", "title duration")
    .populate("screen", "name");
  if (!show) {
    throw new apiError("Show not found", 404);
  }
  res.json(show);
});
export const editShow = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { movie, theater, screen, startTime, bufferTime = 15 * 60 * 1000 } =
    req.body;
    const show = await Show.findById(id);
  if (!show) {
    throw new apiError("Show not found", 404);
  }
  await checkShowConflicts(screen, theater, startTime, movie, bufferTime);
  show.movie = movie || show.movie;
  show.theater = theater || show.theater;
  show.screen = screen || show.screen;
  show.startTime = startTime || show.startTime;
  show.endTime = endTimeDate || show.endTime;
  await show.save();
  res.json(show);
});

export const cancelShow = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const show = await Show.findById(id);
  if (!show) {
    throw new apiError("Show not found", 404);
  }
  show.status = "CANCELLED";
  await show.save();
  res.json(show);
});
 