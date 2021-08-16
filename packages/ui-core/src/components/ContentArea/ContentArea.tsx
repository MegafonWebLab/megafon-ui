/* eslint-disable import/no-unresolved */
import { cnCreate } from '@megafon/ui-helpers';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import './ContentArea.less';

export type BackgroundColorType =
    | 'white'
    | 'transparent'
    | 'green'
    | 'purple'
    | 'spbSky0'
    | 'spbSky1'
    | 'spbSky2'
    | 'freshAsphalt'
    | 'fullBlack';

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

const BACKGROUND_COLORS = [
    'white',
    'transparent',
    'green',
    'purple',
    'spbSky0',
    'spbSky1',
    'spbSky2',
    'freshAsphalt',
    'fullBlack',
];
const cn: (
    param1?: string | Record<string, unknown>,
    param2?: Record<string, unknown> | (string | undefined)[] | string,
    param3?: string,
) => string = cnCreate('mfui-beta-content-area');
// eslint-disable-next-line react/prefer-stateless-function
class ContentArea extends React.Component<IConrentAreaProps> {
    static propTypes = {
        outerBackgroundColor: PropTypes.oneOf(BACKGROUND_COLORS),
        innerBackgroundColor: PropTypes.oneOf(BACKGROUND_COLORS),
        disableIndents: PropTypes.oneOf(Object.values(DisableIndents)),
        children: PropTypes.node,
        className: PropTypes.string,
        classes: PropTypes.shape({
            root: PropTypes.string,
            inner: PropTypes.string,
        }),
    };

    static defaultProps = {
        outerBackgroundColor: 'transparent',
        innerBackgroundColor: 'transparent',
    };

    render(): JSX.Element {
        const {
            outerBackgroundColor,
            innerBackgroundColor,
            disableIndents,
            children,
            className,
            classes = {},
        } = this.props;

        return (
            <div className={cn({ color: outerBackgroundColor }, [className, classes.root])}>
                <div
                    className={cn(
                        'inner',
                        {
                            'disable-indents': disableIndents,
                            color: innerBackgroundColor,
                        },
                        classes.inner,
                    )}
                >
                    {children}
                </div>
            </div>
        );
    }
}

export default ContentArea;
