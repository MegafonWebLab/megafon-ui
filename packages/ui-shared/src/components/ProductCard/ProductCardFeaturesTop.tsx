import * as React from 'react';
import * as PropTypes from 'prop-types';
import './ProductCardFeaturesTop.less';
import { Header, cnCreate, DropdownSocialList } from '@megafon/ui-core';
import { IFirstParamChildren } from './ProductCardFeatures';

export interface IProductCardFeaturesTopProps {
    /** Custom class name */
    className?: string;
    /** Title */
    title?: string;
    /** Caption */
    caption?: string;
    /** Showcase params childrens list */
    params: Array<Partial<IFirstParamChildren>>;
}

const cn = cnCreate('mfui-beta-product-card-features-top');
class ProductCardFeaturesTop extends React.Component<IProductCardFeaturesTopProps, {}> {
    static propTypes = {
        className: PropTypes.string,
        title: PropTypes.string,
        caption: PropTypes.string,
        params: PropTypes.array,
    };

    static defaultProps: IProductCardFeaturesTopProps = {
        params: [],
    };

    render() {
        const { title, caption, params }: IProductCardFeaturesTopProps = this.props;

        return (
            <div className={cn('', {}, this.props.className)} >
                <div className={cn('inner')}>
                    <Header
                        className={cn('title')}
                        as="h3"
                        margin={false}
                    >
                        {title}
                    </Header>
                    <div className={cn('text')}>
                        {caption}
                    </div>
                    {!!params.length && <DropdownSocialList icons={params} />}
                </div>
            </div>
        );
    }
}

export default ProductCardFeaturesTop;
