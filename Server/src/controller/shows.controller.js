import Show from "../models/showmodel.js";
import Movie from "../models/movie.model.js";
import Screen from "../models/screen.model.js";
import asyncHandler from "../util/asyncHandler.util.js";
import apiError from "../util/error.util.js";

const createShow = asyncHandler(async (req, res) => {
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
  const checkScreen = await Screen.findById(screen);
  if (!checkScreen || checkScreen.theater.toString() !== theater) {
    throw new apiError("Screen not found", 404);
  }
  const startTimeDate = new Date(startTime);
  const movieDuration = await Movie.findById(movie).select("duration");
  if (!movieDuration) {
    throw new apiError("Movie not found", 404);
  }
  const endTimeDate = new Date(
    startTimeDate.getTime() + movieDuration.duration * 60000 + bufferTime,
  );
  if (startTimeDate < new Date()) {
    throw new apiError("Show time cannot be in the past", 400);
  }
  const overlappingShow = await Show.findOne({
    screen,
    $or: [
      {
        startTime: { $lt: endTimeDate },
        endTime: { $gt: startTimeDate },
      },
    ],
  });

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
