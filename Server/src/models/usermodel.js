import mongoose from "mongoose";

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
    hash_password : {
        type : String, 
        required : true
    },
    location: {
  type: {
    type: String,
    ref: "City"
  },
}, 
    otp : {
        otp : Number,
        date : Date,
        is_valid: {
  type: Boolean,
  default: false
}
    },
    role: {
        type: String,
        enum: [
            "CUSTOMER",
            "THEATRE_OWNER",
            "ADMIN",
            "SUPER_ADMIN"
        ],
        default: "CUSTOMER"
    }
})

const User = mongoose.model('User', userSchema);
export default User;