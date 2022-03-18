import * as React from 'react';
import { cnCreate, filterDataAttrs } from '@megafon/ui-helpers';
import format from 'date-fns/format';
import ruLocale from 'date-fns/locale/ru';
import * as PropTypes from 'prop-types';

const SECONDS_IN_DAY = 86400;
const SECONDS_IN_HOUR = 3600;
const SECONDS_IN_MINUTE = 60;

const formatDate = (date: Date, pattern: string) => format(date, pattern, { locale: ruLocale });

export const getCountdownText = (remainingTime = 0): string => {
    const isMoreHourAndLessDay = remainingTime >= SECONDS_IN_HOUR && remainingTime < SECONDS_IN_DAY;

    const truncTime = (divider = 1) => Math.trunc(remainingTime / divider);

    switch (true) {
        case remainingTime <= 0: {
            return '';
        }
        case remainingTime < SECONDS_IN_MINUTE: {
            const seconds = truncTime();

            return `${seconds} сек`;
        }
        case remainingTime < SECONDS_IN_HOUR: {
            const minutes = truncTime(SECONDS_IN_MINUTE);

            return `${minutes} мин`;
        }
        case isMoreHourAndLessDay: {
            const hours = truncTime(SECONDS_IN_HOUR);
            const secondsLeft = remainingTime - hours * SECONDS_IN_HOUR;
            const minutes = Math.trunc(secondsLeft / SECONDS_IN_MINUTE);

            return minutes ? `${hours} ч ${minutes} мин` : `${hours} ч`;
        }
        case remainingTime >= SECONDS_IN_DAY: {
            const days = truncTime(SECONDS_IN_DAY);
            const secondsLeft = remainingTime - days * SECONDS_IN_DAY;
            const hours = Math.trunc(secondsLeft / SECONDS_IN_HOUR);

            return hours ? `${days} дн ${hours} ч` : `${days} дн`;
        }
        default: {
            return '';
        }
    }
};

interface ITimerProps {
    actualRemainingTime: number;
    expirationDate: Date;
    showCountdown: boolean;
    additionalText?: string;
    dataAttrs?: {
        root?: Record<string, string>;
    };
}

const cn = cnCreate('mfui-timer');
const Timer: React.FC<ITimerProps> = ({
    actualRemainingTime,
    expirationDate,
    showCountdown,
    additionalText,
    dataAttrs,
}) => (
    <div className={cn()} {...filterDataAttrs(dataAttrs?.root)}>
        {additionalText && <span>{additionalText} </span>}
        <span>
            {showCountdown ? getCountdownText(actualRemainingTime) : formatDate(expirationDate, 'dd MMMM yyyy')}
        </span>
    </div>
);

Timer.propTypes = {
    expirationDate: PropTypes.instanceOf(Date).isRequired,
    actualRemainingTime: PropTypes.number.isRequired,
    showCountdown: PropTypes.bool.isRequired,
    additionalText: PropTypes.string,
    dataAttrs: PropTypes.shape({
        root: PropTypes.objectOf(PropTypes.string.isRequired),
    }),
};

export default Timer;
