import React, { useEffect, useState } from 'react';
import { cnCreate, filterDataAttrs } from '@megafon/ui-helpers';
import TimerIcon from '@megafon/ui-icons/system-16-timer_16.svg';
import * as PropTypes from 'prop-types';
import Timer from './Timer/Timer';
import './TimerBadge.less';

const SECONDS_IN_HOUR = 3600;
const MS_IN_SECOND = 1000;
const TIMEOUT = 1000;

const TimerBadgeTheme = {
    RED: 'red',
    GREY: 'grey',
} as const;

export interface ITimerBadgeProps {
    /** Дата окончания таймера */
    expirationDate: Date;
    /** Граница переключения в режим обратного отсчёта, в секундах */
    countdownStart?: number;
    /** Отображение дополнительного текста */
    hasPrefix?: boolean;
    /** Текст перед таймером в режиме обратного отсчета. Появляется при hasPrefix=true. */
    countdownText?: string;
    /** Текст перед таймером в режиме даты. Появляется при hasPrefix=true. */
    expirationDateText?: string;
    /** Дополнительный класс корневого элемента */
    className?: string;
    /** Дополнительные data-атрибуты к внутренним элементам */
    dataAttrs?: {
        root?: Record<string, string>;
        text?: Record<string, string>;
        timer?: Record<string, string>;
    };
}

const cn = cnCreate('mfui-timer-badge');
const TimerBadge: React.FC<ITimerBadgeProps> = ({
    expirationDate,
    countdownStart = 86400,
    hasPrefix = false,
    countdownText = 'Закончится через',
    expirationDateText = 'Воспользуйтесь до',
    className,
    dataAttrs,
}) => {
    const remainingTime = (expirationDate.getTime() - Date.now()) / MS_IN_SECOND;

    const [actualRemainingTime, setActualRemainingTime] = useState(remainingTime);
    const [showCountdown, setShowCountdown] = useState(false);

    const isLastHour = actualRemainingTime < SECONDS_IN_HOUR;
    const isTimeExpired = actualRemainingTime < 1;

    const theme = showCountdown ? TimerBadgeTheme.RED : TimerBadgeTheme.GREY;
    const additionalText = showCountdown ? countdownText : expirationDateText;

    useEffect(() => {
        setShowCountdown(actualRemainingTime < countdownStart);
    }, [actualRemainingTime, countdownStart]);

    useEffect(() => {
        if (isTimeExpired) {
            return undefined;
        }

        const timeoutId = window.setTimeout(() => setActualRemainingTime(actualRemainingTime - 1), TIMEOUT);

        return (): void => clearTimeout(timeoutId);
    }, [isTimeExpired, showCountdown, actualRemainingTime]);

    return (
        <div {...filterDataAttrs(dataAttrs?.root)} className={cn({ theme }, className)}>
            <div className={cn('icon-container', { shadow: isLastHour && showCountdown })}>
                <TimerIcon className={cn('icon')} />
            </div>
            <div {...filterDataAttrs(dataAttrs?.text)} className={cn('text')}>
                {isTimeExpired ? (
                    'Время действия истекло'
                ) : (
                    <Timer
                        additionalText={hasPrefix ? additionalText : undefined}
                        showCountdown={showCountdown}
                        expirationDate={expirationDate}
                        actualRemainingTime={actualRemainingTime}
                        dataAttrs={{ root: dataAttrs?.timer }}
                    />
                )}
            </div>
        </div>
    );
};

TimerBadge.propTypes = {
    expirationDate: PropTypes.instanceOf(Date).isRequired,
    countdownStart: PropTypes.number,
    hasPrefix: PropTypes.bool,
    countdownText: PropTypes.string,
    expirationDateText: PropTypes.string,
    className: PropTypes.string,
    dataAttrs: PropTypes.shape({
        root: PropTypes.objectOf(PropTypes.string.isRequired),
        text: PropTypes.objectOf(PropTypes.string.isRequired),
        timer: PropTypes.objectOf(PropTypes.string.isRequired),
    }),
};

export default TimerBadge;
