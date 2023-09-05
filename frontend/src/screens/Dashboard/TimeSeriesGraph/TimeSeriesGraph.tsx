import { useContext, useEffect, useState } from 'react'
import { Box, Paper, Typography } from '@mui/material';
import { ApexOptions } from 'apexcharts';
import ReactApexChart from 'react-apexcharts';
import { DateRangeContext } from '../../../context/DateRangeContext';
import { fetchTimeSeriesData, FetchTimeSeriesDataType } from './api';

type Props = {}

const location1Data = [
    { timestamp: '2023-09-05T08:00:00', pm1: 10, pm2_5: 15, pm10: 20 },
    { timestamp: '2023-09-05T09:00:00', pm1: 12, pm2_5: 18, pm10: 22 },
    { timestamp: '2023-09-05T10:00:00', pm1: 14, pm2_5: 20, pm10: 25 },
    { timestamp: '2023-09-05T11:00:00', pm1: 11, pm2_5: 16, pm10: 21 },
    { timestamp: '2023-09-05T12:00:00', pm1: 13, pm2_5: 19, pm10: 23 },
];


const series = [
    {
        name: 'PM1',
        data: location1Data.map(item => item.pm1),
    },
    {
        name: 'PM2.5',
        data: location1Data.map(item => item.pm2_5),
    },
    {
        name: 'PM10',
        data: location1Data.map(item => item.pm10),
    },
];


const TimeSeriesGraph = ({ }: Props) => {
    const { startDate, endDate, setStartDate, setEndDate } = useContext(DateRangeContext)

    const [series, setSeries] = useState<FetchTimeSeriesDataType['series']>([])
    const [timestamps, setTimestamps] = useState<FetchTimeSeriesDataType['t']>([])

    useEffect(() => {
        if (!startDate || !endDate) return

        fetchTimeSeriesData("DeviceA", startDate, endDate)
            .then((data) => {
                if ('error' in data) {
                    console.warn("TimeSeriesGraph.tsx", data.error)
                } else {
                    setSeries(data.series)
                    setTimestamps(data.t)
                }
            })
    }, [startDate, endDate])

    return (
        <Box>
            <Typography sx={{ fontSize: "36px", mb: 2 }}>PM Readings Overlaid</Typography>
            <Paper sx={{
                height: "60vh",
                p: 4
            }}>
                <ReactApexChart height={"100%"} options={{
                    chart: {
                        type: 'line',
                        height: 350,
                    },
                    xaxis: {
                        categories: timestamps,
                    },
                }} series={series} type="line" />
            </Paper>
        </Box>
    )
}

export default TimeSeriesGraph