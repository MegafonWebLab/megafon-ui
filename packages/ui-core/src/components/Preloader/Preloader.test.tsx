import * as React from 'react';
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import Preloader from './Preloader';

const PRELOADER_DELAY = 250;

const dataAttrs = {
    root: {
        'data-testid': 'root',
    },
};

describe('<Preloader />', () => {
    beforeAll(() => {
        jest.useFakeTimers();
    });

    const updatePreloaderTimer = (adjustMs = PRELOADER_DELAY) => {
        act(() => {
            jest.advanceTimersByTime(adjustMs);
        });
    };

    it('should render Preloader', async () => {
        const { container } = render(<Preloader />);

        updatePreloaderTimer();

        expect(container).toMatchSnapshot();
    });

    it('should not render Preloader until 250ms passed', async () => {
        const { queryByTestId } = render(<Preloader dataAttrs={dataAttrs} />);

        updatePreloaderTimer(PRELOADER_DELAY - 50);

        expect(queryByTestId('root')).not.toBeInTheDocument();
    });

    it('should render with sizes', () => {
        const { getByTestId } = render(
            <Preloader
                sizeAll="small"
                sizeMobile="small"
                sizeTablet="small"
                sizeDesktop="small"
                sizeWide="small"
                dataAttrs={dataAttrs}
            />,
        );

        updatePreloaderTimer();

        expect(getByTestId('root')).toHaveClass(
            'mfui-preloader_size-all_small',
            'mfui-preloader_size-wide_small',
            'mfui-preloader_size-desktop_small',
            'mfui-preloader_size-tablet_small',
            'mfui-preloader_size-mobile_small',
        );
    });

    it('should render with color', () => {
        const { getByTestId } = render(<Preloader color="black" dataAttrs={dataAttrs} />);

        updatePreloaderTimer();

        expect(getByTestId('root')).toHaveClass('mfui-preloader_color_black');
    });
});
