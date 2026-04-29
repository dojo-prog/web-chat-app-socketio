import express from "express";

const router = express.Router();

router.get("/profile", protectedRoute, getUserProfile);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/update-profile", protectedRoute, updateProfile);

export default router;
