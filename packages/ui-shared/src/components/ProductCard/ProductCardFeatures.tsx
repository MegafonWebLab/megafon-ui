import * as React from 'react';
import * as PropTypes from 'prop-types';
import { cnCreate } from '../../utils/cn';
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

interface IProductCardFeaturesProps {
    /** Showcase first param
     * Param with args: title: string(requred), caption: string,
     * children: [JSX.Element(requred), title: string(requred)]
     */
    firstParam?: IFirstParam;
    /** Showcase second param
     * Param with args: title: string,
     * children: [JSX.Element(requred), title: string(requred), caption: string](requred)
     */
    secondParam?: ISecondParam;
    className?: string;
    classNameTop?: string;
    classNameBottom?: string;
}

const cn = cnCreate('mfui-product-card-features');
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
