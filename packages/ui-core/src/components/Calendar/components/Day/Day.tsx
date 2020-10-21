import React from 'react';
import PropTypes from 'prop-types';
import { useDay } from '@datepicker-react/hooks';
import cnCreate from 'utils/cnCreate';
import './Day.less';
import { isSunday, isMonday, isLastDayOfMonth, isFirstDayOfMonth } from 'date-fns';

export interface IDayPickerProps {
    isDateSelected: (date: Date) => boolean;
    isDateHovered: (date: Date) => boolean;
    isFirstOrLastSelectedDate: (date: Date) => boolean;
    isDateBlocked: (date: Date) => boolean;
    isDateFocused: (date: Date) => boolean;
    focusedDate: Date | null;
    onDateHover: (date: Date | null) => void;
    onDateSelect: (date: Date) => void;
    onDateFocus: (date: Date) => void;
}

export type DayType = {
    dayLabel?: string;
    date: Date;
};

export type IDayProps = IDayPickerProps & DayType;

const cn = cnCreate('mfui-beta-day');
const Day: React.FC<IDayProps> = ({ dayLabel, date, ...pickerProps }) => {
    const dayRef = React.useRef(null);

    const {
        isSelected,
        isSelectedStartOrEnd,
        disabledDate: isDateDisabled,
        onClick,
        onKeyDown,
        onMouseEnter,
        tabIndex,
    } = useDay({ date, dayRef, ...pickerProps });

    const modClasses = {
        active: isSelectedStartOrEnd,
        between: isSelected && !isSelectedStartOrEnd,
        sunday: isSunday(date),
        monday: isMonday(date),
        first: !isSelectedStartOrEnd && isFirstDayOfMonth(date),
        last: !isSelectedStartOrEnd && isLastDayOfMonth(date),
    };

    return (
        <button
            onClick={onClick}
            onKeyDown={onKeyDown}
            onMouseEnter={onMouseEnter}
            tabIndex={tabIndex}
            type="button"
            disabled={isDateDisabled}
            ref={dayRef}
            className={cn(modClasses)}
        >
            <span className={cn('label')}>{dayLabel}</span>
        </button>
    );
};

Day.propTypes = {
    dayLabel: PropTypes.string,
    date: PropTypes.instanceOf(Date).isRequired,
    focusedDate: PropTypes.instanceOf(Date),
    isDateSelected: PropTypes.func.isRequired,
    isDateHovered: PropTypes.func.isRequired,
    isFirstOrLastSelectedDate: PropTypes.func.isRequired,
    isDateBlocked: PropTypes.func.isRequired,
    isDateFocused: PropTypes.func.isRequired,
    onDateHover: PropTypes.func.isRequired,
    onDateSelect: PropTypes.func.isRequired,
    onDateFocus: PropTypes.func.isRequired,
};

export default Day;
