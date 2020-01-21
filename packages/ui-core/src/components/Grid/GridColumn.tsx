import * as React from 'react';
import * as PropTypes from 'prop-types';
import './GridColumn.less';
import cnCreate from 'utils/cn';

const GridColumnValues = PropTypes.oneOf(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']);
export type TGridColumnValues  = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';

export interface IGridColumn {
    /** Size of columns on wide screens */
    wide?: TGridColumnValues;
    /** Size of columns on desktop screens */
    desktop?: TGridColumnValues;
    /** Size of columns on tablet screens */
    tablet?: TGridColumnValues;
    /** Size of columns on mobile screens */
    mobile?: TGridColumnValues;
    /** Size of columns on all screens */
    all?: TGridColumnValues;

    /** Size of offset on wide screens */
    offsetWide?: TGridColumnValues;
    /** Size of offset on desktop screens */
    offsetDesktop?: TGridColumnValues;
    /** Size of offset on tablet screens */
    offsetTablet?: TGridColumnValues;
    /** Size of offset on mobile screens */
    offsetMobile?: TGridColumnValues;
    /** Size of offset on all screens */
    offsetAll?: TGridColumnValues;

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
        wide: GridColumnValues,
        desktop: GridColumnValues,
        tablet: GridColumnValues,
        mobile: GridColumnValues,
        all: GridColumnValues,

        offsetWide: GridColumnValues,
        offsetDesktop: GridColumnValues,
        offsetTablet: GridColumnValues,
        offsetMobile: GridColumnValues,
        offsetAll: GridColumnValues,

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
    };

    render() {
        const {
            all,
            wide,
            desktop,
            tablet,
            mobile,
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
