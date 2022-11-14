import React, { createRef } from 'react';
import { detectTouch } from '@megafon/ui-helpers';
import Balance from '@megafon/ui-icons/basic-24-balance_24.svg';
import { act, fireEvent, render } from '@testing-library/react';
import Button from './Button';

jest.mock('@megafon/ui-helpers', () => ({
    ...jest.requireActual('@megafon/ui-helpers'),
    detectTouch: jest.fn().mockReturnValue(false),
}));

const dataAttrs = {
    root: {
        'data-testid': 'root',
    },
    content: {
        'data-testid': 'content',
    },
    inner: {
        'data-testid': 'inner',
    },
    loader: {
        'data-testid': 'loader',
    },
    text: {
        'data-testid': 'text',
    },
    arrow: {
        'data-testid': 'arrow',
    },
};

describe('<Button />', () => {
    afterAll(() => jest.restoreAllMocks());

    it('should render Button', () => {
        const { container } = render(<Button icon={<Balance />}>Title</Button>);

        expect(container).toMatchSnapshot();
    });

    it('should render with classes', () => {
        const { getByTestId } = render(
            <Button
                className="custom-class"
                classes={{ root: 'root-class', content: 'content-class', inner: 'inner-class' }}
                dataAttrs={dataAttrs}
            >
                Title
            </Button>,
        );

        expect(getByTestId('root')).toHaveClass('root-class');
        expect(getByTestId('content')).toHaveClass('content-class');
        expect(getByTestId('inner')).toHaveClass('inner-class');
    });

    it('should render with dataAttrs', () => {
        const { queryByTestId } = render(
            <Button showArrow dataAttrs={dataAttrs}>
                Title
            </Button>,
        );

        expect(queryByTestId('root')).toBeTruthy();
        expect(queryByTestId('content')).toBeTruthy();
        expect(queryByTestId('inner')).toBeTruthy();
        expect(queryByTestId('text')).toBeTruthy();
        expect(queryByTestId('arrow')).toBeTruthy();
    });

    it('should render with loader dataAttrs', () => {
        jest.useFakeTimers();

        const { queryByTestId } = render(
            <Button showLoader dataAttrs={dataAttrs}>
                Title
            </Button>,
        );

        act(() => {
            jest.runAllTimers();
        });

        expect(queryByTestId('loader')).toBeTruthy();

        jest.clearAllTimers();
    });

    it('should render with sizes', () => {
        const { getByTestId } = render(
            <Button
                sizeAll="large"
                sizeWide="large"
                sizeDesktop="large"
                sizeTablet="large"
                sizeMobile="large"
                dataAttrs={dataAttrs}
            >
                Title
            </Button>,
        );

        expect(getByTestId('root')).toHaveClass('mfui-button_size-all_large');
        expect(getByTestId('root')).toHaveClass('mfui-button_size-wide_large');
        expect(getByTestId('root')).toHaveClass('mfui-button_size-desktop_large');
        expect(getByTestId('root')).toHaveClass('mfui-button_size-tablet_large');
        expect(getByTestId('root')).toHaveClass('mfui-button_size-mobile_large');
    });

    it('should render when fullWidth is true', () => {
        const { getByTestId } = render(
            <Button fullWidth dataAttrs={dataAttrs}>
                Title
            </Button>,
        );

        expect(getByTestId('root')).toHaveClass('mfui-button_full-width');
    });

    it('should render when showLoader is true', () => {
        jest.useFakeTimers();

        const { queryByTestId } = render(
            <Button showLoader dataAttrs={dataAttrs}>
                Title
            </Button>,
        );

        act(() => {
            jest.runAllTimers();
        });

        expect(queryByTestId('loader')).toBeInTheDocument();

        jest.useRealTimers();
    });

    it('should render when showArrow is true and icon is missing', () => {
        const { queryByTestId } = render(
            <Button showArrow dataAttrs={dataAttrs}>
                Title
            </Button>,
        );

        expect(queryByTestId('arrow')).toBeInTheDocument();
    });

    it('should render when showArrow is true and icon is passed', () => {
        const { queryByTestId } = render(
            <Button showArrow icon={<Balance data-testid="icon" />} dataAttrs={dataAttrs}>
                Title
            </Button>,
        );

        expect(queryByTestId('arrow')).not.toBeInTheDocument();
        expect(queryByTestId('icon')).toBeInTheDocument();
    });

    it('should render when ellipsis is true', () => {
        const { queryByTestId } = render(
            <Button ellipsis dataAttrs={dataAttrs}>
                Title
            </Button>,
        );

        expect(queryByTestId('content')).toHaveClass('mfui-button__content_ellipsis');
        expect(queryByTestId('text')).toHaveClass('mfui-button__text_ellipsis');
    });

    it('should render on desktop devices', () => {
        (detectTouch as jest.Mock).mockReturnValueOnce(false);

        const { getByTestId } = render(<Button dataAttrs={dataAttrs}>Title</Button>);

        expect(getByTestId('root')).toHaveClass('mfui-button_no-touch');
    });

    it('should render on mobile devices', () => {
        (detectTouch as jest.Mock).mockReturnValueOnce(true);

        const { getByTestId } = render(<Button dataAttrs={dataAttrs}>Title</Button>);

        expect(getByTestId('root')).not.toHaveClass('mfui-button_no-touch');
    });

    describe('theme and type', () => {
        it('should render with black theme and primary type', () => {
            jest.useFakeTimers();

            const { getByTestId } = render(
                <Button theme="black" type="primary" showLoader dataAttrs={dataAttrs}>
                    Title
                </Button>,
            );

            act(() => {
                jest.runAllTimers();
            });

            expect(getByTestId('root')).toHaveClass('mfui-button_type_primary');
            expect(getByTestId('root')).toHaveClass('mfui-button_theme_green');
            expect(getByTestId('loader')).toHaveClass('mfui-preloader_color_default');

            jest.useRealTimers();
        });

        it('should render with white theme and primary type', () => {
            jest.useFakeTimers();

            const { getByTestId } = render(
                <Button theme="white" type="primary" showLoader dataAttrs={dataAttrs}>
                    Title
                </Button>,
            );

            act(() => {
                jest.runAllTimers();
            });

            expect(getByTestId('root')).toHaveClass('mfui-button_type_primary');
            expect(getByTestId('root')).toHaveClass('mfui-button_theme_white');
            expect(getByTestId('loader')).toHaveClass('mfui-preloader_color_default');

            jest.useRealTimers();
        });

        it('should render with green theme and primary type', () => {
            jest.useFakeTimers();

            const { getByTestId } = render(
                <Button theme="green" type="primary" showLoader dataAttrs={dataAttrs}>
                    Title
                </Button>,
            );

            act(() => {
                jest.runAllTimers();
            });

            expect(getByTestId('root')).toHaveClass('mfui-button_type_primary');
            expect(getByTestId('root')).toHaveClass('mfui-button_theme_green');
            expect(getByTestId('loader')).toHaveClass('mfui-preloader_color_white');

            jest.useRealTimers();
        });

        it('should render with purple theme and primary type', () => {
            jest.useFakeTimers();

            const { getByTestId } = render(
                <Button theme="purple" type="primary" showLoader dataAttrs={dataAttrs}>
                    Title
                </Button>,
            );

            act(() => {
                jest.runAllTimers();
            });

            expect(getByTestId('root')).toHaveClass('mfui-button_type_primary');
            expect(getByTestId('root')).toHaveClass('mfui-button_theme_purple');
            expect(getByTestId('loader')).toHaveClass('mfui-preloader_color_white');

            jest.useRealTimers();
        });

        it('should render with black theme and outline type', () => {
            jest.useFakeTimers();

            const { getByTestId } = render(
                <Button theme="black" type="outline" showLoader dataAttrs={dataAttrs}>
                    Title
                </Button>,
            );

            act(() => {
                jest.runAllTimers();
            });

            expect(getByTestId('root')).toHaveClass('mfui-button_type_outline');
            expect(getByTestId('root')).toHaveClass('mfui-button_theme_black');
            expect(getByTestId('loader')).toHaveClass('mfui-preloader_color_black');

            jest.useRealTimers();
        });

        it('should render with white theme and outline type', () => {
            jest.useFakeTimers();

            const { getByTestId } = render(
                <Button theme="white" type="outline" showLoader dataAttrs={dataAttrs}>
                    Title
                </Button>,
            );

            act(() => {
                jest.runAllTimers();
            });

            expect(getByTestId('root')).toHaveClass('mfui-button_type_outline');
            expect(getByTestId('root')).toHaveClass('mfui-button_theme_white');
            expect(getByTestId('loader')).toHaveClass('mfui-preloader_color_white');

            jest.useRealTimers();
        });

        it('should render with green theme and outline type', () => {
            jest.useFakeTimers();

            const { getByTestId } = render(
                <Button theme="green" type="outline" showLoader dataAttrs={dataAttrs}>
                    Title
                </Button>,
            );

            act(() => {
                jest.runAllTimers();
            });

            expect(getByTestId('root')).toHaveClass('mfui-button_type_outline');
            expect(getByTestId('root')).toHaveClass('mfui-button_theme_green');
            expect(getByTestId('loader')).toHaveClass('mfui-preloader_color_default');

            jest.useRealTimers();
        });

        it('should render with purple theme and outline type', () => {
            jest.useFakeTimers();

            const { getByTestId } = render(
                <Button theme="purple" type="outline" showLoader dataAttrs={dataAttrs}>
                    Title
                </Button>,
            );

            act(() => {
                jest.runAllTimers();
            });

            expect(getByTestId('root')).toHaveClass('mfui-button_type_outline');
            expect(getByTestId('root')).toHaveClass('mfui-button_theme_purple');
            expect(getByTestId('loader')).toHaveClass('mfui-preloader_color_default');

            jest.useRealTimers();
        });
    });

    describe('href', () => {
        it('should render with href', () => {
            const { getByTestId } = render(
                <Button href="test.com" dataAttrs={dataAttrs}>
                    Title
                </Button>,
            );

            expect(getByTestId('root').nodeName).toBe('A');
            expect(getByTestId('root')).toHaveAttribute('href', 'test.com');
        });

        it('should render without href', () => {
            const { getByTestId } = render(<Button dataAttrs={dataAttrs}>Title</Button>);

            expect(getByTestId('root').nodeName).toBe('BUTTON');
            expect(getByTestId('root')).not.toHaveAttribute('href');
        });
    });

    describe('download', () => {
        it('should render when download is true and href is passed', () => {
            const { getByTestId } = render(
                <Button download href="test.com" dataAttrs={dataAttrs}>
                    Title
                </Button>,
            );

            expect(getByTestId('root')).toHaveAttribute('download');
        });

        it('should render when download is false and href is passed', () => {
            const { getByTestId } = render(
                <Button download={false} href="test.com" dataAttrs={dataAttrs}>
                    Title
                </Button>,
            );

            expect(getByTestId('root')).not.toHaveAttribute('download');
        });

        it('should render when download is true and href is missing', () => {
            const { getByTestId } = render(
                <Button download dataAttrs={dataAttrs}>
                    Title
                </Button>,
            );

            expect(getByTestId('root')).not.toHaveAttribute('download');
        });
    });

    describe('disabled', () => {
        it('should render when disabled is true and href is passed', () => {
            const { getByTestId } = render(
                <Button disabled href="test.com" dataAttrs={dataAttrs}>
                    Title
                </Button>,
            );

            expect(getByTestId('root')).not.toHaveAttribute('disabled');
        });

        it('should render when download is false and href is passed', () => {
            const { getByTestId } = render(
                <Button disabled={false} href="test.com" dataAttrs={dataAttrs}>
                    Title
                </Button>,
            );

            expect(getByTestId('root')).not.toHaveAttribute('download');
        });

        it('should render when disabled is true and href is missing', () => {
            const { getByTestId } = render(
                <Button disabled dataAttrs={dataAttrs}>
                    Title
                </Button>,
            );

            expect(getByTestId('root')).toHaveAttribute('disabled');
        });
    });

    describe('target', () => {
        it('should render when target and href is passed', () => {
            const { getByTestId } = render(
                <Button target="_blank" href="test.com" dataAttrs={dataAttrs}>
                    Title
                </Button>,
            );

            expect(getByTestId('root')).toHaveAttribute('target', '_blank');
        });

        it('should render when target is passed and href is missing', () => {
            const { getByTestId } = render(
                <Button target="_blank" dataAttrs={dataAttrs}>
                    Title
                </Button>,
            );

            expect(getByTestId('root')).not.toHaveAttribute('target');
        });
    });

    describe('rel', () => {
        it('should render when rel is passed and href is missing', () => {
            const { getByTestId } = render(
                <Button rel="contact" dataAttrs={dataAttrs}>
                    Title
                </Button>,
            );

            expect(getByTestId('root')).not.toHaveAttribute('rel');
        });

        it('should render when rel and href are passed', () => {
            const { getByTestId } = render(
                <Button rel="contact" href="test.com" dataAttrs={dataAttrs}>
                    Title
                </Button>,
            );

            expect(getByTestId('root')).toHaveAttribute('rel', 'contact');
        });

        it('should render when rel is missing and target is different from _self', () => {
            const { getByTestId } = render(
                <Button target="_blank" href="test.com" dataAttrs={dataAttrs}>
                    Title
                </Button>,
            );

            expect(getByTestId('root')).toHaveAttribute('rel', 'noreferrer noopener');
        });
    });

    describe('actionType', () => {
        it('should render when actionType and href are passed', () => {
            const { getByTestId } = render(
                <Button actionType="submit" href="test.com" dataAttrs={dataAttrs}>
                    Title
                </Button>,
            );

            expect(getByTestId('root')).not.toHaveAttribute('type');
        });

        it('should render when actionType is passed and href is missing', () => {
            const { getByTestId } = render(
                <Button actionType="submit" dataAttrs={dataAttrs}>
                    Title
                </Button>,
            );

            expect(getByTestId('root')).toHaveAttribute('type', 'submit');
        });
    });

    it('should call onClick props', () => {
        const onClick = jest.fn();
        const { getByTestId } = render(<Button onClick={onClick} dataAttrs={dataAttrs} />);

        fireEvent.click(getByTestId('root'));

        expect(onClick).toBeCalled();
    });

    it('should return a reference to the element', () => {
        const ref: React.RefObject<HTMLButtonElement> = createRef();

        render(<Button buttonRef={ref} />);

        if (ref.current === null) {
            throw new Error('No ref');
        }

        expect(ref.current.type).toBe('button');
    });
});
