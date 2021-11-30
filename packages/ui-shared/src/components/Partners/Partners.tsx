import * as React from 'react';
import { Grid, GridColumn, Tile, Carousel } from '@megafon/ui-core';
import { breakpoints, cnCreate, filterDataAttrs } from '@megafon/ui-helpers';
import * as PropTypes from 'prop-types';
import './Partners.less';

export type ItemType = {
    src: string;
    href?: string;
    alt: string;
};

export interface IPartnersProps {
    /** Ссылка на корневой элемент */
    rootRef?: React.Ref<HTMLDivElement>;
    /** Дополнительные классы для корневого и внутренних элементов */
    classes?: {
        root?: string;
        itemClass?: string;
    };
    /** Дата атрибуты для корневого элемента */
    dataAttrs?: { [key: string]: string };
    /** Дополнительный класс корневого элемента */
    className?: string;
    /** Список логотипов */
    items: ItemType[];
    /** Обработчик клика по стрелке вперед (должен быть обернут в useCallback) */
    onNextClick?: (index: number) => void;
    /** Обработчик клика по стрелке назад (должен быть обернут в useCallback) */
    onPrevClick?: (index: number) => void;
    /** Обработчик смены слайда (должен быть обернут в useCallback) */
    onChange?: (currentIndex: number, previousIndex: number, slidesPerView?: number | 'auto') => void;
}

const MAX_GRID_ITEMS_LENGTH = 8;

const slidesSettings = {
    [breakpoints.MOBILE_SMALL_START]: {
        slidesPerView: 2,
        spaceBetween: 16,
    },
    [breakpoints.MOBILE_MIDDLE_START]: {
        slidesPerView: 3,
        spaceBetween: 20,
    },
    [breakpoints.DESKTOP_SMALL_START]: {
        slidesPerView: 4,
        spaceBetween: 20,
    },
};

const cn = cnCreate('mfui-partners');
const Partners: React.FC<IPartnersProps> = ({
    rootRef,
    classes: { root, itemClass } = {},
    dataAttrs,
    className,
    items,
    onChange,
    onNextClick,
    onPrevClick,
}) => {
    const renderItem = React.useCallback(
        (item?: ItemType) => {
            if (!item) {
                return null;
            }

            const { src, href, alt } = item;

            return (
                <Tile className={cn('tile')} href={href} shadowLevel="low" isInteractive={!!href}>
                    <div className={cn('tile-inner', [itemClass])}>
                        <div className={cn('img-wrapper')}>
                            <img src={src} alt={alt} className={cn('tile-img')} />
                        </div>
                    </div>
                </Tile>
            );
        },
        [itemClass],
    );

    const renderGrid = React.useCallback(
        () => (
            <Grid guttersLeft="medium" guttersBottom="medium">
                {items.map((item, i) => (
                    <GridColumn key={i + item.src} all="3" mobile="6">
                        {renderItem(item)}
                    </GridColumn>
                ))}
            </Grid>
        ),
        [items, renderItem],
    );

    const renderCarousel = React.useCallback(() => {
        const halfItemsLength = Math.ceil(items.length / 2);
        const topRow = items.slice(0, halfItemsLength);
        const bottomRow = items.slice(halfItemsLength);

        return (
            <Carousel
                slidesSettings={slidesSettings}
                onChange={onChange}
                onNextClick={onNextClick}
                onPrevClick={onPrevClick}
            >
                {topRow.map((item, i) => (
                    <div key={i + item.src} className={cn('slide')}>
                        {renderItem(item)}
                        {renderItem(bottomRow[i])}
                    </div>
                ))}
            </Carousel>
        );
    }, [items, onChange, onNextClick, onPrevClick, renderItem]);

    return (
        <div ref={rootRef} className={cn([root, className])} {...filterDataAttrs(dataAttrs)}>
            {items.length > MAX_GRID_ITEMS_LENGTH ? renderCarousel() : renderGrid()}
        </div>
    );
};

Partners.propTypes = {
    rootRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.oneOfType([PropTypes.shape({ current: PropTypes.elementType }), PropTypes.any]),
    ]),
    classes: PropTypes.shape({
        root: PropTypes.string,
        itemClass: PropTypes.string,
    }),
    dataAttrs: PropTypes.objectOf(PropTypes.string.isRequired),
    className: PropTypes.string,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            href: PropTypes.string,
            src: PropTypes.string.isRequired,
            alt: PropTypes.string.isRequired,
        }).isRequired,
    ).isRequired,
    onChange: PropTypes.func,
    onNextClick: PropTypes.func,
    onPrevClick: PropTypes.func,
};

export default Partners;
