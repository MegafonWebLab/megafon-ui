/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { useDay } from '@datepicker-react/hooks';
import { cnCreate } from '@megafon/ui-helpers';
import isFirstDayOfMonth from 'date-fns/isFirstDayOfMonth';
import isLastDayOfMonth from 'date-fns/isLastDayOfMonth';
import isMonday from 'date-fns/isMonday';
import isSunday from 'date-fns/isSunday';
import PropTypes from 'prop-types';
import React from 'react';
import './Day.less';

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
    isBetween?: boolean;
    dayLabel?: string;
    date: Date;
    onMouseLeave?: () => void;
};

export type IDayProps = IDayPickerProps & DayType;

const cn: (param1: string | Record<string, unknown>) => string = cnCreate('mfui-beta-day');
const Day: React.FC<IDayProps> = ({ isBetween = false, dayLabel, date, onMouseLeave, ...pickerProps }) => {
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
        disabled: isDateDisabled,
        between: isBetween || (isSelected && !isSelectedStartOrEnd),
        sunday: isSunday(date),
        monday: isMonday(date),
        first: !isSelectedStartOrEnd && isFirstDayOfMonth(date),
        last: !isSelectedStartOrEnd && isLastDayOfMonth(date),
    };

    const handleMouseLeave = (): void => {
        onMouseLeave && onMouseLeave();
    };

    return (
        <button
            onClick={onClick}
            onKeyDown={onKeyDown}
            onMouseEnter={onMouseEnter}
            onMouseLeave={handleMouseLeave}
            tabIndex={tabIndex}
            type="button"
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
