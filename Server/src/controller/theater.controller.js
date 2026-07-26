import Theatre from "../models/theatermodel";
import User from "../models/usermodel";
import asyncHandler from "../util/asyncHandler.util.js";
import apiError from "../util/error.util.js";

// general controllers for theater
const getAllTheaters = asyncHandler(async (req, res) => {
  const theaters = await Theatre.find().populate("city").populate("owner");
  res.json(theaters);
});

const getTheaterById = asyncHandler(async (req, res) => {
  const theater = await Theatre.findById(req.params.id)
    .populate("city")
    .populate("owner");
  if (!theater) {
    throw new apiError("Theater not found", 404);
  }
  res.json(theater);
});

//user request to create theater
const createTheater = asyncHandler(async (req, res) => {
  const { name, address, city, location } = req.body;
  if (!name || !address || !city || !location)
    throw new apiError("Missing required fields", 400);

  const owner = req.user._id; // Assuming you have user authentication and the user ID is available in req.user
  const newTheater = new Theatre({
    name,
    address,
    city,
    location,
    owner,
  });

  await newTheater.save();
  res.status(201).json(newTheater);
});

// controllers for admin to verify and suspend the theater
const verifyTheater = asyncHandler(async (req, res) => {
  const theaterId = req.params.id;
  const theater = await Theatre.findById(theaterId);
  if (!theater) {
    throw new apiError("Theater not found", 404);
  }
  // check for dublicacy and if the theater is already verified

  if (theater.status != "REQUESTED") {
    throw new apiError(
      theater.status == "ACTIVE"
        ? "Theater is already verified"
        : "Theater is already suspended",
      400,
    );
  }

  const owner = await User.findById(theater.owner);
  if (!owner) {
    throw new apiError("Owner not found", 404);
  }
  owner.role = "THEATER_OWNER";
  theater.status = "ACTIVE";
  await owner.save();
  await theater.save();
  res.json(theater);
});

const suspendTheater = asyncHandler(async (req, res) => {
  const theaterId = req.params.id;
  const theater = await Theatre.findById(theaterId);
  theater.status = "INACTIVE";
  await theater.save();
  res.json(theater);
});

const reactivateTheater = asyncHandler(async (req, res) => {
  const theaterId = req.params.id;
  const theater = await Theatre.findById(theaterId);
  theater.status = "ACTIVE";
  await theater.save();
  res.json(theater);
});

const deleteTheater = asyncHandler(async (req, res) => {
  const theaterId = req.params.id;
  const theater = await Theatre.findByIdAndDelete(theaterId);
  if (!theater) {
    throw new apiError("Theater not found", 404);
  }
  res.json({ message: "Theater deleted successfully" });
});

export {
  getAllTheaters,
  getTheaterById,
  createTheater,
  verifyTheater,
  suspendTheater,
  reactivateTheater,
  deleteTheater,
};
