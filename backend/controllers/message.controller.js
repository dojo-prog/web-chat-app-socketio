import { db } from "../db/db.js";

export const getAllUsers = async (req, res) => {
  const user = req.user;

  try {
    const result = await db.query(
      `
      SELECT id, fname, lname, email, avatar_url
      FROM users
      WHERE id <> $1
      ORDER BY fname ASC;
      `,
      [user.id],
    );

    const users = result.rows;

    res.status(200).json({ users });
  } catch (error) {
    console.error("getAllUsers controller error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getUserContactList = async (req, res) => {};
export const getMessagesByUserId = async (req, res) => {};
export const sendMessage = async (req, res) => {};
