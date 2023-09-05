import mongoose from "mongoose";
import { Document } from "mongoose";

export interface IDataDocument extends Document {
  device: string;
  t: Date;
  w: number;
  h: string;
  p1: number;
  p25: number;
  p10: number;
}
const dataSchema = new mongoose.Schema({
  device: String, // Make sure it's defined as a string
  t: Date,
  w: Number,
  h: String,
  p1: Number,
  p25: Number,
  p10: Number,
});

const Data = mongoose.model("Data", dataSchema);

export default Data;
