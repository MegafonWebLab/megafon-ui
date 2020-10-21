import React from 'react';

type CalendarContext = {
    isDateSelected: (date: Date) => boolean;
    isDateHovered: (date: Date) => boolean;
    isFirstOrLastSelectedDate: (date: Date) => boolean;
    isDateBlocked: (date: Date) => boolean;
    isDateFocused: (date: Date) => boolean;
    focusedDate: Date | null;
    onDateHover: (date: Date | null) => void;
    onDateSelect: (date: Date) => void;
    onDateFocus: (date: Date) => void;
};

export const defaultValue: CalendarContext = {
    focusedDate: null,
    isDateFocused: () => false,
    isDateSelected: () => false,
    isDateHovered: () => false,
    isDateBlocked: () => false,
    isFirstOrLastSelectedDate: () => false,
    onDateFocus: () => {},
    onDateHover: () => {},
    onDateSelect: () => {},
};

export default React.createContext<CalendarContext>(defaultValue);
