import * as React from 'react';
import * as PropTypes from 'prop-types';
import { cnCreate } from '../../utils/cn';
import detectTouch from '../../utils/detectTouch';
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
    onChange(e: React.SyntheticEvent<EventTarget> | TouchEvent | MouseEvent, value: string, index: number): boolean;
}

interface IProductSwitcherState {
    /** Current value */
    currentValue: string;
    currentIndex: number;
    isPointerPressed: boolean;
    isPressedPointerLeaveBlock: boolean;
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

    labelNodes: object;
    rootNode: HTMLElement | null;
    pointerNode: HTMLElement | null;
    colorRowNode: HTMLElement | null;
    timer: number;
    rowItemsInfo: INearPoint[];
    switcherStep: number;
    isTouch: boolean = detectTouch();
    swipeRowWidth: number;
    mutationObserver: MutationObserver;

    constructor(props: IProductSwitcherProps) {
        super(props);

        const { items, startIndex = 0 } = props;
        const safeStartIndex: number = this.getSafeStartIndex(startIndex, items);

        this.labelNodes = {};
        this.state = {
            currentValue: items[safeStartIndex].value,
            currentIndex: safeStartIndex,
            isPointerPressed: false,
            isPressedPointerLeaveBlock: false,
        };
    }

    componentDidMount() {
        this.rowItemsInfo = this.getRowItemsInfo();
        this.movePointer(this.state.currentValue);
        this.setHandlers();
    }

    componentWillUnmount() {
        this.removeHandlers();
    }

    componentDidUpdate(prevProps: IProductSwitcherProps) {
        if (!this.rootNode) {
            return;
        }

        const { startIndex = 0, items } = this.props;
        const { width } = this.getRangeWrapperCoords(this.rootNode);
        const isSwipeRowWidthChanged = this.swipeRowWidth !== Math.round(width);

        if (startIndex !== prevProps.startIndex) {
            const newIndex: number = this.getSafeStartIndex(startIndex, items);
            const newValue: string = items[newIndex].value;

            this.setState({
                currentValue: newValue,
                currentIndex: newIndex,
            });
            this.movePointer(newValue);
        }

        if (!isSwipeRowWidthChanged) {
            return;
        }

        this.rowItemsInfo = this.getRowItemsInfo();
        this.movePointer(this.state.currentValue);
    }

    getSafeStartIndex(startIndex: number, items: IItem[]): number {
        return startIndex <= items.length - 1 ? startIndex : 0;
    }

    handleWindowSize = () => {
        this.rowItemsInfo = this.getRowItemsInfo();

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

    setHandlers = () => {
        window.addEventListener('resize', this.handleWindowSize, true);

        if (!this.pointerNode || !this.rootNode || !this.colorRowNode) {
            return;
        }

        const pointerNode = this.pointerNode;
        const colorRowNode = this.colorRowNode;
        const rootNode = this.rootNode;

        if (this.isTouch) {
            pointerNode.addEventListener('touchstart', this.setPointerState);
            rootNode.addEventListener('touchmove', this.handleTouchMove);
            rootNode.addEventListener('touchend', this.handleTouchEnd);

            this.mutationObserver = new MutationObserver((mutations: []) => {
                mutations.forEach((mutation: MutationRecord) => this.handleWidthChange(mutation));
            });

            this.mutationObserver.observe(colorRowNode, {
                attributeOldValue: true,
                attributes: true,
            });

            return;
        }

        pointerNode.addEventListener('mousedown', this.setPointerState);
        rootNode.addEventListener('mousemove', this.handleMouseMove);
        rootNode.addEventListener('mouseleave', this.handleMouseLeave);
        rootNode.addEventListener('mouseup', this.handleMouseUp);
        document.body.addEventListener('mouseup', this.handleBodyMouseUp);
    }

    removeHandlers = () => {
        window.removeEventListener('resize', this.handleWindowSize, true);

        if (!this.pointerNode || !this.rootNode) {
            return;
        }

        const pointerNode = this.pointerNode;
        const rootNode = this.rootNode;

        if (this.isTouch) {
            this.mutationObserver.disconnect();

            pointerNode.removeEventListener('touchstart', this.setPointerState);
            rootNode.removeEventListener('touchmove', this.handleTouchMove);
            rootNode.removeEventListener('touchend', this.handleTouchEnd);

            return;
        }

        pointerNode.removeEventListener('mousedown', this.setPointerState);
        rootNode.removeEventListener('mousemove', this.handleMouseMove);
        rootNode.removeEventListener('mouseleave', this.handleMouseLeave);
        rootNode.removeEventListener('mouseup', this.handleMouseUp);
        document.body.removeEventListener('mouseup', this.handleBodyMouseUp);
    }

    setPointerState = (e: Event) => {
        e.stopPropagation();

        this.setState(prevState => ({
            isPointerPressed: !prevState.isPointerPressed,
        }));
    }

    handleWidthChange = (mutationObj: MutationRecord) => {
        const { oldValue } = mutationObj;

        if (!oldValue) {
            return;
        }

        const { isPointerPressed } = this.state;
        const checkedAttr = 'width';

        if (oldValue.match(checkedAttr) && isPointerPressed) {
            return;
        }

        this.rowItemsInfo = this.getRowItemsInfo();
        this.movePointer(this.state.currentValue);
    }

    handleTouchMove = (e: TouchEvent) => {
        const { isPointerPressed } = this.state;

        if (!this.rootNode || !isPointerPressed) {
            return;
        }

        e.stopPropagation();
        e.preventDefault();

        const { top, bottom } = this.getRangeWrapperCoords(this.rootNode);
        const eventXCoord = e.changedTouches[0].clientX;
        const eventYCoord = e.changedTouches[0].clientY;

        if (eventYCoord < top || eventYCoord > bottom) {
            this.handleTouchEnd(e);

            return;
        }

        this.moveSwitcher(e, eventXCoord);
    }

    handleMouseMove = (e: MouseEvent) => {
        const { isPointerPressed } = this.state;

        if (!isPointerPressed) {
            return;
        }

        e.stopPropagation();

        this.moveSwitcher(e, e.clientX);
    }

    handleMouseLeave = (e: MouseEvent) => {
        const { isPointerPressed } = this.state;

        if (!isPointerPressed || !this.rootNode) {
            return;
        }

        e.stopPropagation();

        const {
            left: startPoint = 0,
            right: endPoint = 0,
            top,
            bottom,
        } = this.getRangeWrapperCoords(this.rootNode);
        const eventYCoord = e.clientY;
        const eventXCoord = e.clientX;

        if (eventYCoord < top || eventYCoord > bottom) {
            this.handleMouseUp(e);

            return;
        }

        if (eventXCoord < startPoint || eventXCoord > endPoint) {
            this.setState({
                isPressedPointerLeaveBlock: true,
            });
        }
    }

    handleMouseUp = (e: MouseEvent) => {
        const { isPointerPressed, isPressedPointerLeaveBlock } = this.state;

        if (!isPointerPressed) {
            return;
        }

        if (isPressedPointerLeaveBlock) {
            this.setState({
                isPressedPointerLeaveBlock: false,
            });
        }

        this.handleEndSwitchActions(e, e.clientX);
    }

    handleBodyMouseUp = (e: MouseEvent) => {
        const { isPressedPointerLeaveBlock } = this.state;

        if (!isPressedPointerLeaveBlock) {
            return;
        }

        this.handleMouseUp(e);
    }

    handleTouchEnd = (e: TouchEvent) => {
        const { isPointerPressed } = this.state;

        if (!isPointerPressed) {
            return;
        }

        this.handleEndSwitchActions(e, e.changedTouches[0].clientX);
    }

    moveSwitcher = (e: React.SyntheticEvent<EventTarget> | TouchEvent | MouseEvent, eventXCoord: number) => {
        if (!this.pointerNode || !this.colorRowNode || !this.rootNode) {
            return;
        }

        const {
            left: startPoint = 0,
            right: endPoint = 0,
            width = 0,
        } = this.getRangeWrapperCoords(this.rootNode);
        const { onChange } = this.props;
        const pointerPosition = Math.round(eventXCoord - startPoint);
        const pointerHalfWidth = this.pointerNode.offsetWidth / 2 || 0;
        const [chosenPoint] = this.rowItemsInfo.filter((el: INearPoint) => {
            const entryPointsRange = this.getEntryPointsRange(el.coord);

            return entryPointsRange.some((point: number) => {
                const isPointerCenterMatched = point === pointerPosition;
                const isPointerLeftBorderMatched = point === pointerPosition - pointerHalfWidth;
                const isPointerRightBorderMatched = point === pointerPosition + pointerHalfWidth;

                return isPointerCenterMatched || isPointerLeftBorderMatched || isPointerRightBorderMatched;
            });
        });

        switch (true) {
            case eventXCoord < startPoint + pointerHalfWidth:
                this.pointerNode.style.transform = 'translateX(0px)';
                this.colorRowNode.style.width = '0px';
                break;
            case eventXCoord >= endPoint - pointerHalfWidth:
                this.pointerNode.style.transform = `translateX(${width - pointerHalfWidth * 2}px)`;
                this.colorRowNode.style.width = `${width - pointerHalfWidth}px`;
                break;
            default:
                this.pointerNode.style.transform = `translateX(${pointerPosition - pointerHalfWidth}px)`;
                this.colorRowNode.style.width = `${pointerPosition}px`;
        }

        if (!chosenPoint) {
            return;
        }

        onChange(e, chosenPoint.value, chosenPoint.item);

        this.setState({
            currentValue: chosenPoint.value,
            currentIndex: chosenPoint.item,
        });
    }

    handleEndSwitchActions = (e: React.SyntheticEvent<EventTarget> | TouchEvent | MouseEvent, eventXCoord: number) => {
        if (!this.rootNode) {
            return;
        }

        const { onChange } = this.props;
        const { left: startPoint = 0 } = this.getRangeWrapperCoords(this.rootNode);
        const outRowPoint = eventXCoord - startPoint;
        const [nearPoint] = this.getNearPoint(outRowPoint);

        onChange(e, nearPoint.value, nearPoint.item);

        this.setState(prevState => ({
            currentValue: nearPoint.value,
            currentIndex: nearPoint.item,
            isPointerPressed: !prevState.isPointerPressed,
        }));

        this.movePointer(nearPoint.value);
    }

    getEntryPointsRange = (centralСoordinate: number) => {
        return [centralСoordinate - 1, centralСoordinate,  + 1];
    }

    getNearPoint = (outRowPoint: number) => {
        return this.rowItemsInfo.filter((el: INearPoint, ind: number, arr: [INearPoint]) => {
            const prevEl = arr[ind - 1];

            if (ind === 0) {
                return outRowPoint <= this.switcherStep / 2;
            }

            if (ind === arr.length - 1) {
                return outRowPoint >= prevEl.coord + this.switcherStep / 2;
            }

            return outRowPoint >= el.coord - this.switcherStep / 2 && outRowPoint <= el.coord + this.switcherStep / 2;
        });
    }

    getRangeWrapperCoords = (node: HTMLElement) => {
        return node && node.getBoundingClientRect();
    }

    getRowItemsInfo = () => {
        if (!this.rootNode) {
            return [];
        }

        const { items } = this.props;
        const itemsLength = items.length;
        let { width: rowWidth = 0 } = this.getRangeWrapperCoords(this.rootNode);

        rowWidth = Math.round(rowWidth);

        this.swipeRowWidth = rowWidth;
        this.setSwitcherStep(rowWidth / (itemsLength - 1));

        return items.map((item: IItem, index: number) => {
            if (index === 0) {
                return {
                    ...item,
                    item: 0,
                    coord: 0,
                };
            }

            if (index === itemsLength - 1) {
                return {
                    ...item,
                    item: itemsLength - 1,
                    coord: rowWidth,
                };
            }

            return {
                ...item,
                item: index,
                coord: Math.floor((rowWidth / (itemsLength - 1)) * index),
            };
        });
    }

    setSwitcherStep = (value: number) => {
        this.switcherStep = value;
    }

    movePointer(value: string) {
        const { theme } = this.props;

        if (theme === 'with-color-row') {
            this.moveSwipePointer(value);

            return;
        }

        const rootOffsetLeft = this.rootNode ? this.rootNode.getBoundingClientRect().left : 0;
        const hasLabelProp = Object.keys(this.labelNodes).length !== 0;
        const targetLabelOffsetLeft = hasLabelProp ? this.labelNodes[value].getBoundingClientRect().left : 0;
        const offsetValue = targetLabelOffsetLeft - rootOffsetLeft;

        if (this.pointerNode) {
            this.pointerNode.style.transform = `translateX(${offsetValue}px)`;
        }

        if (this.colorRowNode) {
            this.colorRowNode.style.width = `${offsetValue}px`;
        }
    }

    moveSwipePointer = (value: string) => {
        if (!this.pointerNode || !this.colorRowNode) {
            return;
        }

        const [checkedItem] = this.rowItemsInfo.filter((el: INearPoint ) => el.value === value);
        let switchPointOffsetValue;
        let switchRowWidth;

        switch (!!checkedItem) {
            case checkedItem.item === 0:
                switchPointOffsetValue = 0;
                switchRowWidth = 0;
                break;
            case checkedItem.item === this.rowItemsInfo.length - 1:
                switchPointOffsetValue = checkedItem.coord - (this.pointerNode.offsetWidth);
                switchRowWidth = checkedItem.coord - (this.pointerNode.offsetWidth / 2);
                break;
            default:
                switchPointOffsetValue = checkedItem.coord - (this.pointerNode.offsetWidth / 2);
                switchRowWidth = checkedItem.coord;
        }

        this.pointerNode.style.transform = `translateX(${switchPointOffsetValue}px)`;
        this.colorRowNode.style.width = `${switchRowWidth}px`;
    }

    getRootNode = (node: HTMLElement | null) => {
        this.rootNode = node;
    }

    getLabelNodes = (value: string) => (node: HTMLElement | null) =>  {
        this.labelNodes[value] = node;
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
                            className={cn('item',
                                {
                                    active: item.value === this.state.currentValue,
                                    disabled: index < this.state.currentIndex,
                                }
                            )}
                            key={item.title + item.value}
                            onClick={this.handleClickItem(item.value, index)}
                        >
                            <div className={cn('label')} ref={this.getLabelNodes(item.value)}>
                                {item.title}
                                {item.unit && <span className={cn('label-unit')}>{item.unit}</span>}
                            </div>
                        </div>
                    )}
                </div>
                <div className={cn('pointer')} ref={this.getPointerNode} />
                <div className={cn('color-row')} ref={this.getColorRowNode} />
            </div>
        );
    }
}

export default ProductSwitcher;
