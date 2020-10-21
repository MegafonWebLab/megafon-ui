import * as React from 'react';
import { OnDatesChangeProps } from '@datepicker-react/hooks';

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

    const [from, setFrom] = React.useState<string>(initials.startDate.toLocaleDateString('ru'));
    const [to, setTo] = React.useState<string>(initials.endDate.toLocaleDateString('ru'));

    const handleChange = (date: OnDatesChangeProps) => {
        const {startDate, endDate} = date;
        if (startDate !== null) {
            setFrom(startDate.toLocaleDateString('ru'));
        }
        if (endDate !== null) {
            setTo(endDate.toLocaleDateString('ru'));
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
        endDate: new Date('10.11.2020'),
    };

    return <div style={{padding: '24px 0'}}>{children({initials})}</div>;
};
