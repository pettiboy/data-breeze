import mongoose from "mongoose";

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
