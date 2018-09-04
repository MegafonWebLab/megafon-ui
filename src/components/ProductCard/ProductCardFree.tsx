import * as React from 'react';
import * as PropTypes from 'prop-types';
import './ProductCardFree.less';
import Header from '../Header/Header';
import Paragraph from '../Paragraph/Paragraph';
import { cnCreate } from '../../utils/cn';
import { IShowcaseChildren } from './ProductCardFeatures';

interface IProductCardFreeProps {
    /** Custom class name */
    className?: string;
    /** Title */
    title?: string;
    /** Showcase params childrens list */
    params: Array<Partial<IShowcaseChildren>>;
}

const cn = cnCreate('product-card-free');
class ProductCardFree extends React.Component<IProductCardFreeProps, {}> {
    static propTypes = {
        className: PropTypes.string,
        params: PropTypes.array.isRequired,
        title: PropTypes.string,
    };

    static defaultProps: IProductCardFreeProps = {
        params: [],
    };

    render() {
        const { params, title, className }: IProductCardFreeProps = this.props;

        return (
            <div className={cn('', {}, className)}>
                {title && <Header className={cn('title')} as="h3" margin={false}>{title}</Header>}
                <ul className={cn('list')}>
                    {params.map((param: IShowcaseChildren): React.ReactNode =>
                        <li className={cn('item', { icon: !!param.svgIcon })} key={param.title}>
                            {param.svgIcon}
                            <Header className={cn('item-title')} as="h5" margin={false}>
                                {param.title}
                            </Header>
                            <Paragraph
                                className={cn('item-text')}
                                marginAll="none"
                                sizeAll="small">
                                {param.caption}
                            </Paragraph>
                        </li>
                    )}
                </ul>
            </div>
        );
    }
}

export default ProductCardFree;
