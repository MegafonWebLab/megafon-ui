/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable no-magic-numbers */
import throttleTime from 'constants/throttleTime';
import { Grid, GridColumn, Header, Paragraph } from '@megafon/ui-core';
import { breakpoints, cnCreate } from '@megafon/ui-helpers';
import convert from 'htmr';
import throttle from 'lodash.throttle';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useCallback } from 'react';
import { IBenefit, GridConfig, GridGutterSize } from './types';
import './BenfitsPictures.less';

const ONLY_LEFT_ALIGN_ITEMS_COUNT = 3;

const columnSize: GridConfig = {
    wide: '4',
    desktop: '4',
    tablet: '5',
};

export interface IBenefitsPicturesProps {
    /** Ссылка на корневой элемент */
    rootRef?: React.Ref<HTMLDivElement>;
    /** Данные для бенефитов */
    items: IBenefit[];
    /** Горизонтальное выравнивание */
    hAlign?: 'left' | 'center';
    /** Расстояние между бенефитами */
    gridGap?: GridGutterSize;
    /** Дополнительный css класс для корневого элемента */
    className?: string;
    /** Дополнительные css классы для корневого и внутренних элементов */
    classes?: {
        root?: string;
        item?: string;
    };
}

const isEvenIndex = index => !((index + 1) % 2);
const getEvenOffset = index => (isEvenIndex(index) ? '1' : undefined);
const getOddOffset = index => (isEvenIndex(index) ? undefined : '1');

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
const cn: (
    param1?: (string | undefined)[] | string,
    param2?: string | (string | undefined)[] | Record<string, unknown>,
) => string = cnCreate('mfui-beta-breadcrumbs');
cnCreate('mfui-beta-benefits-pictures');
const BenefitsPictures: React.FC<IBenefitsPicturesProps> = ({
    items,
    hAlign = 'left',
    gridGap = 'large',
    rootRef,
    className,
    classes = {},
}) => {
    const isLargeGutter = gridGap === 'large';
    const isGridCenterAlign = hAlign === 'center' && items.length !== ONLY_LEFT_ALIGN_ITEMS_COUNT;
    const [currentGutter, setCurrentGutter] = React.useState(gridGap);

    const resizeHandler = useCallback(() => {
        if (!isLargeGutter) {
            return;
        }

        if (window.innerWidth < breakpoints.DESKTOP_MIDDLE_START) {
            setCurrentGutter('medium');
        } else {
            setCurrentGutter('large');
        }
    }, [isLargeGutter]);

    React.useEffect(() => {
        const throttledResizeHandler = throttle(resizeHandler, throttleTime.resize);

        resizeHandler();
        window.addEventListener('resize', throttledResizeHandler);

        return () => window.removeEventListener('resize', throttledResizeHandler);
    }, [resizeHandler]);

    return (
        <div className={cn([className, classes.root])} ref={rootRef}>
            <Grid guttersLeft={currentGutter} hAlign={isGridCenterAlign ? 'center' : 'left'}>
                {items.map(({ img, title, text }, index) => (
                    <GridColumn
                        // eslint-disable-next-line react/jsx-props-no-spreading
                        {...(hAlign === 'left'
                            ? getLeftConfig(items.length, index)
                            : getCenterConfig(items.length, index, gridGap))}
                        // eslint-disable-next-line react/no-array-index-key
                        key={index}
                    >
                        <div className={cn('item', [classes.item])}>
                            <img className={cn('img', { 'h-align': hAlign })} src={img} alt="" />
                            <Header className={cn('title')} hAlign={hAlign} as="h3">
                                {convert(title)}
                            </Header>
                            <Paragraph align={hAlign}>{convert(text)}</Paragraph>
                        </div>
                    </GridColumn>
                ))}
            </Grid>
        </div>
    );
};

BenefitsPictures.propTypes = {
    rootRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.oneOfType([PropTypes.shape({ current: PropTypes.elementType }), PropTypes.any]),
    ]),
    items: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
            img: PropTypes.string.isRequired,
        }).isRequired,
    ).isRequired,
    hAlign: PropTypes.oneOf(['left', 'center']),
    gridGap: PropTypes.oneOf(['medium', 'large']),
    className: PropTypes.string,
    classes: PropTypes.shape({
        root: PropTypes.string,
        item: PropTypes.string,
    }),
};

export default BenefitsPictures;
