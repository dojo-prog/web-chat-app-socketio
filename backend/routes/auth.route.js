import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import {
  getUserProfile,
  login,
  logout,
  signup,
  updateProfile,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/profile", protectRoute, getUserProfile);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/update-profile", protectRoute, updateProfile);

export default router;
