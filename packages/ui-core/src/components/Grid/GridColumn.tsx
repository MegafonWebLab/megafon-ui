import * as React from 'react';
import * as PropTypes from 'prop-types';
import './GridColumn.less';
import cnCreate from 'utils/cn';

export interface IGridColumn {
    /** Size of columns on wide screens */
    wide?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';
    /** Size of columns on desktop screens */
    desktop?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';
    /** Size of columns on tablet screens */
    tablet?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';
    /** Size of columns on mobile screens */
    mobile?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';
    /** Size of columns on all screens */
    all?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';
    /** Order on all screens */
    orderAll?: string;
    /** Order on wide screens */
    orderWide?: string;
    /** Order on desktop screens */
    orderDesktop?: string;
    /** Order on tablet screens */
    orderTablet?: string;
    /** Order on mobile screens */
    orderMobile?: string;
    /** Custom alignment of column */
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
        desktop: PropTypes.oneOf(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']),
        tablet: PropTypes.oneOf(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']),
        mobile: PropTypes.oneOf(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']),
        all: PropTypes.oneOf(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']),
        orderAll: PropTypes.string,
        orderWide: PropTypes.string,
        orderDesktop: PropTypes.string,
        orderTablet: PropTypes.string,
        orderMobile: PropTypes.string,
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
        all: '12',
        flex: false,
        grow: false,
        orderWide: '0',
        orderDesktop: '0',
        orderTablet: '0',
        orderMobile: '0',
        orderAll: '0',
    };

    render() {
        const {
            all, wide, desktop, tablet, mobile,
            orderAll, orderWide, orderDesktop, orderTablet, orderMobile,
            className, flex, grow, align, children,
        } = this.props;

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
                        'all-order': orderAll,
                        'wide-order': orderWide,
                        'desktop-order': orderDesktop,
                        'tablet-order': orderTablet,
                        'mobile-order': orderMobile,
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
