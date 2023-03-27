import React from 'react';
import { fireEvent, render, screen, act } from '@testing-library/react';
import AudioProgress, { INTERVAL_DELAY } from '../AudioProgress';

jest.useFakeTimers();

const props = {
    audioTitle: 'test audioTitle',
    isPlaying: false,
    isPause: false,
};

describe('<AudioProgress />', () => {
    afterEach(() => jest.clearAllMocks());
    afterAll(() => jest.restoreAllMocks());

    it('should render component with default state', () => {
        const el = document.createElement('audio');
        Object.defineProperties(el, {
            duration: {
                writable: true,
                value: 100,
            },
            currentTime: {
                writable: true,
                value: 0,
            },
        });

        const { container } = render(<AudioProgress {...props} audioRef={{ current: el }} />);
        fireEvent.loadedMetadata(el);

        expect(container).toMatchSnapshot();
    });

    it('should render with playing state', () => {
        const el = document.createElement('audio');
        Object.defineProperties(el, {
            duration: {
                writable: true,
                value: 100,
            },
            currentTime: {
                writable: true,
                value: 10,
            },
        });

        const { container } = render(
            <AudioProgress audioRef={{ current: el }} isPlaying audioTitle="test audioTitle" isPause={false} />,
        );
        fireEvent.loadedMetadata(el);

        expect(container).toMatchSnapshot();
    });

    it('should call callbacks after click on time range', () => {
        const handlePlayMock = jest.fn();
        const handleChangeMock = jest.fn();
        const el = document.createElement('audio');
        Object.defineProperties(el, {
            duration: {
                writable: true,
                value: 100,
            },
        });

        render(
            <AudioProgress
                audioRef={{ current: el }}
                isPlaying={false}
                audioTitle="test audioTitle"
                isPause
                onPlay={handlePlayMock}
                onChangeAudioCurrentTime={handleChangeMock}
            />,
        );
        fireEvent.loadedMetadata(el);

        const timeRange = screen.getByTestId('AudioTimeRange');
        fireEvent.change(timeRange, { target: { value: 10 } });
        fireEvent.mouseUp(timeRange);

        expect(handlePlayMock).toHaveBeenCalled();
        expect(handleChangeMock).toHaveBeenCalledWith(10);
    });

    it('should call callback after the end of the audio', () => {
        const handleSetIsPlayingMock = jest.fn();
        const el = document.createElement('audio');
        Object.defineProperties(el, {
            duration: {
                writable: true,
                value: 100,
            },
            ended: {
                writable: true,
                value: true,
            },
        });

        render(
            <AudioProgress
                audioRef={{ current: el }}
                isPlaying
                audioTitle="test audioTitle"
                isPause={false}
                onSetIsPlaying={handleSetIsPlayingMock}
            />,
        );
        fireEvent.loadedMetadata(el);
        act(() => {
            jest.runTimersToTime(INTERVAL_DELAY);
        });

        expect(handleSetIsPlayingMock).toHaveBeenCalledWith(false);
    });

    it('should set progress during audio playback', () => {
        const el = document.createElement('audio');
        Object.defineProperties(el, {
            duration: {
                writable: true,
                value: 100,
            },
            currentTime: {
                writable: true,
                value: 20,
            },
        });

        render(<AudioProgress audioRef={{ current: el }} isPlaying audioTitle="test audioTitle" isPause={false} />);
        fireEvent.loadedMetadata(el);
        act(() => {
            jest.runTimersToTime(INTERVAL_DELAY);
        });

        const timeRange: HTMLInputElement = screen.getByTestId('AudioTimeRange');

        expect(timeRange.value).toBe('20');
        expect(timeRange).toHaveStyle('background-size: 20% 100%;');
    });
});
