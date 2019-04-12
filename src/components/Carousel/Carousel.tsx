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
    isArrows: boolean;
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
            isArrows: false,
        };
    }

    componentDidMount() {
        const { initialSlide } = this.props.options;
        const isNextActive = initialSlide !== this.props.children.length - 1;

        this.handleArrowsShow();
        window.addEventListener('touchstart', this.touchStart);
        window.addEventListener('touchmove', this.preventTouch, this.noPassiveOption);
        window.addEventListener('resize', this.handleArrowsShow);

        this.setState({
            isPrevActive: !!initialSlide,
            isNextActive,
        });
    }

    componentWillUnmount() {
        window.removeEventListener('touchstart', this.touchStart);
        window.removeEventListener('touchmove', this.preventTouch, this.noPassiveOption);
        window.removeEventListener('resize', this.handleArrowsShow);
    }

    getSlider = (slider: any): void => {
        this.slider = slider;
    }

    handleClickNext = () => {
        const { onClickNext } = this.props;
        onClickNext && onClickNext();
        this.slider.slickNext();
    }

    handleClickPrev = () => {
        const { onClickPrev } = this.props;
        onClickPrev && onClickPrev();
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

    handleResponciveArrowsShow = (breakpoints, desktopArrows, desktopSlides, childsAmount) => {
        const windowWidth = window.outerWidth;
        let isResponciveArrows;

        breakpoints.map((gap, index) => {
            const {
                breakpoint,
                settings: { slidesToShow, arrows },
            } = gap;
            const isThisResolution = breakpoint >= windowWidth;
            const isNextBreakpoint = !!breakpoints[index + 1] &&
                windowWidth > breakpoints[index + 1].breakpoint;
            const slidesToShowValue = slidesToShow ? slidesToShow : desktopSlides;
            const isShowArrows = isThisResolution &&
                gap.settings.hasOwnProperty('arrows') ? arrows : desktopArrows;
            const isArrows = isShowArrows && slidesToShowValue < childsAmount;
            const isLast = index + 1 === breakpoints.length;

            if ((isNextBreakpoint && isThisResolution) || (isThisResolution && isLast)) {
                isResponciveArrows = isArrows;
            }
        });

        return isResponciveArrows;
    }

    handleArrowsShow = () => {
        const {
            children,
            options: { slidesToShow, responsive, arrows },
        } = this.props;
        const childsAmount = children.length;
        const responsiveArrows = !!responsive.length &&
            this.handleResponciveArrowsShow(responsive, arrows, slidesToShow, childsAmount);
        const isArrows = responsiveArrows !== undefined ?
            responsiveArrows :
            arrows && slidesToShow < childsAmount;

        this.setState({ isArrows });
    }

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
