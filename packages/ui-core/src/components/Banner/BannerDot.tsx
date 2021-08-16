/* eslint-disable import/no-unresolved */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { cnCreate } from '@megafon/ui-helpers';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import './BannerDot.less';

export interface IBannerDotProps {
    className?: string;
    index: number;
    isActive: boolean;
    showTimer: boolean;
    timerDelay: number;
    onClick: (index: number) => void;
}

const cn: (param1?: Record<string, unknown> | string, param2?: string) => string = cnCreate('mfui-beta-banner-dot');
const BannerDot: React.FC<IBannerDotProps> = ({ className, index, isActive, showTimer, timerDelay, onClick }) => {
    const handleDotClick = React.useCallback(() => {
        onClick(index);
    }, [onClick, index]);

    return (
        <div className={cn({ active: isActive, timer: showTimer }, className)} onClick={handleDotClick}>
            {showTimer && isActive && (
                <svg className={cn('timer')} viewBox="0 0 100 100">
                    <circle
                        className={cn('timer-circle')}
                        style={{ animationDuration: `${timerDelay}s` }}
                        cx="50"
                        cy="50"
                        r="50"
                    />
                </svg>
            )}
        </div>
    );
};

BannerDot.propTypes = {
    className: PropTypes.string,
    index: PropTypes.number.isRequired,
    isActive: PropTypes.bool.isRequired,
    showTimer: PropTypes.bool.isRequired,
    timerDelay: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default BannerDot;
