import express from "express";
import { signup, login } from "../controllers/authControllers.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { User } from "../models/User.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", verifyToken, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
});

export default router;