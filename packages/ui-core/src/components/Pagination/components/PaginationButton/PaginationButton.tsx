import React from 'react';
import { cnCreate, filterDataAttrs } from '@megafon/ui-helpers';
import PropTypes from 'prop-types';
import './PaginationButton.less';

type ValueType = string | number;

export interface IPaginationButtonProps {
    disabled?: boolean;
    isActive?: boolean;
    theme?: 'default' | 'light';
    value?: ValueType;
    className?: string;
    dataAttrs?: {
        root?: Record<string, string>;
    };
    onClick?: (value?: ValueType) => void;
}

const cn = cnCreate('mfui-pagination-button');
const PaginationButton: React.FC<IPaginationButtonProps> = ({
    disabled = false,
    isActive = false,
    theme = 'default',
    className,
    children,
    onClick,
    value,
    dataAttrs,
}) => {
    const handleClick = () => {
        onClick && onClick(value);
    };

    return (
        <button
            {...filterDataAttrs(dataAttrs?.root)}
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
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    dataAttrs: PropTypes.shape({
        root: PropTypes.objectOf(PropTypes.string.isRequired),
    }),
    onClick: PropTypes.func,
};

export default PaginationButton;
