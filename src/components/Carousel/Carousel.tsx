import * as React from 'react';
import * as PropTypes from 'prop-types';
import { cnCreate } from '../../utils/cn';
import './Carousel.less';
import CarouselArrow from './CarouselArrow';
import Slider from 'react-slick';

interface ICarouselProps {
    className: string;
    options: any;
    children: any;
    onClickNext: any;
    onClickPrev: any;
}

const cn = cnCreate('mfui-carousel');
class Carousel extends React.Component<ICarouselProps> {
    static propTypes = {
        className: PropTypes.string,
        options: PropTypes.objectOf(
            PropTypes.oneOfType([
                PropTypes.bool,
                PropTypes.number,
                PropTypes.string,
                PropTypes.array,
            ])
        ),
        children: PropTypes.node,
        onClickNext: PropTypes.func,
        onClickPrev: PropTypes.func,
    };

    handleClickNext = () => {
        const { onClickNext } = this.props;
        onClickNext && onClickNext();
    }

    handleClickPrev = () => {
        const { onClickPrev } = this.props;
        onClickPrev && onClickPrev();
    }

    render() {
        const { className, options, children } = this.props;

        return (
            <div className={cn('', {}, className)}>
                <Slider
                    {...options}
                    nextArrow={<CarouselArrow {...options} onClickArrow={this.handleClickNext} />}
                    prevArrow={<CarouselArrow {...options} onClickArrow={this.handleClickPrev} />}
                >
                    {children}
                </Slider>
            </div>
        );
    }
}

export default Carousel;
