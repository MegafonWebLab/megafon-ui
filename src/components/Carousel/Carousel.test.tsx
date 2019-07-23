import * as React from 'react';
import { shallow } from 'enzyme';
import Carousel, { ICarouselProps } from './Carousel';
import Link from '../Link/Link';

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
        <Link />,
        <Link />,
    ],
    onClickNext: jest.fn(),
    onClickPrev: jest.fn(),
}

describe('<Carousel />', () => {
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
        });

        it('should set isNextActive as true and isPrevActive as false', () => {
            const wrapper = shallow(<Carousel {...props} />);

            expect(wrapper.state('isNextActive')).toBeTruthy();
            expect(wrapper.state('isPrevActive')).toBeFalsy();
        });
    });
});
