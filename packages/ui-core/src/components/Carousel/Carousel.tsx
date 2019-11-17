import * as React from 'react';
import * as PropTypes from 'prop-types';
import cnCreate from 'utils/cn';
import './Carousel.less';
import CarouselArrow from './CarouselArrow';
import Slider from 'react-slick';
import throttle from 'lodash.throttle';

interface ICarouselOptions {
    slidesToShow: number;
    responsive?: ICarouselOptionsResponsive[];
    arrows?: boolean;
    initialSlide?: number;
    theme?: string;
    arrowColor?: string;
}

interface ICarouselOptionsResponsive {
    breakpoint: number;
    settings: Pick<ICarouselOptions, 'slidesToShow' | 'arrows'>;
}

export interface ICarouselProps {
    className?: string;
    options: ICarouselOptions;
    theme?: string;
    arrowColor?: string;
    children: any;
    onClickNext?: () => void;
    onClickPrev?: () => void;
    onAfterChange?: (index: number) => void;
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
        theme: PropTypes.oneOf(['default', 'landing', 'showcase']),
        arrowColor: PropTypes.oneOf(['white']),
        children: PropTypes.node,
        onClickNext: PropTypes.func,
        onClickPrev: PropTypes.func,
        onAfterChange: PropTypes.func,
    };

    static defaultProps = {
        responsive: true,
    };

    firstClientX: number;
    clientX: number;
    noPassiveOption: any = { passive: false };
    slider: any;
    throttledResizeEvents: () => void;

    constructor(props: ICarouselProps) {
        super(props);

        this.throttledResizeEvents = throttle(this.resizeEvents, 20);
        this.state = {
            isPrevActive: false,
            isNextActive: true,
            isArrows: true,
            showSlides: 0,
            scrollSlides: 0,
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
        window.addEventListener('resize', this.throttledResizeEvents);

        this.setState({
            isPrevActive: !!initialSlide,
            isNextActive,
        });
    }

    componentWillUnmount() {
        window.removeEventListener('touchstart', this.touchStart);
        window.removeEventListener('touchmove', this.preventTouch, this.noPassiveOption);
        window.removeEventListener('resize', this.throttledResizeEvents);
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
        const { onAfterChange } = this.props;

        this.updateArrowsState(slideIndex);
        onAfterChange && onAfterChange(slideIndex);
    }

    updateArrowsState(slideIndex: number) {
        const { children } = this.props;
        const { showSlides } = this.state;

        const isNextActive = (slideIndex + showSlides) < children.length;

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
        const windowWidth = window.innerWidth;
        const breakpointsLength = breakpoints.length;
        let responsiveData: IResponsiveData = {};

        breakpoints.forEach((gap, index: number) => {
            const {
                breakpoint,
                settings: {
                    slidesToShow,
                    slidesToScroll,
                    arrows,
                },
            } = gap;
            const nextIndex = index + 1;
            const isThisResolution = breakpoint >= windowWidth;
            const isNextBreakpoint = !!breakpoints[nextIndex] &&
                windowWidth > breakpoints[nextIndex].breakpoint;

            const slidesToShowValue = slidesToShow || desktopSlides;
            const isShowArrows = isThisResolution &&
                gap.settings.hasOwnProperty('arrows') ? arrows : desktopArrows;
            const isArrows = isShowArrows && slidesToShowValue < childsAmount;
            const isLast = nextIndex === breakpointsLength;

            if ((isNextBreakpoint && isThisResolution) || (isThisResolution && isLast)) {
                responsiveData = {
                    slidesToScroll,
                    hasResponsiveArrows: isArrows,
                    currentSlides: slidesToShowValue,
                };
            }
        });

        return responsiveData;
    }

    checkIfSlidePositionWasLost = (): void => {
        if (!this.slider) {
            return;
        }
        const { innerSlider: { state: { currentSlide, slideCount } }, slickGoTo } = this.slider;
        const { showSlides = 0, scrollSlides = 0 } = this.state;

        const numberOfSections: number = scrollSlides > 1
            ? Math.ceil(slideCount / scrollSlides)
            : Math.ceil(slideCount - (showSlides - scrollSlides));

        const slidesIndexes: number[] = new Array(slideCount).fill().map((item, i) => i);
        const sectionLength: number = Math.ceil(showSlides);
        const sliderSections: void[][] = new Array(numberOfSections).fill(new Array(sectionLength));

        const sliderSectionsWithSlides: number[][] = sliderSections.map((section, i) => {
            const startIndex = i * scrollSlides;
            return slidesIndexes.slice(startIndex, startIndex + sectionLength);
        });

        const currentSection: number[] = sliderSectionsWithSlides
            .reverse()
            .find(section => section.find(slideIndex => slideIndex === currentSlide));

        if (!currentSection || currentSection[0] === currentSlide) {
            return;
        }

        slickGoTo(currentSection[0]);
    }

    handleCarouselParams = () => {
        const {
            children,
            options: {
                slidesToShow,
                slidesToScroll: nonResponsiveSlidesToScroll,
                responsive,
                arrows = true,
            },
        } = this.props;
        const slider = this.slider || { innerSlider: { state: {} } };
        const { innerSlider: { state: { currentSlide } } } = slider;
        const childsAmount = children.length;
        const { hasResponsiveArrows, currentSlides, slidesToScroll } = this.getResponsiveData(
            responsive,
            arrows,
            slidesToShow,
            childsAmount
        );
        const isArrows = hasResponsiveArrows !== undefined ?
            hasResponsiveArrows :
            arrows && slidesToShow < childsAmount;
        const showSlides = currentSlides || slidesToShow;
        const scrollSlides = slidesToScroll || nonResponsiveSlidesToScroll;

        this.setState(
            { isArrows, showSlides, scrollSlides },
            (): void => {
                this.updateArrowsState(currentSlide);
            }
        );
    }

    resizeEvents = (): void => {
        this.handleCarouselParams();
        this.checkIfSlidePositionWasLost();
    }

    renderArrows() {
        const { theme, arrowColor } = this.props;
        const { isPrevActive, isNextActive } = this.state;

        return (
            <div className={cn('arrows', { theme: theme })}>
                <CarouselArrow
                    className={cn('arrow', { 'arrow-prev': true, disabled: !isPrevActive, fill: arrowColor })}
                    onClick={this.handleClickPrev}
                    theme={theme}
                />
                <CarouselArrow
                    className={cn('arrow', { 'arrow-next': true, disabled: !isNextActive, fill: arrowColor })}
                    onClick={this.handleClickNext}
                    theme={theme}
                />
            </div>
        );
    }

    render() {
        const { className, options, theme, children } = this.props;
        const { isArrows } = this.state;
        const { arrows, ...carouselOptions } = options;

        return (
            <div className={cn('', {theme}, className)}>
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
