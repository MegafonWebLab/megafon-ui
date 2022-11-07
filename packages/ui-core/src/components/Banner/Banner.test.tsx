import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Banner, { IBannerProps, NavTheme } from './Banner';
import { DemoSlide } from './doc/Banner.docz';

const props: IBannerProps = {
    className: 'custom-class',
    classes: {
        slide: 'slide',
        arrow: 'arrows',
    },
    dataAttrs: {
        root: {
            'data-testid': 'root',
        },
        swiper: {
            'data-testid': 'swiper',
        },
        slide: {
            'data-testid': 'slide',
        },
        arrowPrev: {
            'data-testid': 'arrowPrev',
        },
        arrowNext: {
            'data-testid': 'arrowNext',
        },
        pagination: {
            'data-testid': 'pagination',
        },
        dot: {
            'data-testid': 'dot',
        },
    },
    loop: true,
    autoPlay: true,
    autoPlayDelay: 1000,
    navTheme: NavTheme.DARK,
    autoHeight: true,
    withPaginationBottomOffset: true,
    onNextClick: jest.fn(),
    onPrevClick: jest.fn(),
    onDotClick: jest.fn(),
    onChange: jest.fn(),
};

describe('<Banner />', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render Banner', () => {
        const { container } = render(
            <Banner {...props}>
                <DemoSlide>1</DemoSlide>
                <DemoSlide>2</DemoSlide>
            </Banner>,
        );

        expect(container).toMatchSnapshot();
    });

    it('should render with classes', () => {
        const { queryByTestId } = render(
            <Banner {...props} loop={false}>
                <DemoSlide>1</DemoSlide>
                <DemoSlide>2</DemoSlide>
            </Banner>,
        );

        expect(queryByTestId('slide[1]')).toHaveClass('slide');
        expect(queryByTestId('arrowPrev')).toHaveClass('arrows');
        expect(queryByTestId('arrowNext')).toHaveClass('arrows');
        expect(queryByTestId('root')).toHaveClass('custom-class');
    });

    it('should render with dataAttrs', () => {
        const { queryByTestId } = render(
            <Banner {...props} loop={false}>
                <DemoSlide>1</DemoSlide>
                <DemoSlide>2</DemoSlide>
            </Banner>,
        );

        expect(queryByTestId('root')).toBeTruthy();
        expect(queryByTestId('swiper')).toBeTruthy();
        expect(queryByTestId('slide[1]')).toBeTruthy();
        expect(queryByTestId('arrowNext')).toBeTruthy();
        expect(queryByTestId('arrowPrev')).toBeTruthy();
        expect(queryByTestId('pagination')).toBeTruthy();
        expect(queryByTestId('dot[1]')).toBeTruthy();
    });

    it('should render when withPaginationBottomOffset is true', () => {
        const { getByTestId } = render(
            <Banner {...props}>
                <DemoSlide>1</DemoSlide>
                <DemoSlide>2</DemoSlide>
            </Banner>,
        );

        expect(getByTestId('pagination')).toHaveClass('mfui-banner__pagination_bottom-offset');
    });

    it('should render when autoHeight is true', () => {
        const { getByTestId } = render(
            <Banner {...props}>
                <DemoSlide>1</DemoSlide>
                <DemoSlide>2</DemoSlide>
            </Banner>,
        );

        expect(getByTestId('root')).toHaveClass('mfui-banner_auto-height');
    });

    it('should render when navTheme is dark', () => {
        const { getByTestId } = render(
            <Banner {...props} navTheme="dark">
                <DemoSlide>1</DemoSlide>
                <DemoSlide>2</DemoSlide>
            </Banner>,
        );

        expect(getByTestId('root')).toHaveClass('mfui-banner_nav-theme_dark');
        expect(getByTestId('pagination')).toHaveClass('mfui-banner__pagination_theme_dark');
        expect(getByTestId('arrowNext')).toHaveClass('mfui-nav-arrow_theme_dark');
        expect(getByTestId('arrowPrev')).toHaveClass('mfui-nav-arrow_theme_dark');
    });

    it('should render when navTheme is light', () => {
        const { getByTestId } = render(
            <Banner {...props} navTheme="light">
                <DemoSlide>1</DemoSlide>
                <DemoSlide>2</DemoSlide>
            </Banner>,
        );

        expect(getByTestId('root')).toHaveClass('mfui-banner_nav-theme_light');
        expect(getByTestId('pagination')).toHaveClass('mfui-banner__pagination_theme_light');
        expect(getByTestId('arrowNext')).toHaveClass('mfui-nav-arrow_theme_purple');
        expect(getByTestId('arrowPrev')).toHaveClass('mfui-nav-arrow_theme_purple');
    });

    it('should render when navTheme is green', () => {
        const { getByTestId } = render(
            <Banner {...props} navTheme="green">
                <DemoSlide>1</DemoSlide>
                <DemoSlide>2</DemoSlide>
            </Banner>,
        );

        expect(getByTestId('root')).toHaveClass('mfui-banner_nav-theme_green');
        expect(getByTestId('pagination')).toHaveClass('mfui-banner__pagination_theme_green');
        expect(getByTestId('arrowNext')).toHaveClass('mfui-nav-arrow_theme_purple');
        expect(getByTestId('arrowPrev')).toHaveClass('mfui-nav-arrow_theme_purple');
    });

    it('should call onChange', () => {
        const { getByTestId } = render(
            <Banner {...props} loop={false} autoPlay={false}>
                <DemoSlide>1</DemoSlide>
                <DemoSlide>2</DemoSlide>
            </Banner>,
        );

        fireEvent.click(getByTestId('arrowNext'));

        expect(props.onChange).toBeCalledWith(1);
    });

    it('should call onNextClick', () => {
        const { getByTestId } = render(
            <Banner {...props}>
                <DemoSlide>1</DemoSlide>
                <DemoSlide>2</DemoSlide>
            </Banner>,
        );

        fireEvent.click(getByTestId('arrowNext'));

        expect(props.onNextClick).toBeCalled();
    });

    it('should call onPrevClick', () => {
        const { getByTestId } = render(
            <Banner {...props}>
                <DemoSlide>1</DemoSlide>
                <DemoSlide>2</DemoSlide>
                <DemoSlide>3</DemoSlide>
            </Banner>,
        );

        fireEvent.click(getByTestId('arrowPrev'));

        expect(props.onPrevClick).toBeCalled();
    });

    it('should call onDotClick', async () => {
        const { getByTestId } = render(
            <Banner {...props}>
                <DemoSlide>1</DemoSlide>
                <DemoSlide>2</DemoSlide>
            </Banner>,
        );

        fireEvent.click(getByTestId('dot[2]'));

        expect(props.onDotClick).toBeCalled();
    });
});
