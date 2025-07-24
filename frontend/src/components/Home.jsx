import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut', staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white">
      <div className="container mx-auto px-4 py-20">
        <motion.div
          className="text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
            variants={itemVariants}
          >
            ⚔️ Loopwar
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            The Ultimate 1v1 Code Battle Arena. Challenge friends, code in real-time, and claim victory!
          </motion.p>
          <motion.div className="flex justify-center gap-4" variants={itemVariants}>
            <Link
              to="/create-room"
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-full transition duration-300 transform hover:scale-105"
            >
              Create Room
            </Link>
            <Link
              to="/join-room"
              className="bg-transparent border-2 border-purple-600 text-purple-400 hover:text-white hover:bg-purple-600 font-semibold py-3 px-6 rounded-full transition duration-300 transform hover:scale-105"
            >
              Join Room
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="p-6 bg-gray-800 bg-opacity-50 rounded-lg backdrop-blur-md"
            variants={itemVariants}
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
          >
            <h3 className="text-xl font-semibold mb-2">Real-Time Battles</h3>
            <p className="text-gray-300">Watch your opponent's code update live as you race to solve the problem.</p>
          </motion.div>
          <motion.div
            className="p-6 bg-gray-800 bg-opacity-50 rounded-lg backdrop-blur-md"
            variants={itemVariants}
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
          >
            <h3 className="text-xl font-semibold mb-2">Secure Rooms</h3>
            <p className="text-gray-300">Create or join private rooms with ID and password for secure duels.</p>
          </motion.div>
          <motion.div
            className="p-6 bg-gray-800 bg-opacity-50 rounded-lg backdrop-blur-md"
            variants={itemVariants}
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
          >
            <h3 className="text-xl font-semibold mb-2">Instant Results</h3>
            <p className="text-gray-300">Submit your solution and see who wins with real-time scoring.</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;