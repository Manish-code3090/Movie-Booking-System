import mongoose from "mongoose";

const screenSchema = new mongoose.Schema({
  theatreId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Theatre"
  },

  name: String, // Screen 1, Audi 2

  totalSeats: Number,

  seatLayout: [
    {
      row: String,
      seats: [String],
      category: String
    }
  ]
});

const Screen = mongoose.model("Screen", screenSchema);
export default Screen;