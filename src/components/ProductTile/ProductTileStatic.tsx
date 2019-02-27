import * as React from 'react';
import * as PropTypes from 'prop-types';
import { cnCreate } from '../../utils/cn';
import './style/ProductTileStatic.less';
import { IPack } from './ProductTile';

interface IProductTileStaticProps {
    /** Packs */
    packs: Array<Partial<IPack>>;
}

const cn = cnCreate('mfui-product-tile-static');
class ProductTileStatic extends React.Component<IProductTileStaticProps> {
    static propTypes = {
        packs: PropTypes.arrayOf(PropTypes.shape({
            value: PropTypes.number,
            unit: PropTypes.string,
        })),
    };

    render() {
        const { packs } = this.props;

        return (
            <div className={cn('')}>
                {packs.map((item: IPack) =>
                    <div className={cn('constructor-pack')} key={item.value! + item.unit!}>
                        {`${item.value} ${item.unit}`}
                    </div>
                )}
            </div>
        );
    }
}

export default ProductTileStatic;
