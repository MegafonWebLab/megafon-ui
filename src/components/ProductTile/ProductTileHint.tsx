import * as React from 'react';
import * as PropTypes from 'prop-types';
import { cnCreate } from '../../utils/cn';
import './style/ProductTileHint.less';

interface IProductTileHintProps {
    /** Title */
    title: string;
    /** Link href */
    linkHref: string;
}

const cn = cnCreate('mfui-product-tile-hint');
class ProductTileHint extends React.Component<IProductTileHintProps> {
    static Props = {
        linkHref: PropTypes.string
    }

    render() {
        const { title, linkHref } = this.props;
        const ElementType = this.props.linkHref ? 'a' : 'div';
        const target = this.props.linkHref ? '_blank' : '';

        return (
            <div className={cn('')}>
                <ElementType href={linkHref} target={target}>
                    <div className={cn('text')}>
                        <span className={cn('description')}>{title}</span>
                    </div>
                    <div className={cn('border')} />
                </ElementType>
            </div>
        );
    }
}

export default ProductTileHint;
