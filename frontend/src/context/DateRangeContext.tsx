import { createContext, useState, useEffect, ReactNode } from 'react';
import dayjs, { Dayjs } from 'dayjs';

interface DateRangeContextType {
    startDate: Dayjs | null
    setStartDate: React.Dispatch<React.SetStateAction<Dayjs | null>>

    endDate: Dayjs | null
    setEndDate: React.Dispatch<React.SetStateAction<Dayjs | null>>
}

export const DateRangeContext = createContext<DateRangeContextType>({
    startDate: null,
    setStartDate: () => { },
    endDate: null,
    setEndDate: () => { }
});

interface DateRangeProviderProps {
    children: ReactNode;
}

const DateRangeProvider = ({ children }: DateRangeProviderProps) => {
    const [startDate, setStartDate] = useState<Dayjs | null>(null)
    const [endDate, setEndDate] = useState<Dayjs | null>(null)

    return (
        <DateRangeContext.Provider
            value={{
                startDate,
                setStartDate,
                endDate,
                setEndDate
            }}
        >
            {children}
        </DateRangeContext.Provider>
    );
};

export default DateRangeProvider;
