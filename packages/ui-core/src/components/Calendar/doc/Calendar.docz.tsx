import * as React from 'react';
import { format } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';

const formatDate = (data: Date, pattern: string, locale = ruLocale) => format(data, pattern, { locale });

const date = new Date();
const currentMonth = date.getMonth();
const currentYear = date.getFullYear();
const startDate = new Date(2020, 1, 7);
const endDate = new Date(2020, 1, 19);
export const minBookingDate = new Date(currentYear, currentMonth - 1, 7);
export const maxBookingDate = new Date(currentYear, currentMonth + 1, 20);

export const DemoCalendarWithHandleChange = ({ children }) => {
    const [from, setFrom] = React.useState<string | null>(formatDate(startDate, 'dd.MM.yyyy'));
    const [to, setTo] = React.useState<string | null>(formatDate(endDate, 'dd.MM.yyyy'));

    const handleChange = (currentStartDate, currentEndDate) => {
        setFrom(formatDate(currentStartDate, 'dd.MM.yyyy'));
        setTo(currentEndDate ? formatDate(currentEndDate, 'dd.MM.yyyy') : currentEndDate);
    };

    return (
        <>
            <h3 style={{ marginBottom: '32px' }}>
                {to ? `Выбран диапазон дат с ${from} до ${to}` : `Выбрана начальная дата ${from}`}
            </h3>
            {children({ handleChange, startDate, endDate })}
        </>
    );
};
