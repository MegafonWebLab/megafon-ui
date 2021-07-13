import React, { Ref } from 'react';
import PropTypes from 'prop-types';
import './Container.less';
import { ContentArea } from '@megafon/ui-core';
import { cnCreate } from '@megafon/ui-helpers';

export const BackgroundColors = {
    DEFAULT: 'default',
    LIGHT_GRAY: 'light-gray',
    GRAY: 'gray',
    GREEN: 'green',
    PURPLE: 'purple',
} as const;

type BackgroundColorType = typeof BackgroundColors[keyof typeof BackgroundColors];

type Props = {
    /** Атрибут корневого тега */
    id?: string;
    /** Ссылка на корневой элемент */
    rootRef?: Ref<HTMLDivElement>;
    /** Дополнительный класс корневого элемента */
    className?: string;
    /** Цвет фона */
    backgroundColor?: BackgroundColorType;
    /** Отключить отступ сверху */
    disablePaddingTop?: boolean;
    /** Отключить отступ снизу */
    disablePaddingBottom?: boolean;
};

const cn = cnCreate('mfui-beta-container');
const Container: React.FC<Props> = ({
    backgroundColor = 'default',
    rootRef,
    id,
    className,
    children,
    disablePaddingTop,
    disablePaddingBottom,
}) =>
    (
        <div className={cn({'bg-color': backgroundColor, 'disable-padding-top': disablePaddingTop, 'disable-padding-bottom': disablePaddingBottom }, [className])} ref={rootRef} id={id}>
            <ContentArea>
                {children}
            </ContentArea>
        </div>
    );

Container.propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    backgroundColor: PropTypes.oneOf(Object.values(BackgroundColors)),
    rootRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.oneOfType([PropTypes.shape({ current: PropTypes.elementType }), PropTypes.any ]),
    ]),
    disablePaddingTop: PropTypes.bool,
    disablePaddingBottom: PropTypes.bool,
};

export default Container;
