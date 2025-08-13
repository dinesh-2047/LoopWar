import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const mobileMenuVariants = {
    closed: { height: 0, opacity: 0 },
    open: { height: 'auto', opacity: 1, transition: { duration: 0.3 } },
  };

  return (
    <motion.nav
      className="bg-gray-900 bg-opacity-90 backdrop-blur-md fixed w-full z-10"
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-purple-400">
          ⚔️ Loopwar
        </Link>
        <div className="hidden md:flex space-x-6">
          <Link to="/create-room" className="text-gray-300 hover:text-purple-400 transition duration-300">
            Create Room
          </Link>
          <Link to="/join-room" className="text-gray-300 hover:text-purple-400 transition duration-300">
            Join Room
          </Link>
          <Link to="/about" className="text-gray-300 hover:text-purple-400 transition duration-300">
            About
          </Link>
          <Link to="/leaderboard" className="text-gray-300 hover:text-purple-400 transition duration-300">
            Leaderboard
          </Link>
          <Link to="/Signin" className="text-gray-300 hover:text-purple-400 transition duration-300">
            SignIn
          </Link>
        </div>
        <button
          className="md:hidden text-gray-300 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
            />
          </svg>
        </button>
      </div>
      <motion.div
        className="md:hidden bg-gray-800 bg-opacity-90 overflow-hidden"
        variants={mobileMenuVariants}
        initial="closed"
        animate={isOpen ? 'open' : 'closed'}
      >
        <div className="flex flex-col space-y-4 py-4 px-4">
          <Link
            to="/create-room"
            className="text-gray-300 hover:text-purple-400 transition duration-300"
            onClick={() => setIsOpen(false)}
          >
            Create Room
          </Link>
          <Link
            to="/join-room"
            className="text-gray-300 hover:text-purple-400 transition duration-300"
            onClick={() => setIsOpen(false)}
          >
            Join Room
          </Link>
          <Link
            to="/about"
            className="text-gray-300 hover:text-purple-400 transition duration-300"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          <Link
            to="/leaderboard"
            className="text-gray-300 hover:text-purple-400 transition duration-300"
            onClick={() => setIsOpen(false)}
          >
            Leaderboard
          </Link>
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;