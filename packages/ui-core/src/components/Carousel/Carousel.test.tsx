import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Carousel, { ICarouselProps, NavTheme, EffectTheme } from './Carousel';
import { DemoSlide } from './doc/Carousel.docz';

const props: ICarouselProps = {
    className: 'custom-class',
    classes: {
        root: 'root-class',
        innerIndents: 'inner-indents-class',
        container: 'container-class',
        containerModifier: 'container-modifier-class-',
        prev: 'prev-class',
        next: 'next-class',
        slide: 'slide-class',
    },
    pagination: {
        el: '.some-el',
    },
    dataAttrs: {
        root: {
            'data-testid': 'root',
        },
        slider: {
            'data-testid': 'slider',
        },
        prev: {
            'data-testid': 'prev',
        },
        next: {
            'data-testid': 'next',
        },
        slide: {
            'data-testid': 'slide',
        },
    },
    loop: false,
    autoPlay: true,
    autoPlayDelay: 1000,
    transitionSpeed: 1000,
    disableTouchMove: true,
    centeredSlides: true,
    navTheme: NavTheme.GREEN,
    effectTheme: EffectTheme.FADE,
    noSwipingSelector: 'button',
    slideToClickedSlide: true,
    onNextClick: jest.fn(),
    onPrevClick: jest.fn(),
    onChange: jest.fn(),
};

describe('<Carousel />', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render Carousel', () => {
        const { container } = render(
            <Carousel {...props}>
                <DemoSlide>1</DemoSlide>
                <DemoSlide>2</DemoSlide>
            </Carousel>,
        );

        expect(container).toMatchSnapshot();
    });

    it('should render with classes', () => {
        const { getByTestId } = render(
            <Carousel {...props}>
                <DemoSlide>1</DemoSlide>
                <DemoSlide>2</DemoSlide>
            </Carousel>,
        );

        expect(getByTestId('root')).toHaveClass('custom-class', 'root-class');
        expect(getByTestId('slider')).toHaveClass(
            'container-class',
            'inner-indents-class',
            'container-modifier-class-initialized',
            'container-modifier-class-fade',
            'container-modifier-class-horizontal',
        );
        expect(getByTestId('slide[1]')).toHaveClass('slide-class');
        expect(getByTestId('next')).toHaveClass('next-class');
        expect(getByTestId('prev')).toHaveClass('prev-class');
    });

    it('should render with navTheme', () => {
        const { getByTestId } = render(
            <Carousel {...props} navTheme="green">
                <DemoSlide>1</DemoSlide>
                <DemoSlide>2</DemoSlide>
            </Carousel>,
        );

        expect(getByTestId('root')).toHaveClass('mfui-carousel_nav-theme_green');
    });

    it('should call onNextClick', () => {
        const { getByTestId } = render(
            <Carousel {...props}>
                <DemoSlide>1</DemoSlide>
                <DemoSlide>2</DemoSlide>
            </Carousel>,
        );

        fireEvent.click(getByTestId('next'));

        expect(props.onNextClick).toBeCalled();
    });

    it('should call onPrevClick', () => {
        const { getByTestId } = render(
            <Carousel {...props}>
                <DemoSlide>1</DemoSlide>
                <DemoSlide>2</DemoSlide>
            </Carousel>,
        );

        fireEvent.click(getByTestId('prev'));

        expect(props.onPrevClick).toBeCalled();
    });

    it('should call onChange', () => {
        const { getByTestId } = render(
            <Carousel {...props}>
                <DemoSlide>1</DemoSlide>
                <DemoSlide>2</DemoSlide>
            </Carousel>,
        );

        fireEvent.click(getByTestId('next'));

        expect(props.onChange).toBeCalled();
    });

    it('should return reference to root element', () => {
        const ref: React.RefObject<HTMLDivElement> = React.createRef();
        render(
            <Carousel {...props} rootRef={ref}>
                <DemoSlide>1</DemoSlide>
            </Carousel>,
        );

        expect(ref.current).not.toBeNull();
    });

    describe('should render with gradient', () => {
        it('and default color', () => {
            const { getByTestId } = render(<Carousel {...props} gradient={{ enable: true }} />);

            const rootEl = getByTestId('root');
            const gap = window.getComputedStyle(rootEl).getPropertyValue('--gap');
            const color = window.getComputedStyle(rootEl).getPropertyValue('--gradientColor');

            expect(getByTestId('slider')).toHaveClass('mfui-carousel__swiper_gradient');
            expect(gap).toBe('20px');
            expect(color).toBe('#fff');
        });

        it('and custom color', () => {
            const { getByTestId } = render(<Carousel {...props} gradient={{ enable: true, color: '#000' }} />);

            const rootEl = getByTestId('root');
            const gap = window.getComputedStyle(rootEl).getPropertyValue('--gap');
            const color = window.getComputedStyle(rootEl).getPropertyValue('--gradientColor');

            expect(getByTestId('slider')).toHaveClass('mfui-carousel__swiper_gradient');
            expect(gap).toBe('20px');
            expect(color).toBe('#000');
        });
    });
});
