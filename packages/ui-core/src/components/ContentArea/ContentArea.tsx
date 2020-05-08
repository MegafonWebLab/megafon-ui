import * as React from 'react';
import * as PropTypes from 'prop-types';
import './ContentArea.less';
import cnCreate from 'utils/cnCreate';

export interface IProps {
    /** Background color of the external container */
    outerBackgroundColor?:
        | 'white'
        | 'transparent'
        | 'green'
        | 'purple'
        | 'light-gray'
        | 'gray'
        | 'dark-gray'
        | 'asphalt'
        | 'black';
    /** Background color of the internal container */
    innerBackgroundColor?:
        | 'white'
        | 'transparent'
        | 'green'
        | 'purple'
        | 'light-gray'
        | 'gray'
        | 'dark-gray'
        | 'asphalt'
        | 'black';
    /** Side paddings of the internal container */
    innerPadding?: 'default' | 'none';
    /** Side paddings of the internal container on mobile screen */
    mobileInnerPadding?: 'default' | 'none';
    children: any;
    className?: string;
}

const cn = cnCreate('mfui-content-area');
class ContentArea extends React.Component<IProps, {}> {
    static propTypes = {
        outerBackgroundColor: PropTypes.oneOf([
            'white',
            'transparent',
            'green',
            'purple',
            'light-gray',
            'gray',
            'dark-gray',
            'asphalt',
            'black',
        ]),
        innerBackgroundColor: PropTypes.oneOf([
            'white',
            'transparent',
            'green',
            'purple',
            'light-gray',
            'gray',
            'dark-gray',
            'asphalt',
            'black',
        ]),
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
