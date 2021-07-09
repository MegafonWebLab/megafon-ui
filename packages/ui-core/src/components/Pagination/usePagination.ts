import React from 'react';
import getRange from './helpers';
import throttle from 'lodash.throttle';
import throttleTime from 'constants/throttleTime';

export const Button = {
    HIDDEN: 'HIDDEN',
    FIRST: 1,
};

const NeighbourCount = {
    MOBILE: 0,
    MAIN: 1,
};

const BUTTON_RATIO = 5;
const MOBILE_RESOLUTION = 360;

type GetItemsParamsType = {
    totalPages: number;
    activePage: number;
    maxButtonsCount: number;
    neighbourCount: number;
};

const getItems = ({ totalPages, activePage,  maxButtonsCount, neighbourCount }: GetItemsParamsType) => {
    const isMoreThenMaxBtnsCount = totalPages > maxButtonsCount;
    const lastPage = totalPages;

    if (!isMoreThenMaxBtnsCount) {
        return getRange(Button.FIRST, lastPage);
    }

    const hasLeftHiddenBtns = activePage > Math.ceil(maxButtonsCount / 2);
    const hasRightHiddenBtns = lastPage > activePage + neighbourCount + 2;

    switch (true) {
        case (!hasLeftHiddenBtns && hasRightHiddenBtns): {
            const range = getRange(Button.FIRST, maxButtonsCount - 2);

            return [...range, Button.HIDDEN, lastPage];
        }

        case (hasLeftHiddenBtns && !hasRightHiddenBtns): {
            const range = getRange(totalPages - (2 + 2 * neighbourCount), totalPages);

            return [Button.FIRST, Button.HIDDEN, ...range];
        }

        default: {
            const range = getRange(activePage - neighbourCount, activePage + neighbourCount);

            return [Button.FIRST, Button.HIDDEN, ...range, Button.HIDDEN, lastPage];
        }
    }
};

const usePagination = (totalPages: number, activePage: number) => {
    const [neighbourCount, setNeighbourCount] = React.useState(NeighbourCount.MAIN);
    const maxButtonsCount = 2 * neighbourCount + BUTTON_RATIO;
    const paginationItems = getItems({
        totalPages,
        activePage,
        maxButtonsCount,
        neighbourCount,
    });

    React.useEffect(() => {
        const handleResize = () => {
            const isMobile = window.innerWidth < MOBILE_RESOLUTION;
            const value = isMobile ? NeighbourCount.MOBILE : NeighbourCount.MAIN;

            setNeighbourCount(value);
        };

        handleResize();

        const handleResizeThrottled = throttle(handleResize, throttleTime.resize);

        window.addEventListener('resize', handleResizeThrottled);

        return () => {
            window.removeEventListener('resize', handleResizeThrottled);
        };
    }, []);

    return paginationItems;
};

export default usePagination;
