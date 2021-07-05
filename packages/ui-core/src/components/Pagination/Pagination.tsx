import React from 'react';
import PropTypes from 'prop-types';
import cnCreate from 'utils/cnCreate';
import './Pagination.less';
import PaginationNavigation from 'components/Pagination/components/PaginationNavigation/PaginationNavigation';
import PaginationButtons from 'components/Pagination/components/PaginationButtons/PaginationButtons';
import usePagination, { Button } from './usePagination';

interface IPagination {
    /** Общее количество страниц */
    totalPages: number;
    /** Номер текущей страницы */
    activePage: number;
    /** Тема компонента */
    theme?: 'black' | 'white';
    /** Обработчик изменения активной страницы */
    onChange: (value: number) => void;
}

const cn = cnCreate('mfui-beta-pagination');
const Pagination: React.FC<IPagination> = ({
    totalPages,
    activePage,
    theme = 'black',
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
    theme: PropTypes.oneOf(['black', 'white']),
    onChange: PropTypes.func.isRequired,
};

export default Pagination;
