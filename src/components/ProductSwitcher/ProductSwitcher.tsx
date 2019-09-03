import * as React from 'react';
import * as PropTypes from 'prop-types';
import { cnCreate } from '../../utils/cn';
import './ProductSwitcher.less';

interface IItem {
    title: string;
    value: string;
    unit: string;
}

interface IProductSwitcherProps {
    /** Class name */
    items: IItem[];
    /** Start index */
    startIndex?: number;
    /** Theme */
    theme?: 'tariff-showcase' | 'with-unit-values' | 'with-color-row';
    /** Custom class name */
    className: string;
    /** Change handler */
    onChange(e: React.SyntheticEvent<EventTarget>, value: string, index: number): boolean;
}

interface IProductSwitcherState {
    /** Current value */
    currentValue: string;
    currentIndex: number;
}

interface INearPoint {
    item: number;
    coord: number;
    value: string;
    title: string;
}

const cn = cnCreate('mfui-product-switcher');
class ProductSwitcher extends React.Component<IProductSwitcherProps, IProductSwitcherState> {
    static propTypes = {
        items: PropTypes.array.isRequired,
        startIndex: PropTypes.number,
        onChange: PropTypes.func,
        theme: PropTypes.oneOf(['tariff-showcase', 'with-unit-values', 'with-color-row']),
    };

    static defaultProps: Pick<IProductSwitcherProps, 'startIndex'> = {
        startIndex: 0,
    };

    itemNodes: object;
    rootNode: HTMLElement | null;
    pointerNode: HTMLElement | null;
    colorRowNode: HTMLElement | null;
    timer: number;
    rangeWrapperInfo: ClientRect | null;
    rowItemsInfo: INearPoint[];
    moveEvents = ['mousemove', 'touchmove'];
    leaveEvents = ['mouseleave', 'mouseup', 'touchend'];
    touchEvents = ['touchmove', 'touchend'];
    switcherStep: number;

    constructor(props: IProductSwitcherProps) {
        super(props);

        const { items, startIndex = 0 } = props;
        const safeStartIndex: number = this.getSafeStartIndex(startIndex, items);

        this.itemNodes = {};

        this.state = { currentValue: items[safeStartIndex].value, currentIndex: safeStartIndex };
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleWindowSize, true);
        this.getRangeWrapperCoords();
        this.getRowItemsInfo();
        this.movePointer(this.state.currentValue);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowSize, true);
    }

    componentDidUpdate(prevProps: IProductSwitcherProps) {
        const { startIndex = 0, items } = this.props;

        if (startIndex !== prevProps.startIndex) {
            const newIndex: number = this.getSafeStartIndex(startIndex, items);
            const newValue: string = items[newIndex].value;

            this.setState({
                currentValue: newValue,
                currentIndex: newIndex,
            });
            this.movePointer(newValue);
        }
    }

    getSafeStartIndex(startIndex: number, items: IItem[]): number {
        return startIndex <= items.length - 1 ? startIndex : 0;
    }

    handleWindowSize = () => {
        this.getRangeWrapperCoords();
        this.getRowItemsInfo();

        clearTimeout(this.timer);

        this.timer = window.setTimeout(() => {
            this.movePointer(this.state.currentValue);
        }, 300);
    }

    handleClickItem = (value: string, index: number) => (e: React.SyntheticEvent<EventTarget>) => {
        const { onChange } = this.props;
        const { currentValue } = this.state;
        e.preventDefault();

        if (!onChange || value === currentValue || onChange(e, value, index) === false) {
            return;
        }

        this.setState({ currentValue: value, currentIndex: index });
        this.movePointer(value);
    }

    handleMouseDown = () => {
        this.moveEvents.forEach(el => this.rootNode && this.rootNode.addEventListener(el, this.handleElementAction));
        this.leaveEvents.forEach(el => this.rootNode && this.rootNode.addEventListener(el, this.handleElementAction));
    }

    handleElementAction = (e: Event | React.TouchEvent | React.MouseEvent) => {
        e.preventDefault();

        const eventName = e.type;
        const isMoveEvent = this.moveEvents.some(el => el === eventName);

        return isMoveEvent ?
            this.handleMouseMove(this.touchEvents.some(el => el === eventName), e) :
            this.handleMouseLeave(this.touchEvents.some(el => el === eventName), e);
    }

    handleMouseMove = (isTouchEvent: boolean, e) => {
        const {
            left: startPoint = 0,
            right: endPoint = 0,
            width = 0,
        } = this.rangeWrapperInfo || {};
        const point = this.pointerNode;
        const colorRow = this.colorRowNode;
        const pointHalfWidth = point && point.offsetWidth / 2 || 0;
        const eventXCoord = isTouchEvent ? e.changedTouches[0].clientX : e.clientX;
        const eventYCoord = isTouchEvent ? e.changedTouches[0].clientY : e.screenY;

        if (!point) {
            return;
        }

        if (isTouchEvent) {
            this.getRangeWrapperCoords();

            const {
                left = 0,
                right = 0,
                top = 0,
                bottom = 0,
            } = this.rangeWrapperInfo || {};

            if ((eventXCoord < left || eventXCoord > right) || (eventYCoord < top || eventYCoord > bottom)) {
                this.handleMouseLeave(isTouchEvent, e);

                return;
            }
        }

        switch (true) {
            case eventXCoord < startPoint + pointHalfWidth:
                point.style.transform = 'translateX(0px)';
                break;
            case eventXCoord > endPoint - pointHalfWidth:
                point.style.transform = `translateX(${width - pointHalfWidth}px)`;
                break;
            default:
                point.style.transform = `translateX(${eventXCoord - startPoint - pointHalfWidth}px)`;
        }

        if (!colorRow) {
            return;
        }

        colorRow.style.width = `${eventXCoord - startPoint}px`;
    }

    handleMouseLeave = (isTouchEvent: boolean, e) => {
        const { left: startPoint = 0 } = this.rangeWrapperInfo || {};
        const rowItemsInfo = this.rowItemsInfo;
        const switcherStep = this.switcherStep;
        const eventXCoord = isTouchEvent ? e.changedTouches[0].clientX : e.clientX;
        const outRowPoint = eventXCoord - startPoint;
        const nearPoint = rowItemsInfo.filter((el: INearPoint, ind: number, arr) => {
            const prevEl = arr[ind - 1];

            if (ind === 0) {
                return outRowPoint <= switcherStep / 2;
            }

            if (ind === arr.length - 1) {
                return outRowPoint >= prevEl.coord + switcherStep / 2;
            }

            return outRowPoint >= el.coord - switcherStep / 2 && outRowPoint <= el.coord + switcherStep / 2;
        });

        this.setState({ currentValue: nearPoint[0].value, currentIndex: nearPoint[0].item });
        this.movePointer(nearPoint[0].value);

        this.moveEvents.forEach(el => this.rootNode && this.rootNode.removeEventListener(el, this.handleElementAction));
        this.leaveEvents.forEach(el =>
            this.rootNode && this.rootNode.removeEventListener(el, this.handleElementAction)
        );
    }

    getRangeWrapperCoords = () => {
        this.rangeWrapperInfo = this.rootNode && this.rootNode.getBoundingClientRect();
    }

    getRowItemsInfo = () => {
        const { items } = this.props;
        const { width: rowWidth = 0 } = this.rangeWrapperInfo || {};
        const itemsLength = items.length;

        this.switcherStep = rowWidth / (itemsLength - 1);
        this.rowItemsInfo = items.map((el, ind) => {
            if (ind === 0) {
                return {
                    ...el,
                    item: 0,
                    coord: 0,
                };
            }

            if (ind === itemsLength - 1) {
                return {
                    ...el,
                    item: itemsLength - 1,
                    coord: rowWidth,
                };
            }

            return {
                ...el,
                item: ind,
                coord: (rowWidth / (itemsLength - 1)) * ind,
           };
        });
    }

    movePointer(value: string) {
        const { theme } = this.props;

        if (theme === 'with-color-row' && this.pointerNode && this.colorRowNode) {
            const point = this.pointerNode;
            const checkedItem = this.rowItemsInfo.filter((el: INearPoint ) => el.value === value);
            let switchPointOffsetValue;
            let switchRowffsetValue;

            switch (true) {
                case checkedItem[0].item === 0:
                    switchPointOffsetValue = 0;
                    switchRowffsetValue = 0;
                    break;
                case checkedItem[0].item === this.rowItemsInfo.length - 1:
                    switchPointOffsetValue = checkedItem[0].coord - (point && point.offsetWidth);
                    switchRowffsetValue = checkedItem[0].coord - (point && point.offsetWidth / 2);
                    break;
                default:
                    switchPointOffsetValue = checkedItem[0].coord - (point && point.offsetWidth / 2);
                    switchRowffsetValue = checkedItem[0].coord;
            }

            this.pointerNode.style.transform = `translateX(${switchPointOffsetValue}px)`;
            this.colorRowNode.style.width = `${switchRowffsetValue}px`;

            return;
        }

        const rootOffsetLeft = this.rootNode ? this.rootNode.getBoundingClientRect().left : 0;
        const hasLabelProp = Object.keys(this.itemNodes).length !== 0;
        const targetLabelOffsetLeft = hasLabelProp ? this.itemNodes[value].getBoundingClientRect().left : 0;
        const offsetValue = targetLabelOffsetLeft - rootOffsetLeft;

        if (this.pointerNode) {
            this.pointerNode.style.transform = `translateX(${offsetValue}px)`;
        }

        if (this.colorRowNode) {
            this.colorRowNode.style.width = `${offsetValue}px`;
        }
    }

    getRootNode = (node: HTMLElement | null) => {
        this.rootNode = node;
    }

    getItemNodes = (item: IItem) => (node: HTMLElement | null) =>  {
        this.itemNodes[item.value] = node;
    }

    getPointerNode = (node: HTMLElement | null) => {
        this.pointerNode = node;
    }

    getColorRowNode = (node: HTMLElement | null) => {
        this.colorRowNode = node;
    }

    render() {
        const { items, theme, className } = this.props;

        return (
            <div className={cn('', { theme }, className)} ref={this.getRootNode}>
                <div className={cn('row')}>
                    {items.map((item, index) =>
                        <div
                            className={cn('item', {
                                active: item.value === this.state.currentValue,
                                disabled: index < this.state.currentIndex,
                            })}
                            key={item.title + item.value}
                            onClick={this.handleClickItem(item.value, index)}
                            ref={this.getItemNodes(item)}
                        >
                            <div className={cn('label')}>
                                {item.title}
                                {item.unit && <span className={cn('label-unit')}>{item.unit}</span>}
                            </div>
                        </div>
                    )}
                </div>
                {theme === 'with-color-row' ?
                    <div
                        className={cn('pointer')}
                        ref={this.getPointerNode}
                        onMouseDown={this.handleMouseDown}
                        onTouchStart={this.handleMouseDown}
                        onMouseUp={this.handleElementAction}
                    />
                    :
                    <div className={cn('pointer')} ref={this.getPointerNode} />
                }
                <div className={cn('color-row')} ref={this.getColorRowNode}/>
            </div>
        );
    }
}

export default ProductSwitcher;
