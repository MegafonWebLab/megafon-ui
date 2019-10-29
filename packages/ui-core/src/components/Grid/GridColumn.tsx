import * as React from 'react';
import * as PropTypes from 'prop-types';
import './GridColumn.less';
import cnCreate from 'utils/cn';

export interface IGridColumn {
    /** Size of columns on wide screens */
    wide?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';
    /** Size of columns on desktop */
    desktop?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';
    /** Size of columns on tablet */
    tablet?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';
    /** Size of columns on mobile */
    mobile?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';
    /** Size of columns on all screens */
    all?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';
    /** Align columns */
    align?: 'right' | 'left' | 'center';
    /** Column flex grow */
    grow?: boolean;
    /** Column as flex container */
    flex?: boolean;
    /** Custom class name */
    className?: string;
    children: JSX.Element[] | Element[] | JSX.Element | string | Element;
}

const cn = cnCreate('mfui-grid-column');
class GridColumn extends React.Component<IGridColumn, {}> {
    static propTypes = {
        wide: PropTypes.oneOf(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']),
        desktop: PropTypes.oneOfType(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']),
        tablet: PropTypes.oneOfType(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']),
        mobile: PropTypes.oneOfType(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']),
        all: PropTypes.oneOfType(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']),
        align: PropTypes.oneOf(['right', 'left', 'center']),
        grow: PropTypes.bool,
        flex: PropTypes.bool,
        className: PropTypes.string,
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
