import * as React from 'react';
import * as PropTypes from 'prop-types';
import { cnCreate } from '@megafon/ui-core';
import './style/ProductTileCashback.less';

export interface IProductTileCashbackProps {
    /** title */
    title?: string;
    /** value */
    value?: number;
    /** unit */
    unit?: string;
}

const cn = cnCreate('mfui-beta-product-tile-cashback');
class ProductTileCashback extends React.Component<IProductTileCashbackProps> {
    static propTypes = {
        title: PropTypes.string,
        value: PropTypes.number,
        unit: PropTypes.string,
    };

    render() {
        const { title, value, unit } = this.props;

        if (!title && !value && !unit) {
            return null;
        }

        return (
            <div className={cn('')}>
                <span className={cn('text')}>
                    {title} {value} {unit}
                </span>
            </div>
        );
    }
}

export default ProductTileCashback;
