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

    constructor(props: IProductSwitcherProps) {
        super(props);

        const { items, startIndex = 0 } = props;
        const safeStartIndex = startIndex <= items.length - 1 ? startIndex : 0;

        this.itemNodes = {};

        this.state = { currentValue: items[safeStartIndex].value, currentIndex: safeStartIndex };
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleWindowSize, true);
        this.movePointer(this.state.currentValue);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowSize, true);
    }

    handleWindowSize = () => {
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

    movePointer(value: string) {
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
                <div className={cn('pointer')} ref={this.getPointerNode}/>
                <div className={cn('color-row')} ref={this.getColorRowNode}/>
            </div>
        );
    }
}

export default ProductSwitcher;
