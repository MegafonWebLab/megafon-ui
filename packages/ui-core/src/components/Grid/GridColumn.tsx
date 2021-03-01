import * as React from 'react';
import * as PropTypes from 'prop-types';
import './GridColumn.less';
import cnCreate from 'utils/cnCreate';

const GridSizeValues = PropTypes.oneOf(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']);
export type TGridSizeValues = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';

export interface IGridColumn {
    /** Размер колон на разрещении 1280+ */
    wide?: TGridSizeValues;
    /** Размер колон на разрещении 1024 - 1279 */
    desktop?: TGridSizeValues;
    /** Размер колон на разрещении 768 - 1023 */
    tablet?: TGridSizeValues;
    /** Размер колон на разрещении 767- */
    mobile?: TGridSizeValues;
    /** Размер колон на всех разрешениях */
    all?: TGridSizeValues;

    /** Порядок на разрещении 1280+ */
    orderWide?: string;
    /** Порядок на разрещении 1024 - 1279 */
    orderDesktop?: string;
    /** Порядок на разрещении 768 - 1023 */
    orderTablet?: string;
    /** Порядок на разрещении 767- */
    orderMobile?: string;
    /** Порядок на всех разрешениях */
    orderAll?: string;

    /** Размер левого смещения на 1280+ */
    leftOffsetWide?: TGridSizeValues;
    /** Размер левого смещения на 1024 - 1279  */
    leftOffsetDesktop?: TGridSizeValues;
    /** Размер левого смещения на 768 - 1023 */
    leftOffsetTablet?: TGridSizeValues;
    /** Размер левого смещения на 767- */
    leftOffsetMobile?: TGridSizeValues;
    /** Размер левого смещения на всех разрешениях */
    leftOffsetAll?: TGridSizeValues;

    /** Размер правого смещения на 1280+ */
    rightOffsetWide?: TGridSizeValues;
    /** Размер правого смещения на 1024 - 1279 */
    rightOffsetDesktop?: TGridSizeValues;
    /** Размер правого смещения на 768 - 1023 */
    rightOffsetTablet?: TGridSizeValues;
    /** Размер правого смещения на 767- */
    rightOffsetMobile?: TGridSizeValues;
    /** Размер правого смещения на всех разрешениях */
    rightOffsetAll?: TGridSizeValues;

    /** Дополнительное выравние колонны */
    align?: 'right' | 'left' | 'center';
    /** Flex grow колонны */
    grow?: boolean;
    /** Сделать колонну флекс контейнером */
    flex?: boolean;
    /** Дополнительный класс корневого элемента */
    className?: string;
    children: React.ReactNode | JSX.Element | JSX.Element[];
}

const cn = cnCreate('mfui-beta-grid-column');
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

        leftOffsetWide: GridSizeValues,
        leftOffsetDesktop: GridSizeValues,
        leftOffsetTablet: GridSizeValues,
        leftOffsetMobile: GridSizeValues,
        leftOffsetAll: GridSizeValues,

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
            leftOffsetAll,
            leftOffsetWide,
            leftOffsetDesktop,
            leftOffsetTablet,
            leftOffsetMobile,
            rightOffsetAll,
            rightOffsetWide,
            rightOffsetDesktop,
            rightOffsetTablet,
            rightOffsetMobile,
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
                        'left-offset-all': leftOffsetAll,
                        'left-offset-wide': leftOffsetWide,
                        'left-offset-desktop': leftOffsetDesktop,
                        'left-offset-tablet': leftOffsetTablet,
                        'left-offset-mobile': leftOffsetMobile,
                        'right-offset-all': rightOffsetAll,
                        'right-offset-wide': rightOffsetWide,
                        'right-offset-desktop': rightOffsetDesktop,
                        'right-offset-tablet': rightOffsetTablet,
                        'right-offset-mobile': rightOffsetMobile,
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
