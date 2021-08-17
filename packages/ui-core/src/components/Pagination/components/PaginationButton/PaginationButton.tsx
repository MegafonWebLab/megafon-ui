/* eslint-disable import/no-unresolved */
import { cnCreate } from '@megafon/ui-helpers';
import PropTypes from 'prop-types';
import React from 'react';
import './PaginationButton.less';

type ValueType = string | number;

export interface IPaginationButton {
    isDisabled?: boolean;
    isActive?: boolean;
    theme?: 'default' | 'light';
    className?: string;
    onClick?: (value?: ValueType) => void;
    value?: ValueType;
}

const cn: (param1?: Record<string, unknown>, param2?: string) => string = cnCreate('mfui-beta-pagination-button');
const PaginationButton: React.FC<IPaginationButton> = ({
    isDisabled = false,
    isActive = false,
    theme = 'default',
    className,
    children,
    onClick,
    value,
}) => {
    const handleClick = () => {
        onClick && onClick(value);
    };

    return (
        <button
            type="button"
            className={cn({ active: isActive, theme }, className)}
            disabled={isDisabled}
            onClick={handleClick}
        >
            {children}
        </button>
    );
};

PaginationButton.propTypes = {
    isDisabled: PropTypes.bool,
    isActive: PropTypes.bool,
    theme: PropTypes.oneOf(['default', 'light']),
    className: PropTypes.string,
    onClick: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default PaginationButton;
