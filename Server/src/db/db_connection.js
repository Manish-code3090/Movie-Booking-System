import mongoose from "mongoose"
import dns from "node:dns"


const db_uri = process.env.DB_URI

export default async () => {
    try {
        dns.setServers(["1.1.1.1", "8.8.8.8"]);
        await mongoose.connect(db_uri);
        console.log("Connected to DB");
        
    } catch (error) {
       console.log( " Mongo connection Error : ",error);
        
    }
}