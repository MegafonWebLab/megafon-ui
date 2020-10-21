import React from 'react';
import PropTypes from 'prop-types';
import './Calendar.less';
import cnCreate from 'utils/cnCreate';
import {FocusedInput, OnDatesChangeProps, START_DATE, useDatepicker} from '@datepicker-react/hooks';
import CalendarContext from 'components/Calendar/context/calendarContext';
import Month from 'components/Calendar/components/Month/Month';

interface ICalendarClasses {
    root?: string;
}

export interface ICalendarProps {
    /** Классы для модификации компонента */
    classes?: ICalendarClasses;
    /** Число отображаемых месяцев, по умолчанию - 1 */
    numberOfMonths?: number;
    /** Интервал дат по умолчанию — объект со свойствами starDate: Date и endDate: Date */
    initials?: Initials;
    /** Позиция календаря по отношению к переданному компоненту (Еще не реализовано) */
    // TODO: Currently controls only triangle, should be removed upgraded for mor functionality.
    position?: 'top' | 'right' | 'bottom' | 'left';
    /** Обработчик изменений, получает объект с выбранными startDate и endDate в качестве аргументов */
    handleChange?: (date: OnDatesChangeProps) => void;
}

type Initials = {
    startDate: Date;
    endDate: Date;
};

const cn = cnCreate('mfui-calendar');
const Calendar: React.FC<ICalendarProps> = ({
         classes: {root: rootPropsClasses = ''} = {},
         numberOfMonths = 1,
         initials = {},
         position,
         handleChange,
     }) => {
        const [state, setState] = React.useState<{
            startDate: Date | null;
            endDate: Date | null;
            focusedInput: FocusedInput;
        }>({
            startDate: initials.startDate || null,
            endDate: initials.endDate || null,
            focusedInput: START_DATE,
        });

        const onDatesChange = (data: OnDatesChangeProps) => {
            if (!data.focusedInput) {
                setState({...data, focusedInput: START_DATE});
                handleChange && handleChange(data);
            } else {
                setState(data);
                handleChange && handleChange(data);
            }
        };
        const {
            firstDayOfWeek,
            activeMonths,
            isDateSelected,
            isDateHovered,
            isFirstOrLastSelectedDate,
            isDateBlocked,
            isDateFocused,
            focusedDate,
            onDateHover,
            onDateSelect,
            onDateFocus,
            goToPreviousMonths,
            goToNextMonths,
        } = useDatepicker({
            startDate: state.startDate,
            endDate: state.endDate,
            focusedInput: state.focusedInput,
            onDatesChange,
            numberOfMonths,
        });

        const renderPositionTriangle = (): JSX.Element | null => {
            if (position && numberOfMonths === 1) {
                return <div className={cn('triangle', {[position]: true})}/>;
            }
            return null;
        };

        return (
            <div className={cn(rootPropsClasses)}>
                <CalendarContext.Provider
                    value={{
                        focusedDate,
                        isDateFocused,
                        isDateSelected,
                        isDateHovered,
                        isDateBlocked,
                        isFirstOrLastSelectedDate,
                        onDateSelect,
                        onDateFocus,
                        onDateHover,
                    }}
                >
                    <div className={cn('month-list')}>
                        {activeMonths.map(month => (
                            <Month
                                key={`${month.year}-${month.month}`}
                                year={month.year}
                                month={month.month}
                                firstDayOfWeek={firstDayOfWeek}
                                goToPreviousMonths={goToPreviousMonths}
                                goToNextMonths={goToNextMonths}
                            />
                        ))}
                    </div>
                </CalendarContext.Provider>
                {renderPositionTriangle()}
            </div>
        );
    };

Calendar.propTypes = {
    classes: PropTypes.shape({
        root: PropTypes.string,
    }) as PropTypes.Validator<ICalendarClasses>,
    initials: PropTypes.shape({
        startDate: PropTypes.instanceOf(Date),
        endDate: PropTypes.instanceOf(Date),
    }) as PropTypes.Validator<Initials>,
    position: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
    handleChange: PropTypes.func as PropTypes.Validator<ICalendarProps['handleChange']>,
};

export default Calendar;
