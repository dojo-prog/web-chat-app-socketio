import jwt from "jsonwebtoken";
import { ENV } from "../lib/env.js";
import { db } from "../db/db.js";
import cookie from "cookie";

const socketAuthMiddleware = async (socket, next) => {
  try {
    const cookies = cookie.parse(socket.handshake.headers.cookie || "");
    const token = cookies.authToken;

    if (!token) {
      console.error("Socket connection rejected: No token provided");
      return next(new Error("Unauthorized"));
    }

    let decoded;

    try {
      decoded = jwt.verify(token, ENV.AUTH_TOKEN_SECRET);
    } catch (error) {
      console.error("Socket connection rejected: Invalid or expired token");
      return next(new Error("Unauthorized"));
    }

    if (!decoded || !decoded.id) {
      console.error("Socket connection rejected: Invalid token payload");
      return next(new Error("Unauthorized"));
    }

    const result = await db.query(
      `
      SELECT id, fname, lname, email, avatar_url
      FROM users
      WHERE id = $1;
      `,
      [decoded.id],
    );

    const user = result.rows[0];

    if (!user) {
      console.error("Socket connection rejected: User not found");
      return next(new Error("Unauthorized"));
    }

    socket.user = user;
    socket.userId = user.id;

    console.log(`Socket authenticated for user ${user.fname} (${user.id})`);

    next();
  } catch (error) {
    console.error("socketAuthMiddleware error:", error);
    next(new Error("Server Error"));
  }
};

export { socketAuthMiddleware };
