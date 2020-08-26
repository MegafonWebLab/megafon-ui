import * as React from 'react';
import * as PropTypes from 'prop-types';
import { cnCreate } from '@megafon/ui-core';
import './style/ProductTilePrice.less';
import AnimationValue from './ProductTileValue';

interface IProductTilePriceProps {
    /** title */
    title?: string;
    /** value */
    value: string;
    /** unitExtra */
    unitExtra: string;
    /** unitValue */
    unitValue: string;
    /** discount */
    discount?: string;
}

const cn = cnCreate('mfui-beta-product-tile-price');
class ProductTilePrice extends React.Component<IProductTilePriceProps> {
    static propTypes = {
        title: PropTypes.string,
        value: PropTypes.string.isRequired,
        unitExtra: PropTypes.string,
        unitValue: PropTypes.string,
        discount: PropTypes.string,
    };

    render() {
        const { title, value, unitExtra, unitValue, discount } = this.props;
        const valueElem = <AnimationValue value={(discount || value) + ` ${unitValue}`} />;
        const unitElem = <span className={cn('payment-period')}>{unitExtra}</span>;

        return (
            <div className={cn('', { discount: !!discount })}>
                <span className={cn('old-price')}>
                    <span className={cn('old-price-value')}>
                        {discount ? `${value} ${unitValue}` : ' '}
                    </span>
                </span>
                <span className={cn('actual-price')}>
                    {valueElem} {unitElem}
                </span>
                <div className={cn('discount-condition')}>{title}</div>
            </div>
        );
    }
}

export default ProductTilePrice;
