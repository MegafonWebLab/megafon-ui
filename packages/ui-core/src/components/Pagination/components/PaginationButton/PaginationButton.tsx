import React from 'react';
import { cnCreate } from '@megafon/ui-helpers';
import PropTypes from 'prop-types';
import './PaginationButton.less';

type ValueType = string | number;

export interface IPaginationButton {
    disabled?: boolean;
    isActive?: boolean;
    theme?: 'default' | 'light';
    className?: string;
    onClick?: (value?: ValueType) => void;
    value?: ValueType;
}

const cn = cnCreate('mfui-beta-pagination-button');
const PaginationButton: React.FC<IPaginationButton> = ({
    disabled = false,
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
            className={cn({ active: isActive, theme }, className)}
            disabled={disabled}
            onClick={handleClick}
            type="button"
        >
            {children}
        </button>
    );
};

PaginationButton.propTypes = {
    disabled: PropTypes.bool,
    isActive: PropTypes.bool,
    theme: PropTypes.oneOf(['default', 'light']),
    className: PropTypes.string,
    onClick: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default PaginationButton;
