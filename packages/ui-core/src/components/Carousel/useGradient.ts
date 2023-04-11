import { CSSProperties, useState, useEffect } from 'react';
import { breakpoints } from '@megafon/ui-helpers';
import throttle from 'lodash.throttle';
import SwiperCore from 'swiper';
import throttleTime from 'constants/throttleTime';
import { SlidesSettingsType } from './Carousel';

type SwiperConfig = {
    instance: SwiperCore | undefined;
    slidesSettings: SlidesSettingsType;
    isLocked: boolean;
};

export default (gradient: boolean, swiper: SwiperConfig): CSSProperties => {
    const [slidesGap, setSlidesGap] = useState(0);

    const { instance: swiperInstance, slidesSettings, isLocked } = swiper;

    const isGradientEnable = gradient && !isLocked;

    useEffect(() => {
        const isTouch = window.innerWidth < breakpoints.DESKTOP_SMALL_START;
        const isPossibleToSetGap = isGradientEnable && swiperInstance && !isTouch;

        if (!isPossibleToSetGap) {
            return undefined;
        }

        const setCurrenSlidesGap = () => {
            const currentBreakpoint = (swiperInstance as SwiperCore).getBreakpoint(slidesSettings);
            const currentSpaceBetweenValue = slidesSettings[currentBreakpoint].spaceBetween;

            setSlidesGap(currentSpaceBetweenValue);
        };

        setCurrenSlidesGap();

        const throttledHandler = throttle(setCurrenSlidesGap, throttleTime.resize);

        window.addEventListener('resize', throttledHandler);

        return () => {
            window.removeEventListener('resize', throttledHandler);
        };
    }, [gradient, slidesSettings, swiperInstance, isLocked, isGradientEnable]);

    const gradientStyles = {
        '--gap': `${slidesGap}px`,
    } as CSSProperties;

    return isGradientEnable ? gradientStyles : {};
};
