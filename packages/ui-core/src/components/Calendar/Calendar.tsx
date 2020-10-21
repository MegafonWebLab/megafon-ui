import React, { ReactNode, useState, useEffect } from 'react';
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
import { format, isEqual, isAfter } from 'date-fns';
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
    /** Блокирует возможность выбора дат до указанной */
    minBookingDate?: Date;
    /** Блокирует возможность выбора дат после указанной */
    maxBookingDate?: Date;
    /** Массив отдельных дат, которые будут недоступны для выбора */
    unavailableDates?: Date[];
    /** Обработчик изменения выбранного периода. Возвращает startDate первым аргументом и endDate вторым */
    handleChange?: (startDate: Date | null, endDate: Date | null) => void;
}

const weekdayLabelFormat = (date: Date): string => formatDate(date, 'EEEEEE');
const dayLabelFormat = (date: Date): string => formatDate(date, 'd');
const monthLabelFormat = (date: Date): string => formatDate(date, 'MMMM');

const cn = cnCreate('mfui-beta-calendar');
const Calendar: React.FC<ICalendarProps> = ({
    isSingleDate = false,
    startDate = null,
    endDate = null,
    className,
    handleChange,
    minBookingDate,
    maxBookingDate,
    unavailableDates = [],
}) => {
    const isInitialDatesEqual = startDate && endDate && isEqual(startDate, endDate);
    const isStartFocus = !startDate || (endDate && !isInitialDatesEqual);
    const minBookingMonth = minBookingDate && formatDate(minBookingDate, 'MM');
    const maxBookingMonth = maxBookingDate && formatDate(maxBookingDate, 'MM');

    const checkBlockedDates = (periodStart: Date | null, periodEnd: Date | null): boolean => {
        return unavailableDates.some((blockedDate) =>
            periodStart && periodEnd && isAfter(blockedDate, periodStart) && !isAfter(blockedDate, periodEnd)
        );
    };

    const [calendarState, setCalendarState] = useState<ICalendarState>({
        startDate,
        endDate: isInitialDatesEqual || isSingleDate || checkBlockedDates(startDate, endDate) ? null : endDate,
        focusedInput: isStartFocus ? START_DATE : END_DATE,
    });

    const { startDate: stateStartDate, endDate: stateEndDate, focusedInput: stateFocusedInput } = calendarState;

    useEffect(() => {
        handleChange && handleChange(stateStartDate, stateEndDate);
    }, [stateStartDate, stateEndDate]);

    const handleDaySelect = (date: Date): void => {
        const isStartChose = stateFocusedInput === START_DATE;
        const isEndChose = stateFocusedInput === END_DATE;

        switch (true) {
            case isSingleDate:
                setCalendarState({ ...calendarState, startDate: date });
                break;
            case stateStartDate && stateEndDate && isEndChose &&
            isAfter(date, stateStartDate) && !isAfter(date, stateEndDate):
                setCalendarState({ ...calendarState, endDate: date, focusedInput: START_DATE });
                break;
            case !!unavailableDates.length && checkBlockedDates(stateStartDate, date):
            case stateStartDate && isEqual(stateStartDate || 0, date):
            case stateEndDate && isEqual(stateEndDate || 0, date):
            case stateEndDate && isEndChose && !isAfter(date, stateEndDate || 0):
            case stateEndDate && isStartChose && isAfter(date, stateEndDate || 0):
            case stateStartDate && isEndChose && !isAfter(date, stateStartDate || 0):
            case stateEndDate && isStartChose && isAfter(date, stateEndDate):
                setCalendarState({ startDate: date, endDate: null, focusedInput: END_DATE });
                break;
            case stateStartDate && isEndChose:
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
        unavailableDates,
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

        return (
            <Month
                key={`${year}-${month}`}
                year={year}
                weekdayLabels={weekdayLabels}
                monthLabel={monthLabel}
                isPrevMonthDisabled={String(month + 1) === minBookingMonth}
                isNextMonthDisabled={String(month + 1) === maxBookingMonth}
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
    unavailableDates: PropTypes.arrayOf(PropTypes.instanceOf(Date).isRequired),
    handleChange: PropTypes.func as PropTypes.Validator<ICalendarProps['handleChange']>,
};

export default Calendar;
