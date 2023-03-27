import React from 'react';
import { Tooltip } from '@megafon/ui-core';
import { cnCreate } from '@megafon/ui-helpers';
import AudioRange from './AudioRange';
import NoVolumeIcon from './i/no-volume.svg';
import VolumeIcon from './i/volume.svg';
import './style/AudioVolume.less';

export interface IAudioVolumeProps {
    onChangeAudioVolume?: (volume: number) => void;
}

const cn = cnCreate('mfui-audio-volume');
const AudioVolume: React.FC<IAudioVolumeProps> = ({ onChangeAudioVolume }) => {
    const tooltipTrigger = React.useRef<HTMLDivElement | null>(null);

    const [trackVolume, setTrackVolume] = React.useState<number>(0.3);

    const volumeColorPercent: number = React.useMemo(() => trackVolume * 100, [trackVolume]);

    const handleScrubVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
        const currentVolume = Number(e.target.value);

        setTrackVolume(currentVolume);
        onChangeAudioVolume?.(currentVolume);
    };

    return (
        <div className={cn()}>
            <div className={cn('icon-area')} ref={tooltipTrigger}>
                <VolumeIcon className={cn('icon', { visible: !!trackVolume })} />
                <NoVolumeIcon className={cn('icon', { visible: !trackVolume })} />
            </div>
            <Tooltip
                classes={{
                    content: `${cn('tooltip-content')}`,
                    contentShadow: `${cn('tooltip-content-shadow')}`,
                }}
                triggerElement={tooltipTrigger}
                triggerEvent="click"
                placement="top"
                paddings="none"
            >
                <AudioRange
                    className={cn('range')}
                    maxValue="1"
                    value={trackVolume}
                    step="0.01"
                    colorPercent={volumeColorPercent || 0}
                    onChange={handleScrubVolume}
                    dataAttrs={{ 'data-testid': 'AudioVolumeRange' }}
                />
            </Tooltip>
        </div>
    );
};

export default AudioVolume;
