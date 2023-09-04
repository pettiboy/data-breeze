import mongoose, { Schema } from "mongoose";

const deviceSchema = new Schema({
  device: String,
});

const Device = mongoose.model("Device", deviceSchema);

export default Device;
