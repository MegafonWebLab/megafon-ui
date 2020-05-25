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
    /** Background color of the external container */
    outerBackgroundColor?: BackgroundColorType;
    /** Background color of the internal container */
    innerBackgroundColor?: BackgroundColorType;
    /** Side paddings of the internal container */
    innerPadding?: 'default' | 'none';
    /** Side paddings of the internal container on mobile screen */
    mobileInnerPadding?: 'default' | 'none';
    /** Custom class name for an external content area block */
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

const cn = cnCreate('mfui-content-area');
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
