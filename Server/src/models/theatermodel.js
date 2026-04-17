import mongoose from "mongoose";

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
});

const Theatre = mongoose.model("Theatre", theaterSchema);
export default Theatre;