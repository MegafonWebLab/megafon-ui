import * as React from 'react';
import * as PropTypes from 'prop-types';
import { cnCreate } from '../../utils/cn';
import './style/ProductTileValue.less';

interface IProductTileValueProps {
    /** Value */
    value: string;
    /** hAlign */
    hAlign?: 'center';
    /** Client */
    isServer?: boolean;
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
        isServer: PropTypes.bool,
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

    componentDidUpdate(_prevProps: IProductTileValueProps) {
        const { isServer } = this.props;

        if (isServer) {
            return;
        }

        window.setTimeout(() => {
            this.setState({ isAnimating: false });
        }, 0);
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
