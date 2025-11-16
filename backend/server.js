const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const algoRoutes = require("./Routes/algo.routes"); // or ./routes/ based on folder name

const app = express();
app.use(cors());
app.use(express.json());

// middleware
app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

app.use("/algo", algoRoutes);

// MongoDB connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.listen(5000, () => console.log("Server running on 5000"));
