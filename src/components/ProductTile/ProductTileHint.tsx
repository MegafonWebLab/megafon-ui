import * as React from 'react';
import { cnCreate } from '../../utils/cn';
import './style/ProductTileHint.less';

interface IProductTileHintProps {
    /** Title */
    title: string;
}

const cn = cnCreate('mfui-product-tile-hint');
class ProductTileHint extends React.Component<IProductTileHintProps, {}> {
    render() {
        const { title } = this.props;

        return (
            <div className={cn('')}>
                <div className={cn('text')}>
                    <span className={cn('description')}>{title}</span>
                </div>
                <div className={cn('border')}/>
            </div>
        );
    }
}

export default ProductTileHint;
