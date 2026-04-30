import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import {
  getAllUsers,
  getMessagesByUserId,
  getUserContactList,
  sendMessage,
} from "../controllers/message.controller.js";

const router = express.Router();

router.use(protectRoute);

router.get("/", getAllUsers);
router.get("/contacts", getUserContactList);
router.get("/:userId", getMessagesByUserId);
router.post("/:userId", sendMessage);

export default router;
