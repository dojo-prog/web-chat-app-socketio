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

export const getUserContactList = async (req, res) => {
  const user = req.user;

  try {
    let result;

    result = await db.query(
      `
      SELECT senderId, receiverId FROM messages
      WHERE senderId = $1 OR receiverId = $1
      `,
      [user.id],
    );

    const contactIds = result.rows.flatMap((row) => [
      row.senderId,
      row.receiverId,
    ]);
    const uniqueIds = [...new Set(contactIds)];

    if (uniqueIds.length === 0) {
      return res.status(200).json({ contacts: [] });
    }

    const placeholders = uniqueIds.map((_, i) => `$${i + 1}`).join(", ");

    result = await db.query(
      `
      SELECT fname, lname, email, avatar_url
      FROM users
      WHERE id IN (${placeholders})
      ORDER BY fname ASC;
      `,
      uniqueIds,
    );

    const contacts = result.rows;

    res.status(200).json({ contacts });
  } catch (error) {
    console.error("getUserContactList controller error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getMessagesByUserId = async (req, res) => {};
export const sendMessage = async (req, res) => {};
