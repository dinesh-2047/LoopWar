import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  Lock, 
  Eye, 
  Users, 
  Server, 
  Globe, 
  Mail, 
  AlertCircle,
  CheckCircle,
  ArrowRight,
  ChevronDown,
  ChevronRight,
  Cookie,
  Database,
  UserCheck,
  FileText,
  Calendar,
  ArrowLeft
} from 'lucide-react';

const PrivacyPolicyPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [expandedSection, setExpandedSection] = useState(null);
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setReadingProgress(scrolled);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const privacySections = [
    {
      id: 'data-collection',
      icon: Database,
      title: 'Data Collection',
      content: [
        'We collect information you provide directly to us, such as when you create an account, participate in coding battles, or contact us.',
        'Account information: username, email address, password (encrypted)',
        'Battle data: code submissions, performance metrics, battle history',
        'Usage data: interaction patterns, feature usage, time spent in battles',
        'Technical data: IP address, browser type, device information, cookies'
      ]
    },
    {
      id: 'data-usage',
      icon: UserCheck,
      title: 'How We Use Your Data',
      content: [
        'Provide and improve our coding battle platform services',
        'Match you with opponents of similar skill levels',
        'Generate performance analytics and insights',
        'Communicate with you about your account and battles',
        'Ensure platform security and prevent fraud',
        'Develop new features and enhance user experience'
      ]
    },
    {
      id: 'data-sharing',
      icon: Users,
      title: 'Data Sharing',
      content: [
        'We do not sell your personal information to third parties',
        'Battle statistics may be shared publicly on leaderboards',
        'Anonymized usage data may be used for research and development',
        'We may share data with service providers who assist our operations',
        'Legal compliance: we may disclose data when required by law'
      ]
    },
    {
      id: 'cookies',
      icon: Cookie,
      title: 'Cookies & Tracking',
      content: [
        'Essential cookies: necessary for platform functionality',
        'Performance cookies: help us understand how you use our platform',
        'Functional cookies: remember your preferences and settings',
        'Analytics cookies: provide insights into user behavior',
        'You can control cookie preferences in your browser settings'
      ]
    },
    {
      id: 'data-security',
      icon: Shield,
      title: 'Data Security',
      content: [
        'Military-grade encryption for all data transmission and storage',
        'Regular security audits and vulnerability assessments',
        'Access controls and authentication protocols',
        'Secure cloud infrastructure with redundant backups',
        'Employee training on data protection best practices',
        'Incident response procedures for potential breaches'
      ]
    },
    {
      id: 'user-rights',
      icon: Lock,
      title: 'Your Rights',
      content: [
        'Access: Request a copy of your personal data',
        'Rectification: Correct inaccurate or incomplete data',
        'Erasure: Request deletion of your personal data',
        'Portability: Export your data in a machine-readable format',
        'Objection: Object to certain processing of your data',
        'Restriction: Limit how we process your data in certain circumstances'
      ]
    }
  ];

  const keyHighlights = [
    { icon: Eye, title: 'Transparency', description: 'Clear information about data practices' },
    { icon: Shield, title: 'Security', description: 'Military-grade protection' },
    { icon: Lock, title: 'Control', description: 'You own your data' },
    { icon: UserCheck, title: 'Rights', description: 'Full GDPR compliance' }
  ];

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/50 to-black text-white relative overflow-hidden">
      {/* Reading Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-purple-600 z-50 origin-left"
        style={{ scaleX: readingProgress / 100 }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: readingProgress / 100 }}
      />

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
        {Array.from({ length: 6 }).map((_, i) => (
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

      <div className="container mx-auto px-4 py-12 relative z-10 max-w-6xl">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.button 
            className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors mb-8 group"
            variants={slideUpVariants}
            whileHover={{ x: -5 }}
          >
            <ArrowLeft className="w-5 h-5 group-hover:animate-pulse" />
            Back to Battle Arena
          </motion.button>

          <motion.h1 
            className="text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-violet-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
            variants={slideUpVariants}
          >
            Privacy Policy
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto"
            variants={slideUpVariants}
          >
            Your privacy is our priority. Learn how we protect, use, and manage your data in the LOOPWAR arena.
          </motion.p>

          <motion.div 
            className="flex items-center justify-center gap-2 text-sm text-gray-400"
            variants={slideUpVariants}
          >
            <Calendar className="w-4 h-4" />
            Last updated: August 12, 2025
          </motion.div>
        </motion.div>

        {/* Key Highlights */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {keyHighlights.map((highlight, index) => (
            <motion.div 
              key={index}
              className="p-6 bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10"
              variants={slideUpVariants}
              whileHover={{ 
                scale: 1.05,
                borderColor: "rgba(139, 92, 246, 0.5)"
              }}
            >
              <motion.div 
                className="p-3 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 w-fit text-white mb-4"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <highlight.icon className="w-6 h-6" />
              </motion.div>
              <h3 className="text-lg font-bold mb-2 text-white">
                {highlight.title}
              </h3>
              <p className="text-gray-300 text-sm">
                {highlight.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content */}
        <motion.div 
          className="space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {privacySections.map((section, index) => (
            <motion.div
              key={section.id}
              className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden"
              variants={slideUpVariants}
              whileHover={{ borderColor: "rgba(139, 92, 246, 0.3)" }}
            >
              <motion.button
                className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex items-center gap-4">
                  <motion.div 
                    className="p-3 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <section.icon className="w-6 h-6 text-white" />
                  </motion.div>
                  <h2 className="text-2xl font-bold text-white">
                    {section.title}
                  </h2>
                </div>
                <motion.div
                  animate={{ rotate: expandedSection === section.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-6 h-6 text-violet-400" />
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {expandedSection === section.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-6"
                  >
                    <div className="pl-16 space-y-4">
                      {section.content.map((item, itemIndex) => (
                        <motion.div
                          key={itemIndex}
                          className="flex items-start gap-3 text-gray-300"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: itemIndex * 0.1 }}
                        >
                          <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                          <span className="leading-relaxed">{item}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact Section */}
        <motion.div 
          className="mt-16 text-center"
          variants={slideUpVariants}
        >
          <motion.div 
            className="inline-block p-8 bg-gradient-to-r from-violet-900/60 via-purple-900/60 to-pink-900/60 rounded-2xl backdrop-blur-xl border border-white/20"
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 0 40px rgba(139, 92, 246, 0.3)"
            }}
          >
            <h3 className="text-2xl font-bold mb-4 text-white">
              Questions About Your Privacy?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl">
              Our privacy team is here to help. Reach out with any questions about how we handle your data.
            </p>
            <motion.button 
              className="bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold py-3 px-8 rounded-xl flex items-center gap-3 mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail className="w-5 h-5" />
              Contact Privacy Team
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Footer Note */}
        <motion.div 
          className="mt-12 text-center text-sm text-gray-400"
          variants={slideUpVariants}
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <AlertCircle className="w-4 h-4" />
            <span>This policy is effective as of August 12, 2025</span>
          </div>
          <p>
            We may update this policy from time to time. We'll notify you of any significant changes.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;