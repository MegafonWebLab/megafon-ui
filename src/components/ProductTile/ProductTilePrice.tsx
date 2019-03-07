import * as React from 'react';
import * as PropTypes from 'prop-types';
import { cnCreate } from '../../utils/cn';
import './style/ProductTilePrice.less';
import AnimationValue from './ProductTileValue';

interface IProductTilePriceProps {
    /** value */
    value: string;
    /** unitExtra */
    unitExtra: string;
    /** unitValue */
    unitValue: string;
    /** discount */
    discount?: string;
}

const cn = cnCreate('mfui-product-tile-price');
class ProductTilePrice extends React.Component<IProductTilePriceProps> {
    static propTypes = {
        value: PropTypes.string.isRequired,
        unitExtra: PropTypes.string,
        unitValue: PropTypes.string,
        discount: PropTypes.string,
    };

    render() {
        const { value, unitExtra, unitValue, discount } = this.props;
        const valueElem = <AnimationValue value={(discount || value) + ` ${unitValue}`} />;
        const unitElem = <span className={cn('payment-period')}>{unitExtra}</span>;

        return (
            <div className={cn('', { discount: !!discount })}>
                <div className={cn('discount-condition')}>При покупке новой SIM–карты</div>
                <span className={cn('old-price')}>
                    <span className={cn('old-price-value')}>
                        {discount ? `${value} ${unitValue}` : ' '}
                    </span>
                </span>
                <span className={cn('actual-price')}>
                    {valueElem} {unitElem}
                </span>
            </div>
        );
    }
}

export default ProductTilePrice;
