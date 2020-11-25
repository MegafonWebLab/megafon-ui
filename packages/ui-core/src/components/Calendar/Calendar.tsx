import React, { ReactNode, useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import './Calendar.less';
import cnCreate from 'utils/cnCreate';
import {
    FocusedInput,
    START_DATE,
    END_DATE,
    useDatepicker,
    useMonth,
} from '@datepicker-react/hooks';
import { format, isEqual, isAfter, isSameMonth } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';
import Month, { IMonthPickerProps } from 'components/Calendar/components/Month/Month';
import Day, { DayType, IDayPickerProps } from 'components/Calendar/components/Day/Day';

const formatDate = (date: Date, pattern: string, locale = ruLocale) => format(date, pattern, { locale });

type DatePickerType = IDayPickerProps & IMonthPickerProps;

interface ICalendarState {
    startDate: Date | null;
    endDate: Date | null;
    focusedInput: FocusedInput;
}

export interface ICalendarProps {
    /** Переключение календаря в режим выбора одной даты, вместо периода */
    isSingleDate?: boolean;
    /** Классы для модификации компонента */
    className?: string;
    /** Дата начала периода по умолчанию */
    startDate?: Date;
    /** Дата окончания периода по умолчанию */
    endDate?: Date;
    /** Блокирует возможность выбора дат до указанной (включительно) */
    minBookingDate?: Date;
    /** Блокирует возможность выбора дат после указанной (включительно) */
    maxBookingDate?: Date;
    /** Обработчик изменения выбранного периода. При isSingleDate = true возвращается только startDate */
    onChange?: (startDate: Date | null, endDate: Date | null) => void;
}

const weekdayLabelFormat = (date: Date): string => formatDate(date, 'EEEEEE');
const dayLabelFormat = (date: Date): string => formatDate(date, 'd');
const monthLabelFormat = (date: Date): string => formatDate(date, 'LLLL');

const cn = cnCreate('mfui-beta-calendar');
const Calendar: React.FC<ICalendarProps> = ({
    isSingleDate = false,
    startDate = null,
    endDate = null,
    className,
    onChange,
    minBookingDate,
    maxBookingDate,
}) => {
    const calendarStateFromProps: ICalendarState = useMemo(() => {
        const isInitialDatesEqual = startDate && endDate && isEqual(startDate, endDate);
        const isStartFocus = !startDate || (endDate && !isInitialDatesEqual);

        return {
            startDate,
            endDate: isInitialDatesEqual || isSingleDate ? null : endDate,
            focusedInput: isStartFocus ? START_DATE : END_DATE,
        };
    }, [startDate, endDate, isSingleDate]);

    const [calendarState, setCalendarState] = useState<ICalendarState>(calendarStateFromProps);

    const { startDate: stateStartDate, endDate: stateEndDate, focusedInput: stateFocusedInput } = calendarState;

    useEffect(() => {
        setCalendarState(calendarStateFromProps);
    }, [calendarStateFromProps]);

    useEffect(() => {
        onChange && onChange(stateStartDate, stateEndDate);
    }, [stateStartDate, stateEndDate]);

    const handleDaySelect = (date: Date): void => {
        const isStartChose = stateFocusedInput === START_DATE;
        const isEndChose = stateFocusedInput === END_DATE;
        const isEndDateChose = stateStartDate && isEndChose;
        const isStartDatePeriodNarrow = stateStartDate && stateEndDate && isEndChose
            && isAfter(date, stateStartDate) && !isAfter(date, stateEndDate);
        const isStartDateClick = stateStartDate && isEqual(stateStartDate || 0, date);
        const isEndDateClick = stateEndDate && isEqual(stateEndDate || 0, date);
        const isClickBeforeChosenEndDate = stateEndDate && isEndChose && !isAfter(date, stateEndDate || 0);
        const isClickAfterChosenEndDate = stateEndDate && isStartChose && isAfter(date, stateEndDate || 0);
        const isClickBeforeStartDate = stateStartDate && isEndChose && !isAfter(date, stateStartDate || 0);
        const isStartDateChose = isStartDateClick || isEndDateClick || isClickBeforeChosenEndDate
            || isClickAfterChosenEndDate || isClickBeforeStartDate;

        switch (true) {
            case isSingleDate:
                setCalendarState({ ...calendarState, startDate: date });
                break;
            case isStartDatePeriodNarrow:
                setCalendarState({ ...calendarState, endDate: date, focusedInput: START_DATE });
                break;
            case isStartDateChose:
                setCalendarState({ startDate: date, endDate: null, focusedInput: END_DATE });
                break;
            case isEndDateChose:
                setCalendarState({ ...calendarState, endDate: date, focusedInput: START_DATE });
                break;
            default:
                setCalendarState({ ...calendarState, startDate: date, focusedInput: END_DATE });
        }
    };

    const {
        firstDayOfWeek,
        activeMonths,
        goToPreviousMonths,
        goToNextMonths,
        ...pickerProps
    }: DatePickerType = useDatepicker({
        onDatesChange: () => {},
        numberOfMonths: 1,
        minBookingDate,
        maxBookingDate,
        ...calendarState,
    });

    const renderDays = (days: Array<number | DayType>): ReactNode => days.map((day, index) => {
        if (typeof day === 'object') {
            const { date, dayLabel } = day;

            if (!dayLabel) {
                return <div key={index + String(date)} />;
            }

            return (
                <Day
                    date={date}
                    key={formatDate(date, 'dd-MM-yyyy')}
                    dayLabel={dayLabel}
                    {...pickerProps}
                    onDateSelect={handleDaySelect}
                />
            );
        }

        return <div key={index + day} />;
    });

    const renderMonths = (): ReactNode => activeMonths.map(({ month, year }) => {
        const { days, weekdayLabels, monthLabel } = useMonth({
            year,
            month,
            firstDayOfWeek,
            dayLabelFormat,
            weekdayLabelFormat,
            monthLabelFormat,
        });

        const isPrevMonthDisabled = !!minBookingDate && isSameMonth(new Date(year, month, 1), minBookingDate);
        const isNextMonthDisabled = !!maxBookingDate && isSameMonth(new Date(year, month, 1), maxBookingDate);

        return (
            <Month
                key={`${year}-${month}`}
                year={year}
                weekdayLabels={weekdayLabels}
                monthLabel={monthLabel}
                isPrevMonthDisabled={isPrevMonthDisabled}
                isNextMonthDisabled={isNextMonthDisabled}
                goToPreviousMonth={goToPreviousMonths}
                goToNextMonth={goToNextMonths}
            >
                {renderDays(days)}
            </Month>
        );
    });

    return (
        <div className={cn([className])}>
            {renderMonths()}
        </div>
    );
};

Calendar.propTypes = {
    isSingleDate: PropTypes.bool,
    className: PropTypes.string,
    startDate: PropTypes.instanceOf(Date),
    endDate: PropTypes.instanceOf(Date),
    minBookingDate: PropTypes.instanceOf(Date),
    maxBookingDate: PropTypes.instanceOf(Date),
    onChange: PropTypes.func as PropTypes.Validator<ICalendarProps['onChange']>,
};

export default Calendar;
