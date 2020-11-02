import * as React from 'react';
import { OnDatesChangeProps } from '@datepicker-react/hooks';
import dayjs from 'utils/dayjs';

export const WithInitialDates = ({children}) => {
    const initials = {
        startDate: new Date('01.07.2020'),
        endDate: new Date('01.19.2020'),
    };
    return <div style={{padding: '24px 0'}}>{children({initials})}</div>;
};

export const WithHandleChange = ({children}) => {
    const initials = {
        startDate: new Date('01.07.2020'),
        endDate: new Date('01.19.2020'),
    };

    const [from, setFrom] = React.useState<string>(dayjs(initials.startDate).format('DD.MM.YYYY'));
    const [to, setTo] = React.useState<string>(dayjs(initials.endDate).format('DD.MM.YYYY'));

    const handleChange = (date: OnDatesChangeProps) => {
        const {startDate, endDate} = date;
        if (startDate !== null) {
            setFrom(dayjs(startDate).format('DD.MM.YYYY'));
        }
        if (endDate !== null) {
            setTo(dayjs(endDate).format('DD.MM.YYYY'));
        }
    };
    return (
        <div style={{padding: '24px 0'}}>
            <h3 style={{marginBottom: '20px'}}>Выбран диапазон дат с {from} до {to}</h3>
            {children({handleChange, initials})}
        </div>
    );
};

export const WithTwoMonths = ({children}) => {
    const initials = {
        startDate: new Date('10.10.2019'),
        endDate: new Date('11.10.2019'),
    };

    return <div style={{padding: '24px 0'}}>{children({initials})}</div>;
};
