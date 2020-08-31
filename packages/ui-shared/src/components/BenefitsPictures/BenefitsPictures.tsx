import * as React from 'react';
import throttle from 'lodash.throttle';
import './BenfitsPictures.less';
import { cnCreate, Grid, GridColumn, Header, Paragraph } from '@megafon/ui-core';
import { IBenefit, GridConfig, GridGutterSize } from './types';

const DESKTOP_MIDDLE_START = 1280;
const THROTTLE_TIME = 500;

export interface IBenefitsPictures {
    /** Benefits list */
    items: IBenefit[];
    /** Benefits horizontal align */
    hAlign?: 'left' | 'center';
    /** Grid gap size */
    gridGap: GridGutterSize;
    /** Image horizontal align */
    hAlignImg?: 'left' | 'center';
}

const columnSize: GridConfig = {
    wide: '4',
    desktop: '4',
    tablet: '5',
};

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

const getCenterConfig = (count: number, index: number, gutterSize: string ): GridConfig => {

    if (gutterSize === 'medium') {
        switch (count) {
            case 3:
                return {
                    ...columnSize,
                };

            case 4:
                return {
                    ...columnSize,
                    // wide
                    rightOffsetWide: getOddOffset(index),
                    leftOffsetWide: getEvenOffset(index),
                    // desktop
                    rightOffsetDesktop: getEvenOffset(index),
                    leftOffsetDesktop: getOddOffset(index),
                    // tablet
                    rightOffsetTablet: getEvenOffset(index),
                    leftOffsetTablet: getOddOffset(index),
                };

            default:
                return {
                    ...columnSize,
                    // wide
                    rightOffsetWide: getOddOffset(index),
                    leftOffsetWide: getEvenOffset(index),
                };
        }
    }

    switch (count) {
        case 4:
            return {
                ...columnSize,
                // wide
                leftOffsetWide: getOddOffset(index),
                rightOffsetWide: getEvenOffset(index),
                // desktop
                leftOffsetDesktop: getOddOffset(index),
                rightOffsetDesktop: getEvenOffset(index),
                // tablet
                leftOffsetTablet: getOddOffset(index),
                rightOffsetTablet: getEvenOffset(index),
            };

        case 3: {
            return {
                ...columnSize,
                // tablet
                leftOffsetTablet: getOddOffset(index),
            };
        }

        default:
            return {
                ...columnSize,
            };
    }
};

const cn = cnCreate('benefits-pictures');
const BenefitsPictures: React.FC<IBenefitsPictures> = ({
    items,
    hAlign = 'left',
    gridGap = 'large',
    hAlignImg = 'left',
}) => {
    const isLargeGutter = gridGap === 'large';
    const [currentGutter, setCurrentGutter] = React.useState(gridGap);

    const resizeHandler = () => {
        if (!isLargeGutter) {
            return;
        }

        if (window.innerWidth < DESKTOP_MIDDLE_START) {
            setCurrentGutter('medium');
        } else {
            setCurrentGutter('large');
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
                hAlign={hAlign === 'center' && items.length !== 3 ? 'center' : 'left'}
            >
                {items.map(({img, title, text}, index) =>
                    <GridColumn
                        {...hAlign === 'left'
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
