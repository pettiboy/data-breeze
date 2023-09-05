import { Request, Response } from "express";
import csv from "fast-csv";
import csvParser from "csv-parser";
import fs from "fs";
import DataModel from "../models/Data";

export const uploadCSV = async (req: Request, res: Response) => {
  // check if a csv file has been uploaded
  const csvFile = req.file as Express.Multer.File;

  if (!csvFile) {
    return res.status(400).json({ error: "CSV file is required" });
  }

  const csvData: any[] = [];

  // to make sure that checking for existing
  //   records is done before inserting new ones
  const asyncOperations: any[] = [];

  // readable stream
  const stream = fs.createReadStream(csvFile.path);

  // parse csv
  stream
    .pipe(csvParser())
    .on("data", (row) => {
      if (!isValidRow(row)) {
        console.warn("Invalid row");
        return;
      } else {
        // check if a record with the same device and timestamp already exists
        const existingRecord = DataModel.findOne({
          device: row.device,
          t: convertDateStringToDate(row.t),
        });

        // add the promise for this operation to the array
        asyncOperations.push(
          existingRecord.then((result) => {
            if (result) {
              console.log("Record already exists:", row.device, row.t);
            } else {
              // new doc only if it doesnt exist
              csvData.push({
                device: row.device,
                t: convertDateStringToDate(row.t),
                w: parseInt(row.w),
                h: row.h,
                p1: parseInt(row.p1),
                p25: parseInt(row.p25),
                p10: parseInt(row.p10),
              });
            }
          })
        );
      }
    })
    .on("end", async () => {
      try {
        // wait for all async operations
        await Promise.all(asyncOperations);

        console.log("csvData", csvData.length);

        // insert validated data to db
        await DataModel.insertMany(csvData);

        fs.unlinkSync(csvFile.path);

        return res.status(201).json({
          message: "CSV data saved to MongoDB",
          didContainDuplicates: asyncOperations.length > 0,
          didContainInvalidRows: csvData.length !== asyncOperations.length,
        });
      } catch (error) {
        console.error("Error saving data to MongoDB:", error);
        return res
          .status(500)
          .json({ error: "Failed to save data to MongoDB" });
      }
    });
};

function isValidRow(row: any): boolean {
  // all fields should be present
  if (
    !row.device ||
    !row.t ||
    !row.w ||
    !row.h ||
    !row.p1 ||
    !row.p25 ||
    !row.p10
  ) {
    return false;
  }

  // date format regex
  const datePattern = /^\d{2}\/\d{2}\/\d{2},\d{2}:\d{2}:\d{2}$/;
  if (!datePattern.test(row.t)) {
    return false;
  }

  // field as number
  const windSpeed = parseInt(row.w);
  if (isNaN(windSpeed)) {
    return false;
  }

  // wind direction
  const validWindDirections = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  if (!validWindDirections.includes(row.h)) {
    return false;
  }

  // fields as numbers
  const p1 = parseInt(row.p1);
  const p25 = parseInt(row.p25);
  const p10 = parseInt(row.p10);
  if (isNaN(p1) || isNaN(p25) || isNaN(p10)) {
    return false;
  }

  return true;
}

function convertDateStringToDate(dateString: string) {
  const dateParts = dateString.split(",");
  const datePart = dateParts[0]; // "DD/MM/YY"
  const timePart = dateParts[1]; // "HH:MM:SS"

  const dateParts2 = datePart.split("/");
  const day = parseInt(dateParts2[0]);
  const month = parseInt(dateParts2[1]) - 1;
  const year = 2000 + parseInt(dateParts2[2]);

  const timeParts = timePart.split(":");
  const hours = parseInt(timeParts[0]);
  const minutes = parseInt(timeParts[1]);
  const seconds = parseInt(timeParts[2]);

  const jsDate = new Date(year, month, day, hours, minutes, seconds);

  return jsDate;
}
