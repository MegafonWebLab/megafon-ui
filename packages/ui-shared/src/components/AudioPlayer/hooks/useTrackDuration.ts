import React from 'react';

const useTrackDuration = (audioRef: React.RefObject<HTMLAudioElement>): number => {
    const [trackDuration, setTrackDuration] = React.useState(0);

    React.useEffect(() => {
        const audioNode = audioRef.current;

        if (!audioNode) {
            return;
        }

        const { readyState, duration } = audioNode;

        if (readyState > 0) {
            setTrackDuration(Math.round(duration));
        } else {
            audioNode.onloadedmetadata = e => {
                const el = e.target as HTMLAudioElement;

                setTrackDuration(Math.round(el.duration));
            };
        }
    }, [audioRef]);

    return trackDuration;
};

export default useTrackDuration;
