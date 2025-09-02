import express from "express";
import { createChallenge, getChallenges, getChallengeById } from "../controllers/challenge.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/", protectRoute, createChallenge);
router.get("/", getChallenges);
router.get("/:id", getChallengeById);

export default router;