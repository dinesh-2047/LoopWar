import React from "react";
import { motion } from "framer-motion";   // ✅ Required import
import { Link } from "react-router-dom"; // ✅ Required import
import { Swords } from "lucide-react";   // ✅ For the icon

const Tournaments = () => {
  const navbarVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const logoVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: { duration: 0.3 }
    }
  };

  const tournaments = [
    {
      name: "Hackathon 2025",
      datetime: "Sept 10, 2025 • 10:00 AM IST",
      platform: "Devfolio",
      link: "https://devfolio.co",
      desc: "A 24-hour coding sprint to solve real-world problems with innovative solutions.",
    },
    {
      name: "AI Challenge",
      datetime: "Oct 5, 2025 • 2:00 PM IST",
      platform: "Kaggle",
      link: "https://kaggle.com",
      desc: "Showcase your machine learning and AI skills with exciting datasets.",
    },
    {
      name: "Web Dev Cup",
      datetime: "Nov 15, 2025 • 9:00 AM IST",
      platform: "HackerEarth",
      link: "https://hackerearth.com",
      desc: "Compete to build the best full-stack web app in just 48 hours.",
    },
    {
      name: "Data Science Jam",
      datetime: "Dec 1, 2025 • 11:00 AM IST",
      platform: "Analytics Vidhya",
      link: "https://analyticsvidhya.com",
      desc: "Analyze real-world datasets and present powerful insights.",
    },
    {
      name: "Blockchain Hack",
      datetime: "Dec 20, 2025 • 5:00 PM IST",
      platform: "ETHGlobal",
      link: "https://ethglobal.com",
      desc: "Build decentralized applications and explore Web3 innovations.",
    },
    {
      name: "Cybersecurity CTF",
      datetime: "Jan 12, 2026 • 6:00 PM IST",
      platform: "CTFtime",
      link: "https://ctftime.org",
      desc: "Capture the Flag competition with real-world security challenges.",
    },
    {
      name: "AR/VR Showdown",
      datetime: "Jan 30, 2026 • 12:00 PM IST",
      platform: "Unreal Engine",
      link: "https://unrealengine.com",
      desc: "Push the limits of immersive experiences with AR and VR projects.",
    },
    {
      name: "Cloud Wars",
      datetime: "Feb 15, 2026 • 10:00 AM IST",
      platform: "Google Cloud",
      link: "https://cloud.google.com",
      desc: "Build scalable cloud-native apps and showcase your DevOps skills.",
    },
  ];

  return (
    <div className="text-white text-center p-10">

      {/* ✅ Navbar Section */}
      <motion.nav
        className="sticky top-0 mt-12 w-full z-50  border-b border-white/10 mb-10"
        variants={navbarVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="container mx-auto px-4 py-4 flex justify-center">
          <motion.div 
            className="group"
            variants={logoVariants}
            initial="initial"
            whileHover="hover"
          >
            <Link to="/tournaments" className="flex items-center gap-2">
              <motion.div 
                className="text-2xl md:text-3xl font-black bg-gradient-to-r from-violet-400 via-purple-500 to-pink-500 bg-clip-text text-transparent flex items-center gap-2"
                animate={{
                  textShadow: [
                    "0 0 20px rgba(139, 92, 246, 0.5)",
                    "0 0 30px rgba(139, 92, 246, 0.8)",
                    "0 0 20px rgba(139, 92, 246, 0.5)"
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <h1 className="text-4xl">UPCOMING TOURNAMENTS</h1>
                <Swords className="w-7 h-7 md:w-8 md:h-8 text-violet-400" />

              </motion.div>
            </Link>
          </motion.div>
        </div>
      </motion.nav>

      {/* ✅ Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {tournaments.map((tournament, index) => (
          <motion.div
            key={index}
            className="bg-gray-800 rounded-2xl shadow-lg p-6 text-left hover:scale-105 transition-transform"
            whileHover={{ scale: 1.05 }}
          >
            <h2 className="text-2xl font-semibold mb-2">{tournament.name}</h2>
            <p className="text-gray-400 mb-1">📅 {tournament.datetime}</p>
            <p className="text-gray-400 mb-3">🎯 Platform: {tournament.platform}</p>
            <p className="text-gray-300 mb-4">{tournament.desc}</p>
            <a
              href={tournament.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-500 transition"
            >
              Register
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Tournaments;
