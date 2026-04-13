import mongoose  from "mongoose";

const theaterSchema = new mongoose.Schema({

  name: String,
  address: String,
  city: String,

  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point"
    },
    coordinates: [Number]
  }
  
})