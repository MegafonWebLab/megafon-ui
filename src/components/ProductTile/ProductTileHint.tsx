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

interface IElementAtributes {
    /** Href */
    href?: string;
    /** Target */
    target?: string;
}

const cn = cnCreate('mfui-product-tile-hint');
class ProductTileHint extends React.Component<IProductTileHintProps> {
    static PropTypes = {
        linkHref: PropTypes.string,
        title: PropTypes.string,
    };

    render() {
        const { title, linkHref } = this.props;
        const ElementType = linkHref ? 'a' : 'div';
        const attributes: IElementAtributes = linkHref ? { href: linkHref, target: '_blank' } : {};

        return (
            <div className={cn('')}>
                <ElementType {...attributes}>
                    <div className={cn('text')}>
                        <span className={cn('description')}>{title}</span>
                    </div>
                    <div className={cn('border')} />
                </ElementType>
            </div >
        );
    }
}

export default ProductTileHint;
