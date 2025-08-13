import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Twitter, 
  Facebook, 
  Instagram, 
  Linkedin, 
  Youtube, 
  MessageCircle,
  Rocket,
  Swords,
  Trophy,
  Target,
  Brain,
  Building,
  BarChart3,
  MessageSquare,
  Flame,
  PenTool,
  Mail,
  Calendar,
  HelpCircle,
  Phone,
  Bug,
  Lightbulb,
  Lock,
  FileText,
  Users,
  Globe,
  Wrench,
  AlertTriangle,
  Zap,
  Gamepad2,
  MapPin
} from 'lucide-react';

const Footer = () => {
  const [hoveredSocial, setHoveredSocial] = useState(null);

  // Animation variants
  const floatVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const glowVariants = {
    animate: {
      boxShadow: [
        "0 0 20px rgba(139, 92, 246, 0.3)",
        "0 0 30px rgba(139, 92, 246, 0.6)",
        "0 0 20px rgba(139, 92, 246, 0.3)"
      ],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const slideUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const footerLinkVariants = {
    initial: { x: 0 },
    hover: { 
      x: 4,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  const socialGlowVariants = {
    initial: { 
      scale: 1, 
      y: 0,
      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)"
    },
    hover: { 
      scale: 1.05,
      y: -2,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  const iconScaleVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.1,
      transition: { duration: 0.3 }
    }
  };

  const socialLinks = [
    { 
      icon: Twitter, 
      name: 'Twitter', 
      color: 'from-blue-400 to-blue-600',
      hoverColor: 'hover:shadow-blue-400/30'
    },
    { 
      icon: Facebook, 
      name: 'Facebook', 
      color: 'from-blue-600 to-blue-800',
      hoverColor: 'hover:shadow-blue-600/30'
    },
    { 
      icon: Instagram, 
      name: 'Instagram', 
      color: 'from-pink-500 to-purple-600',
      hoverColor: 'hover:shadow-pink-500/30'
    },
    { 
      icon: Linkedin, 
      name: 'LinkedIn', 
      color: 'from-blue-700 to-blue-900',
      hoverColor: 'hover:shadow-blue-700/30'
    },
    { 
      icon: Youtube, 
      name: 'YouTube', 
      color: 'from-red-500 to-red-700',
      hoverColor: 'hover:shadow-red-500/30'
    },
    { 
      icon: MessageCircle, 
      name: 'Discord', 
      color: 'from-indigo-500 to-purple-600',
      hoverColor: 'hover:shadow-indigo-500/30'
    }
  ];

  const platformLinks = [
    { name: 'Create Room', icon: Rocket },
    { name: 'Join Battle', icon: Swords },
    { name: 'Tournaments', icon: Trophy },
    { name: 'Practice Mode', icon: Target },
    { name: 'Challenges', icon: Brain },
    { name: 'Arena', icon: Building }
  ];

  const communityLinks = [
    { name: 'Leaderboard', icon: BarChart3 },
    { name: 'Discord Server', icon: MessageSquare },
    { name: 'Reddit Community', icon: Flame },
    { name: 'Blog', icon: PenTool },
    { name: 'Newsletter', icon: Mail },
    { name: 'Events', icon: Calendar }
  ];

  const supportLinks = [
    { name: 'Help Center', icon: HelpCircle },
    { name: 'Contact Us', icon: Phone },
    { name: 'Bug Reports', icon: Bug },
    { name: 'Feature Requests', icon: Lightbulb },
    { name: 'Privacy Policy', icon: Lock, href: '/privacy' },
    { name: 'Terms of Service', icon: FileText, href: '/terms' }
  ];

  const quickStats = [
    { label: 'Active Warriors', value: '10K+', icon: Users },
    { label: 'Battles Today', value: '500+', icon: Swords },
    { label: 'Countries', value: '50+', icon: Globe }
  ];

  return (
    <motion.footer 
      className="relative bg-black/60 backdrop-blur-2xl border-t border-white/10  overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.1)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      </div>
      
      {/* Floating Orbs */}
      <motion.div 
        className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-r from-violet-500/20 to-purple-600/20 rounded-full blur-xl"
        variants={floatVariants}
        animate="animate"
      />
      <motion.div 
        className="absolute top-20 right-20 w-16 h-16 bg-gradient-to-r from-pink-500/20 to-red-600/20 rounded-full blur-xl"
        variants={floatVariants}
        animate="animate"
        transition={{ delay: 2 }}
      />
      <motion.div 
        className="absolute bottom-10 left-1/3 w-12 h-12 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-full blur-xl"
        variants={floatVariants}
        animate="animate"
        transition={{ delay: 4 }}
      />

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Quick Stats Bar */}
        <motion.div 
          className="bg-gradient-to-r from-violet-900/40 to-purple-900/40 rounded-2xl p-6 mb-12 border border-white/10 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-wrap justify-center gap-8 text-center">
            {quickStats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div 
                  key={stat.label} 
                  variants={slideUpVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.2 }}
                >
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <IconComponent className="w-6 h-6 text-violet-400" />
                    <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-500">
                      {stat.value}
                    </span>
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Brand Section */}
          <motion.div 
            className="lg:col-span-2 space-y-6"
            variants={slideUpVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="space-y-4">
              <motion.div 
                className="text-3xl font-black bg-gradient-to-r from-violet-400 via-purple-500 to-pink-500 bg-clip-text text-transparent flex items-center gap-2"
                variants={glowVariants}
                animate="animate"
              >
                <Swords className="w-8 h-8 text-violet-400" />
                LOOPWAR
              </motion.div>
              <p className="text-gray-400 text-sm leading-relaxed max-w-md">
                The ultimate competitive coding platform where warriors battle through algorithms and data structures. 
                Join thousands of developers in epic coding duels that push your skills to the limit.
              </p>
            </div>
            
            {/* Social Media Links */}
            <div>
              <h4 className="text-white font-semibold mb-4 flex items-center space-x-2">
                <Globe className="w-5 h-5 text-violet-400" />
                <span>Connect With Us</span>
              </h4>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <motion.button
                      key={social.name}
                      className={`w-12 h-12 bg-gradient-to-r ${social.color} rounded-full flex items-center justify-center text-white font-bold ${social.hoverColor}`}
                      variants={socialGlowVariants}
                      initial="initial"
                      whileHover="hover"
                      onMouseEnter={() => setHoveredSocial(index)}
                      onMouseLeave={() => setHoveredSocial(null)}
                      title={social.name}
                    >
                      <motion.div
                        variants={iconScaleVariants}
                        initial="initial"
                        animate={hoveredSocial === index ? "hover" : "initial"}
                      >
                        <IconComponent className="w-5 h-5" />
                      </motion.div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Platform Section */}
          <motion.div 
            variants={slideUpVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-white font-bold mb-6 flex items-center space-x-2 text-lg">
              <Rocket className="w-5 h-5 text-violet-400" />
              <span>Platform</span>
            </h3>
            <div className="space-y-3">
              {platformLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <motion.button 
                    key={link.name} 
                    className="flex items-center space-x-3 text-gray-400 hover:text-white text-sm group relative"
                    variants={footerLinkVariants}
                    initial="initial"
                    whileHover="hover"
                  >
                    {/* Animated underline */}
                    <motion.div
                      className="absolute left-[-8px] top-1/2 h-0.5 bg-gradient-to-r from-violet-400 to-purple-500"
                      initial={{ width: 0, y: "-50%" }}
                      whileHover={{ 
                        width: "4px",
                        transition: { duration: 0.3, ease: "easeOut" }
                      }}
                    />
                    <motion.div
                      variants={iconScaleVariants}
                      initial="initial"
                      whileHover="hover"
                    >
                      <IconComponent className="w-4 h-4" />
                    </motion.div>
                    <span>{link.name}</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Community Section */}
          <motion.div 
            variants={slideUpVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-white font-bold mb-6 flex items-center space-x-2 text-lg">
              <Users className="w-5 h-5 text-pink-400" />
              <span>Community</span>
            </h3>
            <div className="space-y-3">
              {communityLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <motion.button 
                    key={link.name} 
                    className="flex items-center space-x-3 text-gray-400 hover:text-white text-sm group relative"
                    variants={footerLinkVariants}
                    initial="initial"
                    whileHover="hover"
                  >
                    {/* Animated underline */}
                    <motion.div
                      className="absolute left-[-8px] top-1/2 h-0.5 bg-gradient-to-r from-violet-400 to-purple-500"
                      initial={{ width: 0, y: "-50%" }}
                      whileHover={{ 
                        width: "4px",
                        transition: { duration: 0.3, ease: "easeOut" }
                      }}
                    />
                    <motion.div
                      variants={iconScaleVariants}
                      initial="initial"
                      whileHover="hover"
                    >
                      <IconComponent className="w-4 h-4" />
                    </motion.div>
                    <span>{link.name}</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Support Section */}
          <motion.div 
            variants={slideUpVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.6 }}
          >
            <h3 className="text-white font-bold mb-6 flex items-center space-x-2 text-lg">
              <Wrench className="w-5 h-5 text-green-400" />
              <span>Support</span>
            </h3>
            <div className="space-y-3">
              {supportLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <motion.a
                    key={link.name}
                    href={link.href || '#'}
                    className="flex items-center space-x-3 text-gray-400 hover:text-white text-sm group relative"
                    variants={footerLinkVariants}
                    initial="initial"
                    whileHover="hover"
                  >
                    {/* Animated underline */}
                    <motion.div
                      className="absolute left-[-8px] top-1/2 h-0.5 bg-gradient-to-r from-violet-400 to-purple-500"
                      initial={{ width: 0, y: "-50%" }}
                      whileHover={{ 
                        width: "4px",
                        transition: { duration: 0.3, ease: "easeOut" }
                      }}
                    />
                    <motion.div
                      variants={iconScaleVariants}
                      initial="initial"
                      whileHover="hover"
                    >
                      <IconComponent className="w-4 h-4" />
                    </motion.div>
                    <span>{link.name}</span>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Newsletter Signup */}
        <motion.div 
          className="bg-gradient-to-r from-violet-900/20 to-purple-900/20 rounded-2xl p-8 mb-12 border border-white/10 backdrop-blur-sm"
          variants={slideUpVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.8 }}
        >
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4 text-white flex items-center justify-center gap-2">
              <AlertTriangle className="w-6 h-6 text-orange-400" />
              Stay in the Loop
            </h3>
            <p className="text-gray-300 mb-6">
              Get notified about new tournaments, features, and epic battles. Join our warrior newsletter!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your battle email..."
                className="flex-1 px-4 py-3 bg-black/40 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-400/50 backdrop-blur-sm"
              />
              <motion.button 
                className="px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-semibold rounded-xl shadow-lg flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <Zap className="w-4 h-4" />
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div 
          className="border-t border-white/10 pt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm text-center md:text-left">
              <p>© 2024 LOOPWAR. Built for warriors, by warriors.</p>
              <div className="mt-1 flex items-center justify-center md:justify-start gap-2">
                <span>All rights reserved. May the best code win!</span>
                <Swords className="w-4 h-4" />
              </div>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span className="flex items-center space-x-2">
                <motion.span 
                  className="w-2 h-2 bg-green-500 rounded-full"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span>System Status: Online</span>
              </span>
              <span className="hidden md:block">|</span>
              <span className="flex items-center gap-1">
                <Flame className="w-4 h-4 text-orange-400" />
                Ready for battle
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Subtle Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
    </motion.footer>
  );
};

export default Footer;