import DataModel from "../models/Data";

class DataRepository {
  async findByDevice(deviceId: string, start: Date, end: Date): Promise<any[]> {
    return DataModel.find({ device: deviceId, t: { $gte: start, $lte: end } });
  }

  async findPMValues(
    deviceId: string,
    start: Date,
    end: Date
  ): Promise<{
    pm1: number[];
    pm25: number[];
    pm10: number[];
    timestamps: Date[];
  }> {
    const data = await DataModel.find({
      device: deviceId,
      t: { $gte: start, $lte: end },
    });

    const timestamps = data.map((entry) => entry.t as Date);
    const pm1Values = data.map((entry) => entry.p1 as number);
    const pm25Values = data.map((entry) => entry.p25 as number);
    const pm10Values = data.map((entry) => entry.p10 as number);

    return { pm1: pm1Values, pm25: pm25Values, pm10: pm10Values, timestamps };
  }

  async findByTimeRange(start: Date, end: Date): Promise<any[]> {
    return DataModel.find({
      t: { $gte: start, $lte: end },
    });
  }
}

export default new DataRepository();
