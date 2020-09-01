import * as React from 'react';
import throttle from 'lodash.throttle';
import './BenfitsPictures.less';
import { cnCreate, Grid, GridColumn, Header, Paragraph } from '@megafon/ui-core';
import { IBenefit, GridConfig, GridGutterSize } from './types';
import { DESKTOP_MIDDLE_START } from '../../../../ui-core/src/constants/breakpoints';

const THROTTLE_TIME = 500;

const columnSize: GridConfig = {
    wide: '4',
    desktop: '4',
    tablet: '5',
};

export enum GutterSize {
    MEDIUM = 'medium',
    LARGE = 'large',
}

export enum HorizontalAlign {
    CENTER = 'center',
    LEFT = 'left',
}

export interface IBenefitsPictures {
    /** Benefits list */
    items: IBenefit[];
    /** Benefits horizontal align */
    hAlign?: 'left' | 'center';
    /** Grid gap size */
    gridGap: GridGutterSize;
    /** Image horizontal align */
    hAlignImg?: HorizontalAlign;
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

const getCenterConfig = (count: number, index: number, gutterSize: string ): GridConfig => {
    switch (gutterSize) {
        case 'medium': {
            return getCenterMediumConfig(count, index);
        }

        default: {
            return getCenterLargeConfig(count, index);
        }
    }
};

const cn = cnCreate('benefits-pictures');
const BenefitsPictures: React.FC<IBenefitsPictures> = ({
    items,
    hAlign = 'left',
    gridGap = GutterSize.LARGE,
    hAlignImg = HorizontalAlign.LEFT,
}) => {
    const isLargeGutter = gridGap === GutterSize.LARGE;
    const [currentGutter, setCurrentGutter] = React.useState(gridGap);

    const resizeHandler = () => {
        if (!isLargeGutter) {
            return;
        }

        if (window.innerWidth < DESKTOP_MIDDLE_START) {
            setCurrentGutter(GutterSize.MEDIUM);
        } else {
            setCurrentGutter(GutterSize.LARGE);
        }
    };

    const ThrottledResizeHandler = throttle(resizeHandler, THROTTLE_TIME);

    React.useEffect(() => {
        resizeHandler();
        window.addEventListener('resize', ThrottledResizeHandler);

        return () => {
            window.removeEventListener('resize', ThrottledResizeHandler);
        };
    }, []);

    return (
        <div className={cn()}>
            <Grid
                guttersLeft={currentGutter}
                hAlign={
                    hAlign === HorizontalAlign.CENTER && items.length !== 3
                        ? HorizontalAlign.CENTER
                        : HorizontalAlign.LEFT
                }
            >
                {items.map(({img, title, text}, index) =>
                    <GridColumn
                        {...hAlign === HorizontalAlign.LEFT
                            ? getLeftConfig(items.length, index)
                            : getCenterConfig(items.length, index, gridGap)}
                        key={index}
                    >
                        <div className={cn('item')}>
                            <img className={cn('img', {
                                'h-align': hAlignImg,
                            })}
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

export default BenefitsPictures;
