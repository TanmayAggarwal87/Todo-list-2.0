import express from "express"
const app = express()
import authRoutes from "./Routes/auth.routes.js"
import taskRoutes from "./Routes/task.routes.js"
import {mongo} from "./lib/db.js"
import cookieParser from "cookie-parser"
import cors from "cors"

app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true}
))




app.use("/api/auth",authRoutes);
app.use("/api/task",taskRoutes);


app.listen(3000,()=>{
    console.log("listening on port 3000"),
    mongo();

})