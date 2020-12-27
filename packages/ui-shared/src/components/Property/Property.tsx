import * as React from 'react';
import PropTypes from 'prop-types';
import { Header, cnCreate, convert } from '@megafon/ui-core';
import './Property.less';
import { Item } from './types';
import PropertyDescription from './PropertyDescription';

export interface IProperty {
    items: Item[];
    className?: string;
    badge?: string;
    borderBottom?: boolean;
    mergedValue?: string;
    icon?: React.ReactNode;
    multirow?: boolean;
}

const cn = cnCreate('mfui-beta-property');
const Property: React.FC<IProperty> = ({
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
                    {convert(titleItem)}
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
        <div className={cn({ 'border-bottom': borderBottom }, [className])}>
            {badge && <span className={cn('badge')}>{badge}</span>}
            {items.map(({ title, value, description }, i) => (
                <div className={cn('item', { multirow })} key={i}>
                    <div className={cn('inner')}>
                        {renderTitle(title)}
                        {renderDescription(description)}
                    </div>
                    {value && !mergedValue && <Header as="h3">{value}</Header>}

                    {mergedValue && i === 0 && (
                        <div className={cn('merged-value')}>
                            <Header as="h3">{mergedValue}</Header>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

Property.propTypes = {
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
