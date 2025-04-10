import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"], // Add vercel URL too if needed
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  // Listen for 'taskUpdated' event from any client
  socket.on("taskUpdated", () => {
    socket.broadcast.emit("refreshTasks"); // notifies others
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
  });
});

// Function to manually emit from backend code
const emitTaskUpdate = () => {
  io.emit("refreshTasks");
};


export { io, server, app, emitTaskUpdate };
