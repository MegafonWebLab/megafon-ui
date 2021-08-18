import format from 'date-fns/format';
import ruLocale from 'date-fns/locale/ru';
import * as React from 'react';
import Button from 'components/Button/Button';

const formatDate = (data: Date, pattern: string, locale = ruLocale) => format(data, pattern, { locale });

const date = new Date();
const currentMonth = date.getMonth();
const currentYear = date.getFullYear();
const startDate = new Date(2020, 1, 7);
const endDate = new Date(2020, 1, 19);
export const minBookingDate = new Date(currentYear, currentMonth, 7);
export const maxBookingDate = new Date(currentYear, currentMonth + 1, 20);

export const DemoCalendarWithHandleChange = ({ children }: Record<string, (params) => JSX.Element>): JSX.Element => {
    const [from, setFrom] = React.useState<string | null>(formatDate(startDate, 'dd.MM.yyyy'));
    const [to, setTo] = React.useState<string | null>(formatDate(endDate, 'dd.MM.yyyy'));

    const onChange = (currentStartDate, currentEndDate) => {
        setFrom(formatDate(currentStartDate, 'dd.MM.yyyy'));
        setTo(currentEndDate ? formatDate(currentEndDate, 'dd.MM.yyyy') : currentEndDate);
    };

    return (
        <>
            <h3 style={{ marginBottom: '32px' }}>
                {to ? `Выбран диапазон дат с ${from} до ${to}` : `Выбрана начальная дата ${from}`}
            </h3>
            {children({ onChange, startDate, endDate })}
        </>
    );
};

export const DemoCalendarWithDatesChange = ({ children }: Record<string, (params) => JSX.Element>): JSX.Element => {
    const [period, setPeriod] = React.useState({ periodStart: startDate, periodEnd: endDate });

    const onChange = (firstDate, secondDate) => () => setPeriod({ periodStart: firstDate, periodEnd: secondDate });

    const { periodEnd, periodStart } = period;

    return (
        <>
            {children({ startDate: periodStart, endDate: periodEnd })}
            <div>
                <div
                    style={{
                        display: 'inline-block',
                        marginRight: '12px',
                    }}
                >
                    <Button onClick={onChange(new Date(2020, 0, 1), new Date(2020, 0, 31))}>Январь</Button>
                </div>
                <Button onClick={onChange(new Date(2020, 1, 1), new Date(2020, 1, 29))}>Ферваль</Button>
            </div>
        </>
    );
};
