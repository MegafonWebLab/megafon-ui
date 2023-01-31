import React from 'react';
import { cnCreate, filterDataAttrs } from '@megafon/ui-helpers';
import NothingIcon from '@megafon/ui-icons/basic-16-nothing_16.svg';
import PropTypes from 'prop-types';
import PaginationButton from 'components/Pagination/components/PaginationButton/PaginationButton';
import './PaginationButtons.less';

interface IPaginationButtonsProps {
    items: Array<string | number>;
    theme?: 'default' | 'light';
    activeButton: number;
    hiddenButton: string;
    dataAttrs?: {
        root?: Record<string, string>;
    };
    onClick: (value?: number | string) => void;
}

const cn = cnCreate('mfui-pagination-buttons');
const PaginationButtons: React.FC<IPaginationButtonsProps> = ({
    items,
    theme,
    onClick,
    activeButton,
    hiddenButton,
    dataAttrs,
}) => (
    <div className={cn()}>
        {items.map((pageNumber, index) => {
            const isHiddenButton: boolean = hiddenButton === pageNumber;
            const dataIndex: number | undefined = typeof pageNumber === 'number' ? pageNumber : undefined;

            if (isHiddenButton) {
                return (
                    <PaginationButton
                        disabled
                        key={index}
                        theme={theme}
                        className={cn('button')}
                        dataAttrs={{ root: { 'data-testid': 'hiddenButton' } }}
                    >
                        <NothingIcon />
                    </PaginationButton>
                );
            }

            const isActive: boolean = pageNumber === activeButton;

            return (
                <PaginationButton
                    dataAttrs={{ root: filterDataAttrs(dataAttrs?.root, dataIndex) }}
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
    dataAttrs: PropTypes.shape({
        root: PropTypes.objectOf(PropTypes.string.isRequired),
    }),
    onClick: PropTypes.func.isRequired,
};

export default PaginationButtons;
