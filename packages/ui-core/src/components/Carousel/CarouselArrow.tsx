import * as React from 'react';
import * as PropTypes from 'prop-types';
import { cnCreate } from '../../utils/cn';
import './CarouselArrow.less';
import Arrow from 'icons/System/16/Arrow_forward_16.svg';
import ArrowLikeQuote from 'icons/System/16/Arrow_right_16.svg';

interface ICarouselArrowProps {
    className: string;
    onClick: any;
    theme?: string;
}

const cn = cnCreate('mfui-carousel-arrow');
class CarouselArrow extends React.Component<ICarouselArrowProps> {
    static propTypes = {
        className: PropTypes.string,
        onClick: PropTypes.func,
        theme: PropTypes.string,
    };

    renderIcon() {
        const { theme } = this.props;

        switch (theme) {
            case 'showcase':
                return <ArrowLikeQuote />;
            case 'landing':
                return <ArrowLikeQuote />;
            default:
                return <Arrow />;
        }
    }

    render() {
        const { className, onClick } = this.props;

        return (
            <div className={cn('', {}, className)} onClick={onClick}>
                <div className={cn('arrow-icon')}>
                    {this.renderIcon()}
                </div>
            </div>
        );
    }
}

export default CarouselArrow;
