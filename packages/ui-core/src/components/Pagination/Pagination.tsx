import React from 'react';
import PropTypes from 'prop-types';
import { cnCreate } from '@megafon/ui-helpers';
import './Pagination.less';
import PaginationNavigation from './components/PaginationNavigation/PaginationNavigation';
import PaginationButtons from './components/PaginationButtons/PaginationButtons';
import usePagination, { Button } from './usePagination';

interface IPagination {
    /** Общее количество страниц */
    totalPages: number;
    /** Номер текущей страницы */
    activePage: number;
    /** Тема компонента */
    theme?: 'default' | 'light';
    /** Обработчик изменения активной страницы */
    onChange: (value: number) => void;
}

const cn = cnCreate('mfui-beta-pagination');
const Pagination: React.FC<IPagination> = ({
    totalPages,
    activePage,
    theme = 'default',
    onChange,
}) => {
    const paginationItems = usePagination(totalPages, activePage);

    const handleBackClick = React.useCallback(() => {
        onChange(activePage - 1);
    }, [activePage]);

    const handleNextClick = React.useCallback(() => {
        onChange(activePage + 1);
    }, [activePage]);

    const handlePageButtonClick = React.useCallback(value => {
        onChange(value);
    }, []);

    return (
        <div className={cn()}>
            <PaginationNavigation
                direction="left"
                isDisabled={activePage === Button.FIRST}
                onClick={handleBackClick}
                className={cn('button')}
                theme={theme}
            />
            <PaginationButtons
                items={paginationItems}
                activeButton={activePage}
                hiddenButton={Button.HIDDEN}
                theme={theme}
                onClick={handlePageButtonClick}
            />
            <PaginationNavigation
                isDisabled={activePage === totalPages}
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
    onChange: PropTypes.func.isRequired,
};

export default Pagination;
