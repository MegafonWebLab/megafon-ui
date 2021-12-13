import * as React from 'react';
import { cnCreate } from '@megafon/ui-helpers';
import * as PropTypes from 'prop-types';
import './ContentArea.less';

const BACKGROUND_COLORS = {
    WHITE: 'white',
    TRANSPARENT: 'transparent',
    GREEN: 'green',
    PURPLE: 'purple',
    SPB_SKY_0: 'spbSky0',
    SPB_SKY_1: 'spbSky1',
    SPB_SKY_2: 'spbSky2',
    CONTENT: 'content',
    FULL_BLACK: 'fullBlack',
    /** @deprecated */
    FRESH_ASPHALT: 'freshAsphalt',
} as const;

export type BackgroundColorType = typeof BACKGROUND_COLORS[keyof typeof BACKGROUND_COLORS];

const DisableIndents = {
    MOBILE: 'mobile',
    MOBILE_TABLET: 'mobile-tablet',
    TABLET_DESKTOP: 'tablet-desktop',
    ALL: 'all',
} as const;

type DisableIndentsType = typeof DisableIndents[keyof typeof DisableIndents];

export interface IConrentAreaProps {
    /** Фоновый цвет внешнего контейнера */
    outerBackgroundColor?: BackgroundColorType;
    /** Фоновый цвет внутреннего контейнера */
    innerBackgroundColor?: BackgroundColorType;
    /** Отключение отступов на различных разрешениях */
    disableIndents?: DisableIndentsType;
    /** Дополнительные классы для корневого элемента */
    className?: string;
    /** Дополнительные классы для корневого и внутренних элементов */
    classes?: {
        root?: string;
        inner?: string;
    };
}

const cn = cnCreate('mfui-content-area');
const ContentArea: React.FC<IConrentAreaProps> = ({
    outerBackgroundColor,
    innerBackgroundColor,
    disableIndents,
    children,
    className,
    classes,
}) => (
    <div className={cn({ color: outerBackgroundColor }, [className, classes?.root])}>
        <div
            className={cn(
                'inner',
                {
                    'disable-indents': disableIndents,
                    color: innerBackgroundColor,
                },
                classes?.inner,
            )}
        >
            {children}
        </div>
    </div>
);

const colorsCustomPropTypes = (props, propName, componentName): Error | null => {
    const deprecatedValue = BACKGROUND_COLORS.FRESH_ASPHALT;
    const propValue = props[propName];

    if (propValue && !Object.values(BACKGROUND_COLORS).includes(propValue)) {
        return new Error(`Failed prop type: Invalid prop '${propName}' of value '${propValue}' supplied to '${componentName}', 
        expected one of [${Object.values(BACKGROUND_COLORS)}]`);
    }

    if (propValue && propValue === BACKGROUND_COLORS.FRESH_ASPHALT) {
        return new Error(`Failed prop type: Invalid prop '${propName}' of value '${propValue}' supplied to '${componentName}',
        value '${deprecatedValue}' is deprecated, please use value '${BACKGROUND_COLORS.CONTENT}'`);
    }

    return null;
};

ContentArea.propTypes = {
    disableIndents: PropTypes.oneOf(Object.values(DisableIndents)),
    className: PropTypes.string,
    classes: PropTypes.shape({
        root: PropTypes.string,
        inner: PropTypes.string,
    }),
    outerBackgroundColor: (props, propName, componentName) => colorsCustomPropTypes(props, propName, componentName),
    innerBackgroundColor: (props, propName, componentName) => colorsCustomPropTypes(props, propName, componentName),
};

ContentArea.defaultProps = {
    outerBackgroundColor: 'transparent',
    innerBackgroundColor: 'transparent',
};

export default ContentArea;
