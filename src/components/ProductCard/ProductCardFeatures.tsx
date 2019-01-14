import * as React from 'react';
import * as PropTypes from 'prop-types';
import { cnCreate } from '../../utils/cn';
import './ProductCardFeatures.less';
import ProductCardFeaturesTop from './ProductCardFeaturesTop';
import ProductCardFeaturesBottom from './ProductCardFeaturesBottom';

export interface IShowcaseChildren {
    title: string;
    caption?: string;
    svgIcon: JSX.Element;
}

interface IShowcaseParam {
    title?: string;
    caption?: string;
    children: Array<Partial<IShowcaseChildren>>;
}

interface IProductCardFeaturesProps {
    /** Showcase first param
     * Param with args: title: string(requred), caption: string(requred), children: list of
     * svgIcon: JSX.Element, title: string
     */
    firstParam?: IShowcaseParam;
    /** Showcase second param
     * Param with args: title: string, children: list of
     * svgIcon: JSX.Element, title: string, caption: string
     */
    secondParam?: IShowcaseParam;
    className?: string;
    classNameTop?: string;
    classNameBottom?: string;
}

const cn = cnCreate('product-card-features');
class ProductCardFeatures extends React.Component<IProductCardFeaturesProps, {}> {
    static propTypes = {
        firstParam: PropTypes.shape({
            title: PropTypes.string,
            caption: PropTypes.string,
            children: PropTypes.arrayOf(
                PropTypes.shape({
                    title: PropTypes.string,
                    svgIcon: PropTypes.element,
                })
            ),
        }),
        secondParam: PropTypes.shape({
            title: PropTypes.string,
            children: PropTypes.arrayOf(
                PropTypes.shape({
                    title: PropTypes.string,
                    caption: PropTypes.string,
                    svgIcon: PropTypes.element,
                })
            ),
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
