import mongoose from "mongoose";

// need to change this 
const showsSchima = new mongoose.Schema({
    showName : String,
    onDate : Date,
    showBanner : {
        imgId: String,
        imgUrl : String, 
    },
    
})