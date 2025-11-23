const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const cookieParser = require("cookie-parser");

// ROUTES
const algoRoutes = require("./Routes/algo.routes");
const authRoutes = require("./Routes/auth.routes");

// MIDDLEWARE
const restrictToLoggedinUserOnly = require("./middlewares/auth");

// DB
const connectToMongoDB = require("./connect");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// EJS setup
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Public Routes
app.use("/auth", authRoutes);

// Protected Routes
app.use("/algo", restrictToLoggedinUserOnly, algoRoutes);

// DB connection
connectToMongoDB(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(5000, () => console.log("Server running on port 5000"));
