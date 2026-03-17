import express from "express";
import { getMatches, updateProfile,getAllUsers } from "../controllers/userController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/match", verifyToken, getMatches);
router.put("/profile", verifyToken, updateProfile);


router.get("/all", getAllUsers);

export default router;