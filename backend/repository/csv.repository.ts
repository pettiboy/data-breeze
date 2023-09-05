import DataModel from "../models/Data";

class CsvDataRepository {
  async exists(deviceId: string, timestamp: Date): Promise<boolean> {
    const existingRecord = await DataModel.findOne({
      device: deviceId,
      t: timestamp,
    });
    return !!existingRecord;
  }

  async insert(data: any[]): Promise<void> {
    await DataModel.insertMany(data);
  }
}

export default new CsvDataRepository();
