import mongoose from "mongoose";

// need to change this 
const showsSchema = new mongoose.Schema({
  movieId: ObjectId,
  theatreId: ObjectId,
  screenId: ObjectId,

  startTime: Date,
  endTime: Date,

  language: String,
  format: String,

  seatPricing: [
    {
      category: String,
      price: Number
    }
  ],

  totalSeats: Number,
  availableSeats: Number,

  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point"
    },
    coordinates: [Number]
  },

  status: {
    type: String,
    default : "active" | "cancelled" | "housefull"
  }
})