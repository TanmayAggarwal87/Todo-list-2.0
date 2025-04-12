import { io } from "socket.io-client";

export const socket = io(
  import.meta.env.VITE_MODE === "production"
    ? import.meta.env.VITE_BACKEND_SOCKET_URL
    : "http://localhost:3000",
  {
    withCredentials: true,
  }
);