import express from "express";
import {
  signup,
  login,
  logout,
  getMe,
  sendVerifyOtp,
  verifyOtp,
  sendResetOtp,
  resetPassword,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();


router.get("/me", protectRoute, getMe);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);


router.post("/send-verify-otp", protectRoute, sendVerifyOtp);
router.post("/verify-otp", protectRoute, verifyOtp);

router.post("/send-reset-otp", sendResetOtp);
router.post("/reset-password", resetPassword);

export default router;
