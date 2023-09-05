import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";

import dataRouter from "./routes/data.routes";
import csvRouter from "./routes/csv.routes";
import chartsRouter from "./routes/charts.routes";

// initialise dotenv to use environment variables
dotenv.config();

// initialise express
const app = express();

// Middleware
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
// logging
app.use(morgan("combined"));

// Routes
app.use("/api/data", dataRouter);
app.use("/api/csv", csvRouter);
app.use("/api/charts", chartsRouter);

// Connect to MongoDB
mongoose.connect(process.env.DB_URL || "", {});

// Start the server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
