import mongoose from "mongoose";

const TestCaseSchema = new mongoose.Schema({
  input: { type: String, required: true },
  output: { type: String, required: true },
  isSample: { type: Boolean, default: false }
});

const ChallengeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { type: String, enum: ["Easy", "Medium", "Hard"], default: "Easy" },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  testCases: [TestCaseSchema],
  tags: [String],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Challenge", ChallengeSchema);