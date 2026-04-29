import { Pool } from "pg";
import { ENV } from "../lib/env.js";

const db = new Pool({
  connectionString: ENV.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export { db };
