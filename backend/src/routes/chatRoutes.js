import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { startConversation, sendMessage, getMessages } from "../controllers/chatController.js";

const router = express.Router();

router.post("/conversation", verifyToken, startConversation);
router.post("/message", verifyToken, sendMessage);
router.get("/messages/:conversationId", verifyToken, getMessages);

export default router;