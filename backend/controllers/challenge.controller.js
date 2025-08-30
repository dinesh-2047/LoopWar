import Challenge from "../models/challenge.model.js";

export const createChallenge = async (req, res) => {
  try {
    const { title, description, difficulty, testCases, tags } = req.body;
    const challenge = new Challenge({
      title,
      description,
      difficulty,
      testCases,
      tags,
      creator: req.user?._id
    });
    await challenge.save();
    res.status(201).json(challenge);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getChallenges = async (req, res) => {
  try {
    const challenges = await Challenge.find().populate("creator", "username");
    res.json(challenges);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getChallengeById = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id).populate("creator", "username");
    if (!challenge) return res.status(404).json({ error: "Challenge not found" });
    res.json(challenge);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};