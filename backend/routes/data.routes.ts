import { Router } from "express";
import {
  getData,
  createData,
  updateData,
  deleteData,
} from "../controllers/data.controller";
import { authenticateToken } from "../middleware/auth.middleware";

const router = Router();

router.get("/data/:deviceId", authenticateToken, getData);
router.post("/data", authenticateToken, createData);
router.put("/data/:id", authenticateToken, updateData);
router.delete("/data/:id", authenticateToken, deleteData);

export default router;
