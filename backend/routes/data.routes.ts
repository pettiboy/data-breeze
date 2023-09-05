import { Router } from "express";
import {
  getDeviceData,
  getPMValues,
  getDataByTimeRange,
} from "../controllers/data.controller";

const router = Router();

router.get("/devices/:deviceId", getDeviceData);

router.get("/pm-values/:deviceId", getPMValues);

router.get("/time-range/", getDataByTimeRange);

export default router;
