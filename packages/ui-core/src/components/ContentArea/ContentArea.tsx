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

export interface IConrentAreaProps {
    /** Дополнительный класс корневого элемента */
    className?: string;
    /** Цвет заднего фона внешнего контейнера */
    outerBackgroundColor?: BackgroundColorType;
    /** Цвет заднего фона внутреннего контейнера */
    innerBackgroundColor?: BackgroundColorType;
    /** Внутренние отступы */
    innerPadding?: 'default' | 'none';
    /** Внутренние отступы на мобильном разрешении */
    mobileInnerPadding?: 'default' | 'none';
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
        innerPadding: PropTypes.oneOf(['default', 'none']),
        mobileInnerPadding: PropTypes.oneOf(['default', 'none']),
        children: PropTypes.node,
        className: PropTypes.string,
    };

    static defaultProps = {
        outerBackgroundColor: 'transparent',
        innerBackgroundColor: 'transparent',
        innerPadding: 'default',
        mobileInnerPadding: 'default',
    };

    render() {
        const {
            outerBackgroundColor,
            innerBackgroundColor,
            innerPadding,
            mobileInnerPadding,
            children,
            className,
        } = this.props;

        return (
            <div className={cn({ color: outerBackgroundColor }, className)}>
                <div
                    className={cn('inner', {
                        padding: innerPadding,
                        'mobile-padding': mobileInnerPadding,
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
