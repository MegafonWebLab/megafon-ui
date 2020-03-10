import * as React from 'react';
import * as PropTypes from 'prop-types';
import './ContentArea.less';
import cnCreate from 'utils/cn';

export interface IProps {
    /** Background color of the external container */
    outerBackgroundColor?: 'white' | 'transparent';
    /** Background color of the internal container */
    innerBackgroundColor?: 'white' | 'transparent';
    /** Side paddings of the internal container */
    innerPadding?: 'lg' | 'none';
    /** Side paddings of the internal container on mobile screen */
    mobileInnerPadding?: 'default' | 'none';
    children: any;
    className?: string;
}

const cn = cnCreate('mfui-content-area');
class ContentArea extends React.Component<IProps, {}> {
    static propTypes = {
        outerBackgroundColor: PropTypes.oneOf(['white', 'transparent']),
        innerBackgroundColor: PropTypes.oneOf(['white', 'transparent']),
        innerPadding: PropTypes.oneOf(['lg', 'none']),
        mobileInnerPadding: PropTypes.oneOf(['default', 'none' ]),
        children: PropTypes.node,
        className: PropTypes.string,
    };

    static defaultProps = {
        outerBackgroundColor: 'transparent',
        innerBackgroundColor: 'transparent',
        innerPadding: 'lg',
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
