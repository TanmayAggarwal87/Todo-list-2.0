import dotenv from "dotenv"
import mongoose from "mongoose";
dotenv.config()


export const mongo = async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO)
        console.log("mongo connected")
        
    }
    catch(error){
        console.log(error)

    }

}