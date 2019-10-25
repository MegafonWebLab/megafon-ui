import * as React from 'react';
import * as PropTypes from 'prop-types';
import './GridColumn.less';
import cnCreate from 'utils/cn';

const cn = cnCreate('mfui-grid-column');
class GridColumn extends React.Component {
    static propTypes = {
        wide: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        desktop: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        tablet: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        mobile: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        align: PropTypes.oneOf(['right', 'left', 'center']),
        grow: PropTypes.bool,
        flex: PropTypes.boolean,
        all: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.element),
            PropTypes.element,
            PropTypes.string,
        ]),
    };

    static defaultProps = {
        all: 12,
        flex: false,
        grow: false,
    };

    render() {
        const { all, wide, desktop, tablet, className, flex, grow, align, children, mobile } = this.props;

        return (
            <div
                className={cn(
                    '',
                    {
                        flex,
                        grow,
                        align,
                        all,
                        wide,
                        desktop,
                        tablet,
                        mobile,
                    },
                    className
                )}
            >
                {children}
            </div>
        );
    }
}

export default GridColumn;
