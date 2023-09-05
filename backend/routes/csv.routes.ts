import { Router } from "express";
import { uploadCSV } from "../controllers/csv.controller"; // Import the CSV upload controller
import upload from "../config/multer.config";

const router = Router();

// Define a route for uploading and parsing CSV data
router.post("/upload", upload.single("csv"), uploadCSV);

export default router;
