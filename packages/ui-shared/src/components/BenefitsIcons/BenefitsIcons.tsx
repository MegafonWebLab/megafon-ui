import * as React from 'react';
import PropTypes from 'prop-types';
import './style/BenefitsIcons.less';
import { Grid, GridColumn } from '@megafon/ui-core';
import { cnCreate, breakpoints } from '@megafon/ui-helpers';
import BenefitsIconsTile from './BenefitsIconsTile';
import { GridConfig, IconPositionEnum, IconPosition, IBenefit, ItemsAlignType, ItemsAlignEnum } from './types';
import throttle from 'lodash.throttle';
import throttleTime from 'constants/throttleTime';

export interface IBenefitsIcons {
    /** Ссылка на корневой элемент */
    rootRef?: React.Ref<HTMLDivElement>;
    /** Позиция иконки */
    iconPosition?: IconPosition;
    /** Выстраивать бенефиты в одну колонку вне зависимости от количества */
    inOneColumn?: boolean;
    /** Список бенефитов */
    items: IBenefit[];
    /** Дополнительный css класс для корневого элемента */
    className?: string;
    /** Дополнительные css классы для корневого и внутренних элементов */
    classes?: {
        root?: string;
        item?: string;
        grid?: string;
        gridColumn?: string;
    };
}

// left-aligned column with left side icon,
const getLeftSideConfig = (count: number, index: number): GridConfig => {
    const everySecondWithoutOffset = index % 2 ? '1' : undefined;
    const columnSize: GridConfig = { wide: '4', desktop: '5', tablet: '10' };

    switch (count) {
        case 2:
        case 4:
            return {
                ...columnSize,
                leftOffsetWide: everySecondWithoutOffset,
                leftOffsetDesktop: everySecondWithoutOffset,
            };

        default:
            return {
                ...columnSize,
                leftOffsetDesktop: everySecondWithoutOffset,
            };
    }
};

// left-aligned column with left-aligned icon on top
const getLeftTopConfig = (count: number, index: number): GridConfig => {
    const everySecondWithoutOffset = index % 2 ? '1' : undefined;
    const everyThirdWithoutOffset = index % 3 ? '1' : undefined;

    switch (count) {
        case 2:
            return {
                wide: '4',
                desktop: '4',
                tablet: '5',
                leftOffsetWide: everySecondWithoutOffset,
                leftOffsetDesktop: everySecondWithoutOffset,
                leftOffsetTablet: everySecondWithoutOffset,
            };

        case 4:
            return {
                wide: '3',
                desktop: '4',
                tablet: '5',
                leftOffsetDesktop: everySecondWithoutOffset,
                leftOffsetTablet: everySecondWithoutOffset,
            };

        default:
            return {
                wide: '3',
                desktop: '4',
                tablet: '5',
                leftOffsetWide: everyThirdWithoutOffset,
                leftOffsetTablet: everySecondWithoutOffset,
            };
    }
};

// center-aligned column with center-aligned icon on top
const getCenterTopConfig = (count: number, index: number): GridConfig => {
    const isEvenIndex = !(index % 2);
    const everyEvenWithLeftOffset = isEvenIndex ? '1' : undefined;
    const everyOddWithRightOffset = isEvenIndex ? undefined : '1';

    switch (count) {
        case 4:
            return {
                wide: '3',
                desktop: '5',
                tablet: '5',
                leftOffsetDesktop: everyEvenWithLeftOffset,
                leftOffsetTablet: everyEvenWithLeftOffset,
                rightOffsetTablet: everyOddWithRightOffset,
                rightOffsetDesktop: everyOddWithRightOffset,
            };

        default:
            return {
                wide: '4',
                desktop: '4',
                tablet: '4',
            };
    }
};

const getOneColumnConfig = (iconPosition: IconPosition): GridConfig =>
    iconPosition !== IconPositionEnum.CENTER_TOP
        ? { wide: '10', desktop: '10', tablet: '10' }
        : { wide: '12', desktop: '12', tablet: '12' };

const getMultiColumnConfig = (iconPosition: IconPosition, count: number, index: number): GridConfig => {
    switch (iconPosition) {
        case IconPositionEnum.LEFT_TOP:
            return getLeftTopConfig(count, index);

        case IconPositionEnum.CENTER_TOP:
            return getCenterTopConfig(count, index);

        default:
            return getLeftSideConfig(count, index);
    }
};

const cn = cnCreate('mfui-beta-benefits-icons');
const BenefitsIcons: React.FC<IBenefitsIcons> = ({
    rootRef,
    iconPosition = IconPositionEnum.LEFT_TOP,
    inOneColumn = false,
    items,
    className,
    classes = {},
}) => {
    const [itemsAlign, setItemsAlign] = React.useState<ItemsAlignType>(
        iconPosition === IconPositionEnum.CENTER_TOP ? 'center' : 'left',
    );
    const [localIconPosition, setLocalIconPosition] = React.useState(iconPosition);

    const resizeHandler = React.useCallback(() => {
        if (window.innerWidth <= breakpoints.MOBILE_MIDDLE_END) {
            setItemsAlign(ItemsAlignEnum.CENTER);
            setLocalIconPosition(IconPositionEnum.CENTER_TOP);
        } else {
            setItemsAlign(ItemsAlignEnum.LEFT);
            setLocalIconPosition(iconPosition);
        }
    }, [iconPosition]);

    React.useEffect(() => {
        const resizeHandlerThrottled = throttle(resizeHandler, throttleTime.resize);

        if (inOneColumn) {
            resizeHandler();
            window.addEventListener('resize', resizeHandlerThrottled);
        }

        return () => {
            window.removeEventListener('resize', resizeHandlerThrottled);
        };
    }, [iconPosition, inOneColumn, resizeHandler]);

    return (
        <div className={cn([className, classes.root])} ref={rootRef}>
            <div className={cn('inner')}>
                <Grid className={classes.grid} guttersLeft="medium" hAlign={itemsAlign}>
                    {items.map(({ title, text, icon }, i) => {
                        const columnConfig = inOneColumn
                            ? getOneColumnConfig(iconPosition)
                            : getMultiColumnConfig(iconPosition, items.length, i);

                        return (
                            <GridColumn className={classes.gridColumn} key={i} {...columnConfig}>
                                <BenefitsIconsTile
                                    className={classes.item}
                                    title={title}
                                    text={text}
                                    icon={icon}
                                    iconPosition={localIconPosition}
                                />
                            </GridColumn>
                        );
                    })}
                </Grid>
            </div>
        </div>
    );
};

BenefitsIcons.propTypes = {
    rootRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.oneOfType([PropTypes.shape({ current: PropTypes.elementType }), PropTypes.any]),
    ]),
    iconPosition: PropTypes.oneOf(Object.values(IconPositionEnum)),
    inOneColumn: PropTypes.bool,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
            text: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
            icon: PropTypes.node.isRequired,
        }).isRequired,
    ).isRequired,
    className: PropTypes.string,
    classes: PropTypes.shape({
        root: PropTypes.string,
        item: PropTypes.string,
    }),
};

export default BenefitsIcons;
