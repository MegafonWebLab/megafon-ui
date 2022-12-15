import React from 'react';
import { cnCreate } from '@megafon/ui-helpers';
import AudioRange from './AudioRange';
import { timerFormat } from './utils';
import './style/AudioProgress.less';

export const INTERVAL_DELAY = 1000;

export interface IAudioProgressProps {
    audioRef: React.MutableRefObject<HTMLAudioElement | null>;
    audioTitle: string;
    isPlaying: boolean;
    isPause: boolean;
    onChangeAudioCurrentTime: (currentTime: number) => void;
    onPLay: () => void;
    onSetIsPlaying: (value: boolean) => void;
}

const cn = cnCreate('mfui-audio-progress');
const AudioProgress: React.FC<IAudioProgressProps> = ({
    audioRef,
    audioTitle,
    isPlaying,
    isPause,
    onChangeAudioCurrentTime,
    onPLay,
    onSetIsPlaying,
}) => {
    const intervalId = React.useRef<NodeJS.Timeout | null>(null);

    const [trackDuration, setTrackDuration] = React.useState<number>(0);
    const [trackProgress, setTrackProgress] = React.useState<number>(0);

    const progressColorPercent: number = React.useMemo(
        () => (trackProgress / trackDuration) * 100,
        [trackDuration, trackProgress],
    );
    const progressValue: number = React.useMemo(
        () => (isPlaying || isPause ? trackProgress : trackDuration),
        [isPause, isPlaying, trackDuration, trackProgress],
    );

    const handleStartTimer = React.useCallback(() => {
        intervalId.current && clearInterval(intervalId.current);

        intervalId.current = setInterval(() => {
            if (audioRef.current?.ended) {
                onSetIsPlaying(false);
                setTrackProgress(Math.floor(audioRef.current?.duration || 0));

                return;
            }

            setTrackProgress(Math.floor(audioRef.current?.currentTime || 0));
        }, INTERVAL_DELAY);
    }, [audioRef, onSetIsPlaying]);

    const handleScrubProgress = (e: React.ChangeEvent<HTMLInputElement>) => {
        const currentTime = Number(e.target.value);

        setTrackProgress(currentTime);
        onChangeAudioCurrentTime(currentTime);
    };

    const handleScrubEndProgress = () => {
        if (!isPlaying) {
            onPLay();
        }

        handleStartTimer();
    };

    React.useEffect(() => {
        setTrackProgress(Math.floor(audioRef?.current?.currentTime || 0));
    }, [audioRef]);

    React.useEffect(() => {
        const audioNode = audioRef.current;

        if (audioNode) {
            audioNode.onloadedmetadata = () => {
                setTrackDuration(Math.round(audioNode.duration));
            };
        }
    }, [audioRef]);

    React.useEffect(() => {
        if (isPlaying) {
            handleStartTimer();
        }

        if (isPause) {
            intervalId.current && clearInterval(intervalId.current);
        }
    }, [handleStartTimer, isPause, isPlaying]);

    React.useEffect(
        () => (): void => {
            intervalId.current && clearInterval(intervalId.current);
        },
        [],
    );

    return (
        <div className={cn()}>
            <div className={cn('info')}>
                <span className={cn('title')}>{audioTitle}</span>
                <span className={cn('value')}>{timerFormat(progressValue)}</span>
            </div>
            <div className={cn('range-wrapper')}>
                <AudioRange
                    className={cn('range')}
                    maxValue={trackDuration}
                    value={trackProgress}
                    step="1"
                    colorPercent={progressColorPercent || 0}
                    onChange={handleScrubProgress}
                    onMouseUp={handleScrubEndProgress}
                    onTouchEnd={handleScrubEndProgress}
                />
            </div>
        </div>
    );
};

export default AudioProgress;
