import mongoose from "mongoose";

const seatLockSchema = new mongoose.Schema({
  showId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Show"
  },
  seatNumber: String,
  lockedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  expiresAt: Date
});

const SeatLock = mongoose.model("SeatLock", seatLockSchema);
export default SeatLock;