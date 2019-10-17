import * as React from 'react';
import * as PropTypes from 'prop-types';
import { cn as cnCreate } from '@megafon/ui-core';
import './style/ProductTileValue.less';

interface IProductTileValueProps {
    /** Value */
    value: string;
    /** hAlign */
    hAlign?: 'center';
}

interface IProductTileValueState {
    prevValue: string;
    currentValue: string;
    isAnimating: boolean;
}

const cn = cnCreate('mfui-product-tile-value');
class ProductTileValue extends React.PureComponent<IProductTileValueProps, IProductTileValueState> {
    static propTypes = {
        value: PropTypes.string.isRequired,
        hAlign: PropTypes.oneOf(['center']),
    };

    constructor(props: IProductTileValueProps) {
        super(props);

        this.state = {
            prevValue: '',
            currentValue: props.value,
            isAnimating: false,
        };
    }

    static getDerivedStateFromProps(props: IProductTileValueProps, state: IProductTileValueState) {
        const isChangedValue = props.value !== state.currentValue;

        return {
            prevValue: isChangedValue ? state.currentValue : state.prevValue,
            currentValue: props.value,
            isAnimating: isChangedValue || state.isAnimating,
        };
    }

    componentDidUpdate() {
        const ANIMATION_DELAY = 50;

        if (typeof window === 'undefined') {
            return;
        }

        window.setTimeout(() => {
            this.setState({ isAnimating: false });
        }, ANIMATION_DELAY);
    }

    renderPrevPrice() {
        const { prevValue, isAnimating } = this.state;

        return (
            <span className={cn('prev', { hide: !isAnimating })}>
                {prevValue}
            </span>
        );
    }

    renderCurrentPrice() {
        const { currentValue, isAnimating } = this.state;

        return (
            <span className={cn('current', { hide: isAnimating })}>
                {currentValue}
            </span>
        );
    }

    render() {
        const { hAlign } = this.props;

        return (
            <span className={cn('', {'h-align': hAlign })}>
                {this.renderPrevPrice()}
                {this.renderCurrentPrice()}
            </span>
        );
    }
}

export default ProductTileValue;
