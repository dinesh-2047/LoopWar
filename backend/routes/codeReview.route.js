import express from "express";
import { reviewCode } from "../controllers/codeReview.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/", protectRoute, reviewCode);

export default router;