import express from "express"
import authRoutes from "./Routes/auth.routes.js"
import taskRoutes from "./Routes/task.routes.js"
import memberRoutes from "./Routes/members.routes.js"
import {mongo} from "./lib/db.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import { app,server } from "./lib/socket.js"

app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true}
))




app.use("/api/auth",authRoutes);
app.use("/api/task",taskRoutes);
app.use("/api/member",memberRoutes);


server.listen(3000,()=>{
    console.log("listening on port 3000"),
    mongo();

})