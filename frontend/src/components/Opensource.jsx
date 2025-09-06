import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Users, BookOpen, Search } from "lucide-react";

const OpenSource = () => {
  const username = "dinesh-2047"; // GitHub username
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentLang, setCurrentLang] = useState("All");

  const fetchRepos = async (query = "", language = "All") => {
    setLoading(true);
    try {
      let apiUrl = "";
      if (query) {
        // Search repos by keyword
        apiUrl = `https://api.github.com/search/repositories?q=${encodeURIComponent(
          query
        )}+user:${username}&sort=updated&per_page=10`;
      } else if (language && language !== "All") {
        // Filter by language
        apiUrl = `https://api.github.com/search/repositories?q=user:${username}+language:${language}&sort=updated&per_page=10`;
      } else {
        // Default: latest 10 repos
        apiUrl = `https://api.github.com/users/${username}/repos?sort=updated&per_page=10`;
      }

      const res = await fetch(apiUrl);
      const data = await res.json();

      // Search API returns data.items, User API returns array
      setRepos(data.items || data);
    } catch (err) {
      console.error("Failed to fetch repos:", err);
      setRepos([]);
    }
    setLoading(false);
  };

  // Load latest repos on mount
  useEffect(() => {
    fetchRepos();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const slideUpVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/50 to-black text-white py-20 px-4">
      <motion.div
        className="container mx-auto max-w-6xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero */}
        <motion.div className="text-center mb-12" variants={slideUpVariants}>
          <h1 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-violet-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Open Source & Community
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Explore the latest GitHub projects, filter by language, or search for any repository.
          </p>
        </motion.div>

        {/* Language Buttons & Search */}
        <motion.div
          className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4"
          variants={slideUpVariants}
        >
          {/* Language Filters */}
          <div className="flex gap-3 flex-wrap">
            {["All", "JavaScript", "Python", "React"].map((lang) => (
              <button
                key={lang}
                className={`px-4 py-2 rounded-xl shadow-lg transition ${
                  currentLang === lang
                    ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white"
                    : "bg-black/40 border border-white/20 text-gray-200 hover:bg-violet-600 hover:text-white"
                }`}
                onClick={() => {
                  setCurrentLang(lang);
                  setSearch("");
                  fetchRepos("", lang);
                }}
              >
                {lang}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="flex gap-2 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search repos..."
              className="px-4 py-2 rounded-xl bg-black/40 border border-white/20 placeholder-gray-400 text-white focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-400/50 backdrop-blur-sm w-full sm:w-64"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && fetchRepos(e.target.value)}
            />
            <button
              className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded-xl text-white flex items-center gap-2"
              onClick={() => fetchRepos(search)}
            >
              <Search className="w-4 h-4" />
              Search
            </button>
          </div>
        </motion.div>

        {/* GitHub Repos */}
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" variants={slideUpVariants}>
          {loading ? (
            <p className="text-gray-400 col-span-full">Loading repositories...</p>
          ) : repos.length === 0 ? (
            <p className="text-gray-400 col-span-full">No repositories found.</p>
          ) : (
            repos.map((repo) => (
              <motion.a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-violet-400 transition-colors duration-300 group"
                variants={slideUpVariants}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center mb-4 gap-3 text-violet-400">
                  <Github className="w-6 h-6" />
                  <h3 className="text-xl md:text-2xl font-bold group-hover:text-white">{repo.name}</h3>
                </div>
                <p className="text-gray-300">{repo.description || "No description provided."}</p>
                <div className="mt-4 text-sm text-gray-400">
                  ⭐ {repo.stargazers_count} | Forks: {repo.forks_count} | {repo.language || "Unknown"}
                </div>
              </motion.a>
            ))
          )}
        </motion.div>

        {/* Contributor Guide */}
        <motion.div className="mt-16 mb-16" variants={slideUpVariants}>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-yellow-400">Contributor Guide</h2>
          <ul className="list-decimal list-inside space-y-3 text-gray-300 text-lg">
            <li>Fork the repository on GitHub.</li>
            <li>Clone it to your local machine.</li>
            <li>Create a new branch for your feature or bug fix.</li>
            <li>Make your changes and commit with clear messages.</li>
            <li>Push your branch and open a Pull Request.</li>
            <li>Discuss and update based on maintainer feedback.</li>
            <li>Once approved, your contribution will be merged!</li>
          </ul>
        </motion.div>

        {/* Community Links */}
        <motion.div variants={slideUpVariants}>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-green-400">Join Our Community</h2>
          <div className="flex flex-col sm:flex-row gap-6">
            <a
              href="YOUR_DISCORD_LINK"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-black/40 backdrop-blur-xl rounded-xl border border-white/10 hover:border-green-400 transition-colors duration-300"
            >
              <Users className="w-6 h-6 text-green-400" />
              Join Discord
            </a>
            <a
              href="YOUR_SLACK_LINK"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-black/40 backdrop-blur-xl rounded-xl border border-white/10 hover:border-green-400 transition-colors duration-300"
            >
              <BookOpen className="w-6 h-6 text-green-400" />
              Visit Forum
            </a>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default OpenSource;
