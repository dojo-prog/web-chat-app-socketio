import express from "express";
import cookieParser from "cookie-parser";
import { ENV } from "../lib/env.js";
import testConnection from "../db/test.js";
import { testStorage } from "../lib/supabase.js";
import authRouter from "../routes/auth.route.js";
import { app, server } from "../lib/socket.js";
import cors from "cors";

const PORT = ENV.PORT;

app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));

app.use(express.json({ limit: "2mb" }));
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);

server.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
  testConnection();
  testStorage();
});
