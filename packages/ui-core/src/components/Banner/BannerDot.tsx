import * as React from 'react';
import { cnCreate, filterDataAttrs } from '@megafon/ui-helpers';
import * as PropTypes from 'prop-types';
import './BannerDot.less';

export interface IBannerDotProps {
    className?: string;
    index: number;
    isActive: boolean;
    showTimer: boolean;
    timerDelay: number;
    dataAttrs?: {
        root?: Record<string, string>;
    };
    onClick: (index: number) => void;
}

const cn = cnCreate('mfui-banner-dot');
const BannerDot: React.FC<IBannerDotProps> = ({
    className,
    dataAttrs,
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
            {...filterDataAttrs(dataAttrs?.root)}
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
    dataAttrs: PropTypes.shape({
        root: PropTypes.objectOf(PropTypes.string.isRequired),
    }),
    index: PropTypes.number.isRequired,
    isActive: PropTypes.bool.isRequired,
    showTimer: PropTypes.bool.isRequired,
    timerDelay: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default BannerDot;
