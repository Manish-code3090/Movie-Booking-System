import mongoose from "mongoose";

const userShowSchema = new mongoose.Schema({
  showId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Show"
  },
  bookingId : ObjectId,
  showTime: Date,
  showName: String,
  status : "upcoming" | "expires", 
});

const userSchima = new mongoose.Schema({
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