
import mongoose from "mongoose";


export const mongo = async()=>{
    try{
        const conn = await mongoose.connect("mongodb://localhost:27017/Todo")
        console.log("mongo connected")
        
    }
    catch(error){
        console.log(error)

    }

}