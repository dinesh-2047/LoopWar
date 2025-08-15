import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Scale, 
  UserCheck, 
  Shield, 
  AlertTriangle, 
  Crown, 
  Zap, 
  Ban,
  CheckCircle,
  ArrowRight,
  ChevronDown,
  ArrowLeft,
  Calendar,
  Gavel,
  Trophy,
  Code,
  Users,
  Globe,
  Mail,
  ExternalLink,
  Sparkles,
  Clock
} from 'lucide-react';

const TermsOfServicePage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [expandedSection, setExpandedSection] = useState(null);
  const [readingProgress, setReadingProgress] = useState(0);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

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

  const termsSections = [
    {
      id: 'acceptance',
      icon: UserCheck,
      title: 'Acceptance of Terms',
      important: true,
      content: [
        'By accessing or using LOOPWAR, you agree to be bound by these Terms of Service',
        'If you do not agree to these terms, you may not use our services',
        'These terms constitute a legally binding agreement between you and LOOPWAR',
        'You must be at least 13 years old to use our platform',
        'If you are under 18, you need parental consent to use our services'
      ]
    },
    {
      id: 'platform-rules',
      icon: Code,
      title: 'Platform Rules & Conduct',
      important: true,
      content: [
        'No cheating, hacking, or exploiting platform vulnerabilities',
        'Submit only your own original code during battles',
        'Respect other users and maintain professional conduct',
        'No sharing of battle problems or solutions outside the platform',
        'Prohibition of automated tools, bots, or scripts during battles',
        'Report bugs and security issues through proper channels',
        'No harassment, hate speech, or discriminatory behavior'
      ]
    },
    {
      id: 'account-responsibilities',
      icon: Shield,
      title: 'Account & User Responsibilities',
      content: [
        'Maintain the security and confidentiality of your account credentials',
        'Provide accurate and up-to-date information during registration',
        'You are responsible for all activities under your account',
        'Notify us immediately of any unauthorized account access',
        'One account per person - multiple accounts are prohibited',
        'Keep your email address current for important communications'
      ]
    },
    {
      id: 'battle-rules',
      icon: Trophy,
      title: 'Battle System & Competition Rules',
      content: [
        'Battle outcomes are final once submitted and verified',
        'Disputes must be reported within 24 hours of battle completion',
        'Intentional disconnection during battles may result in automatic loss',
        'Tournament brackets and matchmaking are managed by our algorithms',
        'Prize distributions follow our published tournament guidelines',
        'Battle replays may be used for educational and promotional purposes'
      ]
    },
    {
      id: 'intellectual-property',
      icon: Crown,
      title: 'Intellectual Property Rights',
      content: [
        'LOOPWAR retains all rights to platform design, features, and branding',
        'You retain rights to your original code submissions',
        'By participating, you grant us license to display and analyze your battle performance',
        'Battle problems and test cases are proprietary LOOPWAR content',
        'Educational content and tutorials are protected by copyright',
        'User-generated content may be featured in our community showcases'
      ]
    },
    {
      id: 'prohibited-activities',
      icon: Ban,
      title: 'Prohibited Activities',
      important: true,
      content: [
        'Reverse engineering or attempting to extract platform algorithms',
        'Selling, trading, or transferring accounts to other users',
        'Creating fake accounts or impersonating other users',
        'Attempting to manipulate rankings or battle outcomes',
        'Using the platform for any illegal or unauthorized purposes',
        'Interfering with other users enjoyment of the platform',
        'Commercial use without explicit written permission'
      ]
    },
    {
      id: 'termination',
      icon: AlertTriangle,
      title: 'Account Termination & Suspension',
      content: [
        'We reserve the right to suspend or terminate accounts for violations',
        'Serious violations may result in immediate permanent ban',
        'You may delete your account at any time through account settings',
        'Upon termination, access to battle history and achievements is revoked',
        'Outstanding tournament prizes may be forfeited upon account termination',
        'We will provide notice of termination when legally required'
      ]
    },
    {
      id: 'disclaimers',
      icon: Scale,
      title: 'Disclaimers & Limitations',
      content: [
        'LOOPWAR is provided "as is" without warranties of any kind',
        'We do not guarantee uninterrupted or error-free service',
        'Platform availability may be affected by maintenance or technical issues',
        'Battle results depend on various factors including network conditions',
        'We are not liable for lost data, battle outcomes, or technical difficulties',
        'Educational content is for informational purposes only'
      ]
    },
    {
      id: 'privacy-data',
      icon: Shield,
      title: 'Privacy & Data Usage',
      content: [
        'Your privacy is governed by our separate Privacy Policy',
        'We collect battle performance data to improve matching algorithms',
        'Anonymous usage statistics help us develop new features',
        'Personal information is protected according to industry standards',
        'You can request data deletion in accordance with applicable laws',
        'Cookie usage is detailed in our Privacy Policy'
      ]
    },
    {
      id: 'changes-updates',
      icon: Zap,
      title: 'Changes & Updates',
      content: [
        'We may update these terms periodically to reflect service changes',
        'Significant changes will be communicated via email or platform notifications',
        'Continued use after changes constitutes acceptance of new terms',
        'We will maintain previous versions for reference when legally required',
        'Major policy changes include a 30-day notice period when possible'
      ]
    }
  ];

  const quickFacts = [
    { icon: Users, title: 'Fair Play', description: 'Zero tolerance for cheating' },
    { icon: Scale, title: 'Legal Protection', description: 'Comprehensive user rights' },
    { icon: Globe, title: 'Global Community', description: 'Worldwide battle arena' },
    { icon: Crown, title: 'IP Respect', description: 'Your code, your rights' }
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
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-red-600 z-50 origin-left"
        style={{ scaleX: readingProgress / 100 }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: readingProgress / 100 }}
      />

      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.1)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        />

        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 bg-gradient-to-r from-orange-500/20 to-red-600/20 rounded-full blur-xl"
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

        <motion.div
          className="fixed w-96 h-96 pointer-events-none z-0 opacity-10"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
            background: 'radial-gradient(circle, rgba(239, 68, 68, 0.6) 0%, transparent 70%)'
          }}
          animate={{
            x: mousePosition.x - 192,
            y: mousePosition.y - 192
          }}
          transition={{ type: "spring", damping: 30, stiffness: 200 }}
        />

        {/* Legal Symbols Rain */}
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-orange-400/20 text-xs font-mono"
            style={{ left: `${25 + i * 20}%` }}
            initial={{ y: "-100vh", opacity: 0 }}
            animate={{
              y: "100vh",
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
              delay: i * 5,
              times: [0, 0.1, 0.9, 1]
            }}
          >
            {['§', '©', '®', '™'][i]}
          </motion.div>
        ))}
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
            className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors mb-8 group"
            variants={slideUpVariants}
            whileHover={{ x: -5 }}
          >
            <ArrowLeft className="w-5 h-5 group-hover:animate-pulse" />
            Back to Battle Arena
          </motion.button>

          <motion.h1 
            className="text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent"
            variants={slideUpVariants}
          >
            Terms of Service
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto"
            variants={slideUpVariants}
          >
            The rules of engagement for the LOOPWAR arena. Know your rights, responsibilities, and the code of conduct.
          </motion.p>

          <motion.div 
            className="flex items-center justify-center gap-4 text-sm text-gray-400"
            variants={slideUpVariants}
          >
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Effective: August 12, 2025</span>
            </div>
            <div className="flex items-center gap-2">
              <Gavel className="w-4 h-4" />
              <span>Version 2.1</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Quick Facts */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {quickFacts.map((fact, index) => (
            <motion.div 
              key={index}
              className="p-6 bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10"
              variants={slideUpVariants}
              whileHover={{ 
                scale: 1.05,
                borderColor: "rgba(249, 115, 22, 0.5)",
                backgroundColor: "rgba(0, 0, 0, 0.6)"
              }}
            >
              <motion.div 
                className="p-3 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 w-fit text-white mb-4"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <fact.icon className="w-6 h-6" />
              </motion.div>
              <h3 className="text-lg font-bold mb-2 text-white">
                {fact.title}
              </h3>
              <p className="text-gray-300 text-sm">
                {fact.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content with Hover Animations */}
        <motion.div 
          className="space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {termsSections.map((section, index) => (
            <motion.div
              key={section.id}
              className={`group bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden relative ${
                section.important ? 'ring-2 ring-red-500/30' : ''
              }`}
              variants={slideUpVariants}
              whileHover={{ 
                borderColor: section.important ? "rgba(239, 68, 68, 0.6)" : "rgba(249, 115, 22, 0.5)",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                boxShadow: section.important 
                  ? "0 0 40px rgba(239, 68, 68, 0.3)" 
                  : "0 0 30px rgba(249, 115, 22, 0.2)"
              }}
                onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
            >
              {/* Important Badge */}
              {section.important && (
                <motion.div
                  className="absolute top-4 right-4 z-10"
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.5, type: "spring" }}
                >
                  <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    IMPORTANT
                  </div>
                </motion.div>
              )}

              {/* Header Bar */}
              <motion.div
                className="w-full p-6 text-left flex items-center justify-between cursor-pointer"
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex items-center gap-4">
                  <motion.div 
                    className={`p-3 rounded-xl bg-gradient-to-br ${
                      section.important 
                        ? 'from-red-500 to-orange-600' 
                        : 'from-orange-500 to-red-600'
                    }`}
                    whileHover={{ 
                      scale: 1.15, 
                      rotate: 10,
                      boxShadow: section.important 
                        ? "0 0 25px rgba(239, 68, 68, 0.7)" 
                        : "0 0 20px rgba(249, 115, 22, 0.6)"
                    }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <section.icon className="w-6 h-6 text-white" />
                  </motion.div>
                  <motion.h2 
                    className={`text-2xl font-bold text-white group-hover:${
                      section.important ? 'text-red-300' : 'text-orange-300'
                    } transition-colors`}
                    whileHover={{ x: 5 }}
                  >
                    {section.title}
                  </motion.h2>
                </div>
                <motion.div
                  animate={{ 
                    rotate: expandedSection === section.id ? 180 : 0,
                    scale: expandedSection === section.id ? 1.1 : 1
                  }}
                  transition={{ duration: 0.3, type: "spring" }}
                >
                  <ChevronDown className={`w-6 h-6 ${
                    section.important ? 'text-red-400 group-hover:text-red-300' : 'text-orange-400 group-hover:text-orange-300'
                  }`} />
                </motion.div>
              </motion.div>

              {/* Hover Glow Effect */}
              <motion.div
                className={`absolute inset-0 ${
                  section.important 
                    ? 'bg-gradient-to-r from-red-500/10 via-orange-500/10 to-red-500/10' 
                    : 'bg-gradient-to-r from-orange-500/10 via-red-500/10 to-orange-500/10'
                } opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />

              {/* Content Section */}
              <AnimatePresence>
                {expandedSection === section.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, y: -20 }}
                    animate={{ opacity: 1, height: "auto", y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -20 }}
                    transition={{ 
                      duration: 0.4,
                      ease: "easeOut",
                      opacity: { duration: 0.3 }
                    }}
                    className={`px-6 pb-6 border-t border-white/10 ${
                      section.important 
                        ? 'bg-gradient-to-b from-red-900/10 to-transparent' 
                        : 'bg-gradient-to-b from-orange-900/10 to-transparent'
                    }`}
                  >
                    <div className="pl-16 pt-6 space-y-4">
                      {section.content.map((item, itemIndex) => (
                        <motion.div
                          key={itemIndex}
                          className="flex items-start gap-3 text-gray-300"
                          initial={{ opacity: 0, x: -30, scale: 0.9 }}
                          animate={{ opacity: 1, x: 0, scale: 1 }}
                          transition={{ 
                            delay: itemIndex * 0.08,
                            type: "spring",
                            stiffness: 300,
                            damping: 20
                          }}
                          whileHover={{ 
                            x: 5, 
                            color: "#e5e7eb",
                            transition: { type: "spring", stiffness: 400 }
                          }}
                        >
                          <motion.div
                            initial={{ scale: 0, rotate: -90 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ 
                              delay: itemIndex * 0.08 + 0.2,
                              type: "spring",
                              stiffness: 400
                            }}
                          >
                            <CheckCircle className={`w-5 h-5 ${
                              section.important ? 'text-red-400' : 'text-green-400'
                            } mt-0.5 flex-shrink-0`} />
                          </motion.div>
                          <motion.span 
                            className="leading-relaxed"
                            initial={{ opacity: 0.7 }}
                            whileHover={{ opacity: 1 }}
                          >
                            {item}
                          </motion.span>
                        </motion.div>
                      ))}
                      
                      {/* Learn More Button */}
                      <motion.div
                        className="pl-8 pt-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: section.content.length * 0.08 + 0.3 }}
                      >
                        <motion.button
                          className={`flex items-center gap-2 ${
                            section.important ? 'text-red-400 hover:text-red-300' : 'text-orange-400 hover:text-orange-300'
                          } text-sm font-semibold`}
                          whileHover={{ 
                            x: 8,
                            color: section.important ? "#fca5a5" : "#fed7aa"
                          }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <span>Learn more about {section.title.toLowerCase()}</span>
                          <motion.div
                            whileHover={{ x: 3 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            <ArrowRight className="w-4 h-4" />
                          </motion.div>
                        </motion.button>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Progress Indicator */}
              <motion.div 
                className={`absolute bottom-0 left-0 h-1 ${
                  section.important 
                    ? 'bg-gradient-to-r from-red-500 to-orange-600' 
                    : 'bg-gradient-to-r from-orange-500 to-red-600'
                } origin-left`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: expandedSection === section.id ? 1 : 0 }}
                transition={{ duration: 0.4 }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Terms Acceptance */}
        <motion.div 
          className="mt-16"
          variants={slideUpVariants}
        >
          <motion.div 
            className="bg-gradient-to-r from-orange-900/40 via-red-900/40 to-orange-900/40 backdrop-blur-xl rounded-2xl border border-orange-500/30 p-8"
            whileHover={{ 
              scale: 1.01,
              borderColor: "rgba(249, 115, 22, 0.5)",
              boxShadow: "0 0 40px rgba(249, 115, 22, 0.2)"
            }}
          >
            <div className="flex items-start gap-4">
              <motion.div
                className="p-3 rounded-xl bg-gradient-to-br from-orange-500 to-red-600"
                animate={{ 
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Gavel className="w-6 h-6 text-white" />
              </motion.div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-4 text-white">
                  Terms Acknowledgment
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  By using LOOPWAR, you confirm that you have read, understood, and agree to these Terms of Service. 
                  These terms are legally binding and govern your use of our platform.
                </p>
                <motion.label 
                  className="flex items-center gap-3 cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                >
                  <motion.input
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="w-5 h-5 rounded border-2 border-orange-500 bg-transparent"
                    whileTap={{ scale: 0.95 }}
                  />
                  <span className="text-white font-medium">
                    I have read and agree to the Terms of Service
                  </span>
                  {acceptedTerms && (
                    <motion.div
                      initial={{ scale: 0, rotate: -90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    </motion.div>
                  )}
                </motion.label>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Contact Section */}
        <motion.div 
          className="mt-16 text-center"
          variants={slideUpVariants}
        >
          <motion.div 
            className="inline-block p-8 bg-gradient-to-r from-orange-900/60 via-red-900/60 to-orange-900/60 rounded-2xl backdrop-blur-xl border border-white/20"
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 0 40px rgba(249, 115, 22, 0.3)"
            }}
          >
            <h3 className="text-2xl font-bold mb-4 text-white">
              Questions About These Terms?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl">
              Our legal team is available to clarify any aspects of our Terms of Service. 
              Contact us for detailed explanations or legal inquiries.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button 
                className="bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold py-3 px-8 rounded-xl flex items-center gap-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="w-5 h-5" />
                Contact Legal Team
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              <motion.button 
               
                className="border-2 border-orange-400 text-orange-300 font-bold py-3 px-8 rounded-xl flex items-center gap-3"
                whileHover={{ 
                  backgroundColor: "rgba(249, 115, 22, 0.2)",
                  scale: 1.05
                }}
                whileTap={{ scale: 0.95 }}
              >
                <ExternalLink className="w-5 h-5" />
                <a href="/privacy">View Privacy Policy</a>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* Footer Note */}
        <motion.div 
          className="mt-12 text-center text-sm text-gray-400"
          variants={slideUpVariants}
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Last updated: August 12, 2025</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>Version 2.1 - Enhanced Battle Rules</span>
            </div>
          </div>
          <p className="max-w-3xl mx-auto leading-relaxed">
            These terms may be updated from time to time to reflect changes in our services or legal requirements. 
            Significant changes will be communicated to all users with appropriate notice periods.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;