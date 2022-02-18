import React from 'react';
import { FirstDayOfWeek, MonthType } from '@datepicker-react/hooks';
import { AccessibilityEventType, checkEventIsClickOrEnterPress, cnCreate, filterDataAttrs } from '@megafon/ui-helpers';
import ArrowLeft from '@megafon/ui-icons/system-16-arrow-list_left_16.svg';
import ArrowRight from '@megafon/ui-icons/system-16-arrow-list_right_16.svg';
import './Month.less';
import PropTypes from 'prop-types';

export interface IMonthPickerProps {
    firstDayOfWeek: FirstDayOfWeek;
    activeMonths: MonthType[];
    goToPreviousMonths: () => void;
    goToNextMonths: () => void;
}

export interface IMonthProps {
    dataAttrs?: {
        root?: Record<string, string>;
        arrowLeft?: Record<string, string>;
        arrowRight?: Record<string, string>;
    };
    isPrevMonthDisabled: boolean;
    isNextMonthDisabled: boolean;
    year: number;
    monthLabel: string;
    weekdayLabels: string[];
    goToPreviousMonth: () => void;
    goToNextMonth: () => void;
}

const cn = cnCreate('mfui-month');
const Month: React.FC<IMonthProps> = ({
    dataAttrs,
    isPrevMonthDisabled,
    isNextMonthDisabled,
    year,
    monthLabel,
    weekdayLabels,
    goToPreviousMonth,
    goToNextMonth,
    children,
}) => {
    const handleArrowLeftClick = (e: AccessibilityEventType): void => {
        if (checkEventIsClickOrEnterPress(e)) {
            !isPrevMonthDisabled && goToPreviousMonth();
        }
    };

    const handleArrowRightClick = (e: AccessibilityEventType): void => {
        if (checkEventIsClickOrEnterPress(e)) {
            !isNextMonthDisabled && goToNextMonth();
        }
    };

    const getTabIndex = (hasFocus: boolean): number => {
        const tabIndexWithFocus = 0;
        const tabIndexWithoutFocus = -1;

        return hasFocus ? tabIndexWithFocus : tabIndexWithoutFocus;
    };

    return (
        <div {...filterDataAttrs(dataAttrs?.root)} className={cn()}>
            <div className={cn('header')}>
                <ArrowLeft
                    {...filterDataAttrs(dataAttrs?.arrowLeft)}
                    role="button"
                    tabIndex={getTabIndex(!isPrevMonthDisabled)}
                    className={cn('arrow', { disabled: isPrevMonthDisabled })}
                    onKeyDown={handleArrowLeftClick}
                    onClick={handleArrowLeftClick}
                />
                <span className={cn('title')}>{`${monthLabel} ${year}`}</span>
                <ArrowRight
                    {...filterDataAttrs(dataAttrs?.arrowRight)}
                    role="button"
                    tabIndex={getTabIndex(!isNextMonthDisabled)}
                    className={cn('arrow', { disabled: isNextMonthDisabled })}
                    onKeyDown={handleArrowRightClick}
                    onClick={handleArrowRightClick}
                />
            </div>
            <div className={cn('weekday-labels')}>
                {weekdayLabels.map((dayLabel, index) => (
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
    dataAttrs: PropTypes.shape({
        root: PropTypes.objectOf(PropTypes.string.isRequired),
        arrowLeft: PropTypes.objectOf(PropTypes.string.isRequired),
        arrowRight: PropTypes.objectOf(PropTypes.string.isRequired),
    }),
    isPrevMonthDisabled: PropTypes.bool.isRequired,
    isNextMonthDisabled: PropTypes.bool.isRequired,
    year: PropTypes.number.isRequired,
    monthLabel: PropTypes.string.isRequired,
    weekdayLabels: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    goToPreviousMonth: PropTypes.func.isRequired,
    goToNextMonth: PropTypes.func.isRequired,
};

export default Month;
