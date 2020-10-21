import * as React from 'react';
import { format } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';

const formatDate = (data: Date, pattern: string, locale = ruLocale) => format(data, pattern, { locale });

const date = new Date();
const currentMonth = date.getMonth();
const currentYear = date.getFullYear();
const startDate = new Date(2020, 1, 7);
const endDate = new Date(2020, 1, 19);
const minBookingDate = new Date(currentYear, currentMonth - 1, 7);
const maxBookingDate = new Date(currentYear, currentMonth + 1, 20);
const unavailableDates = [
    new Date(currentYear, currentMonth, 12),
    new Date(currentYear, currentMonth, 15),
    new Date(currentYear, currentMonth, 18),
];

export const DemoCalendarWithBlockedDates = ({ children }) =>
    children({ minBookingDate, maxBookingDate, unavailableDates });

export const DemoCalendarWithHandleChange = ({ children }) => {
    const [from, setFrom] = React.useState<string | null>(formatDate(startDate, 'dd.MM.yyyy'));
    const [to, setTo] = React.useState<string | null>(formatDate(endDate, 'dd.MM.yyyy'));

    const handleChange = (currentStartDate, currentEndDate) => {
        setFrom(formatDate(currentStartDate, 'dd.MM.yyyy'));
        setTo(currentEndDate ? formatDate(currentEndDate, 'dd.MM.yyyy') : currentEndDate);
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <h3 style={{ marginBottom: '32px' }}>
                {to ? `Выбран диапазон дат с ${from} до ${to}` : `Выбрана начальная дата ${from}`}
            </h3>
            {children({ handleChange, startDate, endDate })}
        </div>
    );
};
