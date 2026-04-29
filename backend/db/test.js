import { db } from "./db.js";

const testConnection = async () => {
  try {
    const res = await db.query("SELECT NOW()");
    console.log("Supabase DB Connected", res.rows[0]);
  } catch (error) {
    console.error("DB connection error:", error);
  }
};

export default testConnection;
