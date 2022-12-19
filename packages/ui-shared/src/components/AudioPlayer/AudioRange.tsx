import React from 'react';
import { cnCreate } from '@megafon/ui-helpers';
import './style/AudioRange.less';

export interface IAudioRangeProps {
    className?: string;
    maxValue: number | string;
    value: number;
    step: string;
    colorPercent: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onMouseUp?: () => void;
    onTouchEnd?: () => void;
}

const cn = cnCreate('mfui-audio-range');
const AudioRange: React.FC<IAudioRangeProps> = ({
    className,
    maxValue,
    value,
    step,
    colorPercent,
    onChange,
    onMouseUp,
    onTouchEnd,
}) => (
    <input
        className={cn([className])}
        style={{
            backgroundSize: `${colorPercent}% 100%`,
        }}
        type="range"
        min="0"
        max={maxValue}
        step={step}
        value={value}
        onChange={onChange}
        onMouseUp={onMouseUp}
        onTouchEnd={onTouchEnd}
    />
);

export default AudioRange;
