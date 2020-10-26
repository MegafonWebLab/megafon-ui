import * as React from 'react';
import * as PropTypes from 'prop-types';
import './BannerDot.less';
import cnCreate from 'utils/cnCreate';

export interface IBannerDotProps {
    className?: string;
    index: number;
    isActive: boolean;
    showTimer: boolean;
    timerDelay: number;
    onClick: (index: number) => void;
}

const cn = cnCreate('mfui-beta-banner-dot');
const BannerDot: React.FC<IBannerDotProps> = ({
    className,
    index,
    isActive,
    showTimer,
    timerDelay,
    onClick,
}) => {
    const handleDotClick = React.useCallback(() => {
        onClick(index);
    }, [onClick, index]);

    return (
        <div
            className={cn({ active: isActive, timer: showTimer }, className)}
            onClick={handleDotClick}
        >
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
    onClick: PropTypes.func.isRequired,
};

export default BannerDot;
