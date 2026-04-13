import mongoose from "mongoose";

const screenSchema = new mongoose.Schema({
  theatreId: ObjectId,

  name: String, // Screen 1, Audi 2

  totalSeats: Number,

  seatLayout: [
    {
      row: "A",
      seats: ["A1", "A2", "A3"],
      category: "Gold"
    }
  ]
})