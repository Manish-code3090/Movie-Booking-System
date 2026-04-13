import mongoose from "mongoose";

const seatLockSchema = new mongoose.Schema({
  showId: ObjectId,
  seatNumber: String,
  lockedBy: ObjectId,

  expiresAt: Date
})