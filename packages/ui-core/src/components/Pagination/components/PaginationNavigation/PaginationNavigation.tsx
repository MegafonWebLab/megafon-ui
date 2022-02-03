import React from 'react';
import { cnCreate } from '@megafon/ui-helpers';
import ArrowRightIcon from '@megafon/ui-icons/system-24-arrow_right_24.svg';
import PropTypes from 'prop-types';
import PaginationButton from '../PaginationButton/PaginationButton';
import './PaginationNavigation.less';

interface IPaginationNavigationProps {
    direction?: 'left' | 'right';
    theme?: 'default' | 'light';
    disabled?: boolean;
    isActive?: boolean;
    className?: string;
    dataAttrs?: {
        root?: Record<string, string>;
    };
    onClick?: (value?: number | string) => void;
}

const cn = cnCreate('mfui-pagination-navigation');
const PaginationNavigation: React.FC<IPaginationNavigationProps> = ({
    direction = 'right',
    theme,
    disabled,
    isActive,
    onClick,
    className,
    dataAttrs,
}) => (
    <PaginationButton
        dataAttrs={dataAttrs}
        className={cn({ direction }, className)}
        disabled={disabled}
        isActive={isActive}
        theme={theme}
        onClick={onClick}
    >
        <ArrowRightIcon className={cn('icon')} />
    </PaginationButton>
);

PaginationNavigation.propTypes = {
    direction: PropTypes.oneOf(['left', 'right']),
    theme: PropTypes.oneOf(['default', 'light']),
    disabled: PropTypes.bool,
    isActive: PropTypes.bool,
    className: PropTypes.string,
    dataAttrs: PropTypes.shape({
        root: PropTypes.objectOf(PropTypes.string.isRequired),
    }),
    onClick: PropTypes.func,
};

export default PaginationNavigation;
