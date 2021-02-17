import * as React from 'react';
import * as PropTypes from 'prop-types';
import throttle from 'lodash.throttle';
import { cnCreate, Grid, GridColumn, Carousel, breakpoints, throttleTime } from '@megafon/ui-core';
import { ICard } from '../Card/Card';

type SlidesSettingsType = Pick<React.ComponentProps<typeof Carousel>, 'slidesSettings'>['slidesSettings'];

const MAX_CARDS_COUNT_IN_GRID_ON_MOBILE = 2;

const SlidesSettings: SlidesSettingsType = {
    [breakpoints.mobileSmallStart]: {
        slidesPerView: 1,
        spaceBetween: 16,
    },
    [breakpoints.mobileBigStart]: {
        slidesPerView: 2,
        spaceBetween: 20,
    },
};

interface ICardsBoxProps {
    children: Array<React.ReactElement<ICard>> | React.ReactElement<ICard>;
}

const cn = cnCreate('mfui-beta-cards-box');
const CardsBox: React.FC<ICardsBoxProps> = ({ children }) => {
    const [isMobile, setIsMobile] = React.useState(false);
    const itemsCount = React.Children.count(children);
    const isRenderCarousel = isMobile && itemsCount > MAX_CARDS_COUNT_IN_GRID_ON_MOBILE;

    const renderGrid = React.useCallback(() => (
        <Grid guttersBottom="medium" guttersLeft="medium">
            {
                React.Children.map(children, child => (
                    <GridColumn all="4" mobile="12">
                        {child}
                    </GridColumn>
                ))
            }
        </Grid>
    ), [children]);

    const renderCarousel = React.useCallback(() => (
        <Carousel slidesSettings={SlidesSettings}>{children}</Carousel>
    ), [children]);

    React.useEffect(() => {
        const resizeHandler = () =>
            window.innerWidth <= breakpoints.mobileBigEnd ? setIsMobile(true) : setIsMobile(false);
        const resizeHandlerThrottled = throttle(resizeHandler, throttleTime.resize);

        resizeHandler();
        window.addEventListener('resize', resizeHandlerThrottled);

        return () => {
            window.removeEventListener('resize', resizeHandlerThrottled);
        };
    }, []);

    return (
        <div className={cn()}>
            {isRenderCarousel ? renderCarousel() : renderGrid()}
        </div>
    );
};

CardsBox.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element.isRequired),
        PropTypes.element,
    ]).isRequired,
};

export default CardsBox;
