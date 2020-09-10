import * as React from 'react';
import * as PropTypes from 'prop-types';
import { cnCreate } from '@megafon/ui-core';
import './style/ProductTileHint.less';
import { TLinkTargetType } from './ProductTile';

export interface IProductTileHintProps {
    /** Title */
    title: string;
    /** Link href */
    linkHref?: string;
    /** Link target */
    linkTarget?: TLinkTargetType;
}

interface IElementAtributes {
    /** Href */
    href?: string;
    /** Target */
    target?: string;
}

const cn = cnCreate('mfui-beta-product-tile-hint');
class ProductTileHint extends React.Component<IProductTileHintProps> {
    static propTypes = {
        linkHref: PropTypes.string,
        title: PropTypes.string,
        linkTarget: PropTypes.oneOf(['_self', '_blank', '_parent', '_top']),
    };

    static defaultProps = {
        linkTarget: '_self',
    };

    render() {
        const { title, linkHref, linkTarget } = this.props;
        const ElementType = linkHref ? 'a' : 'div';
        const attributes: IElementAtributes = linkHref ? { href: linkHref, target: linkTarget } : {};

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
