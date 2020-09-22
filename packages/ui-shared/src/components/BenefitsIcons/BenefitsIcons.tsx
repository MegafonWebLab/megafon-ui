import * as React from 'react';
import PropTypes from 'prop-types';
import './style/BenefitsIcons.less';
import { cnCreate, Grid, GridColumn } from '@megafon/ui-core';
import BenefitsIconsTile from './BenefitsIconsTile';
import { GridConfig, IconPositionEnum, IBenefit } from './types';

export interface IBenefitsIcons {
    /** Icon position */
    iconPosition?: IconPositionEnum;
    /** Benefits list */
    items: IBenefit[];
    /** Custom className */
    className?: string;
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

const getColumnConfig = (iconPosition: IconPositionEnum, count: number, index: number) => {
    switch (iconPosition) {
        case IconPositionEnum.LEFT_TOP:
            return getLeftTopConfig(count, index);

        case IconPositionEnum.CENTER_TOP:
            return getCenterTopConfig(count, index);

        default:
            return getLeftSideConfig(count, index);
    }
};

const cn = cnCreate('mfui-benefits-icons');
const BenefitsIcons: React.FC<IBenefitsIcons> = ({
    iconPosition = IconPositionEnum.LEFT_TOP,
    items,
    className,
}) => {
    const hAlign = iconPosition === IconPositionEnum.CENTER_TOP ? 'center' : 'left';

    return (
        <div className={cn(className)}>
            <div className={cn('inner')}>
                <Grid guttersLeft="medium" hAlign={hAlign}>
                    {items.map(({ title, text, icon }, i) => (
                        <GridColumn {...getColumnConfig(iconPosition, items.length, i)} key={i}>
                            <BenefitsIconsTile
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
    iconPosition: PropTypes.oneOf(Object.values(IconPositionEnum)),
    items: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string,
            text: PropTypes.string,
            icon: PropTypes.node.isRequired,
        }).isRequired
    ).isRequired,
    className: PropTypes.string,
};

export default BenefitsIcons;
