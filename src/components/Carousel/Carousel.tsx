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

interface ICarouselState {
    isPrevActive: boolean;
    isNextActive: boolean;
}

const cn = cnCreate('mfui-carousel');
class Carousel extends React.Component<Partial<ICarouselProps>, ICarouselState> {
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

    static defaultProps = {
        responsive: true,
    };

    firstClientX: number;
    clientX: number;
    noPassiveOption: any = { passive: false };
    slider: any;

    constructor(props: ICarouselProps) {
        super(props);

        this.state = {
            isPrevActive: false,
            isNextActive: true,
        };
    }

    componentDidMount() {
        const { initialSlide } = this.props.options;
        const isNextActive = initialSlide !== this.props.children.length - 1;

        window.addEventListener('touchstart', this.touchStart);
        window.addEventListener('touchmove', this.preventTouch, this.noPassiveOption);

        this.setState({
            isPrevActive: !!initialSlide,
            isNextActive,
        });
    }

    componentWillUnmount() {
        window.removeEventListener('touchstart', this.touchStart);
        window.removeEventListener('touchmove', this.preventTouch, this.noPassiveOption);
    }

    getSlider = (slider: any): void => {
        this.slider = slider;
    }

    handleClickNext = () => {
        const { onClickNext } = this.props;
        onClickNext && onClickNext();
    }

    handleClickPrev = () => {
        const { onClickPrev } = this.props;
        onClickPrev && onClickPrev();
    }

    handleCarouselNext = () => {
        this.slider.slickNext();
    }

    handleCarouselPrev = () => {
        this.slider.slickPrev();
    }

    handleChange = slideIndex => {
        const isNextActive = slideIndex !== this.props.children.length - 1;

        this.setState({
            isPrevActive: !!slideIndex,
            isNextActive,
        });
    }

    touchStart(e: TouchEvent): void {
        this.firstClientX = e.touches[0].clientX;
    }

    preventTouch(e: TouchEvent): void | boolean {
        const minValue = 5; // threshold

        this.clientX = e.touches[0].clientX - this.firstClientX;

        // Vertical scrolling does not work when you start swiping horizontally.
        if (Math.abs(this.clientX) > minValue) {
            e.preventDefault();
            e.returnValue = false;
            return false;
        }
    }

    renderArrows() {
        const { isPrevActive, isNextActive } = this.state;

        return (
            <div className={cn('arrows')}>
                <CarouselArrow
                    className={cn('arrow', { 'arrow-prev': true, disabled: !isPrevActive })}
                    onClickArrow={this.handleClickPrev}
                    onClick={this.handleCarouselPrev}
                />
                <CarouselArrow
                    className={cn('arrow', { 'arrow-next': true, disabled: !isNextActive })}
                    onClickArrow={this.handleClickNext}
                    onClick={this.handleCarouselNext}
                />
            </div>
        );
    }

    render() {
        const { className, options, children } = this.props;

        return (
            <div className={cn('', {}, className)}>
                {this.renderArrows()}
                <Slider
                    {...options}
                    ref={this.getSlider}
                    afterChange={this.handleChange}
                >
                    {children}
                </Slider>
            </div>
        );
    }
}

export default Carousel;
