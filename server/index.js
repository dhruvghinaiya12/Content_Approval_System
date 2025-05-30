const express=require("express");
const db = require("./config/db");
const cors=require("cors");
require("dotenv").config();

const PORT=process.env.PORT|| 5050;

const app=express();
app.use(express.json());
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true,
    methods:["GET","POST","PATCH","PUT","DELETE"],
}))


app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
    db()
})