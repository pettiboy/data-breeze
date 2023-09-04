// src/components/GroupedBarChart.js
import React from 'react';
import ReactApexChart from 'react-apexcharts';

const GroupedBarChart = () => {
	// Sample data for demonstration (replace with your actual data)
	const series = [
		{
			name: 'LocationA',
			data: [30, 40, 25, 50, 49, 21, 70, 91, 125],
		},
		{
			name: 'LocationB',
			data: [23, 12, 54, 61, 32, 56, 81, 39, 53],
		},
		{
			name: 'LocationC',
			data: [41, 63, 76, 28, 55, 92, 8, 14, 82],
		},
	];

	const options = {
		chart: {
			type: 'bar',
			height: 350,
			theme: "dark"
		},
		plotOptions: {
			bar: {
				horizontal: false,
				columnWidth: '55%',
				endingShape: 'rounded',
			},
		},
		xaxis: {
			categories: ['1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM', '7 AM', '8 AM', '9 AM'],
		},
		legend: {
			position: 'top',
		},
		fill: {
			opacity: 1,
		},
	};

	return (
		<div>
			<h1>PM Values Throughout the Day by Location</h1>
			{/* @ts-ignore */}
			<ReactApexChart options={options} series={series} type="bar" height={350} />
		</div>
	);
};

export default GroupedBarChart;
