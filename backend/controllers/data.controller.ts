import { Request, Response } from "express";
import DataRepository from "../repository/data.repository";

export const getDeviceData = async (req: Request, res: Response) => {
  const deviceId = req.params.deviceId;

  const startParam = req.query?.start as string | undefined;
  const endParam = req.query?.end as string | undefined;

  if (!isValidISODate(startParam) || !isValidISODate(endParam)) {
    return res.status(400).json({ error: "Invalid ISO date parameters" });
  }

  const start = new Date(startParam as string);
  const end = new Date(endParam as string);

  try {
    const data = await DataRepository.findByDevice(deviceId, start, end);
    return res.json(data);
  } catch (error) {
    console.error("Error retrieving data for device:", error);
    return res.status(500).json({ error: "Failed to retrieve data" });
  }
};

export const getPMValues = async (req: Request, res: Response) => {
  const deviceId = req.params.deviceId;
  const startParam = req.query?.start as string | undefined;
  const endParam = req.query?.end as string | undefined;

  if (!isValidISODate(startParam) || !isValidISODate(endParam)) {
    return res.status(400).json({ error: "Invalid ISO date parameters" });
  }

  const start = new Date(startParam as string);
  const end = new Date(endParam as string);

  try {
    const pmValues = await DataRepository.findPMValues(deviceId, start, end);
    return res.json(pmValues);
  } catch (error) {
    console.error("Error retrieving PM values for device:", error);
    return res.status(500).json({ error: "Failed to retrieve PM values" });
  }
};

export const getDataByTimeRange = async (req: Request, res: Response) => {
  const startParam = req.query?.start as string | undefined;
  const endParam = req.query?.end as string | undefined;

  if (!isValidISODate(startParam) || !isValidISODate(endParam)) {
    return res.status(400).json({ error: "Invalid ISO date parameters" });
  }

  const start = new Date(startParam as string);
  const end = new Date(endParam as string);

  try {
    const data = await DataRepository.findByTimeRange(
      new Date(start),
      new Date(end)
    );
    return res.json(data);
  } catch (error) {
    console.error("Error filtering data by time range:", error);
    return res
      .status(500)
      .json({ error: "Failed to filter data by time range" });
  }
};

function isValidISODate(dateString: string | undefined): boolean {
  if (!dateString) {
    return false;
  }

  // regex for ISO date format (YYYY-MM-DDTHH:MM:SS.SSSZ)
  const isoDatePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/;
  return isoDatePattern.test(dateString);
}
