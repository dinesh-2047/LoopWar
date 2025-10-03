import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Zap, User, Plus } from "lucide-react";
import { Link } from "react-router-dom";

export default function ChallengesPage() {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetchChallenges();
  }, []);

  const fetchChallenges = async () => {
    try {
      const res = await fetch("/api/challenges");
      const data = await res.json();
      setChallenges(data);
    } catch (err) {
      console.error("Failed to fetch challenges:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredChallenges = challenges.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
                         c.description.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || c.difficulty === filter;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/40 to-black text-white flex items-center justify-center">
        <div className="text-xl">Loading challenges...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/40 to-black text-white p-8">
      {/* Header */}
      <motion.div className="text-center mb-12" initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
          Coding Challenges
        </h1>
        <p className="text-gray-400 text-lg mb-6">Solve custom challenges created by the community!</p>
        <Link
          to="/create-challenge"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 hover:scale-105"
        >
          <Plus size={20} /> Create Challenge
        </Link>
      </motion.div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-10">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search challenges..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-gray-800/60 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-gray-800/60 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="All">All Difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

      {/* Challenges Grid */}
      {filteredChallenges.length === 0 ? (
        <p className="text-center text-gray-400 text-lg">No challenges found.</p>
      ) : (
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}>
          {filteredChallenges.map((challenge) => (
            <motion.div key={challenge._id} className="p-6 bg-gray-900/60 rounded-2xl border border-white/10 hover:border-green-500/50 cursor-pointer transition" whileHover={{ scale: 1.05 }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
              <h3 className="text-xl font-bold mb-2">{challenge.title}</h3>
              <p className="text-gray-400 text-sm mb-3 line-clamp-2">{challenge.description}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {challenge.tags?.map((tag, i) => (
                  <span key={i} className="text-xs px-2 py-1 rounded-md bg-purple-600/20 text-purple-300">
                    #{tag}
                  </span>
                ))}
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  challenge.difficulty === "Easy" ? "bg-green-500/20 text-green-400" :
                  challenge.difficulty === "Medium" ? "bg-yellow-500/20 text-yellow-400" :
                  "bg-red-500/20 text-red-400"
                }`}>{challenge.difficulty}</span>
                {challenge.creator && (
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <User size={12} /> {challenge.creator.username}
                  </span>
                )}
              </div>
              <button
                onClick={() => window.location.href = `/challenges/${challenge._id}`}
                className="mt-2 w-full bg-gradient-to-r from-green-500 to-emerald-500 py-2 rounded-xl text-sm font-bold hover:scale-105 transition flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4" /> Solve Now
              </button>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
