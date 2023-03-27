import { fireEvent } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';
import useTrackDuration from '../hooks/useTrackDuration';

describe('useTrackDuration', () => {
    it('should return track duration if content has downloaded', () => {
        const el = document.createElement('audio');

        Object.defineProperties(el, {
            duration: {
                writable: true,
                value: 10,
            },
            readyState: {
                value: 4,
            },
        });

        const { result } = renderHook(() => useTrackDuration({ current: el }));

        expect(result.current).toBe(10);
    });

    it('should return track duration after downloading the content', () => {
        const el = document.createElement('audio');

        Object.defineProperties(el, {
            duration: {
                writable: true,
                value: 20,
            },
            readyState: {
                value: 0,
            },
        });

        const { result } = renderHook(() => useTrackDuration({ current: el }));

        act(() => {
            fireEvent.loadedMetadata(el);
        });

        expect(result.current).toBe(20);
    });
});
