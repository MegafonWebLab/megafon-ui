import * as React from 'react';
import * as PropTypes from 'prop-types';
import './ContentArea.less';
import cnCreate from 'utils/cn';

interface IProps {
    /** Background color of the external container */
    outerBackgroundColor?: 'white' | 'transparent';
    /** Background color of the internal container */
    innerBackgroundColor?: 'white' | 'transparent';
    /** Side paddings of th internal container */
    innerPadding?: 'lg' | 'none';
    children: any;
}

const cn = cnCreate('mfui-content-area');
class ContentArea extends React.Component<IProps, {}> {
    static propTypes = {
        outerBackgroundColor: PropTypes.oneOf(['white', 'transparent']),
        innerBackgroundColor: PropTypes.oneOf(['white', 'transparent']),
        innerPadding: PropTypes.oneOf(['lg', 'none']),
        children: PropTypes.node,
    };

    static defaultProps = {
        outerBackgroundColor: 'transparent',
        innerBackgroundColor: 'transparent',
        innerPadding: 'lg',
    };

    render() {
        const {
            outerBackgroundColor,
            innerBackgroundColor,
            innerPadding,
            children,
        } = this.props;

        return (
            <div className={cn('', { color: outerBackgroundColor })}>
                <div
                    className={cn('inner', {
                        padding: innerPadding,
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
