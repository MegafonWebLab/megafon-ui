import * as React from 'react';
import * as PropTypes from 'prop-types';
import './ContentArea.less';
import cnCreate from 'utils/cnCreate';

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
    /** Сss класс для внешнего контейнера */
    className?: string;
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

const cn = cnCreate('mfui-beta-content-area');
class ContentArea extends React.Component<IConrentAreaProps> {
    static propTypes = {
        outerBackgroundColor: PropTypes.oneOf(BACKGROUND_COLORS),
        innerBackgroundColor: PropTypes.oneOf(BACKGROUND_COLORS),
        disableIndents: PropTypes.oneOf(Object.values(DisableIndents)),
        children: PropTypes.node,
        className: PropTypes.string,
    };

    static defaultProps = {
        outerBackgroundColor: 'transparent',
        innerBackgroundColor: 'transparent',
    };

    render() {
        const {
            outerBackgroundColor,
            innerBackgroundColor,
            disableIndents,
            children,
            className,
        } = this.props;

        return (
            <div className={cn({ color: outerBackgroundColor }, className)}>
                <div
                    className={cn('inner', {
                        'disable-indents': disableIndents,
                        color: innerBackgroundColor,
                    })}
                >
                    {children}
                </div>
            </div>
        );
    }
}

export default ContentArea;
