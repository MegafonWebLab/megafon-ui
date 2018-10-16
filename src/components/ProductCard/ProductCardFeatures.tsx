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

interface IShowcaseParams {
    title?: string;
    value?: string;
    children: Array<Partial<IShowcaseChildren>>;
}

interface IProductCardFeaturesProps {
    /** Showcase
     * List with args: title: title: string(requred), value: string(requred), children: list of
     * svgIcon: JSX.Element, title: string, caption: string, value: string
     */
    showcaseParams?: IShowcaseParams[];
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
        showcaseParams: PropTypes.arrayOf(
            PropTypes.shape({
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
            })
        ),
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
        const { className, classNameTop, classNameBottom } = this.props;
        const params = this.props.showcaseParams!.filter(
            param => param.children!.length
        );

        const [first, ...rest] = params;

        return (
            <div className={cn('', {}, className)}>
                {first &&
                    <ProductCardFeaturesTop
                        className={cn('top', {}, classNameTop)}
                        params={first.children}
                        socialIcons={this.props.socialIcons}
                    />
                }
                {rest.map((param: IShowcaseParams, index: number) =>
                    <ProductCardFeaturesBottom
                        className={cn('bottom', {}, classNameBottom)}
                        params={param.children}
                        title={param.value}
                        key={index}
                    />
                )}
            </div>
        );
    }
}

export default ProductCardFeatures;
