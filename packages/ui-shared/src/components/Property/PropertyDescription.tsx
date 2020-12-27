import * as React from 'react';
import PropTypes from 'prop-types';
import { cnCreate, Collapse, Paragraph, convert } from '@megafon/ui-core';
import './PropertyDescription.less';
import { Desc } from './types';

const cn = cnCreate('mfui-beta-property-description');
const PropertyDescription: React.FC<Desc> = ({
    value,
    isCollapsible = false,
}) => {
    const [isOpened, setIsOpened] = React.useState(false);

    const handleClickDesc = React.useCallback(() => setIsOpened(!isOpened), [
        isOpened,
    ]);

    const renderDescriptionItems = React.useCallback(
        () => (
            value.map((valueItem, i) => (
                <Paragraph hasMargin={false} key={i}>
                    {convert(valueItem)}
                </Paragraph>
            ))
        ),
        [value]
    );

    if (isCollapsible) {
        return (
            <div className={cn()}>
                <span className={cn('collapse')} onClick={handleClickDesc}>
                    {isOpened ? 'Скрыть' : 'Подробнее'}
                </span>
                <Collapse
                    className={cn('content')}
                    classNameContainer={cn('content-inner')}
                    isOpened={isOpened}
                >
                    {renderDescriptionItems()}
                </Collapse>
            </div>
        );
    } else {
        return <div className={cn()}>{renderDescriptionItems()}</div>;
    }
};

PropertyDescription.propTypes = {
    value: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    isCollapsible: PropTypes.bool,
};

export default PropertyDescription;
