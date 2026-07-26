import mongoose from "mongoose";

const theaterSchema = new mongoose.Schema({
  name: String,
  address: String,
  city: {
    type: String,
    required: true,
    ref: "City"
  },
  status:{
    type: String,
    enum: ["REQUESTED","ACTIVE", "INACTIVE"],
    default: "REQUESTED"
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

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