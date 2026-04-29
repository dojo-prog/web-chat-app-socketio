import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import {
  getUserProfile,
  login,
  logout,
  signup,
  updateProfile,
} from "../controllers/auth.controller.js";
import {
  validateLogin,
  validateSignup,
} from "../middlewares/auth.validation.js";

const router = express.Router();

router.get("/profile", protectRoute, getUserProfile);
router.post("/signup", validateSignup, signup);
router.post("/login", validateLogin, login);
router.post("/logout", logout);
router.post("/update-profile", protectRoute, updateProfile);

export default router;
