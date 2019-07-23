import * as React from 'react';
import * as PropTypes from 'prop-types';
import { cnCreate } from '../../utils/cn';
import './Carousel.less';
import CarouselArrow from './CarouselArrow';
import Slider from 'react-slick';
import * as throttle from 'lodash.throttle';

interface ICarouselOptions {
  slidesToShow: number;
  responsive?: ICarouselOptionsResponsive[];
  arrows?: boolean;
  initialSlide?: number;
}

interface ICarouselOptionsResponsive {
  breakpoint: number;
  settings: Pick<ICarouselOptions, 'slidesToShow' | 'arrows'>;
}

export interface ICarouselProps {
    className?: string;
    options: ICarouselOptions;
    children: any;
    onClickNext?: () => void;
    onClickPrev?: () => void;
}

interface ICarouselState {
    isPrevActive: boolean;
    isNextActive: boolean;
    isArrows: boolean;
    showSlides: number;
}

interface IResponsiveData {
    hasResponsiveArrows?: boolean;
    currentSlides?: number;
}

const cn = cnCreate('mfui-carousel');
class Carousel extends React.Component<ICarouselProps, ICarouselState> {
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
            isArrows: true,
            showSlides: 0,
        };
    }

    componentDidMount() {
        const {
            options: { initialSlide },
            children,
        } = this.props;
        const { showSlides } = this.state;

        const slidesShown: number = (children.length - 1) - showSlides;
        const isNextActive: boolean = initialSlide !== slidesShown;

        this.handleCarouselParams();
        window.addEventListener('touchstart', this.touchStart);
        window.addEventListener('touchmove', this.preventTouch, this.noPassiveOption);
        window.addEventListener('resize', this.throttledHandleCarouselParams);

        this.setState({
            isPrevActive: !!initialSlide,
            isNextActive,
        });
    }

    componentWillUnmount() {
        window.removeEventListener('touchstart', this.touchStart);
        window.removeEventListener('touchmove', this.preventTouch, this.noPassiveOption);
        window.removeEventListener('resize', this.throttledHandleCarouselParams);
    }

    getSlider = (slider: any): void => {
        this.slider = slider;
    }

    handleClickNext = (): void => {
        const { onClickNext } = this.props;

        onClickNext && onClickNext();
        this.slider.slickNext();
    }

    handleClickPrev = (): void => {
        const { onClickPrev } = this.props;

        onClickPrev && onClickPrev();
        this.slider.slickPrev();
    }

    handleChange = (slideIndex: number) => {
        const { children } = this.props;
        const { showSlides } = this.state;

        const isNextActive = slideIndex !== children.length - showSlides;

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

    getResponsiveData = (breakpoints, desktopArrows: boolean, desktopSlides: number, childsAmount: number) => {
        const windowWidth = window.outerWidth;
        const breakpointsLength = breakpoints.length;
        let responsiveData: IResponsiveData = {};

        breakpoints.forEach((gap, index: number) => {
            const {
                breakpoint,
                settings: { slidesToShow, arrows },
            } = gap;
            const currentIndex = index + 1;
            const isThisResolution = breakpoint >= windowWidth;
            const isNextBreakpoint = !!breakpoints[currentIndex] &&
                windowWidth > breakpoints[currentIndex].breakpoint;

            const slidesToShowValue = slidesToShow ? slidesToShow : desktopSlides;
            const isShowArrows = isThisResolution &&
                gap.settings.hasOwnProperty('arrows') ? arrows : desktopArrows;
            const isArrows = isShowArrows && slidesToShowValue < childsAmount;
            const isLast = currentIndex === breakpointsLength;

            if ((isNextBreakpoint && isThisResolution) || (isThisResolution && isLast)) {
                responsiveData = { hasResponsiveArrows: isArrows, currentSlides: slidesToShowValue };
            }
        });

        return responsiveData;
    }

    handleCarouselParams = () => {
        const {
            children,
            options: { slidesToShow, responsive, arrows = true },
        } = this.props;
        const childsAmount = children.length;
        const { hasResponsiveArrows, currentSlides } = this.getResponsiveData(
            responsive,
            arrows,
            slidesToShow,
            childsAmount,
        );
        const isArrows = hasResponsiveArrows !== undefined ?
            hasResponsiveArrows :
            arrows && slidesToShow < childsAmount;
        const showSlides = currentSlides || slidesToShow;

        this.setState({ isArrows, showSlides });
    }

    throttledHandleCarouselParams = (): void => throttle(this.handleCarouselParams, 20);

    renderArrows() {
        const { isPrevActive, isNextActive } = this.state;

        return (
            <div className={cn('arrows')}>
                <CarouselArrow
                    className={cn('arrow', { 'arrow-prev': true, disabled: !isPrevActive })}
                    onClick={this.handleClickPrev}
                />
                <CarouselArrow
                    className={cn('arrow', { 'arrow-next': true, disabled: !isNextActive })}
                    onClick={this.handleClickNext}
                />
            </div>
        );
    }

    render() {
        const { className, options, children } = this.props;
        const { isArrows } = this.state;
        const { arrows, ...carouselOptions } = options;

        return (
            <div className={cn('', {}, className)}>
                {isArrows && this.renderArrows()}
                <Slider
                    {...carouselOptions}
                    arrows={false}
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
