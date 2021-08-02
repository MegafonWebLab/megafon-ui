import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { cnCreate } from '@megafon/ui-helpers';
import Banner, { IBannerProps, NavTheme } from './Banner';
import { DemoSlide } from './doc/Banner.docz';

const props = {
    className: 'custom-class',
    classes: {
        slide: 'slide',
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

const cnBanner = cnCreate('.mfui-beta-banner');
const cnBannerDot = cnCreate('.mfui-beta-banner-dot');

describe('<Banner />', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render with default props', () => {
        const wrapper = shallow(
            <Banner>
                <DemoSlide>1</DemoSlide>
                <DemoSlide>2</DemoSlide>
            </Banner>
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('should render with props', () => {
        const wrapper = shallow(
            <Banner {...props}>
                <DemoSlide>1</DemoSlide>
                <DemoSlide>2</DemoSlide>
            </Banner>
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('should call onChange', async () => {
        const wrapper = mount(
            <Banner {...props}>
                <DemoSlide>1</DemoSlide>
                <DemoSlide>2</DemoSlide>
            </Banner>
        );

        wrapper.find(cnBanner('arrow')).last().simulate('click');

        expect(props.onChange).toBeCalled();
    });

    it('should call onNextClick', async () => {
        const wrapper = mount(
            <Banner {...props}>
                <DemoSlide>1</DemoSlide>
                <DemoSlide>2</DemoSlide>
            </Banner>
        );

        wrapper.find(cnBanner('arrow')).last().simulate('click');

        expect(props.onNextClick).toBeCalled();
    });

    it('should call onPrevClick', async () => {
        const wrapper = mount(
            <Banner {...props}>
                <DemoSlide>1</DemoSlide>
                <DemoSlide>2</DemoSlide>
            </Banner>
        );

        wrapper.find(cnBanner('arrow')).first().simulate('click');

        expect(props.onPrevClick).toBeCalled();
    });

    it('should call onDotClick', async () => {
        const wrapper = mount(
            <Banner {...props}>
                <DemoSlide>1</DemoSlide>
                <DemoSlide>2</DemoSlide>
            </Banner>
        );

        wrapper.find(cnBannerDot()).last().simulate('click');

        expect(props.onDotClick).toBeCalled();
    });
});
