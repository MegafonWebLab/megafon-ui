import * as React from 'react';
import { useCallback } from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash.throttle';
import './BenfitsPictures.less';
import { cnCreate, Grid, GridColumn, Header, Paragraph, breakpoints } from '@megafon/ui-core';
import { IBenefit, GridConfig, GridGutterSize } from './types';

const THROTTLE_TIME = 500;
const ONLY_LEFT_ALIGN_ITEMS_COUNT = 3;

const columnSize: GridConfig = {
    wide: '4',
    desktop: '4',
    tablet: '5',
};

export interface IBenefitsPicturesProps {
    /** Данные для бенефитов */
    items: IBenefit[];
    /** Горизонтальное выравнивание */
    hAlign?: 'left' | 'center';
    /** Расстояние между бенефитами */
    gridGap?: GridGutterSize;
}

const isEvenIndex = index => !((index + 1) % 2);
const getEvenOffset = index =>  isEvenIndex(index) ? '1' : undefined;
const getOddOffset = index => isEvenIndex(index) ? undefined : '1';

const getLeftConfig = (count: number, index: number): GridConfig => {
    switch (count) {
        case 2:
        case 4:
            return {
                ...columnSize,
                leftOffsetWide: getEvenOffset(index),
                leftOffsetDesktop: getEvenOffset(index),
                leftOffsetTablet: getEvenOffset(index),
            };

        default:
            return {
                ...columnSize,
                leftOffsetTablet: getEvenOffset(index),
            };
    }
};

const getCenterMediumConfig = (count: number, index: number): GridConfig => {
    switch (count) {
        case 3:
            return {
                ...columnSize,
                leftOffsetTablet: getOddOffset(index),
            };

        case 4:
            return {
                ...columnSize,
                rightOffsetWide: getOddOffset(index),
                leftOffsetWide: getEvenOffset(index),
                rightOffsetDesktop: getEvenOffset(index),
                leftOffsetDesktop: getOddOffset(index),
                rightOffsetTablet: getEvenOffset(index),
                leftOffsetTablet: getOddOffset(index),
            };

        default:
            return {
                ...columnSize,
                rightOffsetWide: getOddOffset(index),
                leftOffsetWide: getEvenOffset(index),
            };
    }
};

const getCenterLargeConfig = (count: number, index: number): GridConfig => {
    switch (count) {
        case 4:
            return {
                ...columnSize,
                leftOffsetWide: getOddOffset(index),
                rightOffsetWide: getEvenOffset(index),
                leftOffsetDesktop: getOddOffset(index),
                rightOffsetDesktop: getEvenOffset(index),
                leftOffsetTablet: getOddOffset(index),
                rightOffsetTablet: getEvenOffset(index),
            };

        case 3: {
            return {
                ...columnSize,
                leftOffsetTablet: getOddOffset(index),
            };
        }

        default:
            return {
                ...columnSize,
            };
    }
};

const getCenterConfig = (count: number, index: number, gutterSize: string): GridConfig => {
    switch (gutterSize) {
        case 'medium': {
            return getCenterMediumConfig(count, index);
        }

        default: {
            return getCenterLargeConfig(count, index);
        }
    }
};

const cn = cnCreate('mfui-beta-benefits-pictures');
const BenefitsPictures: React.FC<IBenefitsPicturesProps> = ({
    items,
    hAlign = 'left',
    gridGap = 'large',
}) => {
    const isLargeGutter = gridGap === 'large';
    const isGridCenterAlign = hAlign === 'center' && items.length !== ONLY_LEFT_ALIGN_ITEMS_COUNT;
    const [currentGutter, setCurrentGutter] = React.useState(gridGap);

    const resizeHandler = useCallback(
        () => {
            if (!isLargeGutter) {
                return;
            }

            if (window.innerWidth < breakpoints.desktopMiddleStart) {
                setCurrentGutter('medium');
            } else {
                setCurrentGutter('large');
            }
        }, []
    );

    React.useEffect(() => {
        const throttledResizeHandler = throttle(resizeHandler, THROTTLE_TIME);

        resizeHandler();
        window.addEventListener('resize', throttledResizeHandler);

        return () => window.removeEventListener('resize', throttledResizeHandler);
    }, []);

    return (
        <div className={cn()}>
            <Grid
                guttersLeft={currentGutter}
                hAlign={isGridCenterAlign ? 'center' : 'left'}
            >
                {items.map(({ img, title, text }, index) =>
                    <GridColumn
                        {...hAlign === 'left'
                            ? getLeftConfig(items.length, index)
                            : getCenterConfig(items.length, index, gridGap)}
                        key={index}
                    >
                        <div className={cn('item')}>
                            <img className={cn('img', { 'h-align': hAlign })}
                                 src={img}
                                 alt=""
                            />
                            <Header className={cn('title')} hAlign={hAlign} as="h3">{title}</Header>
                            <Paragraph align={hAlign}>{text}</Paragraph>
                        </div>
                    </GridColumn>
                )}
            </Grid>
        </div>
    );
};

BenefitsPictures.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
            img: PropTypes.string.isRequired,
        }).isRequired
    ).isRequired,
    hAlign: PropTypes.oneOf(['left', 'center']),
    gridGap: PropTypes.oneOf(['medium', 'large']),
};

export default BenefitsPictures;
