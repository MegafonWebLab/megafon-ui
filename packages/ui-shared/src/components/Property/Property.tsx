import React, { Ref } from 'react';
import PropTypes from 'prop-types';
import {Header, cnCreate, convert, TextLink} from '@megafon/ui-core';
import './Property.less';
import { Item } from './types';
import PropertyDescription from './PropertyDescription';

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
    /** Несколько рядов в строке */
    multirow?: boolean;
}

const typographyConfig = {
    a: {
        component: TextLink,
        props: ['href', 'target'],
    },
};

const cn = cnCreate('mfui-beta-property');
const Property: React.FC<IProperty> = ({
    rootRef,
    items,
    className,
    badge = '',
    icon,
    borderBottom = false,
    mergedValue = '',
    multirow = false,
}) => {
    const renderTitle = React.useCallback(
        title =>
            title &&
            title.map((titleItem, i) => (
                <Header as={'h5'} key={i}>
                    {icon && i === 0 && (
                        <div className={cn('icon')}>{icon}</div>
                    )}
                    {convert(titleItem, typographyConfig)}
                </Header>
            )),
        []
    );

    const renderDescription = React.useCallback(
        description =>
            description &&
            description.map((descriptionItem, j) => (
                <div className={cn('desc')} key={j}>
                    <PropertyDescription {...descriptionItem} />
                </div>
            )),
        []
    );

    return (
        <div className={cn({ 'border-bottom': borderBottom }, [className])} ref={rootRef}>
            {badge && (
                <div className={cn('badge-wrapper')}>
                    <span className={cn('badge')}>{badge}</span>
                </div>
            )}
            <div className={cn('content')}>
                <div className={cn('items-wrapper')}>
                    {items.map(({ title, value, description }, i) => (
                        <div className={cn('item', { multirow })} key={i}>
                            <div className={cn('inner')}>
                                {renderTitle(title)}
                                {renderDescription(description)}
                            </div>
                            {
                                !mergedValue && (
                                    <div className={cn('value-wrapper')}>
                                        {value &&  (
                                            <Header as="h3">{value}</Header>
                                        )}
                                    </div>
                                )
                            }
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
    );
};

Property.propTypes = {
    rootRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.oneOfType([PropTypes.shape({ current: PropTypes.elementType }), PropTypes.any ]),
    ]),
    items: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.arrayOf(PropTypes.string.isRequired),
            description: PropTypes.arrayOf(
                PropTypes.shape({
                    value: PropTypes.arrayOf(PropTypes.string).isRequired,
                    isCollapsible: PropTypes.bool,
                })
            ),
            value: PropTypes.string,
        }).isRequired
    ).isRequired,
    className: PropTypes.string,
    badge: PropTypes.string,
    borderBottom: PropTypes.bool,
    mergedValue: PropTypes.string,
    icon: PropTypes.node,
    multirow: PropTypes.bool,
};

export default Property;
