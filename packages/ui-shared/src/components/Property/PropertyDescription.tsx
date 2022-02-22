/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import * as React from 'react';
import { Collapse } from '@megafon/ui-core';
import { cnCreate, filterDataAttrs } from '@megafon/ui-helpers';
import PropTypes from 'prop-types';
import './PropertyDescription.less';
import { Desc } from './types';

const cn = cnCreate('mfui-property-description');
const PropertyDescription: React.FC<Desc> = ({ value, isCollapsible = false, classes = {}, dataAttrs }) => {
    const [isOpened, setIsOpened] = React.useState(false);

    const handleClickDesc = React.useCallback(() => setIsOpened(!isOpened), [isOpened]);

    if (isCollapsible) {
        return (
            <div className={cn([isOpened ? classes.open : undefined])}>
                <span
                    onClick={handleClickDesc}
                    {...filterDataAttrs(dataAttrs?.moreLink)}
                    className={cn('collapse', classes.toggle)}
                >
                    {isOpened ? 'Скрыть' : 'Подробнее'}
                </span>
                <Collapse className={cn('content')} classNameContainer={cn('content-inner')} isOpened={isOpened}>
                    {value}
                </Collapse>
            </div>
        );
    }

    return <div className={cn()}>{value}</div>;
};

PropertyDescription.propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.node)]).isRequired,
    isCollapsible: PropTypes.bool,
    classes: PropTypes.shape({
        open: PropTypes.string,
        toggle: PropTypes.string,
    }),
    dataAttrs: PropTypes.shape({
        moreLink: PropTypes.objectOf(PropTypes.string.isRequired),
    }),
};

export default PropertyDescription;
