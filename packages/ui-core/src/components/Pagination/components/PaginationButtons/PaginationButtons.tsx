/* eslint-disable import/no-unresolved */
/* eslint-disable react/no-array-index-key */
import { cnCreate } from '@megafon/ui-helpers';
import PaginationButton from 'components/Pagination/components/PaginationButton/PaginationButton';
import NothingIcon from 'icons/Basic/16/Nothing_16.svg';
import PropTypes from 'prop-types';
import React from 'react';
import './PaginationButtons.less';

interface IPaginationButtons {
    items: Array<string | number>;
    theme?: 'default' | 'light';
    activeButton: number;
    hiddenButton: string;
    onClick: (value?: number | string) => void;
}

const cn: (param1?: string) => string = cnCreate('mfui-beta-pagination-buttons');
const PaginationButtons: React.FC<IPaginationButtons> = ({ items, theme, onClick, activeButton, hiddenButton }) => (
    <div className={cn()}>
        {items.map((pageNumber, index) => {
            const isHiddenButton = hiddenButton === pageNumber;

            if (isHiddenButton) {
                return (
                    <PaginationButton className={cn('button')} isDisabled key={index} theme={theme}>
                        <NothingIcon />
                    </PaginationButton>
                );
            }

            const isActive = pageNumber === activeButton;

            return (
                <PaginationButton
                    isActive={isActive}
                    key={index}
                    className={cn('button')}
                    onClick={onClick}
                    value={pageNumber}
                    theme={theme}
                >
                    {pageNumber}
                </PaginationButton>
            );
        })}
    </div>
);

PaginationButtons.propTypes = {
    items: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired).isRequired,
    theme: PropTypes.oneOf(['default', 'light']),
    activeButton: PropTypes.number.isRequired,
    hiddenButton: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default PaginationButtons;
