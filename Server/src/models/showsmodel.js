import mongoose from "mongoose";

const showsSchema = new mongoose.Schema({
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie"
  },
  theatreId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Theatre"
  },
  screenId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Screen"
  },

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
    enum: ["active", "cancelled", "housefull"],
    default: "active"
  }
});

const Show = mongoose.model('Show', showsSchema);

export default Show;