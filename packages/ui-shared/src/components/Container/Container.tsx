import * as React from 'react';
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
    /** Цвет фона */
    backgroundColor?: BackgroundColorType;
};

const cn = cnCreate('mfui-beta-container');
const Container: React.FC<Props> = ({ backgroundColor = 'default', children }) =>
    (
        <div className={cn({'bg-color': backgroundColor})}>
            <ContentArea>
                {children}
            </ContentArea>
        </div>
    );

export default Container;
