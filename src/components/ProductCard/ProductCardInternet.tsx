import * as React from 'react';
import * as PropTypes from 'prop-types';
import './ProductCardInternet.less';
import Header from '../Header/Header';
import DropdownSocialList from '../DropdownSocialList/DropdownSocialList';
import { cnCreate } from '../../utils/cn';
import { ISocialIcon, IShowcaseChildren } from './ProductCardFeatures';

interface IProductCardInternetProps {
    /** Custom class name */
    className?: string;
    /** Social icons list */
    socialIcons?: Array<Partial<ISocialIcon>>;
    /** Showcase params childrens list */
    params?: Array<Partial<IShowcaseChildren>>;
}

const cn = cnCreate('product-card-internet');
class ProductCardInternet extends React.Component<IProductCardInternetProps, {}> {
    static propTypes = {
        className: PropTypes.string,
        params: PropTypes.array,
        socialIcons: PropTypes.array,
    };

    static defaultProps: IProductCardInternetProps = {
        params: [],
        socialIcons: [],
    };

    render() {
        const { params, socialIcons }: IProductCardInternetProps = this.props;

        return (
            <div className={cn('', {}, this.props.className)} >
                {params!.map((param: IShowcaseChildren, index: number): React.ReactNode =>
                    <div className={cn('inner')} key={param.title + index}>
                        <Header
                            className={cn('title')}
                            as="h3"
                            margin={false}
                        >
                            {param.title}
                        </Header>
                        <div className={cn('text')}>
                            {param.caption}
                        </div>
                        {!!socialIcons!.length && <DropdownSocialList icons={socialIcons!} />}
                    </div>
                )}
            </div>
        );
    }
}

export default ProductCardInternet;
