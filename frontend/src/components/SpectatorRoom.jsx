import React, { useState } from "react";
import { Eye, ThumbsUp, MessageCircle, Users, Star, Smile, Flame } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const dummyParticipants = [
  { name: "Player 1", code: "// Player 1's code here...", votes: 3, avatar: "https://api.dicebear.com/6.x/pixel-art/svg?seed=Player1" },
  { name: "Player 2", code: "// Player 2's code here...", votes: 5, avatar: "https://api.dicebear.com/6.x/pixel-art/svg?seed=Player2" }
];

const dummyComments = [
  { user: "SpectatorA", text: "Great logic!" },
  { user: "SpectatorB", text: "Player 2 is fast!" }
];

const dummyLeaderboard = [
  { name: "Player 2", votes: 5 },
  { name: "Player 1", votes: 3 }
];

export default function SpectatorRoom() {
  const [votes, setVotes] = useState([dummyParticipants[0].votes, dummyParticipants[1].votes]);
  const [comments, setComments] = useState(dummyComments);
  const [commentInput, setCommentInput] = useState("");
  const [reactions, setReactions] = useState([]);
  const [feedbacks, setFeedbacks] = useState(["", ""]);

  function handleVote(idx) {
    const newVotes = [...votes];
    newVotes[idx]++;
    setVotes(newVotes);
  }

  function handleCommentSubmit(e) {
    e.preventDefault();
    if (commentInput.trim()) {
      setComments([...comments, { user: "You", text: commentInput }]);
      setCommentInput("");
    }
  }

  function handleReaction(type) {
    setReactions([...reactions, { type, id: Date.now() }]);
    setTimeout(() => {
      setReactions(reactions => reactions.slice(1));
    }, 1200);
  }

  return (
    <div className="min-h-[80vh] bg-gradient-to-br from-blue-900 via-indigo-900/80 to-black p-12 rounded-3xl text-white max-w-5xl mx-auto mt-16 shadow-2xl border border-blue-700/30 relative">
      <div className="absolute top-6 right-8 flex items-center gap-2">
        <Eye className="w-6 h-6 text-blue-400 animate-pulse" />
        <span className="text-sm text-gray-300">Spectator Mode</span>
      </div>
      <h2 className="text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Live Coding Battle</h2>
      <div className="flex gap-10 justify-center mb-8">
        {dummyParticipants.map((p, idx) => (
          <motion.div key={p.name} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="flex flex-col items-center w-1/2">
            <img src={p.avatar} alt={p.name} className="w-16 h-16 rounded-full border-4 border-blue-500 mb-2 shadow-lg" />
            <span className="block text-xl mb-2 text-gray-300 flex items-center gap-2 font-bold"><Users className="w-5 h-5" /> {p.name}</span>
            <pre className="rounded-2xl w-full h-56 bg-gray-900 border-4 border-blue-700 shadow-2xl p-4 overflow-auto text-base mb-2 font-mono">{p.code}</pre>
            <motion.button whileTap={{ scale: 0.95 }} className="px-6 py-3 rounded-full font-semibold text-xl transition-colors duration-200 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 mb-2 shadow-lg" onClick={() => handleVote(idx)}>
              <ThumbsUp className="w-6 h-6" /> Vote ({votes[idx]})
            </motion.button>
            <button className="px-4 py-2 rounded bg-green-600 text-white font-semibold ml-2" onClick={() => handleCodeReview(idx)}>AI Review</button>
          </motion.div>
        ))}
      </div>
      <div className="flex justify-center gap-8 mb-8">
        <motion.button whileTap={{ scale: 1.2 }} className="bg-yellow-400 text-black px-4 py-2 rounded-full flex items-center gap-2 font-bold shadow" onClick={() => handleReaction('star')}><Star className="w-5 h-5" /> Star</motion.button>
        <motion.button whileTap={{ scale: 1.2 }} className="bg-pink-400 text-black px-4 py-2 rounded-full flex items-center gap-2 font-bold shadow" onClick={() => handleReaction('smile')}><Smile className="w-5 h-5" /> Smile</motion.button>
        <motion.button whileTap={{ scale: 1.2 }} className="bg-orange-500 text-black px-4 py-2 rounded-full flex items-center gap-2 font-bold shadow" onClick={() => handleReaction('flame')}><Flame className="w-5 h-5" /> Fire</motion.button>
      </div>
      <AnimatePresence>
        {reactions.map(r => (
          <motion.div key={r.id} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -40 }} className="fixed left-1/2 top-32 z-50 text-5xl">
            {r.type === 'star' && <Star className="text-yellow-400" />}
            {r.type === 'smile' && <Smile className="text-pink-400" />}
            {r.type === 'flame' && <Flame className="text-orange-500" />}
          </motion.div>
        ))}
      </AnimatePresence>
      <div className="bg-gray-800 rounded-xl p-6 mb-6 max-w-2xl mx-auto">
        <h3 className="text-2xl font-bold mb-4 flex items-center gap-2"><MessageCircle className="w-6 h-6 text-indigo-400" /> Live Commentary</h3>
        <div className="max-h-40 overflow-y-auto mb-4">
          {comments.map((c, i) => (
            <div key={i} className="mb-2 text-gray-200"><span className="font-semibold text-blue-300">{c.user}:</span> {c.text}</div>
          ))}
        </div>
        <form onSubmit={handleCommentSubmit} className="flex gap-2">
          <input type="text" value={commentInput} onChange={e => setCommentInput(e.target.value)} placeholder="Add your commentary..." className="flex-1 px-3 py-2 rounded-lg bg-gray-700 text-white" />
          <button type="submit" className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold">Send</button>
        </form>
      </div>
      <div className="bg-indigo-900 rounded-xl p-6 mb-6 max-w-md mx-auto shadow-lg">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><Star className="w-5 h-5 text-yellow-400" /> Leaderboard</h3>
        <ul>
          {dummyLeaderboard.map((p, idx) => (
            <li key={p.name} className="flex items-center gap-3 mb-2 text-lg font-semibold text-white">
              <span className="text-yellow-400">#{idx + 1}</span> {p.name} <ThumbsUp className="w-4 h-4 text-blue-300" /> {votes[idx]}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4 text-base text-gray-400 text-center">This is a demo. For real rooms, connect to live code and chat streams via backend.</div>
    </div>
  );
}

async function handleCodeReview(idx) {
  const code = dummyParticipants[idx].code;
  setFeedbacks(fbs => {
    const newFbs = [...fbs];
    newFbs[idx] = "Reviewing...";
    return newFbs;
  });
  try {
    const res = await fetch("/api/code-review", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, language: "javascript" })
    });
    const data = await res.json();
    setFeedbacks(fbs => {
      const newFbs = [...fbs];
      newFbs[idx] = data.feedback || data.error;
      return newFbs;
    });
  } catch (err) {
    setFeedbacks(fbs => {
      const newFbs = [...fbs];
      newFbs[idx] = "Error: " + err.message;
      return newFbs;
    });
  }
}