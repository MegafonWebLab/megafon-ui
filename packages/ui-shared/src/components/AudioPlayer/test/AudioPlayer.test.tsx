import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import AudioPlayer, { IAudioPlayerProps } from '../AudioPlayer';

const requiredProps: IAudioPlayerProps = {
    audioSrc: 'test audioSrc',
    audioTitle: 'test audioTitle',
};

const playMock = jest.fn();
const pauseMock = jest.fn();

window.HTMLMediaElement.prototype.play = playMock;
window.HTMLMediaElement.prototype.pause = pauseMock;

jest.mock('@megafon/ui-core/dist/lib/components/Tooltip/Tooltip', () => ({ children }) => (
    <div data-name="Tooltip">{children}</div>
));

describe('AudioPlayer', () => {
    afterEach(() => jest.clearAllMocks());
    afterAll(() => jest.restoreAllMocks());

    it('should render component', () => {
        const { container } = render(<AudioPlayer {...requiredProps} />);

        expect(container).toMatchSnapshot();
    });

    it('should render with left position', () => {
        render(<AudioPlayer {...requiredProps} position="left" />);

        const rootEl = screen.getByTestId('AudioPlayer');

        expect(rootEl).toHaveClass('mfui-audio-player_position_left');
    });

    it('should render with full width property', () => {
        render(<AudioPlayer {...requiredProps} isFullWidth />);

        const rootEl = screen.getByTestId('AudioPlayer');

        expect(rootEl).toHaveClass('mfui-audio-player_full-width');
    });

    it('should play and pause audio after click on control button', () => {
        render(<AudioPlayer {...requiredProps} />);

        const btn = screen.getByTestId('AudioPlayer-btn');

        fireEvent.click(btn);
        expect(playMock).toBeCalled();

        fireEvent.click(btn);
        expect(pauseMock).toBeCalled();
    });

    it('should change audio current time', () => {
        render(<AudioPlayer {...requiredProps} />);

        const audioProgress = screen.getByTestId('AudioTimeRange');
        fireEvent.change(audioProgress, { target: { value: 50 } });

        const audio: HTMLMediaElement = screen.getByTestId('AudioPlayer-audio');
        expect(audio.currentTime).toBe(50);
    });

    it('should change audio volume', () => {
        render(<AudioPlayer {...requiredProps} />);

        const audioVolumeRange = screen.getByTestId('AudioVolumeRange');
        fireEvent.change(audioVolumeRange, { target: { value: 0.5 } });

        const audio: HTMLMediaElement = screen.getByTestId('AudioPlayer-audio');
        expect(audio.volume).toBe(0.5);
    });
});
