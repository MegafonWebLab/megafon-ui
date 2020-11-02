import React from 'react';
import PropTypes from 'prop-types';
import {FirstDayOfWeek, useMonth} from '@datepicker-react/hooks';
import cnCreate from 'utils/cnCreate';
import Day from 'components/Calendar/components/Day/Day';
import ArrowLeft from 'icons/System/16/Arrow-list_left_16.svg';
import ArrowRight from 'icons/System/16/Arrow-list_right_16.svg';
import './Month.less';

export interface IMonthProps {
    year: number;
    month: number;
    firstDayOfWeek: FirstDayOfWeek;
    goToPreviousMonths: () => void;
    goToNextMonths: () => void;
}

const cn = cnCreate('mfui-calendar-month');
const Month: React.FC<IMonthProps> = ({
         year,
         month,
         firstDayOfWeek,
         goToPreviousMonths,
         goToNextMonths,
     }) => {
        const weekdayLabelFormat = (date: Date): string =>
            date.toLocaleString('ru', {weekday: 'short'});

        const dayLabelFormat = (date: Date): string => {
            const str = date.toLocaleString('ru', {day: '2-digit'});
            if (str[0] === '0') {
                return str.replace('0', '');
            }

            return str;
        };

        const monthLabelFormat = (date: Date): string =>
            date.toLocaleString('ru', {month: 'long'});

        const {days, weekdayLabels, monthLabel} = useMonth({
            year,
            month,
            firstDayOfWeek,
            dayLabelFormat,
            weekdayLabelFormat,
            monthLabelFormat,
        });
        return (
            <div className={cn('')}>
                <div className={cn('header')}>
                    <ArrowLeft onClick={goToPreviousMonths}/>
                    <strong>{`${monthLabel} ${year}`}</strong>
                    <ArrowRight onClick={goToNextMonths}/>
                </div>
                <div className={cn('weekday-lables')}>
                    {weekdayLabels.map(dayLabel => (
                        <div className={cn('weekday')} key={dayLabel}>
                            {dayLabel}
                        </div>
                    ))}
                </div>
                <div className={cn('days')}>
                    {days.map((day, index) => {
                        if (typeof day === 'object') {
                            return (
                                <Day
                                    date={day.date}
                                    key={day.date.toISOString()}
                                    dayLabel={day.dayLabel}
                                />
                            );
                        }
                        return <div key={index}/>;
                    })}
                </div>
            </div>
        );
    };

Month.propTypes = {
    year: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
    firstDayOfWeek: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6]) as PropTypes.Validator<FirstDayOfWeek>,
    goToPreviousMonths: PropTypes.func.isRequired,
    goToNextMonths: PropTypes.func.isRequired,
};

export default Month;
