import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqData = [
  {
    question: "How do I join a coding battle?",
    answer: "Click 'Launch Battle' or 'Join Arena' buttons on the homepage. You'll be matched with an opponent of similar skill instantly."
  },
  {
    question: "Which programming languages are supported?",
    answer: "We support Python, JavaScript, Java, C++, and 20+ other languages. The system detects your chosen language automatically."
  },
  {
    question: "Can I compete in tournaments?",
    answer: "Yes! Enable 'Tournament Mode' to participate in structured competitions with leaderboards and rewards."
  },
  {
    question: "Is my code private?",
    answer: "Absolutely. All battles use end-to-end encryption so only you and your opponent can see your code."
  },
  {
    question: "How fast is the platform?",
    answer: "Our system ensures <1ms response time in battles with real-time WebSocket synchronization."
  },
  {
    question: "Can I track my progress?",
    answer: "Yes! The Advanced Analytics feature gives insights into your coding patterns, speed, and problem-solving approach."
  },
  {
    question: "Is there a tutorial for beginners?",
    answer: "We provide a detailed beginner guide and practice arenas to get you started before competing in real battles."
  },
  {
    question: "Can I battle with friends?",
    answer: "Definitely! Use the invite feature to challenge friends directly in private battle rooms."
  }
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="py-24 bg-black/80 backdrop-blur-xl relative z-10">
      <div className="container mx-auto px-4 text-center">
        <motion.h2 
          className="text-5xl font-bold mb-12 bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Frequently Asked Questions
        </motion.h2>

        <div className="max-w-4xl mx-auto space-y-4 text-left">
          {faqData.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(139, 92, 246, 0.4)" }}
              className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden cursor-pointer transition-transform duration-300"
            >
              <button
                className="flex justify-between items-center w-full px-6 py-4 text-left focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-lg md:text-xl font-semibold text-white">{faq.question}</span>
                <motion.span
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <ChevronDown className="w-6 h-6 text-violet-400" />
                </motion.span>
              </button>
              
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="px-6 pb-4 text-gray-300"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
