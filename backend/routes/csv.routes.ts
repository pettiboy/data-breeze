import { Router } from "express";
import { uploadCSV } from "../controllers/csv.controller";
import upload from "../config/multer.config";

const router = Router();

router.post("/upload", upload.single("csv"), uploadCSV);

export default router;
