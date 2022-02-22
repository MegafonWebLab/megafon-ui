import React, { Ref } from 'react';
import { Header, Grid, GridColumn } from '@megafon/ui-core';
import { cnCreate, filterDataAttrs } from '@megafon/ui-helpers';
import PropTypes from 'prop-types';
import './Property.less';
import PropertyDescription from './PropertyDescription';
import { Item } from './types';

type GridColumnPropsType = React.ComponentProps<typeof GridColumn>;
type GridColumnConfigType = Pick<GridColumnPropsType, 'all' | 'wide' | 'desktop' | 'tablet' | 'mobile'>;

export interface IProperty {
    /** Ссылка на корневой элемент */
    rootRef?: Ref<HTMLDivElement>;
    /** Массив с данными для строки */
    items: Item[];
    /** Дополнительный класс для основного контейнера */
    className?: string;
    /** Текст для бейджа */
    badge?: string;
    /** Наличие нижней границы */
    borderBottom?: boolean;
    /** Единое значение для всей строки */
    mergedValue?: string;
    /** Иконка для строки */
    icon?: React.ReactNode;
    /** Растягивание компонента на всю доступную ширину */
    fullWidth?: boolean;
    /** Дополнительные data атрибуты к внутренним элементам */
    dataAttrs?: {
        root?: Record<string, string>;
        moreLink?: Record<string, string>;
    };
    /** Дополнительные классы для внутренних элементов */
    classes?: {
        title?: string;
        openedDescription?: string;
        toggleDescription?: string;
    };
}

const cn = cnCreate('mfui-property');
const Property: React.FC<IProperty> = ({
    rootRef,
    items,
    className,
    badge = '',
    icon,
    borderBottom = false,
    mergedValue = '',
    fullWidth = false,
    classes = {},
    dataAttrs,
}) => {
    const renderTitle = React.useCallback(
        title =>
            title &&
            title.map((titleItem, i) => (
                <Header as="h5" key={i} className={classes.title}>
                    {icon && i === 0 && <div className={cn('icon')}>{icon}</div>}
                    {titleItem}
                </Header>
            )),
        [classes.title, icon],
    );

    const renderDescription = React.useCallback(
        description =>
            description &&
            description.map(({ value, isCollapsible }, j) => (
                <div className={cn('desc')} key={j}>
                    <PropertyDescription
                        value={value}
                        isCollapsible={isCollapsible}
                        dataAttrs={{ moreLink: dataAttrs?.moreLink }}
                        classes={{ open: classes.openedDescription, toggle: classes.toggleDescription }}
                    />
                </div>
            )),
        [classes.openedDescription, classes.toggleDescription, dataAttrs?.moreLink],
    );

    const getColumnConfig = React.useCallback(
        (): GridColumnConfigType =>
            fullWidth ? { all: '12' } : { wide: '8', desktop: '10', tablet: '12', mobile: '12' },
        [fullWidth],
    );

    return (
        <div
            className={cn({ 'border-bottom': borderBottom }, [className])}
            ref={rootRef}
            {...filterDataAttrs(dataAttrs?.root)}
        >
            <Grid>
                <GridColumn {...getColumnConfig()}>
                    <div className={cn('wrapper')}>
                        {badge && (
                            <div className={cn('badge-wrapper')}>
                                <span className={cn('badge')}>{badge}</span>
                            </div>
                        )}
                        <div className={cn('content')}>
                            <div className={cn('items-wrapper')}>
                                {items.map(({ title, value, description }, i) => (
                                    <div className={cn('item')} key={i}>
                                        <div className={cn('inner')}>
                                            {renderTitle(title)}
                                            {renderDescription(description)}
                                        </div>
                                        {!mergedValue && (
                                            <div className={cn('value-wrapper')}>
                                                {value && <span className={cn('value')}>{value}</span>}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            {mergedValue && (
                                <div className={cn('value-wrapper', { merged: true })}>
                                    <Header as="h3">{mergedValue}</Header>
                                </div>
                            )}
                        </div>
                    </div>
                </GridColumn>
            </Grid>
        </div>
    );
};

Property.propTypes = {
    rootRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.oneOfType([PropTypes.shape({ current: PropTypes.elementType }), PropTypes.any]),
    ]),
    items: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.node)]),
            description: PropTypes.arrayOf(
                PropTypes.shape({
                    value: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.node)]).isRequired,
                    isCollapsible: PropTypes.bool,
                }),
            ),
            value: PropTypes.string,
        }).isRequired,
    ).isRequired,
    className: PropTypes.string,
    badge: PropTypes.string,
    borderBottom: PropTypes.bool,
    mergedValue: PropTypes.string,
    icon: PropTypes.node,
    fullWidth: PropTypes.bool,
    dataAttrs: PropTypes.shape({
        root: PropTypes.objectOf(PropTypes.string.isRequired),
        moreLink: PropTypes.objectOf(PropTypes.string.isRequired),
    }),
    classes: PropTypes.shape({
        title: PropTypes.string,
        openedDescription: PropTypes.string,
        toggleDescription: PropTypes.string,
    }),
};

export default Property;
