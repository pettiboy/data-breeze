import mongoose, { Schema } from "mongoose";

const dataSchema = new Schema({
  device: {
    type: Schema.Types.ObjectId,
    ref: "Device",
  },
  t: Date,
  w: Number,
  h: Number,
  p1: Number,
  p25: Number,
  p10: Number,
});

const Data = mongoose.model("Data", dataSchema);

export default Data;
