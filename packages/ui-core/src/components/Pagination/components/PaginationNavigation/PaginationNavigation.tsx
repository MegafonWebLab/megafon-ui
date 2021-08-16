/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { cnCreate } from '@megafon/ui-helpers';
import ArrowRightIcon from 'icons/System/24/Arrow_right_24.svg';
import PropTypes from 'prop-types';
import React from 'react';
import './PaginationNavigation.less';
import PaginationButton from '../PaginationButton/PaginationButton';

interface IPaginationNavigation {
    direction?: 'left' | 'right';
    theme?: 'default' | 'light';
    isDisabled?: boolean;
    isActive?: boolean;
    className?: string;
    onClick?: (value?: number | string) => void;
}

const cn: (param1?: string | Record<string, unknown>, param2?: string) => string = cnCreate(
    'mfui-beta-pagination-navigation',
);
const PaginationNavigation: React.FC<IPaginationNavigation> = ({
    direction = 'right',
    theme,
    isDisabled,
    isActive,
    onClick,
    className,
}) => (
    <PaginationButton
        className={cn({ direction }, className)}
        isDisabled={isDisabled}
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
    isDisabled: PropTypes.bool,
    isActive: PropTypes.bool,
    className: PropTypes.string,
    onClick: PropTypes.func,
};

export default PaginationNavigation;
