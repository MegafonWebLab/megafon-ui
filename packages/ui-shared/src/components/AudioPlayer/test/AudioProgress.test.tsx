import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import AudioProgress, { IAudioProgressProps } from '../AudioProgress';
import type { IAudioRangeProps } from '../AudioRange';

jest.useFakeTimers();

const audioRefMock = {
    current: {
        currentTime: 10,
        duration: 100,
        ended: false,
    },
} as React.MutableRefObject<HTMLAudioElement>;

const props: IAudioProgressProps = {
    audioRef: audioRefMock,
    audioTitle: 'test audioTitle',
    isPlaying: false,
    isPause: false,
    onChangeAudioCurrentTime: jest.fn(),
    onPLay: jest.fn(),
    onSetIsPlaying: jest.fn(),
};

const setTrackDuration = jest.fn();
const setTrackProgress = jest.fn();

const setMockedState = ({ trackDuration = 0, trackProgress = 0 } = {}): void => {
    jest.spyOn(React, 'useState').mockImplementationOnce(() => [trackDuration, setTrackDuration]);
    jest.spyOn(React, 'useState').mockImplementationOnce(() => [trackProgress, setTrackProgress]);
};

const getWrapper = (additionalProps?: Partial<IAudioProgressProps>): ShallowWrapper =>
    shallow(<AudioProgress {...props} {...additionalProps} />);

describe('<AudioProgress />', () => {
    const mockUseEffect = (): void => {
        jest.spyOn(React, 'useEffect').mockImplementationOnce(f => f());
    };

    const mockUseRef = (intervalId: number): void => {
        jest.spyOn(React, 'useRef').mockImplementationOnce(() => ({ current: intervalId }));
    };

    afterEach(() => jest.clearAllMocks());
    afterAll(() => jest.restoreAllMocks());

    describe('snapshots', () => {
        it('should render component', () => {
            setMockedState();

            const wrapper = getWrapper();
            expect(wrapper).toMatchSnapshot();
        });
    });

    describe('handleScrubEndProgress', () => {
        it('should call handleStartTimer and call onPLay when isPlaying to false', () => {
            setMockedState();

            const wrapper = getWrapper();
            jest.runOnlyPendingTimers();
            const AudioRangeProps = wrapper.find('AudioRange').props() as IAudioRangeProps;
            AudioRangeProps.onMouseUp && AudioRangeProps.onMouseUp();

            expect(setInterval).toBeCalledWith(expect.any(Function), 1000);
            expect(props.onPLay).toBeCalled();
        });

        it('should call clearInterval and not call handlePLay', () => {
            const intervalId = 1234;

            mockUseRef(intervalId);
            setMockedState();

            const wrapper = getWrapper({ isPlaying: true });
            const AudioRangeProps = wrapper.find('AudioRange').props() as IAudioRangeProps;
            AudioRangeProps.onMouseUp && AudioRangeProps.onMouseUp();

            expect(clearInterval).toBeCalledWith(intervalId);
            expect(props.onPLay).not.toBeCalled();
        });
    });

    describe('useEffect', () => {
        beforeEach(() => {
            mockUseEffect();
            mockUseEffect();
            mockUseEffect();
        });

        it('should call handleStartTimer when isPlaying to true', () => {
            setMockedState();

            getWrapper({ isPlaying: true });
            jest.runOnlyPendingTimers();

            expect(setInterval).toBeCalledWith(expect.any(Function), 1000);
        });

        it('should call clearInterval when isPause to true', () => {
            const intervalId = 1234;

            mockUseRef(intervalId);
            setMockedState();

            getWrapper({ isPause: true });

            expect(clearInterval).toBeCalledWith(intervalId);
        });
    });

    describe('useEffectCallback', () => {
        let cleanupFunc: ReturnType<React.EffectCallback>;

        beforeEach(() => {
            jest.spyOn(React, 'useEffect').mockImplementationOnce(f => f());
            jest.spyOn(React, 'useEffect').mockImplementationOnce(f => f());
            jest.spyOn(React, 'useEffect').mockImplementation(func => {
                cleanupFunc = func();
            });
        });

        it('should call clearInterval', () => {
            const intervalId = 1234;

            mockUseRef(intervalId);
            setMockedState();

            const wrapper = getWrapper();

            cleanupFunc && cleanupFunc();
            wrapper.unmount();

            expect(clearInterval).toBeCalledWith(intervalId);
        });
    });
});
