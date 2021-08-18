import { mount, ReactWrapper } from 'enzyme';
import * as React from 'react';
import { act } from 'react-dom/test-utils';
import Preloader from './Preloader';

const PRELOADER_DELAY = 250;

describe('<Preloader />', () => {
    beforeAll(() => {
        jest.useFakeTimers();
    });

    const updatePreloaderTimer = (wrapper: ReactWrapper, adjustMs: number) => {
        act(() => {
            jest.advanceTimersByTime(adjustMs);
            wrapper.update();
        });
    };

    it('it renders Preloader only after 250ms delay', async () => {
        const wrapper = mount(<Preloader />);

        updatePreloaderTimer(wrapper, PRELOADER_DELAY - 50);
        expect(wrapper).toMatchSnapshot();

        updatePreloaderTimer(wrapper, PRELOADER_DELAY + 50);
        expect(wrapper).toMatchSnapshot();
    });

    it('it renders Preloader with small size', () => {
        const wrapper = mount(
            <Preloader sizeAll="small" sizeMobile="small" sizeTablet="small" sizeDesktop="small" sizeWide="small" />,
        );

        updatePreloaderTimer(wrapper, PRELOADER_DELAY);

        expect(wrapper).toMatchSnapshot();
    });

    it('it renders Preloader with black color', () => {
        const wrapper = mount(<Preloader color="black" />);
        updatePreloaderTimer(wrapper, PRELOADER_DELAY);
        expect(wrapper).toMatchSnapshot();
    });

    it('it renders Preloader with white color', () => {
        const wrapper = mount(<Preloader color="white" />);
        updatePreloaderTimer(wrapper, PRELOADER_DELAY);
        expect(wrapper).toMatchSnapshot();
    });

    it('it renders Preloader with custom className', () => {
        const wrapper = mount(<Preloader className="test-class" />);
        updatePreloaderTimer(wrapper, PRELOADER_DELAY);
        expect(wrapper).toMatchSnapshot();
    });
});
