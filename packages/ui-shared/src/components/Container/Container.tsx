import * as React from 'react';
import PropTypes from 'prop-types';
import './Container.less';
import { cnCreate, ContentArea } from '@megafon/ui-core';

export const BackgroundColors = {
    DEFAULT: 'default',
    LIGHT_GRAY: 'light-gray',
    GRAY: 'gray',
    GREEN: 'green',
    PURPLE: 'purple',
} as const;

type BackgroundColorType = typeof BackgroundColors[keyof typeof BackgroundColors];

type Props = {
    /** Дополнительный класс корневого элемента */
    className?: string;
    /** Цвет фона */
    backgroundColor?: BackgroundColorType;
};

const cn = cnCreate('mfui-beta-container');
const Container: React.FC<Props> = ({ backgroundColor = 'default', className, children }) =>
    (
        <div className={cn({'bg-color': backgroundColor}, [className])}>
            <ContentArea>
                {children}
            </ContentArea>
        </div>
    );

Container.propTypes = {
    className: PropTypes.string,
    backgroundColor: PropTypes.oneOf(Object.values(BackgroundColors)),
};

export default Container;
