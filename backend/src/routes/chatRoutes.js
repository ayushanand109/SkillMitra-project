import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { startConversation, sendMessage, getMessages , getConversations} from "../controllers/chatController.js";

const router = express.Router();

router.post("/conversation", verifyToken, startConversation);
router.post("/message", verifyToken, sendMessage);
router.get("/messages/:conversationId", verifyToken, getMessages);
router.get("/conversations", verifyToken, getConversations);

export default router;