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
        <Link key={3} />,
        <Link key={4} />,
        <Link key={5} />,
    ],
    onClickNext: jest.fn(),
    onClickPrev: jest.fn(),
};

const event = {
    touches: [
        {
            clientX: 10,
        },
    ],
    preventDefault: jest.fn(),
    returnValue: true,
};

describe('<Carousel />', () => {
    beforeEach(() => {
        // @ts-ignore
        throttle = jest.fn();
    });

    afterEach(() => {
        // @ts-ignore
        throttle = originalThrottle;
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
    });

    describe('componentDidMount tests', () => {
        afterEach(() => {
            jest.resetAllMocks();
        });

        it('should call three event listeners', () => {
            const addEventListener = jest.spyOn(window, 'addEventListener');

            const wrapper = shallow(<Carousel {...props} />);
            const instance = wrapper.instance() as Carousel;

            expect(addEventListener).toHaveBeenCalledTimes(3);
            expect(addEventListener).toBeCalledWith('touchstart', instance.touchStart);
            expect(addEventListener).toBeCalledWith('touchmove', instance.preventTouch, instance.noPassiveOption);
            expect(addEventListener).toBeCalledWith('resize', instance.throttledHandleCarouselParams);

            addEventListener.mockRestore();
        });

        it('should set isNextActive as true and isPrevActive as false', () => {
            const wrapper = shallow(<Carousel {...props} />);

            expect(wrapper.state('isNextActive')).toBeTruthy();
            expect(wrapper.state('isPrevActive')).toBeFalsy();
        });

        it('should set isNextActive as false and isPrevActive as true', () => {
            const { options } = props;
            const localProps = {
                ...props,
                options: {
                    ...options,
                    initialSlide: 4,
                },
            };

            const wrapper = shallow(<Carousel {...localProps} />);

            expect(wrapper.state('isNextActive')).toBeFalsy();
            expect(wrapper.state('isPrevActive')).toBeTruthy();
        });
    });

    describe('componentWillUnmount tests', () => {
        afterEach(() => {
            jest.resetAllMocks();
        });

        it('should remove three event listeners', () => {
            const removeEventListener = jest.spyOn(window, 'removeEventListener');

            const wrapper = shallow(<Carousel {...props} />);
            const instance = wrapper.instance() as Carousel;

            instance.componentWillUnmount();

            expect(removeEventListener).toHaveBeenCalledTimes(3);
            expect(removeEventListener).toBeCalledWith('touchstart', instance.touchStart);
            expect(removeEventListener).toBeCalledWith('touchmove', instance.preventTouch, instance.noPassiveOption);
            expect(removeEventListener).toBeCalledWith('resize', instance.throttledHandleCarouselParams);

            removeEventListener.mockRestore();
        });
    });

    describe('getSlider tests', () => {
        it('should set correct ref', () => {
            const wrapper = mount(<Carousel {...props} />);
            const instance = wrapper.instance() as Carousel;
            // @ts-ignore
            const slider = wrapper.find('Slider').props().ref;

            instance.getSlider(slider);

            expect(instance.slider).toEqual(slider);
        });
    });

    describe('handleClickNext tests', () => {
        afterEach(() => {
            jest.resetAllMocks();
        });

        it('should call onClickNext and slickNext from slider', () => {
            const { onClickNext } = props;

            const wrapper = mount(<Carousel {...props} />);
            const instance = wrapper.instance() as Carousel;
            const slickNext = jest.spyOn(instance.slider, 'slickNext');

            instance.forceUpdate();
            instance.handleClickNext();

            expect(onClickNext).toHaveBeenCalledTimes(1);
            expect(slickNext).toHaveBeenCalledTimes(1);
        });

        it('should not call onClickNext', () => {
            const { onClickNext, ...localProps } = props;

            const wrapper = mount(<Carousel {...localProps} />);
            const instance = wrapper.instance() as Carousel;
            const slickNext = jest.spyOn(instance.slider, 'slickNext');

            instance.forceUpdate();
            instance.handleClickNext();

            expect(onClickNext).not.toBeCalled();
            expect(slickNext).toHaveBeenCalledTimes(1);
        });
    });

    describe('handleClickPrev tests', () => {
        afterEach(() => {
            jest.resetAllMocks();
        });

        it('should call onClickPrev and slickPrev from slider', () => {
            const { onClickPrev } = props;

            const wrapper = mount(<Carousel {...props} />);
            const instance = wrapper.instance() as Carousel;
            const slickPrev = jest.spyOn(instance.slider, 'slickPrev');

            instance.forceUpdate();
            instance.handleClickPrev();

            expect(onClickPrev).toHaveBeenCalledTimes(1);
            expect(slickPrev).toHaveBeenCalledTimes(1);
        });

        it('should not call onClickPrev', () => {
            const { onClickPrev, ...localProps } = props;

            const wrapper = mount(<Carousel {...localProps} />);
            const instance = wrapper.instance() as Carousel;
            const slickPrev = jest.spyOn(instance.slider, 'slickPrev');

            instance.forceUpdate();
            instance.handleClickPrev();

            expect(onClickPrev).not.toBeCalled();
            expect(slickPrev).toHaveBeenCalledTimes(1);
        });
    });

    describe('handleChange tests', () => {
        it('should set isPrevActive as false and isNextActive as true', () => {
            const wrapper = mount(<Carousel {...props} />);
            const instance = wrapper.instance() as Carousel;

            instance.handleChange(0);

            expect(wrapper.state('isPrevActive')).toBeFalsy();
            expect(wrapper.state('isNextActive')).toBeTruthy();
        });

        it('should set isPrevActive as true and isNextActive as false', () => {
            const wrapper = mount(<Carousel {...props} />);
            const instance = wrapper.instance() as Carousel;

            instance.handleChange(1);

            expect(wrapper.state('isPrevActive')).toBeTruthy();
            expect(wrapper.state('isNextActive')).toBeFalsy();
        });
    });

    describe('touchStart tests', () => {
        it('should set correct firstClientX', () => {
            const wrapper = mount(<Carousel {...props} />);
            const instance = wrapper.instance() as Carousel;

            // @ts-ignore
            instance.touchStart(event);

            expect(instance.firstClientX).toEqual(10);
        });
    });

    describe('preventTouch tests', () => {
        it('should set clientX correctly', () => {
            const localEvent = {
                ...event,
                touches: [
                    {
                        clientX: 22,
                    },
                ],
            };

            const wrapper = mount(<Carousel {...props} />);
            const instance = wrapper.instance() as Carousel;

            instance.firstClientX = 20;
            // @ts-ignore
            instance.preventTouch(localEvent);

            expect(instance.clientX).toEqual(2);
        });

        it('should be called with return false', () => {
            const { preventDefault } = event;

            const wrapper = mount(<Carousel {...props} />);
            const instance = wrapper.instance() as Carousel;

            instance.firstClientX = 20;
            // @ts-ignore
            instance.preventTouch(event);

            expect(preventDefault).toHaveBeenCalledTimes(1);
        });
    });
});
