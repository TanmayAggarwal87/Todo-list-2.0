import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin:process.env.NODE_ENV === "production"
    ? [process.env.FRONTEND_URL]
    : ["http://localhost:5173"], // Add vercel URL too if needed
  },
});

const userSocketMap = new Map(); // userId -> socket.id

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  // Register the user with their userId
  socket.on("registerUser", (userId) => {
    userSocketMap.set(userId, socket.id);

  });

  // Listen for 'taskUpdated' event from any client
  socket.on("taskUpdated", () => {
    socket.broadcast.emit("refreshTasks");

  });

  socket.on("membersUpdated", () => {

    io.emit("refreshMembers");
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
    for (const [userId, socketId] of userSocketMap.entries()) {
      if (socketId === socket.id) {
        userSocketMap.delete(userId);

        break;
      }
    }
  });
});

// Function to manually emit from backend code
const emitTaskUpdate = () => {
  io.emit("refreshTasks");
};

const emitMemberUpdate = (userIds = []) => {
  userIds.forEach((id) => {
    const socketId = userSocketMap.get(id);
    if (socketId) {
      io.to(socketId).emit("refreshMembers");

    } else {
      console.log(`User ${id} not connected`);
    }
  });
};

export { io, server, app, emitTaskUpdate, emitMemberUpdate };
