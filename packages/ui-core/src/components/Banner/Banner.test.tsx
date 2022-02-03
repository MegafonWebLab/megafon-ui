import * as React from 'react';
import { cnCreate } from '@megafon/ui-helpers';
import { shallow, mount } from 'enzyme';
import Banner, { IBannerProps, NavTheme } from './Banner';
import { DemoSlide } from './doc/Banner.docz';

const props = {
    className: 'custom-class',
    classes: {
        slide: 'slide',
        arrow: 'arrows',
    },
    dataAttrs: {
        root: {
            'data-test-id': 'test-id',
        },
        swiper: {
            'data-test-id': 'test-id',
        },
        slide: {
            'data-test-id': 'test-id',
        },
        arrowPrev: {
            'data-test-id': 'test-id',
        },
        arrowNext: {
            'data-test-id': 'test-id',
        },
        pagination: {
            'data-test-id': 'test-id',
        },
        dot: {
            'data-test-id': 'test-id',
        },
    },
    loop: true,
    autoPlay: true,
    autoPlayDelay: 1000,
    navTheme: NavTheme.DARK,
    onNextClick: jest.fn(),
    onPrevClick: jest.fn(),
    onDotClick: jest.fn(),
    onChange: jest.fn(),
} as IBannerProps;

const cnBanner = cnCreate('.mfui-banner');
const cnBannerDot = cnCreate('.mfui-banner-dot');

describe('<Banner />', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render with default props', () => {
        const wrapper = shallow(
            <Banner>
                <DemoSlide>1</DemoSlide>
                <DemoSlide>2</DemoSlide>
            </Banner>,
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('should render with props', () => {
        const wrapper = shallow(
            <Banner {...props}>
                <DemoSlide>1</DemoSlide>
                <DemoSlide>2</DemoSlide>
            </Banner>,
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('should call onChange', async () => {
        const wrapper = mount(
            <Banner {...props}>
                <DemoSlide>1</DemoSlide>
                <DemoSlide>2</DemoSlide>
            </Banner>,
        );

        wrapper.find(cnBanner('arrow')).last().simulate('click');

        expect(props.onChange).toBeCalled();
    });

    it('should call onNextClick', async () => {
        const wrapper = mount(
            <Banner {...props}>
                <DemoSlide>1</DemoSlide>
                <DemoSlide>2</DemoSlide>
            </Banner>,
        );

        wrapper.find(cnBanner('arrow')).last().simulate('click');

        expect(props.onNextClick).toBeCalled();
    });

    it('should call onPrevClick', async () => {
        const wrapper = mount(
            <Banner {...props}>
                <DemoSlide>1</DemoSlide>
                <DemoSlide>2</DemoSlide>
            </Banner>,
        );

        wrapper.find(cnBanner('arrow')).first().simulate('click');

        expect(props.onPrevClick).toBeCalled();
    });

    it('should call onDotClick', async () => {
        const wrapper = mount(
            <Banner {...props}>
                <DemoSlide>1</DemoSlide>
                <DemoSlide>2</DemoSlide>
            </Banner>,
        );

        wrapper.find(cnBannerDot()).last().simulate('click');

        expect(props.onDotClick).toBeCalled();
    });
});
