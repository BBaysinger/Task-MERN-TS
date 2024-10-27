import express from "express";

const router = express.Router();
const {
  registerUser,
  loginUser,
  getCurrentUser,
} = require("controllers/userController");
const { protect } = require("middleware/authMiddleware");

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/current", protect, getCurrentUser);

export default router;
