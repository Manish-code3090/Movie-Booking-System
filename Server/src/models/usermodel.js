import mongoose, { Types } from "mongoose";
const user_schima = new mongoose.Schema({
    username : {
       type : String,
       require : true
    }, 
    email : {
        type : String,
        require : true,
    },
    password : {
        type : String, 
        require : true
    } 
})