import React, { useContext, useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Box, Typography, Button } from '@mui/material';
import { DateRangeContext } from '../../context/DateRangeContext';

type Props = {};

const DateRangePicker: React.FC<Props> = () => {
    const { startDate, endDate, setStartDate, setEndDate } = useContext(DateRangeContext)

    // const [startDate, setStartDate] = useState<Dayjs>(dayjs('2022-04-17T15:30'));
    // const [endDate, setEndDate] = useState<Dayjs>(dayjs('2022-04-17T16:30'));
    const [error, setError] = useState<string>('');
    const [isEndDatePickerOpen, setEndDatePickerOpen] = useState<boolean>(false);

    // Function to enable only valid dates
    const isDateEnabled = (date: Dayjs) => {
        return (date.isSame(startDate) || date.isBefore(startDate));
    };

    const handleStartDateChange = (newValue: Dayjs | null, _context: any) => {
        if (newValue) {
            if (newValue.isAfter(endDate)) {
                setError('Start date cannot be after end date');
            } else {
                setStartDate(newValue);
                setError('');
            }
        }
    };

    const handleEndDateChange = (newValue: Dayjs | null, _context: any) => {
        if (newValue) {
            if (newValue.isBefore(startDate)) {
                setError('End date cannot be before start date');
            } else {
                setEndDate(newValue);
                setError('');
            }
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box display="flex" >
                <DesktopDateTimePicker
                    label="Start Date and Time"
                    value={startDate}
                    onChange={handleStartDateChange}
                    onAccept={() => setEndDatePickerOpen(true)}
                />
                <Typography sx={{ mx: 3, my: "auto" }}>--</Typography>
                <DesktopDateTimePicker
                    open={isEndDatePickerOpen}
                    label="End Date and Time"
                    value={endDate}
                    onChange={handleEndDateChange}
                    shouldDisableDate={isDateEnabled}
                    onAccept={() => setEndDatePickerOpen(false)}
                    onClose={() => setEndDatePickerOpen(false)}
                    onOpen={() => setEndDatePickerOpen(true)}
                />
                {error && <Typography color="error">{error}</Typography>}
            </Box>
        </LocalizationProvider>
    );
};

export default DateRangePicker;
