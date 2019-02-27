import * as React from 'react';
import * as PropTypes from 'prop-types';
import { cnCreate } from '../../utils/cn';
import './ProductSwitcher.less';

interface IProductSwitcherProps {
    /** Class name */
    items: Array<{
        title: string;
        value: string;
    }>;
    /** Start index */
    startIndex?: number;
    /** Theme */
    theme?: 'tariff-showcase';
    /** Custom class name */
    className: string;
    /** Change handler */
    onChange(e: React.SyntheticEvent<EventTarget>, value: string): void | false;
}

interface IProductSwitcherState {
    /** Current value */
    currentValue: string;
}

const cn = cnCreate('mfui-product-switcher');
class ProductSwitcher extends React.Component<IProductSwitcherProps, IProductSwitcherState> {
    static propTypes = {
        items: PropTypes.array.isRequired,
        startIndex: PropTypes.number,
        onChange: PropTypes.func,
        theme: PropTypes.oneOf(['tariff-showcase']),
    };

    static defaultProps = {
        startIndex: 0,
    };

    labelNodes: object;
    rootNode: HTMLElement | null;
    pointerNode: HTMLElement | null;
    timer: number;

    constructor(props: IProductSwitcherProps) {
        super(props);

        const { items, startIndex = 0 } = props;
        const safeStartIndex = startIndex <= items.length - 1 ? startIndex : 0;

        this.labelNodes = {};

        this.state = { currentValue: items[safeStartIndex].value };
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

    handleClickItem = (value: string) => (e: React.SyntheticEvent<EventTarget>) => {
        const { onChange } = this.props;
        const { currentValue } = this.state;
        e.preventDefault();

        if (!onChange || value === currentValue || onChange(e, value) === false) {
            return;
        }

        this.setState({ currentValue: value });
        this.movePointer(value);
    }

    movePointer(value: string) {
        const rootOffsetLeft = this.rootNode ? this.rootNode.getBoundingClientRect().left : 0;
        const hasLabelProp = Object.keys(this.labelNodes).length !== 0;
        const targetLabelOffsetLeft = hasLabelProp ? this.labelNodes[value].getBoundingClientRect().left : 0;
        const offsetValue = targetLabelOffsetLeft - rootOffsetLeft;

        if (this.pointerNode) {
            this.pointerNode.style.transform = `translateX(${offsetValue}px)`;
        }
    }

    render() {
        const { theme, className } = this.props;

        return (
            <div className={cn('', { theme }, className)} ref={node => { this.rootNode = node; }}>
                <div className={cn('row')}>
                    {this.props.items.map(item =>
                        <div
                            className={cn('item', { active: item.value === this.state.currentValue })}
                            key={item.title + item.value}
                            onClick={this.handleClickItem(item.value)}
                        >
                            <div className={cn('label')} ref={node => { this.labelNodes[item.value] = node; }}>
                                {item.title}
                            </div>
                        </div>
                    )}
                </div>
                <div className={cn('pointer')} ref={node => { this.pointerNode = node; }} />
            </div>
        );
    }
}

export default ProductSwitcher;
