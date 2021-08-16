/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable react/jsx-props-no-spreading */
import { cnCreate } from '@megafon/ui-helpers';
import { shallow, mount } from 'enzyme';
import * as React from 'react';
import Carousel, { ICarouselProps, NavTheme, EffectTheme } from './Carousel';
import { DemoSlide } from './doc/Carousel.docz';

const props = {
    className: 'className',
    classes: {
        root: 'rootClass',
        innerIndents: 'innerIndentsClass',
        container: 'container',
        containerModifier: 'containerModifier',
        prev: 'prev',
        next: 'next',
        slide: 'slide',
    },
    pagination: {
        el: '.some-el',
    },
    dataAttrs: {
        'data-test-attr': 'dataValue',
    },
    loop: true,
    autoPlay: true,
    autoPlayDelay: 1000,
    transitionSpeed: 1000,
    disableTouchMove: true,
    centeredSlides: true,
    navTheme: NavTheme.GREEN,
    effectTheme: EffectTheme.FADE,
    noSwipingSelector: 'button',
    onNextClick: jest.fn(),
    onPrevClick: jest.fn(),
    onChange: jest.fn(),
} as ICarouselProps;

const cnCarousel: (param1?: string) => string = cnCreate('.mfui-beta-carousel');

describe('<Carousel />', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render with default props', () => {
        const wrapper = shallow(
            <Carousel>
                <DemoSlide>
                    <b>1</b>
                </DemoSlide>
                <DemoSlide>
                    <b>2</b>
                </DemoSlide>
            </Carousel>,
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('should render with props', () => {
        const wrapper = shallow(
            <Carousel
                {...props}
                slidesSettings={{
                    768: { slidesPerView: 'auto', spaceBetween: 2 },
                }}
            >
                <DemoSlide>
                    <b>1</b>
                </DemoSlide>
                <DemoSlide>
                    <b>2</b>
                </DemoSlide>
            </Carousel>,
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('should call onNextClick', () => {
        const wrapper = mount(
            <Carousel {...props}>
                <DemoSlide>
                    <b>1</b>
                </DemoSlide>
                <DemoSlide>
                    <b>2</b>
                </DemoSlide>
            </Carousel>,
        );

        wrapper.find(cnCarousel('arrow')).last().simulate('click');

        expect(props.onNextClick).toBeCalled();
    });

    it('should call onPrevClick', () => {
        const wrapper = mount(
            <Carousel {...props}>
                <DemoSlide>
                    <b>1</b>
                </DemoSlide>
                <DemoSlide>
                    <b>2</b>
                </DemoSlide>
            </Carousel>,
        );

        wrapper.find(cnCarousel('arrow')).first().simulate('click');

        expect(props.onPrevClick).toBeCalled();
    });

    it('should call onChange', () => {
        const wrapper = mount(
            <Carousel {...props}>
                <DemoSlide>
                    <b>1</b>
                </DemoSlide>
                <DemoSlide>
                    <b>2</b>
                </DemoSlide>
            </Carousel>,
        );

        wrapper.find(cnCarousel('arrow')).last().simulate('click');

        expect(props.onChange).toBeCalled();
    });

    it('should return reference to root element', () => {
        const ref: React.RefObject<HTMLDivElement> = React.createRef();
        mount(
            <Carousel {...props} rootRef={ref}>
                <DemoSlide>
                    <b>1</b>
                </DemoSlide>
            </Carousel>,
        );

        expect(ref.current).not.toBeNull();
    });
});
