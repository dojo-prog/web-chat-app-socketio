import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../db/db.js";
import { ENV } from "../lib/env.js";
import uploadImage from "../storage/uploadImage.js";
import { deleteImage } from "../storage/deleteImage.js";

export const getUserProfile = async (req, res) => {
  const user = req.user;
  try {
    res.status(200).json({ user });
  } catch (error) {
    console.error("getUserProfile controller error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const signup = async (req, res) => {
  const { fname, lname, email, password, cPassword } = req.body;

  try {
    // Password Hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // User Insertion
    const result = await db.query(
      `
      INSERT INTO users (fname, lname, email, password)
      VALUES ($1, $2, $3, $4) 
      RETURNING id, fname, lname, email
      `,
      [fname, lname, email, hashedPassword],
    );

    // Auth Token Generation & Storing
    setAuthToken(result.rows[0].id, res);

    res
      .status(201)
      .json({ message: "Signup successful", user: result.rows[0] });
  } catch (error) {
    console.error("signup controller error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const n = {
    email: email.toLowerCase().trim(),
  };

  try {
    // Existing user check
    const result = await db.query(
      `
      SELECT * 
      FROM users
      WHERE email = $1
      `,
      [n.email],
    );

    const user = result.rows[0];

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Correct password check
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    setAuthToken(user.id, res);

    const { password: p, ...safeUser } = user;

    res.status(200).json({ message: "Login successful", user: safeUser });
  } catch (error) {
    console.error("login controller error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("authToken", {
    httpOnly: true,
    secure: ENV.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(200).json({ message: "Logout successful" });
};

export const updateProfile = async (req, res) => {
  const user = req.user;
  const { original, modified } = req.body;

  try {
    const changes = {};

    ["fname", "lname"].forEach((key) => {
      if (original[key] !== modified[key]) {
        changes[key] = modified[key];
      }
    });

    if (Object.keys(changes).length === 0 && !modified.image) {
      return res.status(400).json({ message: "No changes has been made" });
    }

    // Image Change
    if (modified.image) {
      const upload = await uploadImage(
        modified.image,
        "user-avatars",
        "user-avatars",
        user.id,
      );

      changes.avatar_url = upload.publicUrl;
      changes.avatar_path = upload.imagePath;

      if (user.image_path) {
        await deleteImage(user.image_path, "user-avatars");
      }
    }

    // Build Dynamic SET clause
    const keys = Object.keys(changes);

    const setClause = keys
      .map((key, index) => `${key} = $${index + 1}`)
      .join(", ");

    const values = keys.map((key) => changes[key]);
    values.push(user.id);

    const result = await db.query(
      `
      UPDATE users
      SET ${setClause}
      WHERE id = $${values.length}
      RETURNING *;
      `,
      values,
    );

    const user = result.rows[0];
    const { password, ...rest } = user;

    res.status(200).json({ message: "Profile updated", user: rest });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

// Helpers
const setAuthToken = (userId, res) => {
  try {
    const authToken = jwt.sign({ id: userId }, ENV.AUTH_TOKEN_SECRET, {
      expiresIn: "3d",
    });

    res.cookie("authToken", authToken, {
      maxAge: 3 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: ENV.NODE_ENV === "production",
      sameSite: "strict",
    });
  } catch (error) {
    console.error("Error generating auth token:", error);
  }
};
