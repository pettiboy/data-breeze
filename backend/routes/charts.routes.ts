import { Router, Request, Response } from "express";
import DataModel, { IDataDocument } from "../models/Data";
import { isValidISODate } from "../utils/isValidISODate";

const router = Router();

router.get("/series/:deviceId", async (req: Request, res: Response) => {
  try {
    const deviceId = req.params.deviceId;

    const startParam = req.query?.start as string | undefined;
    const endParam = req.query?.end as string | undefined;

    if (!isValidISODate(startParam) || !isValidISODate(endParam)) {
      return res.status(400).json({ error: "Invalid ISO date parameters" });
    }

    const startDate = new Date(startParam as string);
    const endDate = new Date(endParam as string);

    const matchStage = {
      $match: {
        device: deviceId,
        t: {
          $gte: startDate,
          $lte: endDate,
        },
      },
    };

    const chartData = await DataModel.aggregate<IDataDocument>([
      matchStage,
      {
        $project: {
          t: 1,
          p1: 1,
          p25: 1,
          p10: 1,
        },
      },
      {
        $group: {
          _id: null,
          t: { $push: "$t" },
          p1: { $push: "$p1" },
          p25: { $push: "$p25" },
          p10: { $push: "$p10" },
        },
      },
    ]);

    if (chartData.length === 0) {
      res.status(404).json({ error: "No data found" });
      return;
    }

    const { t, p1, p25, p10 } = chartData[0];

    const series = [
      { name: "PM1", data: p1 },
      { name: "PM2.5", data: p25 },
      { name: "PM10", data: p10 },
    ];

    res.json({ series, t });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
});

export default router;
