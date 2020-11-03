import * as React from 'react';
import * as PropTypes from 'prop-types';
import './ProductCardFeaturesBottom.less';
import { Header, Paragraph, cnCreate } from '@megafon/ui-core';
import { ISecondParamChildren } from './ProductCardFeatures';

export interface IProductCardFeaturesBottomProps {
    /** Дополнительный класс корневого элемента */
    className?: string;
    /** Заголовок */
    title?: string;
    /** Параметры витрины
     * title?: string;
     * caption?: string;
     * svgIcon?: JSX.Element;
     */
    params: Array<Partial<ISecondParamChildren>>;
}

const cn = cnCreate('mfui-beta-product-card-features-bottom');
class ProductCardFeaturesBottom extends React.Component<IProductCardFeaturesBottomProps, {}> {
    static propTypes = {
        className: PropTypes.string,
        params: PropTypes.array.isRequired,
        title: PropTypes.string,
    };

    static defaultProps: IProductCardFeaturesBottomProps = {
        params: [],
    };

    render() {
        const { params, title, className }: IProductCardFeaturesBottomProps = this.props;

        return (
            <div className={cn('', {}, className)}>
                {title && <Header className={cn('title')} as="h3" margin={false}>{title}</Header>}
                <ul className={cn('list')}>
                    {params.map((param: ISecondParamChildren): React.ReactNode =>
                        <li className={cn('item', { icon: !!param.svgIcon })} key={param.title}>
                            {param.svgIcon && React.cloneElement(param.svgIcon, {
                                className: cn('item-icon'),
                            })}
                            <Header className={cn('item-title')} as="h5" margin={false}>
                                {param.title}
                            </Header>
                            <Paragraph
                                className={cn('item-text')}
                                hasMargin={false}
                                size="small"
                            >
                                {param.caption}
                            </Paragraph>
                        </li>
                    )}
                </ul>
            </div>
        );
    }
}

export default ProductCardFeaturesBottom;
