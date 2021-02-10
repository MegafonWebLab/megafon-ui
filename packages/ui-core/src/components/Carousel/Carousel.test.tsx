import * as React from 'react';
import { shallow, mount } from 'enzyme';
import cnCreate from '../../utils/cnCreate';
import Carousel, { ICarouselProps, NavTheme } from './Carousel';
import { DemoSlide } from './doc/Carousel.docz';

const props = {
    classes: {
        root: 'class',
        innerIndents: 'inner-indents-class',
    },
    loop: true,
    autoPlay: true,
    autoPlayDelay: 1000,
    navTheme: NavTheme.GREEN,
    noSwipingSelector: 'button',
    onNextClick: jest.fn(),
    onPrevClick: jest.fn(),
    onChange: jest.fn(),
} as ICarouselProps;

const cnCarousel = cnCreate('.mfui-beta-carousel');

describe('<Carousel />', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render with default props', () => {
        const wrapper = shallow(
            <Carousel>
                <DemoSlide>1</DemoSlide>
                <DemoSlide>2</DemoSlide>
            </Carousel>
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
                <DemoSlide>1</DemoSlide>
                <DemoSlide>2</DemoSlide>
            </Carousel>
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('should call onNextClick', () => {
        const wrapper = mount(
            <Carousel {...props}>
                <DemoSlide>1</DemoSlide>
                <DemoSlide>2</DemoSlide>
            </Carousel>
        );

        wrapper
            .find(cnCarousel('arrow'))
            .last()
            .simulate('click');

        expect(props.onNextClick).toBeCalled();
    });

    it('should call onPrevClick', () => {
        const wrapper = mount(
            <Carousel {...props}>
                <DemoSlide>1</DemoSlide>
                <DemoSlide>2</DemoSlide>
            </Carousel>
        );

        wrapper
            .find(cnCarousel('arrow'))
            .first()
            .simulate('click');

        expect(props.onPrevClick).toBeCalled();
    });

    it('should call onChange', () => {
        const wrapper = mount(
            <Carousel {...props}>
                <DemoSlide>1</DemoSlide>
                <DemoSlide>2</DemoSlide>
            </Carousel>
        );

        wrapper
            .find(cnCarousel('arrow'))
            .last()
            .simulate('click');

        expect(props.onChange).toBeCalled();
    });
});
