import { Box, Paper, Typography } from '@mui/material';
import { ApexOptions } from 'apexcharts';
import React from 'react'
import ReactApexChart from 'react-apexcharts';

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

const chartOptions: ApexOptions = {
    chart: {
        type: 'line',
        height: 350,
    },
    xaxis: {
        categories: location1Data.map(item => item.timestamp),
    },
};

const TimeSeriesGraph = (props: Props) => {
    return (
        <Box>
            <Typography sx={{ fontSize: "36px", mb: 2 }}>PM Readings Overlaid</Typography>
            <Paper sx={{
                height: "60vh",
                p: 4
            }}>
                <ReactApexChart height={"100%"} options={chartOptions} series={series} type="line" />
            </Paper>
        </Box>
    )
}

export default TimeSeriesGraph