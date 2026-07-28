import Booking from "../models/bookingmodel";
import Show from "../models/show.model";
import asyncHandler from "../util/asyncHandler.util";
import apiError from "../util/error.util";
import {
  calculateTotalAmount,
  bookedSeats,
  isSeatAvailable,
} from "../util/booking.util";

const createBooking = asyncHandler(async (req, res) => {
  const { show, seats, user } = req.body;
  if (!show || !seats || seats.length === 0) {
    throw new apiError("Missing required fields", 400);
  }

  const existingBookings = await Booking.find({ showId: show });
  const bookedSeatsList = bookedSeats(existingBookings);
  if (!isSeatAvailable(bookedSeatsList, seats)) {
    throw new apiError("Some requested seats are not available", 400);
  }
  const showDetails = await Show.findById(show);
  if (
    !showDetails ||
    showDetails.status !== "active" ||
    showDetails.availableSeats < seats.length ||
    showDetails.startTime < new Date()
  ) {
    throw new apiError("Show not found or unavailable", 404);
  }
  const pricePerSeat = showDetails.price;
  const totalAmount = calculateTotalAmount(seats, pricePerSeat);
  const booking = new Booking({
    showId: show,
    seats,
    user,
    totalAmount,
  });
  const createdBooking = await booking.save();
  res.status(201).json(createdBooking);
});

const getShowBookings = asyncHandler(async (req, res) => {
  const { showId } = req.params;
  const bookings = await Booking.find({ showId: showId }).populate("user");
  res.json(bookings);
});
const getAllBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find().populate("show").populate("user");
  res.json(bookings);
});

const cancelBooking = asyncHandler(async (req, res) => {
  const { bookingId } = req.params;
  const booking = await Booking.findById(bookingId);
  if (!booking) {
    throw new apiError("Booking not found", 404);
  }
  booking.status = "cancelled";
  await booking.save();
  res.json({ message: "Booking cancelled successfully" });
});
