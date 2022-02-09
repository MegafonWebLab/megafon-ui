import React from 'react';
import { cnCreate, filterDataAttrs } from '@megafon/ui-helpers';
import PropTypes from 'prop-types';
import './Pagination.less';
import PaginationButtons from './components/PaginationButtons/PaginationButtons';
import PaginationNavigation from './components/PaginationNavigation/PaginationNavigation';
import usePagination, { Button } from './usePagination';

interface IPaginationProps {
    /** Дополнительные data атрибуты к внутренним элементам */
    dataAttrs?: {
        root?: Record<string, string>;
        prev?: Record<string, string>;
        next?: Record<string, string>;
        button?: Record<string, string>;
    };
    /** Общее количество страниц */
    totalPages: number;
    /** Номер текущей страницы */
    activePage: number;
    /** Тема компонента */
    theme?: 'default' | 'light';
    /** Обработчик изменения активной страницы */
    onChange: (value: number) => void;
}

const cn = cnCreate('mfui-pagination');
const Pagination: React.FC<IPaginationProps> = ({ totalPages, activePage, dataAttrs, theme = 'default', onChange }) => {
    const paginationItems: React.ReactText[] = usePagination(totalPages, activePage);

    const handleBackClick = React.useCallback(() => {
        onChange(activePage - 1);
    }, [activePage, onChange]);

    const handleNextClick = React.useCallback(() => {
        onChange(activePage + 1);
    }, [activePage, onChange]);

    const handlePageButtonClick = React.useCallback(
        value => {
            onChange(value);
        },
        [onChange],
    );

    return (
        <div {...filterDataAttrs(dataAttrs?.root)} className={cn()}>
            <PaginationNavigation
                dataAttrs={{ root: dataAttrs?.prev }}
                direction="left"
                disabled={activePage === Button.FIRST}
                onClick={handleBackClick}
                className={cn('button')}
                theme={theme}
            />
            <PaginationButtons
                dataAttrs={{ root: dataAttrs?.button }}
                items={paginationItems}
                activeButton={activePage}
                hiddenButton={Button.HIDDEN}
                theme={theme}
                onClick={handlePageButtonClick}
            />
            <PaginationNavigation
                dataAttrs={{ root: dataAttrs?.next }}
                disabled={activePage === totalPages}
                onClick={handleNextClick}
                className={cn('button')}
                theme={theme}
            />
        </div>
    );
};

Pagination.propTypes = {
    totalPages: PropTypes.number.isRequired,
    activePage: PropTypes.number.isRequired,
    theme: PropTypes.oneOf(['default', 'light']),
    dataAttrs: PropTypes.shape({
        root: PropTypes.objectOf(PropTypes.string.isRequired),
        prev: PropTypes.objectOf(PropTypes.string.isRequired),
        next: PropTypes.objectOf(PropTypes.string.isRequired),
        button: PropTypes.objectOf(PropTypes.string.isRequired),
    }),
    onChange: PropTypes.func.isRequired,
};

export default Pagination;
