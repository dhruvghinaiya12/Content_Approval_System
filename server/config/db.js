const mongoose=require("mongoose");
require("dotenv").config()

const URL=process.env.DB_URL

const db=async()=>{
    try {
        await mongoose.connect(URL)
        console.log("connected to database");
        
    } catch (error) {
       console.log("error connecting to database",error);
        
    }
}
module.exports=db;