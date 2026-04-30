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

export const getMessagesByUserId = async (req, res) => {
  const user = req.user;
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ message: "No user ID provided" });
  }

  try {
    const result = await db.query(
      `
      SELECT * FROM messages
      WHERE (
        senderId = $1 AND receiverId = $2
      ) OR (
       receiverId = $1 AND senderId = $2
      )
      ORDER BY created_at DESC
      LIMIT 15;
      `,
      [user.id, userId],
    );

    const messages = result.rows.reverse();

    res.status(200).json({ messages });
  } catch (error) {
    console.error("getMessagesByUserId controller error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getNextMessagesByUserId = async (req, res) => {
  const user = req.user;
  const { userId } = req.params;
  const { cursor } = req.query;

  if (!userId) {
    return res.status(400).json({ message: "No user ID provided" });
  }

  if (!cursor) {
    return res.status(400).json({ message: "No cursor provided" });
  }

  if (isNaN(Date.parse(cursor))) {
    return res.status(400).json({ message: "Invalid cursor" });
  }

  try {
    const result = await db.query(
      `
      SELECT * FROM messages 
      WHERE (
        (senderId = $1 AND receiverId = $2)
        OR  
        (receiverId = $1 AND senderId = $2)
      ) 
      AND created_at < $3
      ORDER BY created_at DESC
      LIMIT 15; 
      `,
      [user.id, userId, cursor],
    );

    const messages = result.rows.reverse();

    return res.status(200).json({
      messages,
      nextCursor: messages.length ? messages[0].created_at : null,
    });
  } catch (error) {
    console.error("getNextMessagesByUserId controller error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const sendMessage = async (req, res) => {};
