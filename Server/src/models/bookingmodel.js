import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  userId: ObjectId,
  showId: ObjectId,

  seats: [String],

  totalAmount: Number,

  paymentId: String,

  status: "pending" | "confirmed" | "cancelled",

  createdAt: Date
})