import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import AudioPlayer, { IAudioPlayerProps } from '../AudioPlayer';
import type { IAudioProgressProps } from '../AudioProgress';
import type { IAudioVolumeProps } from '../AudioVolume';

const requiredProps: IAudioPlayerProps = {
    audioSrc: 'test audioSrc',
    audioTitle: 'test audioTitle',
};

const audioMock = {
    currentTime: 10,
    duration: 100,
    volume: 0.3,
    ended: false,
    muted: false,
    play: jest.fn(),
    pause: jest.fn(),
};

const setIsPlaying = jest.fn();
const setIsPause = jest.fn();

const setMockedState = ({ isPlaying = false, isPause = false } = {}): void => {
    jest.spyOn(React, 'useState').mockImplementationOnce(() => [isPlaying, setIsPlaying]);
    jest.spyOn(React, 'useState').mockImplementationOnce(() => [isPause, setIsPause]);
};

const getWrapper = (additionalProps?: Partial<IAudioPlayerProps>): ShallowWrapper =>
    shallow(<AudioPlayer {...requiredProps} {...additionalProps} />);

describe('<AudioPlayer />', () => {
    const mockUseRef = (): void => {
        jest.spyOn(React, 'useRef').mockImplementationOnce(() => ({ current: audioMock }));
    };

    afterEach(() => jest.clearAllMocks());
    afterAll(() => jest.restoreAllMocks());

    describe('snapshots', () => {
        it('should render component', () => {
            setMockedState();

            const wrapper = getWrapper();
            expect(wrapper).toMatchSnapshot();
        });

        it('should render component when isPlaying', () => {
            setMockedState({ isPlaying: true });

            const wrapper = getWrapper();
            expect(wrapper).toMatchSnapshot();
        });
    });

    describe('handlePLay', () => {
        it('should update state: isPlaying to true and isPause to false and call audio play', () => {
            mockUseRef();
            setMockedState({ isPause: true });

            const wrapper = getWrapper();
            wrapper.find('.mfui-audio-player__button').simulate('click');

            expect(setIsPlaying).toBeCalledWith(true);
            expect(setIsPause).toBeCalledWith(false);
            expect(audioMock.play).toBeCalled();
        });
    });

    describe('handlePause', () => {
        it('should update state: isPlaying to false and isPause to true and call audio pause', () => {
            mockUseRef();
            setMockedState({ isPlaying: true });

            const wrapper = getWrapper();
            wrapper.find('.mfui-audio-player__button').simulate('click');

            expect(setIsPlaying).toBeCalledWith(false);
            expect(setIsPause).toBeCalledWith(true);
            expect(audioMock.pause).toBeCalled();
        });
    });

    describe('handleChangeAudioCurrentTime', () => {
        it('should update audio currentTime', () => {
            const currentTime = 40;

            mockUseRef();
            setMockedState();

            const wrapper = getWrapper();
            const AudioProgressProps = wrapper.find('AudioProgress').props() as IAudioProgressProps;
            AudioProgressProps.onChangeAudioCurrentTime(currentTime);

            expect(audioMock.currentTime).toBe(currentTime);
        });
    });

    describe('handleChangeAudioVolume', () => {
        it('should update audio volume and audio muted to false', () => {
            const volume = 0.8;

            mockUseRef();
            setMockedState();

            const wrapper = getWrapper();
            const AudioVolumeProps = wrapper.find('AudioVolume').props() as IAudioVolumeProps;
            AudioVolumeProps.onChangeAudioVolume(volume);

            expect(audioMock.volume).toBe(volume);
            expect(audioMock.muted).toBe(false);
        });

        it('should audio muted to true', () => {
            const volume = 0;

            mockUseRef();
            setMockedState();

            const wrapper = getWrapper();
            const AudioVolumeProps = wrapper.find('AudioVolume').props() as IAudioVolumeProps;
            AudioVolumeProps.onChangeAudioVolume(volume);

            expect(audioMock.muted).toBe(true);
        });
    });
});
