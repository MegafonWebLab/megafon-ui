import * as React from 'react';
import { shallow, mount } from 'enzyme';
import Carousel, { ICarouselProps } from './Carousel';
import Link from '../Link/Link';
import throttle from 'lodash.throttle';

const originalThrottle = throttle;

const props: ICarouselProps = {
    className: 'some-class',
    options: {
        arrows: true,
        dots: true,
        initialSlide: 0,
        slidesToShow: 4,
        responsive: [
            {
                breakpoint: 1000,
                settings: {
                    arrows: false,
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 900,
                settings: {
                    arrows: true,
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 860,
                settings: {
                    arrows: false,
                    slidesToShow: 1,
                },
            },
        ],
    },
    children: [
        <Link key={1} />,
        <Link key={2} />,
    ],
    onClickNext: jest.fn(),
    onClickPrev: jest.fn(),
    onAfterChange: jest.fn(),
    onBeforeChange: jest.fn(),
};

describe('<Carousel />', () => {
    beforeEach(() => {
        // @ts-ignore
        throttle = jest.fn();
    });

    afterEach(() => {
        // @ts-ignore
        throttle = originalThrottle;
        jest.resetAllMocks();
    });

    describe('render tests', () => {
        it('should render component with required props', () => {
            const wrapper = shallow(
                <Carousel
                    options={{ slidesToShow: 2, responsive: [] }}
                    children={[]}
                />
            );

            expect(wrapper).toMatchSnapshot();
        });

        it('should render component with all props', () => {
            const wrapper = shallow(<Carousel {...props} />);

            expect(wrapper).toMatchSnapshot();
        });

        it('should render component with prev arrow active and next disabled', () => {
            const wrapper = shallow(<Carousel {...props} />);

            wrapper.setState({ isPrevActive: true, isNextActive: false });

            expect(wrapper).toMatchSnapshot();
        });

        it('should render component with classes props', () => {
            const classesProps = {
                ...props,
                children: [
                    <Link key={1} />,
                    <Link key={2} />,
                    <Link key={3} />,
                    <Link key={4} />,
                    <Link key={5} />,
                ],
                classes: {
                    root: 'root-string',
                    slider: 'slider-cn',
                    leftArrow: 'left-arrow-string',
                    rightArrow: 'right-arrow-string',
                },
            };
            const wrapper = shallow(<Carousel {...classesProps} />);

            expect(wrapper).toMatchSnapshot();
        });
    });

    describe('componentDidMount tests', () => {
        it('should call three event listeners', () => {
            const addEventListener = jest.spyOn(window, 'addEventListener');

            const wrapper = shallow(<Carousel {...props} />);
            const instance = wrapper.instance() as Carousel;

            expect(addEventListener).toHaveBeenCalledTimes(3);
            expect(addEventListener).toBeCalledWith('touchstart', instance.touchStart);
            expect(addEventListener).toBeCalledWith('touchmove', instance.preventTouch, instance.noPassiveOption);
            expect(addEventListener).toBeCalledWith('resize', instance.throttledResizeEvents);

            addEventListener.mockRestore();
        });

        it('should set isNextActive as true and isPrevActive as false', () => {
            const wrapper = shallow(<Carousel {...props} />);

            expect(wrapper.state('isNextActive')).toBeTruthy();
            expect(wrapper.state('isPrevActive')).toBeFalsy();
        });
    });

    describe('onBeforeChange', () => {
        it('is called if slide is changed', () => {
            const wrapper = mount(
                <Carousel {...props} >
                    <Link key={1} />
                    <Link key={2} />
                    <Link key={3} />
                    <Link key={4} />
                    <Link key={5} />
                    <Link key={6} />
                </Carousel>
            );

            wrapper.find('.slick-dots > li > button').last().simulate('click');
            expect(props.onBeforeChange).toBeCalledWith(0, 5);
        });
    });
});
