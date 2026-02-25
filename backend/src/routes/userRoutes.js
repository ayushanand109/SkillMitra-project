import express from "express";
import { getMatches, updateProfile } from "../controllers/userController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/match", verifyToken, getMatches);
router.put("/profile", verifyToken, updateProfile);

export default router;