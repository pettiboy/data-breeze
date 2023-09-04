import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import dataRouter from "./routes/data.routes";

// initialise dotenv to use environment variables
dotenv.config();

// initialise express
const app = express();

// Middleware
app.use(express.json());
app.use(morgan("combined"));

// Routes
app.use("/api/data", dataRouter);

// Connect to MongoDB
mongoose.connect(process.env.DB_URL || "", {});

// Start the server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
