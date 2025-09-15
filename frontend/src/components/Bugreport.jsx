import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Bug, Send, Smartphone, CheckCircle } from "lucide-react";

const BugReport = () => {
  const [formData, setFormData] = useState({
    title: "",
    steps: "",
    expected: "",
    actual: "",
    device: "",
    screenshot: null,
  });

  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔹 Here you can send data to backend or GitHub Issues
    console.log("Bug Report Submitted:", formData);

    setSubmitted(true);

    // ✅ Reset form
    setFormData({
      title: "",
      steps: "",
      expected: "",
      actual: "",
      device: "",
      screenshot: null,
    });
    if (fileInputRef.current) fileInputRef.current.value = "";

    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/50 to-black text-white flex items-center justify-center px-4 py-12">
      <motion.div
        className="w-full max-w-3xl bg-black/50 backdrop-blur-xl rounded-3xl border border-white/10 p-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <Bug className="w-14 h-14 text-violet-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent">
            Bug Report
          </h1>
          <p className="text-gray-300 mt-2">
            Found an issue? Help us improve by submitting details below.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Bug Title */}
          <div>
            <label className="block text-sm font-medium mb-2">Bug Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-gray-900/80 border border-white/10 text-white focus:ring-2 focus:ring-violet-500 outline-none"
              placeholder="Short summary of the bug"
            />
          </div>

          {/* Steps to Reproduce */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Steps to Reproduce *
            </label>
            <textarea
              name="steps"
              value={formData.steps}
              onChange={handleChange}
              required
              rows={3}
              className="w-full px-4 py-3 rounded-xl bg-gray-900/80 border border-white/10 text-white focus:ring-2 focus:ring-violet-500 outline-none"
              placeholder="e.g., 1. Open app → 2. Click X → 3. Crash occurs"
            />
          </div>

          {/* Expected Behavior */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Expected Behavior *
            </label>
            <textarea
              name="expected"
              value={formData.expected}
              onChange={handleChange}
              required
              rows={2}
              className="w-full px-4 py-3 rounded-xl bg-gray-900/80 border border-white/10 text-white focus:ring-2 focus:ring-violet-500 outline-none"
              placeholder="What you expected to happen"
            />
          </div>

          {/* Actual Behavior */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Actual Behavior *
            </label>
            <textarea
              name="actual"
              value={formData.actual}
              onChange={handleChange}
              required
              rows={2}
              className="w-full px-4 py-3 rounded-xl bg-gray-900/80 border border-white/10 text-white focus:ring-2 focus:ring-violet-500 outline-none"
              placeholder="What actually happened"
            />
          </div>

          {/* Device Details */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Device/OS/Browser *
            </label>
            <div className="flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-violet-400" />
              <input
                type="text"
                name="device"
                value={formData.device}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl bg-gray-900/80 border border-white/10 text-white focus:ring-2 focus:ring-violet-500 outline-none"
                placeholder="e.g., Windows 11, Chrome 115"
              />
            </div>
          </div>

          {/* Screenshot Upload */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Screenshot (optional)
            </label>
            <input
              type="file"
              name="screenshot"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleChange}
              className="w-full text-gray-300 file:mr-4 file:py-2 file:px-4 
                file:rounded-full file:border-0 
                file:text-sm file:font-semibold 
                file:bg-violet-600 file:text-white 
                hover:file:bg-violet-700"
            />
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold py-4 rounded-2xl text-lg"
          >
            <Send className="w-5 h-5" />
            Submit Bug Report
          </motion.button>
        </form>

        {/* Submission Feedback */}
        {submitted && (
          <motion.div
            className="mt-6 flex items-center justify-center gap-2 text-green-400 font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <CheckCircle className="w-5 h-5" />
            Bug Report Submitted Successfully!
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default BugReport;
