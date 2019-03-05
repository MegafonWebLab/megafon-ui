import * as React from 'react';
import * as PropTypes from 'prop-types';
import { cnCreate } from '../../utils/cn';
import './style/ProductTilePrice.less';
import AnimationValue from './ProductTileValue';

interface IProductTilePriceProps {
    /** value */
    value?: number;
    /** unitExtra */
    unitExtra?: string;
    /** unitValue */
    unitValue?: string;
    /** discount */
    discount?: number;
}

const cn = cnCreate('mfui-product-tile-price');
class ProductTilePrice extends React.Component<IProductTilePriceProps> {
    static propTypes = {
        value: PropTypes.number,
        unitExtra: PropTypes.string,
        unitValue: PropTypes.string,
        discount: PropTypes.number,
    };

    render() {
        const { value, unitExtra, unitValue, discount } = this.props;
        const valueElem = <AnimationValue value={`${String(value)} ${unitValue}`} />;
        const unitElem = <span className={cn('payment-period')}>{unitExtra}</span>;

        return (
            <div className={cn('', { discount: !!discount })}>
                <div className={cn('discount-condition')}>При покупке новой SIM–карты</div>
                <span className={cn('old-price')}>
                    <span className={cn('old-price-value')}>{discount} {unitValue}</span>
                </span>
                <span className={cn('actual-price')}>
                    {valueElem} {unitElem}
                </span>
            </div>
        );
    }
}

export default ProductTilePrice;
