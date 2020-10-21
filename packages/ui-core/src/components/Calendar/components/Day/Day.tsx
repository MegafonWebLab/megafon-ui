import React from 'react';
import PropTypes from 'prop-types';
import { useDay } from '@datepicker-react/hooks';
import cnCreate from 'utils/cnCreate';
import CalendarContext from 'components/Calendar/context/calendarContext';
import './Day.less';

export interface IDayProps {
    dayLabel?: string;
    date: Date;
}

const cn = cnCreate('mfui-calendar-day');
const Day: React.FC<IDayProps> = ({ dayLabel, date }) => {
    const dayRef = React.useRef(null);
    const {
        focusedDate,
        isDateFocused,
        isDateSelected,
        isDateHovered,
        isDateBlocked,
        isFirstOrLastSelectedDate,
        onDateSelect,
        onDateFocus,
        onDateHover,
    } = React.useContext(CalendarContext);
    const {
        isSelected,
        isSelectedStartOrEnd,
        // TODO: Add support
        // disabledDate,
        onClick,
        onKeyDown,
        onMouseEnter,
        tabIndex,
    } = useDay({
        date,
        focusedDate,
        isDateFocused,
        isDateSelected,
        isDateHovered,
        isDateBlocked,
        isFirstOrLastSelectedDate,
        onDateFocus,
        onDateSelect,
        onDateHover,
        dayRef,
    });
    if (!dayLabel) {
        return <div />;
    }

    const modClasses = {
        active: isSelectedStartOrEnd,
        between: isSelected && !isSelectedStartOrEnd,
        sunday: !isSelectedStartOrEnd && date.getDay() === 0,
        monday: !isSelectedStartOrEnd && date.getDay() === 1,
        first:
            !isSelectedStartOrEnd &&
            date.getDate() ===
                new Date(date.getFullYear(), date.getMonth(), 1).getDate(),
        last:
            !isSelectedStartOrEnd &&
            date.getDate() ===
                new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(),
    };

    return (
        <button
            onClick={onClick}
            onKeyDown={onKeyDown}
            onMouseEnter={onMouseEnter}
            tabIndex={tabIndex}
            type="button"
            ref={dayRef}
            className={cn('', modClasses)}
        >
            <span className={cn('lable')}>{dayLabel}</span>
        </button>
    );
};

Day.propTypes = {
    dayLabel: PropTypes.string,
    date: PropTypes.instanceOf(Date).isRequired,
};

export default Day;
