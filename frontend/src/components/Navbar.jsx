import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Rocket, 
  Target, 
  Trophy, 
  BarChart3, 
  Info, 
  Zap, 
  Swords,
  Menu,
  X
} from 'lucide-react';
import { Link } from 'react-router-dom'; // ✅ Import Link for routing

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Create Room', path: '/create-room', icon: Rocket },
    { name: 'Join Room', path: '/join-room', icon: Target },
    { name: 'Tournaments', path: '/tournaments', icon: Trophy },
    { name: 'Leaderboard', path: '/leaderboard', icon: BarChart3 },
    { name: 'About', path: '/about', icon: Info }
  ];

  // Animation variants
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

  const iconVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.1,
      transition: { duration: 0.3 }
    }
  };

  const mobileMenuVariants = {
    closed: { 
      maxHeight: 0, 
      opacity: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    open: { 
      maxHeight: 400, 
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  const mobileItemVariants = {
    closed: { 
      x: -20, 
      opacity: 0,
      transition: { duration: 0.2 }
    },
    open: { 
      x: 0, 
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  const ctaButtonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      boxShadow: "0 10px 25px rgba(139, 92, 246, 0.25)",
      transition: { duration: 0.3 }
    },
    tap: { scale: 0.95 }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-xl border-b border-white/10"
        variants={navbarVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main Navigation Container */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            
            {/* Logo */}
            <motion.div 
              className="group"
              variants={logoVariants}
              initial="initial"
              whileHover="hover"
            >
              <Link to="/" className="flex items-center gap-2">
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
                  <Swords className="w-7 h-7 md:w-8 md:h-8 text-violet-400" />
                  LOOPWAR
                </motion.div>
              </Link>
            </motion.div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8 items-center">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (

                  <div key={item.name}>
                    <Link to={item.path}>
                    <motion.button 
                      className="relative text-gray-300 hover:text-white transition-colors duration-300 font-medium group flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-white/5 overflow-hidden"
                      variants={navLinkVariants}
                      initial="initial"
                      whileHover="hover"
                    >
                      {/* Underline animation */}
                      <motion.div
                        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-violet-400 via-purple-500 to-pink-400"
                        initial={{ width: "0%" }}
                        whileHover={{ 
                          width: "100%",
                          transition: { duration: 0.3, ease: "easeOut" }
                        }}
                      />
                      
                      <motion.div
                        variants={iconVariants}
                        initial="initial"
                        whileHover="hover"
                      >
                        <IconComponent className="w-4 h-4" />
                      </motion.div>
                      <span>{item.name}</span>
                    </motion.button>
                    </Link>
                  </div>

                );
              })}
              
              {/* Special CTA Button */}
              <div>
                <motion.button
                  className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-bold py-2 px-6 rounded-full transition-colors duration-300 flex items-center gap-2"
                  variants={ctaButtonVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Zap className="w-4 h-4" />
                  Quick Battle
                </motion.button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden text-gray-300 hover:text-white transition-colors duration-300 p-2 rounded-lg hover:bg-white/10"
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.9 }}
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </motion.button>
          </div>

          {/* Mobile Navigation Menu */}
          <motion.div
            className="md:hidden overflow-hidden"
            variants={mobileMenuVariants}
            initial="closed"
            animate={isOpen ? "open" : "closed"}
          >
            <motion.div className="mt-4 space-y-2 backdrop-blur-xl bg-black/80 rounded-2xl p-6 border border-white/10">
              {navItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={item.name}
                    variants={mobileItemVariants}
                    initial="closed"
                    animate={isOpen ? "open" : "closed"}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={item.path}
                      className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors duration-300 py-3 px-4 rounded-lg hover:bg-white/10 group w-full text-left"
                      onClick={() => setIsOpen(false)}
                    >
                      <motion.div
                        variants={iconVariants}
                        initial="initial"
                        whileHover="hover"
                      >
                        <IconComponent className="w-5 h-5" />
                      </motion.div>
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  </motion.div>
                );
              })}
              
              {/* Mobile CTA Button */}
              <motion.div
                className="pt-4 border-t border-white/10"
                variants={mobileItemVariants}
                initial="closed"
                animate={isOpen ? "open" : "closed"}
                transition={{ delay: navItems.length * 0.1 }}
              >
                <motion.button
                  className="flex items-center justify-center space-x-2 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-bold py-3 px-6 rounded-full transition-colors duration-300 w-full"
                  onClick={() => setIsOpen(false)}
                  variants={ctaButtonVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Zap className="w-5 h-5" />
                  <span>Quick Battle</span>
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Background Blur Overlay for Mobile */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm md:hidden -z-10"
              onClick={() => setIsOpen(false)}
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            />
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Navbar;
