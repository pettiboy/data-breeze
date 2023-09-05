import { Dayjs } from "dayjs";
import { BASE_URL } from "../../../config/constants";
import { GET } from "../../../config/fetch";

export type FetchTimeSeriesDataType = {
  series: Array<{
    name: string;
    data: Array<number>;
  }>;
  t: Array<string>;
};

export const fetchTimeSeriesData = async (
  deviceId: string,
  start: Dayjs,
  end: Dayjs
): Promise<FetchTimeSeriesDataType | { error: string }> => {
  const response: FetchTimeSeriesDataType = await GET(
    `api/charts/series/${deviceId}`,
    {
      start: start.toISOString(),
      end: end.toISOString(),
    }
  );
  return response;
};
