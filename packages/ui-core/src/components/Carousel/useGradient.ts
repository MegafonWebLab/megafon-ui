import { CSSProperties, useState, useEffect } from 'react';
import { breakpoints } from '@megafon/ui-helpers';
import throttle from 'lodash.throttle';
import SwiperCore from 'swiper';
import throttleTime from 'constants/throttleTime';
import { SlidesSettingsType } from './Carousel';

type GradientConfig = {
    enable: boolean;
    color?: string;
};

type SwiperConfig = {
    instance: SwiperCore | undefined;
    slidesSettings: SlidesSettingsType;
    isLocked: boolean;
};

const DEFAULT_GRADIENT_COLOR = '#fff';

export default (gradient: GradientConfig, swiper: SwiperConfig): CSSProperties => {
    const [slidesGap, setSlidesGap] = useState(0);

    const { enable, color } = gradient;
    const { instance: swiperInstance, slidesSettings, isLocked } = swiper;

    const isGradientEnable = enable && !isLocked;

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
    }, [enable, slidesSettings, swiperInstance, isLocked, isGradientEnable]);

    const gradientStyles = {
        '--gap': `${slidesGap}px`,
        '--gradientColor': color || DEFAULT_GRADIENT_COLOR,
    } as CSSProperties;

    return isGradientEnable ? gradientStyles : {};
};
