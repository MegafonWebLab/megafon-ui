/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { FirstDayOfWeek, MonthType } from '@datepicker-react/hooks';
import { cnCreate } from '@megafon/ui-helpers';
import ArrowLeft from 'icons/System/16/Arrow-list_left_16.svg';
import ArrowRight from 'icons/System/16/Arrow-list_right_16.svg';
import PropTypes from 'prop-types';
import React from 'react';
import './Month.less';

export interface IMonthPickerProps {
    firstDayOfWeek: FirstDayOfWeek;
    activeMonths: MonthType[];
    goToPreviousMonths: () => void;
    goToNextMonths: () => void;
}

export interface IMonthProps {
    isPrevMonthDisabled: boolean;
    isNextMonthDisabled: boolean;
    year: number;
    monthLabel: string;
    weekdayLabels: string[];
    goToPreviousMonth: () => void;
    goToNextMonth: () => void;
}
const cn: (param1?: string, param2?: Record<string, unknown>) => string = cnCreate('mfui-beta-month');
const Month: React.FC<IMonthProps> = ({
    isPrevMonthDisabled,
    isNextMonthDisabled,
    year,
    monthLabel,
    weekdayLabels,
    goToPreviousMonth,
    goToNextMonth,
    children,
}) => {
    const handleArrowLeftClick = (): void => {
        !isPrevMonthDisabled && goToPreviousMonth();
    };

    const handleArrowRightClick = (): void => {
        !isNextMonthDisabled && goToNextMonth();
    };

    return (
        <div className={cn()}>
            <div className={cn('header')}>
                <ArrowLeft className={cn('arrow', { disabled: isPrevMonthDisabled })} onClick={handleArrowLeftClick} />
                <span className={cn('title')}>{`${monthLabel} ${year}`}</span>
                <ArrowRight
                    className={cn('arrow', { disabled: isNextMonthDisabled })}
                    onClick={handleArrowRightClick}
                />
            </div>
            <div className={cn('weekday-labels')}>
                {weekdayLabels.map((dayLabel, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <div className={cn('weekday')} key={dayLabel + index}>
                        {dayLabel}
                    </div>
                ))}
            </div>
            <div className={cn('days')}>{children}</div>
        </div>
    );
};

Month.propTypes = {
    isPrevMonthDisabled: PropTypes.bool.isRequired,
    isNextMonthDisabled: PropTypes.bool.isRequired,
    year: PropTypes.number.isRequired,
    monthLabel: PropTypes.string.isRequired,
    weekdayLabels: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    goToPreviousMonth: PropTypes.func.isRequired,
    goToNextMonth: PropTypes.func.isRequired,
};

export default Month;
