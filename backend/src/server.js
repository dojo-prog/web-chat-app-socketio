import express from "express";
import cookieParser from "cookie-parser";
import { ENV } from "../lib/env.js";
import testConnection from "../db/test.js";
import { testStorage } from "../lib/supabase.js";

const app = express();
const PORT = ENV.PORT;

app.use(express.json({ limit: "2mb" }));
app.use(cookieParser());

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
  testConnection();
  testStorage();
});
