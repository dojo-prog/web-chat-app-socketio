import jwt from "jsonwebtoken";
import { ENV } from "../lib/env.js";
import { db } from "../db/db";

export const protectRoute = async (req, res, next) => {
  try {
    const { authToken } = req.cookies;

    if (!authToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    let decoded;

    try {
      decoded = jwt.verify(authToken, ENV.AUTH_TOKEN_SECRET);
    } catch (error) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    if (!decoded || !decoded.id) {
      return res.status(401).json({ message: "Invalid token payload" });
    }

    const result = await db.query(
      `
    SELECT * FROM users
    WHERE id = $1
    `,
      [decoded.id],
    );

    const user = result.rows[0];

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { password, ...safeUser } = user;

    req.user = safeUser;

    next();
  } catch (error) {
    console.error("protectRoute auth middleware error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
