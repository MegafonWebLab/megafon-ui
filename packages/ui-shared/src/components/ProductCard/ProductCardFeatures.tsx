import * as React from 'react';
import * as PropTypes from 'prop-types';
import { cnCreate } from '@megafon/ui-core';
import './ProductCardFeatures.less';
import ProductCardFeaturesTop from './ProductCardFeaturesTop';
import ProductCardFeaturesBottom from './ProductCardFeaturesBottom';

interface IFirstParam {
    title: string;
    caption?: string;
    children?: Array<Partial<IFirstParamChildren>>;
}

interface ISecondParam {
    title?: string;
    children: Array<Partial<ISecondParamChildren>>;
}

export interface IFirstParamChildren {
    title: string;
    svgIcon: JSX.Element;
}

export interface ISecondParamChildren {
    title: string;
    caption?: string;
    svgIcon: JSX.Element;
}

export interface IProductCardFeaturesProps {
    /** Начальные параметры витрины
     * title: string(requred),
     * caption: string,
     * children: [JSX.Element(requred), title: string(requred)]
     */
    firstParam?: IFirstParam;
    /** Вторичные параметры витрины
     * title: string,
     * children: [JSX.Element(requred), title: string(requred), caption: string](requred)
     */
    secondParam?: ISecondParam;
    /** Дополнительный класс корневого элемента */
    className?: string;
    /** Дополнительный класс верхнего элемента */
    classNameTop?: string;
    /** Дополнительный класс нижнего элемента */
    classNameBottom?: string;
}

const cn = cnCreate('mfui-beta-product-card-features');
class ProductCardFeatures extends React.Component<IProductCardFeaturesProps, {}> {
    static propTypes = {
        firstParam: PropTypes.shape({
            title: PropTypes.string.isRequired,
            caption: PropTypes.string,
            children: PropTypes.arrayOf(
                PropTypes.shape({
                    title: PropTypes.string.isRequired,
                    svgIcon: PropTypes.element.isRequired,
                })
            ),
        }),
        secondParam: PropTypes.shape({
            title: PropTypes.string,
            children: PropTypes.arrayOf(
                PropTypes.shape({
                    title: PropTypes.string.isRequired,
                    caption: PropTypes.string,
                    svgIcon: PropTypes.element.isRequired,
                })
            ).isRequired,
        }),
        className: PropTypes.string,
        classNameTop: PropTypes.string,
        classNameBottom: PropTypes.string,
    };

    render() {
        const { firstParam, secondParam, className, classNameTop, classNameBottom } = this.props;

        return (
            <div className={cn('', {}, className)}>
                {firstParam &&
                    <ProductCardFeaturesTop
                        className={cn('top', {}, classNameTop)}
                        title={firstParam.title}
                        caption={firstParam.caption}
                        params={firstParam.children}
                    />
                }
                {secondParam &&
                    <ProductCardFeaturesBottom
                        className={cn('bottom', {}, classNameBottom)}
                        title={secondParam.title}
                        params={secondParam.children}
                    />
                }
            </div>
        );
    }
}

export default ProductCardFeatures;
