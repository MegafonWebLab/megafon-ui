import * as React from 'react';
import * as PropTypes from 'prop-types';
import { cnCreate } from '../../utils/cn';
import './ProductCardFeatures.less';
import ProductCardFeaturesTop from './ProductCardFeaturesTop';
import ProductCardFeaturesBottom from './ProductCardFeaturesBottom';

export interface ISocialIcon {
    svgIcon: JSX.Element;
    title: string;
}

export interface IShowcaseChildren {
    svgIcon: JSX.Element;
    title: string;
    caption: string;
    value: string;
}

interface IShowcaseParam {
    title?: string;
    value?: string;
    children: Array<Partial<IShowcaseChildren>>;
}

interface IProductCardFeaturesProps {
    /** Showcase first param
     * Param with args: title: title: string(requred), value: string(requred), children: list of
     * svgIcon: JSX.Element, title: string, caption: string, value: string
     */
    firstParam?: IShowcaseParam;
    /** Showcase second param
     * Param with args: title: title: string(requred), value: string(requred), children: list of
     * svgIcon: JSX.Element, title: string, caption: string, value: string
     */
    secondParam?: IShowcaseParam;
    /** Social icons
     * List with args: svgIcon: JSX.Element, title: string
     */
    socialIcons?: Array<Partial<ISocialIcon>>;
    className?: string;
    classNameTop?: string;
    classNameBottom?: string;
}

const cn = cnCreate('product-card-features');
class ProductCardFeatures extends React.Component<IProductCardFeaturesProps, {}> {
    static propTypes = {
        firstParam: PropTypes.shape({
            title: PropTypes.string,
            value: PropTypes.string,
            children: PropTypes.arrayOf(
                PropTypes.shape({
                    svgIcon: PropTypes.element,
                    title: PropTypes.string,
                    caption: PropTypes.string,
                    value: PropTypes.string,
                })
            ),
        }),
        secondParam: PropTypes.shape({
            title: PropTypes.string,
            value: PropTypes.string,
            children: PropTypes.arrayOf(
                PropTypes.shape({
                    svgIcon: PropTypes.element,
                    title: PropTypes.string,
                    caption: PropTypes.string,
                    value: PropTypes.string,
                })
            ),
        }),
        socialIcons: PropTypes.arrayOf(
            PropTypes.shape({
                svgIcon: PropTypes.element.isRequired,
                title: PropTypes.string.isRequired,
            })
        ),
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
                        params={firstParam.children}
                        socialIcons={this.props.socialIcons}
                    />
                }
                {secondParam &&
                    <ProductCardFeaturesBottom
                        className={cn('bottom', {}, classNameBottom)}
                        params={secondParam.children}
                        title={secondParam.value}
                    />
                }
            </div>
        );
    }
}

export default ProductCardFeatures;
