import { Server } from "socket.io";
import express from "express";
import http from "http";
import { ENV } from "./env.js";
import { socketAuthMiddleware } from "../middlewares/socket.auth.middleware.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [ENV.CLIENT_URL],
    credentials: true,
  },
});

io.use(socketAuthMiddleware);

const userSocketMap = {};

io.on("connection", (socket) => {
  console.log(`User connected (${socket.userId})`);

  if (!userSocketMap[socket.userId]) {
    userSocketMap[socket.userId] = new Set();
  }

  userSocketMap[socket.userId].add(socket.id);

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log(`A client instance disconnected (${socket.id})`);

    const userSockets = userSocketMap[socket.userId];

    if (userSockets) {
      userSockets.delete(socket.id);

      if (userSockets.size === 0) {
        delete userSocketMap[socket.userId];
      }
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, server, io };
