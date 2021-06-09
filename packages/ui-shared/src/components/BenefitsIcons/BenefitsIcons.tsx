import * as React from 'react';
import PropTypes from 'prop-types';
import './style/BenefitsIcons.less';
import { cnCreate, Grid, GridColumn } from '@megafon/ui-core';
import BenefitsIconsTile from './BenefitsIconsTile';
import { GridConfig, IconPositionEnum, IconPosition, IBenefit } from './types';

export interface IBenefitsIcons {
    /** Ссылка на корневой элемент */
    rootRef?: React.Ref<HTMLDivElement>;
    /** Позиция иконки */
    iconPosition?: IconPosition;
    /** Список бенефитов */
    items: IBenefit[];
    /** Дополнительный css класс для корневого элемента */
    className?: string;
    /** Дополнительные css классы для корневого и внутренних элементов */
    classes?: {
        root?: string;
        item?: string;
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

const getColumnConfig = (iconPosition: IconPosition, count: number, index: number) => {
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
    iconPosition = 'left-top',
    items,
    className,
    classes = {},
}) => {
    const hAlign = iconPosition === IconPositionEnum.CENTER_TOP ? 'center' : 'left';

    return (
        <div className={cn([className, classes.root])} ref={rootRef}>
            <div className={cn('inner')}>
                <Grid guttersLeft="medium" hAlign={hAlign}>
                    {items.map(({ title, text, icon }, i) => (
                        <GridColumn {...getColumnConfig(iconPosition, items.length, i)} key={i}>
                            <BenefitsIconsTile
                                className={classes.item}
                                title={title}
                                text={text}
                                icon={icon}
                                iconPosition={iconPosition}
                            />
                        </GridColumn>
                    ))}
                </Grid>
            </div>
        </div>
    );
};

BenefitsIcons.propTypes = {
    rootRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.oneOfType([PropTypes.shape({ current: PropTypes.elementType }), PropTypes.any ]),
    ]),
    iconPosition: PropTypes.oneOf(Object.values(IconPositionEnum)),
    items: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string,
            text: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
            icon: PropTypes.node.isRequired,
        }).isRequired
    ).isRequired,
    className: PropTypes.string,
    classes: PropTypes.shape({
        root: PropTypes.string,
        item: PropTypes.string,
    }),
};

export default BenefitsIcons;
