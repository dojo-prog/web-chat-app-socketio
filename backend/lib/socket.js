import { Server } from "socket.io";
import express from "express";
import http from "http";
import { ENV } from "./env.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [ENV.CLIENT_URL],
    credentials: true,
  },
});

export { app, server, io };
