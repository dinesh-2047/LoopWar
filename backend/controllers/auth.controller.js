import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import transporter from "../config/nodemailer.js";

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "15d" });
};
const isPasswordTooSimilar = (password, username, fullName, email) => {
  const loweredPassword = password.toLowerCase();
  const loweredUsername = username.toLowerCase();
  const loweredEmail = email.toLowerCase();
  const loweredFullNameParts = fullName.toLowerCase().split(/\s+/);
  if (
    loweredPassword.includes(loweredUsername) ||
    loweredPassword.includes(loweredEmail)
  ) {
    return true;
  }
  for (let part of loweredFullNameParts) {
    if (part.length >= 3 && loweredPassword.includes(part)) {
      return true;
    }
  }

  return false;
};
export const signup = async (req, res) => {
  try {
    const { username, fullName, email, password } = req.body;

    if (!username || !fullName || !email || !password)
      return res.status(400).json({ error: "All fields are required" });

    if (
      password.length < 6 ||
      !/\d/.test(password) ||
      !/[!@#$%^&*]/.test(password)
    ) {
      return res.status(400).json({
        error:
          "Password must be at least 6 characters, contain a number and a special character",
      });
    }
    if (isPasswordTooSimilar(password, username, fullName, email)) {
      return res
        .status(400)
        .json({
          error:
            "Password cannot contain parts of username, full name, or email",
        });
    }

    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists)
      return res.status(400).json({ error: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      username,
      fullName,
      email,
      password: hashedPassword,
    });

    const token = generateToken(user._id);

    res.cookie("jwt", token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "Lax",
      secure: false,
    });

    res.status(201).json({ message: "Signup successful", userId: user._id });
  } catch (err) {
    console.error("Signup error:", err.message);
    res.status(500).json({ error: "Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { emailOrUsername, password } = req.body;
    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Invalid credentials" });

    const token = generateToken(user._id);
    res.cookie("jwt", token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "Lax",
      secure: false,
    });

    res.json({ message: "Login successful", userId: user._id });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ error: "Server Error" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("jwt");
  res.json({ message: "Logged out successfully" });
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const sendVerifyOtp = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(400).json({ error: "User not found" });
    if (user.isAccountVerified)
      return res.status(400).json({ error: "Already verified" });

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    user.verifyOtp = otp;
    user.verifyOtpExpiry = Date.now() + 10 * 60 * 1000;
    await user.save();

    await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Verify your account",
      text: `Your OTP is ${otp}. It will expire in 10 minutes.`,
    });

    res.json({ success: true, message: "OTP sent" });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { otp } = req.body;
    const user = await User.findById(req.user._id);

    if (!user || user.verifyOtp !== otp)
      return res.status(400).json({ error: "Invalid OTP" });
    if (user.verifyOtpExpiry < Date.now())
      return res.status(400).json({ error: "OTP expired" });

    user.isAccountVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpiry = 0;
    await user.save();

    res.json({ success: true, message: "Account verified" });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const sendResetOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    user.resetOtp = otp;
    user.resetOtpExpiry = Date.now() + 10 * 60 * 1000;
    await user.save();

    await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Reset Password",
      text: `Your reset code is ${otp}. Expires in 10 minutes.`,
    });

    res.json({ success: true, message: "OTP sent" });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    const user = await User.findOne({ email });

    if (!user || user.resetOtp !== otp)
      return res.status(400).json({ error: "Invalid OTP" });

    if (user.resetOtpExpiry < Date.now())
      return res.status(400).json({ error: "OTP expired" });

    if (
      newPassword.length < 6 ||
      !/\d/.test(newPassword) ||
      !/[!@#$%^&*]/.test(newPassword)
    ) {
      return res.status(400).json({
        error:
          "Password must be at least 6 characters, contain a number and a special character",
      });
    }

    if (
      isPasswordTooSimilar(
        newPassword,
        user.username,
        user.fullName,
        user.email
      )
    ) {
      return res.status(400).json({
        error: "Password cannot contain parts of username, full name, or email",
      });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetOtp = "";
    user.resetOtpExpiry = 0;
    await user.save();

    const token = generateToken(user._id);
    res.cookie("jwt", token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "Lax",
      secure: false,
    });

    res.json({
      success: true,
      message: "Password reset successful",
      userId: user._id,
    });
  } catch (err) {
    console.error("Reset Password Error:", err.message);
    res.status(500).json({ error: "Something went wrong" });
  }
};
