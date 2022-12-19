import React from 'react';
import { Button } from '@megafon/ui-core';
import { cnCreate } from '@megafon/ui-helpers';
import AudioProgress from './AudioProgress';
import AudioVolume from './AudioVolume';
import IconPause from './i/pause.svg';
import IconPlay from './i/play.svg';
import './style/AudioPlayer.less';

export interface IAudioPlayerProps {
    audioSrc: string;
    audioTitle: string;
    position?: 'left' | 'center' | 'right';
    isFullWidth?: boolean;
}

const cn = cnCreate('mfui-audio-player');
const AudioPlayer: React.FC<IAudioPlayerProps> = ({ audioSrc, audioTitle, position = 'center', isFullWidth }) => {
    const audioRef = React.useRef<HTMLAudioElement | null>(null);

    const [isPlaying, setIsPlaying] = React.useState<boolean>(false);
    const [isPause, setIsPause] = React.useState<boolean>(false);

    const handlePLay = () => {
        setIsPlaying(true);
        setIsPause(false);

        audioRef.current?.play();
    };

    const handlePause = () => {
        setIsPlaying(false);
        setIsPause(true);

        audioRef.current?.pause();
    };

    const handleChangeAudioCurrentTime = (currentTime: number) => {
        if (!audioRef || !audioRef.current) {
            return;
        }

        audioRef.current.currentTime = currentTime;
    };

    const handleChangeAudioVolume = (volume: number) => {
        if (!audioRef || !audioRef.current) {
            return;
        }

        audioRef.current.volume = volume;
        audioRef.current.muted = !volume;
    };

    const playingIconHandleClick: () => void = React.useMemo(() => (isPlaying ? handlePause : handlePLay), [isPlaying]);

    return (
        <div className={cn({ 'full-width': isFullWidth, position })}>
            <div className={cn('player')}>
                {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                <audio className={cn('audio')} ref={audioRef} controls={false}>
                    <source src={audioSrc} type="audio/mpeg" />
                </audio>
                <div className={cn('playing-controls')}>
                    <Button
                        icon={isPlaying ? <IconPause /> : <IconPlay />}
                        onClick={playingIconHandleClick}
                        sizeAll="small"
                        className={cn('button')}
                    />
                </div>
                <AudioProgress
                    audioRef={audioRef}
                    audioTitle={audioTitle}
                    isPlaying={isPlaying}
                    isPause={isPause}
                    onChangeAudioCurrentTime={handleChangeAudioCurrentTime}
                    onPLay={handlePLay}
                    onSetIsPlaying={setIsPlaying}
                />
                <AudioVolume onChangeAudioVolume={handleChangeAudioVolume} />
            </div>
        </div>
    );
};

export default AudioPlayer;
