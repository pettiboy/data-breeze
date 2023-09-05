import { Box, Grid, Paper, Typography, useTheme } from '@mui/material'
import { ApexOptions } from 'apexcharts';
import ReactApexChart from 'react-apexcharts';

type Props = {}

const location1Data = [
    { timestamp: '2023-09-05T08:00:00', pm1: 10, pm2_5: 15, pm10: 20 },
    { timestamp: '2023-09-05T09:00:00', pm1: 12, pm2_5: 18, pm10: 22 },
    { timestamp: '2023-09-05T10:00:00', pm1: 14, pm2_5: 20, pm10: 25 },
    { timestamp: '2023-09-05T11:00:00', pm1: 11, pm2_5: 16, pm10: 21 },
    { timestamp: '2023-09-05T12:00:00', pm1: 13, pm2_5: 19, pm10: 23 },
];

const location2Data = [
    { timestamp: '2023-09-05T08:00:00', pm1: 9, pm2_5: 14, pm10: 19 },
    { timestamp: '2023-09-05T09:00:00', pm1: 11, pm2_5: 16, pm10: 21 },
    { timestamp: '2023-09-05T10:00:00', pm1: 13, pm2_5: 18, pm10: 23 },
    { timestamp: '2023-09-05T11:00:00', pm1: 10, pm2_5: 15, pm10: 20 },
    { timestamp: '2023-09-05T12:00:00', pm1: 12, pm2_5: 17, pm10: 22 },
];

const location3Data = [
    { timestamp: '2023-09-05T08:00:00', pm1: 8, pm2_5: 13, pm10: 18 },
    { timestamp: '2023-09-05T09:00:00', pm1: 10, pm2_5: 15, pm10: 20 },
    { timestamp: '2023-09-05T10:00:00', pm1: 12, pm2_5: 17, pm10: 22 },
    { timestamp: '2023-09-05T11:00:00', pm1: 9, pm2_5: 14, pm10: 19 },
    { timestamp: '2023-09-05T12:00:00', pm1: 11, pm2_5: 16, pm10: 21 },
];


const seriesPM1 = [
    {
        name: 'Location 1',
        data: location1Data.map(item => item.pm1),
    },
    {
        name: 'Location 2',
        data: location2Data.map(item => item.pm1),
    },
    {
        name: 'Location 3',
        data: location3Data.map(item => item.pm1),
    },
];

const seriesPM2_5 = [
    {
        name: 'Location 1',
        data: location1Data.map(item => item.pm2_5),
    },
    {
        name: 'Location 2',
        data: location2Data.map(item => item.pm2_5),
    },
    {
        name: 'Location 3',
        data: location3Data.map(item => item.pm2_5),
    },
];

const seriesPM10 = [
    {
        name: 'Location 1',
        data: location1Data.map(item => item.pm10),
    },
    {
        name: 'Location 2',
        data: location2Data.map(item => item.pm10),
    },
    {
        name: 'Location 3',
        data: location3Data.map(item => item.pm10),
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



const ComparisonGraph = (props: Props) => {
    const theme = useTheme()

    const subHeadingStyle = {
        fontSize: "24px",
        fontWeight: "bold",
        color: theme.palette.text.secondary,
    }

    return (
        <Box>
            <Typography sx={{ fontSize: "36px", mb: 2 }}>ComparisonGraph</Typography>

            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Paper sx={{ p: 3 }}>
                        <Typography style={subHeadingStyle}>PM1 Comparison</Typography>
                        <ReactApexChart options={chartOptions} series={seriesPM1} type="bar" />
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper sx={{ p: 3 }}>
                        <Typography style={subHeadingStyle}>PM2.5 Comparison</Typography>
                        <ReactApexChart options={chartOptions} series={seriesPM2_5} type="bar" />
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper sx={{ p: 3 }}>
                        <Typography style={subHeadingStyle}>PM10 Comparison</Typography>
                        <ReactApexChart options={chartOptions} series={seriesPM10} type="bar" />
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    )
}

export default ComparisonGraph