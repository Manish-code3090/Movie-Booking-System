import mongoose from "mongoose";

const userShowSchema = new mongoose.Schema(
  {
  showId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Show"
  },
  bookingId :{
    type: mongoose.Schema.Types.ObjectId
  },
  showTime: Date,
  showName: String,
 status: {
  type: String,
  enum: ["upcoming", "expired"]
}
}
);

const userSchema = new mongoose.Schema({
    username : {
       type : String,
       required : true
    }, 
    email: {
  type: String,
  required: true,
  unique: true
},
    password : {
        type : String, 
        required : true
    },
    location: {
  type: {
    type: String,
    enum: ["Point"],
    default: "Point"
  },
  coordinates: {
    type: [Number] // [longitude, latitude]
  }
}, 
    shows : [userShowSchema],
    otp : {
        otp : Number,
        date : Date,
        is_valid: {
  type: Boolean,
  default: false
}
    }
})

const User = mongoose.model('User', userSchema);
export default User;