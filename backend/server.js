import express from "express";
import authRoutes from "./routes/auth.route.js";
import dotenv from "dotenv";
import connectMongoDB from "./db/connectMongoDB.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

console.log(process.env.MONGO_URI);

app.use((req, res, next) => {
  console.log("Request received:", req.method, req.url);
  next();
});

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the server");
});

app.listen(PORT, () => {
  console.log(`server is running at port ${PORT}`);
  connectMongoDB();
});
