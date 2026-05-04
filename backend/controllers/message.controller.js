import { db } from "../db/db.js";
import { io } from "../lib/socket.js";
import uploadImage from "../storage/uploadImage.js";

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
      SELECT sender_id, receiver_id FROM messages
      WHERE sender_id = $1 OR receiver_id = $1
      `,
      [user.id],
    );

    const contactIds = result.rows.flatMap((row) => [
      row.sender_id,
      row.receiver_id,
    ]);
    const uniqueIds = [...new Set(contactIds)];

    if (uniqueIds.length === 0) {
      return res.status(200).json({ contacts: [] });
    }

    const placeholders = uniqueIds.map((_, i) => `$${i + 1}`).join(", ");

    result = await db.query(
      `
      SELECT id, fname, lname, email, avatar_url
      FROM users
      WHERE id IN (${placeholders})
      ORDER BY fname ASC;
      `,
      uniqueIds,
    );

    const contacts = result.rows.filter((row) => row.id !== user.id);

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
      SELECT id, sender_id, receiver_id, content, image_url, image_path, created_at
      FROM messages
      WHERE (
        sender_id = $1 AND receiver_id = $2
      ) OR (
       receiver_id = $1 AND sender_id = $2
      )
      ORDER BY created_at DESC, id DESC
      LIMIT 15;
      `,
      [user.id, userId],
    );

    const messages = result.rows.reverse();

    const last = messages[0];

    res.status(200).json({
      messages,
      nextCursor: last ? { created_at: last.created_at, id: last.id } : null,
    });
  } catch (error) {
    console.error("getMessagesByUserId controller error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getNextMessagesByUserId = async (req, res) => {
  const user = req.user;
  const { userId } = req.params;
  const { created_at, id: cursorId } = req.query;

  if (!userId) {
    return res.status(400).json({ message: "No user ID provided" });
  }

  if (!created_at || !cursorId) {
    return res.status(400).json({ message: "No cursor provided" });
  }

  if (isNaN(Date.parse(created_at))) {
    return res.status(400).json({ message: "Invalid cursor" });
  }

  try {
    const result = await db.query(
      `
      SELECT id, sender_id, receiver_id, content, image_url, image_path, created_at
      FROM messages 
      WHERE (
        (sender_id = $1 AND receiver_id = $2)
        OR  
        (receiver_id = $1 AND sender_id = $2)
      ) 
      AND (
        created_at < $3
        OR (created_at = $3 AND id < $4)
      )
      ORDER BY created_at DESC, id DESC
      LIMIT 15; 
      `,
      [user.id, userId, created_at, cursorId],
    );

    const messages = result.rows.reverse();

    const last = messages[0];

    return res.status(200).json({
      messages,
      nextCursor: last ? { created_at: last.created_at, id: last.id } : null,
    });
  } catch (error) {
    console.error("getNextMessagesByUserId controller error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const sendMessage = async (req, res) => {
  const user = req.user;
  const { userId } = req.params;
  const { text } = req.body;
  const image = req.file;

  const trimmedText = text?.trim();

  if (!userId) {
    return res.status(400).json({ message: "No user ID provided" });
  }

  if (!trimmedText && !image) {
    return res.status(400).json({ message: "Message has no content" });
  }

  try {
    let imageUrl = null;
    let imagePath = null;

    if (image) {
      const upload = await uploadImage(
        image,
        "message-images",
        "message-images",
        user.id,
      );

      imageUrl = upload.publicUrl;
      imagePath = upload.imagePath;
    }

    const result = await db.query(
      `
      INSERT INTO messages (sender_id, receiver_id, content, image_url, image_path)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, sender_id, receiver_id, content, image_url, image_path, created_at;
      `,
      [user.id, userId, trimmedText, imageUrl, imagePath],
    );

    const message = result.rows[0];

    io.to(userId).emit("new_message", message);

    res.status(201).json({ message: "Message sent", message });
  } catch (error) {
    console.error("sendMessage controller error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
