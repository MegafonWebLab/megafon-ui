import * as React from 'react';
import * as PropTypes from 'prop-types';
import './Banner.less';
import cnCreate from 'utils/cnCreate';
import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import NavArrow, { Theme as ArrowTheme } from 'components/NavArrow/NavArrow';
import BannerDot from './BannerDot';

SwiperCore.use([Autoplay]);

export const NavTheme = {
    LIGHT: 'light',
    GREEN: 'green',
    DARK: 'dark',
} as const;

type NavThemeType = typeof NavTheme[keyof typeof NavTheme];

export interface IBannerProps {
    /** Прокрутка с зацикливанием */
    loop?: boolean;
    /** Автоматическая прокрутка */
    autoPlay?: boolean;
    /** Задержка автоматической прокрутки */
    autoPlayDelay?: number;
    /** Цветовая тема навигации */
    navTheme?: NavThemeType;
    /** Обработчик клика по стрелке "вперед" (должен быть обернут в useCallback) */
    onNextClick?: (index: number) => void;
    /** Обработчик клика по стрелке "назад" (должен быть обернут в useCallback) */
    onPrevClick?: (index: number) => void;
    /** Обработчик клика по точке навигации (должен быть обернут в useCallback) */
    onDotClick?: (index: number) => void;
    /** Обработчик смены слайда (должен быть обернут в useCallback) */
    onChange?: (index: number) => void;
}

const getAutoPlayConfig = (delay: number) => ({
    delay,
    waitForTransition: false,
    disableOnInteraction: false,
    stopOnLastSlide: true,
});

const cn = cnCreate('mfui-beta-banner');
const Banner: React.FC<IBannerProps> = ({
    autoPlay = false,
    autoPlayDelay = 5000,
    loop = false,
    navTheme = NavTheme.LIGHT,
    children = [],
    onNextClick,
    onPrevClick,
    onDotClick,
    onChange,
}) => {
    const [swiperInstance, setSwiperInstance] = React.useState<SwiperCore>();
    const [isBeginning, setBeginning] = React.useState(true);
    const [isEnd, setEnd] = React.useState(false);
    const [isAutoPlaying, setAutoPlayning] = React.useState(autoPlay);
    const [activeIndex, setActiveIndex] = React.useState(0);

    const showDotTimer = loop ? isAutoPlaying : isAutoPlaying && !isEnd;
    const dotTimerDelay = autoPlayDelay / 1000;
    const navArrowTheme =
        navTheme === NavTheme.DARK ? ArrowTheme.DARK : ArrowTheme.PURPLE;

    const handlePrevClick = React.useCallback(() => {
        if (!swiperInstance) {
            return;
        }

        swiperInstance.slidePrev();
        onPrevClick && onPrevClick(swiperInstance.realIndex);
    }, [swiperInstance, onPrevClick]);

    const handleNextClick = React.useCallback(() => {
        if (!swiperInstance) {
            return;
        }

        swiperInstance.slideNext();
        onNextClick && onNextClick(swiperInstance.realIndex);
    }, [swiperInstance, onNextClick]);

    const handleDotClick = React.useCallback((index: number) => {
        if (!swiperInstance) {
            return;
        }

        if (loop) {
            swiperInstance.slideToLoop(index);
        } else {
            swiperInstance.slideTo(index);
        }

        onDotClick && onDotClick(swiperInstance.realIndex);
    }, [swiperInstance, loop, onDotClick]);

    const handleSwiper = React.useCallback((swiper: SwiperCore) => {
        setSwiperInstance(swiper);
    }, []);

    const handleReachBeginning = React.useCallback(() => {
        setBeginning(true);
    }, []);

    const handleReachEnd = React.useCallback(({ params, autoplay }: SwiperCore) => {
        setEnd(true);

        if (!params.loop && autoplay.running) {
            autoplay.stop();
        }
    }, []);

    const handleFromEdge = React.useCallback((swiper: SwiperCore) => {
        setBeginning(swiper.isBeginning);
        setEnd(swiper.isEnd);
    }, []);

    const handleSlideChange = React.useCallback(({ realIndex }: SwiperCore) => {
        setActiveIndex(realIndex);
        onChange && onChange(realIndex);
    }, []);

    const handleAutoplayStop = React.useCallback(() => {
        setAutoPlayning(false);
    }, []);

    return (
        <div className={cn({ 'nav-theme': navTheme })}>
            <Swiper
                className={cn('swiper')}
                loop={loop}
                autoplay={autoPlay ? getAutoPlayConfig(autoPlayDelay) : false}
                onSwiper={handleSwiper}
                onReachBeginning={handleReachBeginning}
                onReachEnd={handleReachEnd}
                onFromEdge={handleFromEdge}
                onSlideChange={handleSlideChange}
                onAutoplayStop={handleAutoplayStop}
            >
                {React.Children.map(children, (child, i) => (
                    <SwiperSlide key={i} className={cn('slide')}>
                        {child}
                    </SwiperSlide>
                ))}
            </Swiper>
            <NavArrow
                className={cn('arrow', { prev: true })}
                onClick={handlePrevClick}
                disabled={!loop && isBeginning}
                theme={navArrowTheme}
            />
            <NavArrow
                className={cn('arrow', { next: true })}
                view="next"
                onClick={handleNextClick}
                disabled={!loop && isEnd}
                theme={navArrowTheme}
            />
            <div className={cn('pagination', { theme: navTheme })}>
                {React.Children.map(children, (_, i) => (
                    <BannerDot
                        key={i}
                        className={cn('dot')}
                        index={i}
                        isActive={i === activeIndex}
                        showTimer={showDotTimer}
                        timerDelay={dotTimerDelay}
                        onClick={handleDotClick}
                    />
                ))}
            </div>
        </div>
    );
};

Banner.propTypes = {
    loop: PropTypes.bool,
    autoPlay: PropTypes.bool,
    autoPlayDelay: PropTypes.number,
    navTheme: PropTypes.oneOf(Object.values(NavTheme)),
    onNextClick: PropTypes.func,
    onPrevClick: PropTypes.func,
    onDotClick: PropTypes.func,
    onChange: PropTypes.func,
};

export default Banner;
