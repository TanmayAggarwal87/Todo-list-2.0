import dotenv from "dotenv"
import express from "express"
import authRoutes from "./Routes/auth.routes.js"
import taskRoutes from "./Routes/task.routes.js"
import memberRoutes from "./Routes/members.routes.js"
import {mongo} from "./lib/db.js"
import cookieParser from "cookie-parser"
import path from "path"
import cors from "cors"
import { app,server } from "./lib/socket.js"
import job from "./lib/cron.js"
dotenv.config()
const __dirname = path.resolve();
app.use(cookieParser())
app.use(express.json())
app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );
  job.start()




app.use("/api/auth",authRoutes);
app.use("/api/task",taskRoutes);
app.use("/api/member",memberRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
  
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
  }


server.listen(3000,()=>{
    console.log("listening on port 3000"),
    mongo();

})