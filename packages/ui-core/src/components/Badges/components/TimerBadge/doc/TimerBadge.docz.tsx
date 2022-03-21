import { add } from 'date-fns';

const date = new Date();

export const someDaysBeforeEnd = add(date, { days: 6, hours: 1 });
export const someDaysAndHoursBeforeEnd = add(date, { days: 6, hours: 4 });
export const someHoursAndMinutesBeforeEnd = add(date, { hours: 5, minutes: 25 });
export const someHoursBeforeEnd = add(date, { hours: 5, minutes: 1 });
export const someMinutesBeforeEnd = add(date, { minutes: 40 });
export const someSecondsBeforeEnd = add(date, { seconds: 59 });
export const someMonthsBeforeEnd = add(date, { months: 3 });
