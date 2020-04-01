import * as React from 'react';
import * as PropTypes from 'prop-types';
import './GridColumn.less';
import cnCreate from 'utils/cn';

const GridSizeValues = PropTypes.oneOf(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']);
export type TGridSizeValues = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';

export interface IGridColumn {
    /** Size of columns on wide screens */
    wide?: TGridSizeValues;
    /** Size of columns on desktop screens */
    desktop?: TGridSizeValues;
    /** Size of columns on tablet screens */
    tablet?: TGridSizeValues;
    /** Size of columns on mobile screens */
    mobile?: TGridSizeValues;
    /** Size of columns on all screens */
    all?: TGridSizeValues;

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

    /** Size of offset on wide screens */
    offsetWide?: TGridSizeValues;
    /** Size of offset on desktop screens */
    offsetDesktop?: TGridSizeValues;
    /** Size of offset on tablet screens */
    offsetTablet?: TGridSizeValues;
    /** Size of offset on mobile screens */
    offsetMobile?: TGridSizeValues;
    /** Size of offset on all screens */
    offsetAll?: TGridSizeValues;

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
        wide: GridSizeValues,
        desktop: GridSizeValues,
        tablet: GridSizeValues,
        mobile: GridSizeValues,
        all: GridSizeValues,

        orderAll: PropTypes.string,
        orderWide: PropTypes.string,
        orderDesktop: PropTypes.string,
        orderTablet: PropTypes.string,
        orderMobile: PropTypes.string,

        offsetWide: GridSizeValues,
        offsetDesktop: GridSizeValues,
        offsetTablet: GridSizeValues,
        offsetMobile: GridSizeValues,
        offsetAll: GridSizeValues,

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
            all,
            wide,
            desktop,
            tablet,
            mobile,
            orderAll,
            orderWide,
            orderDesktop,
            orderTablet,
            orderMobile,
            offsetAll,
            offsetWide,
            offsetDesktop,
            offsetTablet,
            offsetMobile,
            className,
            flex,
            grow,
            align,
            children,
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
                        'offset-all': offsetAll,
                        'offset-wide': offsetWide,
                        'offset-desktop': offsetDesktop,
                        'offset-tablet': offsetTablet,
                        'offset-mobile': offsetMobile,
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
