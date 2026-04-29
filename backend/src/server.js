import express from "express";
import { ENV } from "../lib/env.js";
import testConnection from "../db/test.js";

const app = express();
const PORT = ENV.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
  testConnection();
});
