import mongoose from "mongoose";

const citySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
   state: {
    type: String,
    required: true
  },
  country:{
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

const City = mongoose.model("City", citySchema);  
export default City;