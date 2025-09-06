import express from "express";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const router = express.Router();

const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI,
  JWT_SECRET,
} = process.env;

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "15d" });
};

// Function to generate a unique username
const generateUniqueUsername = (email) => {
  const emailPrefix = email.split("@")[0];
  const randomNumber = Math.floor(Math.random() * 100000);
  return `${emailPrefix}_${randomNumber}`;
};

// Function to generate a dummy password
const generateDummyPassword = async () => {
  const dummy = Math.random().toString(36).slice(-10);
  const hashedPassword = await bcrypt.hash(dummy, 10);
  return hashedPassword;
};

router.get("/", (req, res) => {
  const scope =
    "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile";

  const params = new URLSearchParams({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: GOOGLE_REDIRECT_URI,
    response_type: "code",
    scope,
    prompt: "select_account",
  });
  res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params}`);
});

router.get("/callback", async (req, res) => {
  const code = req.query.code;
  if (!code) return res.status(400).send("No code provided");

  try {
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: GOOGLE_REDIRECT_URI,
        grant_type: "authorization_code",
      }),
    });

    const { id_token } = await tokenRes.json();
    if (!id_token) throw new Error("Token exchange failed");

    const payload = jwt.decode(id_token);
    const { sub: oauthId, email, given_name, family_name, picture } = payload;

    let user = await User.findOne({ email });
    if (!user) {
      // Create a unique username and a dummy password
      const newUsername = generateUniqueUsername(email);
      const hashedPassword = await generateDummyPassword();

      // Create a new user with all required fields
      user = await User.create({
        username: newUsername,
        fullName: `${given_name} ${family_name}`,
        email: email,
        password: hashedPassword,
        isAccountVerified: true, // Google provides verified emails
      });
    }

    const appToken = generateToken(user);

    res
      .cookie("token", appToken, {
        httpOnly: true,
        secure: true, // set to true on HTTPS production
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .redirect(
        `${process.env.CORS_ORIGIN}/auth/google/callback?token=${appToken}`
      );
  } catch (err) {
    console.error("Google OAuth error:", err);
    res.redirect(`${process.env.CORS_ORIGIN}/login?error=oauth_failed`);
  }
});

export default router;
