import Counter from "./Counter.jsx";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  Zap, 
  Target, 
  BarChart3, 
  Trophy, 
  Globe, 
  Users, 
  Swords, 
  Clock, 
  Earth,
  Rocket,
  ArrowRight,
  Download,
  Play,
  Sparkles
} from 'lucide-react';

const ModernLandingPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 6);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: Shield,
      title: "Secure Battle Rooms",
      description: "Military-grade encryption for private coding battles. Your code, your rules.",
      color: "from-violet-500 to-purple-600",
      delay: 0
    },
    {
      icon: Zap,
      title: "Lightning Speed",
      description: "Zero-latency real-time coding with WebSocket technology. Feel every keystroke.",
      color: "from-cyan-500 to-blue-600",
      delay: 0.2
    },
    {
      icon: Target,
      title: "Smart Matching",
      description: "AI-powered opponent matching based on skill level and coding style.",
      color: "from-emerald-500 to-teal-600",
      delay: 0.4
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Deep insights into your coding patterns, speed, and problem-solving approach.",
      color: "from-orange-500 to-red-600",
      delay: 0.6
    },
    {
      icon: Trophy,
      title: "Tournament Mode",
      description: "Compete in structured tournaments with leaderboards and prizes.",
      color: "from-yellow-500 to-orange-600",
      delay: 0.8
    },
    {
      icon: Globe,
      title: "Multi-Language Support",
      description: "Code in Python, JavaScript, Java, C++, and 20+ other languages.",
      color: "from-pink-500 to-rose-600",
      delay: 1.0
    }
  ];

const stats = [
  { value: 10, display: "10K+", label: "Active Warriors", icon: Users },
  { value: 500, display: "50K+", label: "Battles Completed", icon: Swords },
  { value: 1, display: "<1ms", label: "Response Time", icon: Zap },
  { value: 24, display: "24/7", label: "Always Online", icon: Earth }
];


  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const slideUpVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const floatVariants = {
    initial: { y: 0, rotate: 0 },
    animate: { 
      y: [-20, 0, -20], 
      rotate: [0, 5, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const pulseGlowVariants = {
    initial: { boxShadow: "0 0 30px rgba(139, 92, 246, 0.5)" },
    animate: {
      boxShadow: [
        "0 0 30px rgba(139, 92, 246, 0.5)",
        "0 0 50px rgba(139, 92, 246, 0.8)",
        "0 0 30px rgba(139, 92, 246, 0.5)"
      ],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const codeRainVariants = {
    initial: { y: "-100vh", opacity: 0 },
    animate: {
      y: "100vh",
      opacity: [0, 1, 1, 0],
      transition: {
        duration: 15,
        repeat: Infinity,
        ease: "linear",
        times: [0, 0.1, 0.9, 1]
      }
    }
  };

  const logoVariants = {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.02, 1],
      textShadow: [
        "0 0 20px rgba(139, 92, 246, 0.5)",
        "0 0 30px rgba(139, 92, 246, 0.8)",
        "0 0 20px rgba(139, 92, 246, 0.5)"
      ],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/50 to-black text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated Grid */}
        <motion.div 
          className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.1)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        />
        
        {/* Floating Orbs */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 bg-gradient-to-r from-violet-500/20 to-purple-600/20 rounded-full blur-xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            variants={floatVariants}
            initial="initial"
            animate="animate"
            transition={{
              delay: i * 2,
              duration: 8 + i * 2,
              repeat: Infinity
            }}
          />
        ))}

        {/* Code Rain Effect */}
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-violet-400/20 text-xs font-mono"
            style={{ left: `${20 + i * 15}%` }}
            variants={codeRainVariants}
            initial="initial"
            animate="animate"
            transition={{ delay: i * 3, repeat: Infinity }}
          >
            {['function battle()', 'if (winner)', 'console.log()', 'return victory', 'async await'][i]}
          </motion.div>
        ))}

        {/* Mouse Glow Effect */}
        <motion.div
          className="fixed w-96 h-96 pointer-events-none z-0 opacity-10"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.6) 0%, transparent 70%)'
          }}
          animate={{
            x: mousePosition.x - 192,
            y: mousePosition.y - 192
          }}
          transition={{ type: "spring", damping: 30, stiffness: 200 }}
        />
      </div>

      <motion.div 
        className="container mx-auto px-4 pt-24 pb-12 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Section */}
      <div className="text-center mb-32">
  <motion.div className="mb-8" variants={slideUpVariants}>
    <motion.h1
      className="font-black mb-6 bg-gradient-to-r from-violet-400 via-purple-500 to-pink-500 
      bg-clip-text text-transparent filter drop-shadow-2xl
      text-[clamp(2.5rem,8vw,6rem)] md:text-[clamp(4rem,8vw,9rem)]"
      variants={logoVariants}
      initial="initial"
      animate="animate"
    >
      LOOPWAR
    </motion.h1>
            <motion.div 
              className="text-4xl mb-4"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Swords className="w-16 h-16 mx-auto text-violet-400" />
            </motion.div>
          </motion.div>
          
          <motion.div variants={slideUpVariants}>
            <p className="text-2xl md:text-4xl mb-6 font-light">
              Where Code Meets <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 font-bold">Combat</span>
            </p>
            
            <p className="text-lg text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Enter the arena where algorithms clash and data structures battle. 
              Face opponents in real-time coding duels that will test your skills, speed, and strategic thinking.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-6 mb-20"
            variants={slideUpVariants}
          >
            <motion.button 
              className="group relative bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 text-white font-bold py-5 px-10 rounded-2xl text-xl"
              variants={pulseGlowVariants}
              initial="initial"
              animate="animate"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center gap-3">
                <Rocket className="w-5 h-5" />
                Launch Battle
                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </span>
            </motion.button>
            
            <motion.button 
              className="group bg-transparent border-2 border-violet-500/50 text-violet-300 hover:text-white font-bold py-5 px-10 rounded-2xl text-xl backdrop-blur-sm"
              whileHover={{ 
                scale: 1.05, 
                backgroundColor: "rgba(139, 92, 246, 0.1)",
                borderColor: "rgba(139, 92, 246, 0.8)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center gap-3">
                <Target className="w-5 h-5" />
                Join Arena
                <motion.div
                  whileHover={{ rotate: 90 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Download className="w-5 h-5" />
                </motion.div>
              </span>
            </motion.button>
          </motion.div>

          {/* Stats Section */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto"
            variants={slideUpVariants}
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={index} 
                className="p-6 bg-black/30 backdrop-blur-xl rounded-2xl border border-white/10"
                whileHover={{ 
                  scale: 1.05,
                  borderColor: "rgba(139, 92, 246, 0.5)"
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <motion.div 
                  className="text-3xl mb-2"
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.5
                  }}
                >
                  <stat.icon className="w-8 h-8 text-violet-400 mx-auto" />
                </motion.div>
                <motion.div 
                  className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-500 mb-1"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
                >
                  <Counter targetNumber={stat.value} display={stat.display} duration={2000} />
                </motion.div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Features Section */}
        <div className="mb-32">
          <motion.div 
            className="text-center mb-16"
            variants={slideUpVariants}
          >
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent">
              Arsenal of Features
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Cutting-edge technology meets competitive programming in ways you've never experienced
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className={`group p-8 bg-black/40 backdrop-blur-xl rounded-2xl border transition-colors duration-700 ${
                  activeFeature === index 
                    ? 'border-violet-400/80 bg-violet-900/20' 
                    : 'border-white/10'
                }`}
                variants={slideUpVariants}
                whileHover={{ 
                  scale: 1.05,
                  borderColor: "rgba(139, 92, 246, 0.4)"
                }}
                animate={activeFeature === index ? {
                  boxShadow: "0 0 40px rgba(139, 92, 246, 0.2)"
                } : {}}
              >
                <motion.div 
                  className={`p-4 rounded-xl bg-gradient-to-br ${feature.color} w-fit text-white`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <feature.icon className="w-10 h-10" />
                </motion.div>
                
                <motion.h3 
                  className="text-2xl font-bold mb-4 text-white group-hover:text-violet-300 transition-colors"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: feature.delay }}
                >
                  {feature.title}
                </motion.h3>
                
                <motion.p 
                  className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: feature.delay + 0.1 }}
                >
                  {feature.description}
                </motion.p>

                <motion.div 
                  className="mt-6 flex items-center text-violet-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ x: 5 }}
                >
                  <span className="text-sm font-semibold">Learn More</span>
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Battle Preview Section */}
        <motion.div 
          className="mb-32 text-center"
          variants={slideUpVariants}
        >
          <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent">
            Experience the Battlefield
          </h2>
          <motion.div 
            className="max-w-6xl mx-auto bg-black/60 backdrop-blur-xl rounded-3xl p-8 border border-white/10"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div 
              className="bg-gray-900/80 rounded-2xl p-6 font-mono text-left"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <motion.div 
                  className="w-3 h-3 bg-red-500 rounded-full"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div 
                  className="w-3 h-3 bg-yellow-500 rounded-full"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                />
                <motion.div 
                  className="w-3 h-3 bg-green-500 rounded-full"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                />
                <span className="ml-4 text-gray-400 text-sm">Battle Terminal v2.0</span>
              </div>
              <motion.div 
                className="space-y-2 text-sm"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {[
                  { text: "⚡ Connecting to battle room...", color: "text-violet-400", icon: Zap },
                  { text: "✅ Player_Warrior connected", color: "text-green-400" },
                  { text: "✅ Opponent_CodeMaster joined", color: "text-green-400" },
                  { text: "🎯 Problem: Two Sum - Difficulty: Medium", color: "text-yellow-400", icon: Target },
                  { text: "🔥 Battle begins in 3... 2... 1... CODE!", color: "text-cyan-400", icon: Sparkles }
                ].map((line, index) => (
                  <motion.div 
                    key={index}
                    className={`${line.color} flex items-center gap-2`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.5 }}
                  >
                    {line.icon && <line.icon className="w-4 h-4" />}
                    <span>{line.text.replace(/^[⚡✅🎯🔥]\s/, '')}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Final CTA */}
        <motion.div 
          className="text-center"
          variants={slideUpVariants}
        >
          <motion.div 
            className="inline-block p-12 bg-gradient-to-r from-violet-900/60 via-purple-900/60 to-pink-900/60 rounded-3xl backdrop-blur-xl border border-white/20 max-w-4xl"
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 0 50px rgba(139, 92, 246, 0.3)"
            }}
          >
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Ready to Prove Your Worth?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of warriors in the ultimate coding battlefield. 
              Your legend starts with a single battle.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.button 
                className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-black font-bold py-4 px-10 rounded-2xl text-lg shadow-2xl flex items-center gap-3"
                whileHover={{ 
                  scale: 1.05,
                  backgroundImage: "linear-gradient(to right, #eab308, #f97316, #dc2626)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Zap className="w-5 h-5" />
                Enter the Arena Now
              </motion.button>
              <motion.button 
                className="border-2 border-violet-400 text-violet-300 font-bold py-4 px-10 rounded-2xl text-lg backdrop-blur-sm flex items-center gap-3"
                whileHover={{ 
                  backgroundColor: "rgba(139, 92, 246, 0.2)",
                  scale: 1.05
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Play className="w-5 h-5" />
                Watch Demo Battle
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ModernLandingPage;