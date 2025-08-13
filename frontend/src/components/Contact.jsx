import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    // Trigger fade-in animation
    setTimeout(() => setFadeIn(true), 100);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Feedback submitted successfully!");
      setFormData({ name: "", email: "", message: "" });
    }
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-purple-900 via-black to-black text-white px-4 py-8 md:py-16 transition-opacity duration-1000 ${
        fadeIn ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="w-full max-w-4xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-6 md:p-10 border border-purple-600">
        
        {/* Back to Home Button */}
        <div className="mb-6 text-left">
          <Link
            to="/"
            className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 px-5 py-2 rounded-lg font-medium hover:opacity-90 transition duration-300 shadow-lg"
          >
            ← Back to Home
          </Link>
        </div>

        <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>

        {/* Contact Details */}
        <div className="mb-8 text-center space-y-2">
          <p className="text-lg">
            📧 Email: <span className="text-purple-300">support@loopwar.com</span>
          </p>
          <p className="text-lg">
            📞 Phone: <span className="text-purple-300">+91 98765 43210</span>
          </p>
          <p className="text-lg">
            📍 Address:{" "}
            <span className="text-purple-300">123 Code Arena, Tech City</span>
          </p>
        </div>

        {/* Feedback Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-white/20 border border-purple-500 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="text-red-400 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-white/20 border border-purple-500 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-white/20 border border-purple-500 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-purple-400"
              rows="4"
              placeholder="Write your message..."
            ></textarea>
            {errors.message && (
              <p className="text-red-400 text-sm mt-1">{errors.message}</p>
            )}
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-gradient-to-r from-pink-500 to-purple-500 px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-pink-500/40"
            >
              Submit Feedback
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
