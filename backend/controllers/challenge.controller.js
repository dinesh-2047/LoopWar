import Challenge from "../models/challenge.model.js";

export const createChallenge = async (req, res) => {
  try {
    const { title, description, difficulty, testCases, tags } = req.body;

    // Validation
    if (!title || !description || !testCases || testCases.length === 0) {
      return res.status(400).json({ error: "Title, description, and at least one test case are required" });
    }

    if (!testCases.some(tc => tc.isSample)) {
      return res.status(400).json({ error: "At least one test case must be marked as sample" });
    }

    const challenge = new Challenge({
      title: title.trim(),
      description: description.trim(),
      difficulty,
      testCases,
      tags: tags ? tags.map(tag => tag.trim()).filter(Boolean) : [],
      creator: req.user?._id
    });
    await challenge.save();
    await challenge.populate("creator", "username");
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