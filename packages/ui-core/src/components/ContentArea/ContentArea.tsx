import * as React from 'react';
import * as PropTypes from 'prop-types';
import './ContentArea.less';
import cnCreate from 'utils/cnCreate';

type ContentAreaBGColor =
| 'white'
| 'transparent'
| 'green'
| 'purple'
| 'spbSky0'
| 'spbSky1'
| 'spbSky2'
| 'soggyAsphalt'
| 'fullBlack';
export interface IProps {
    /** Background color of the external container */
    outerBackgroundColor?: ContentAreaBGColor;
    /** Background color of the internal container */
    innerBackgroundColor?: ContentAreaBGColor;
    /** Side paddings of the internal container */
    innerPadding?: 'default' | 'none';
    /** Side paddings of the internal container on mobile screen */
    mobileInnerPadding?: 'default' | 'none';
    children: any;
    className?: string;
}

const backgroundColors = [
    'white',
    'transparent',
    'green',
    'purple',
    'spbSky0',
    'spbSky1',
    'spbSky2',
    'soggyAsphalt',
    'fullBlack',
];
const cn = cnCreate('mfui-content-area');
class ContentArea extends React.Component<IProps, {}> {
    static propTypes = {
        outerBackgroundColor: PropTypes.oneOf(backgroundColors),
        innerBackgroundColor: PropTypes.oneOf(backgroundColors),
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
            <div className={cn('', { color: outerBackgroundColor }, className)}>
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
