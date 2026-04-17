import "dotenv/config";
import CryptoJS from "crypto-js"
import app from "./app.js";
import connect_db from "./src/db/db_connection.js";

async function spin_server() {
    try {
        await connect_db();
        const port = process.env.PORT;
        app.listen(port || 3000, ()=>{
            console.log(`app is runing on port ${port}`);
        })
    } catch (error) {
        console.log(error);
        process.exit(1);
        
    }
}
spin_server();