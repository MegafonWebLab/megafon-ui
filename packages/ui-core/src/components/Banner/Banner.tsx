import * as React from 'react';
import { cnCreate, filterDataAttrs } from '@megafon/ui-helpers';
import * as PropTypes from 'prop-types';
import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import NavArrow, { Theme as ArrowTheme } from 'components/NavArrow/NavArrow';
import './Banner.less';
import BannerDot from './BannerDot';

SwiperCore.use([Autoplay]);

export const NavTheme = {
    LIGHT: 'light',
    GREEN: 'green',
    DARK: 'dark',
} as const;

type NavThemeType = typeof NavTheme[keyof typeof NavTheme];

export interface IBannerProps {
    /** Сss класс для внешнего контейнера */
    className?: string;
    /** Прокрутка с зацикливанием */
    loop?: boolean;
    /** Дополнительные классы для корневого и внутренних элементов */
    classes?: {
        slide?: string;
        arrow?: string;
    };
    /** Дополнительные data атрибуты к внутренним элементам */
    dataAttrs?: {
        root?: Record<string, string>;
        swiper?: Record<string, string>;
        slide?: Record<string, string>;
        arrowPrev?: Record<string, string>;
        arrowNext?: Record<string, string>;
        pagination?: Record<string, string>;
        dot?: Record<string, string>;
    };
    /** Предполагается использование с наезжанием на баннер следующего за баннером элемента */
    withPaginationBottomOffset?: boolean;
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

const cn = cnCreate('mfui-banner');
const Banner: React.FC<IBannerProps> = ({
    className,
    classes = {},
    withPaginationBottomOffset = false,
    autoPlay = false,
    autoPlayDelay = 5000,
    loop = false,
    navTheme = 'light',
    children = [],
    onNextClick,
    onPrevClick,
    onDotClick,
    onChange,
    dataAttrs,
}) => {
    const [swiperInstance, setSwiperInstance] = React.useState<SwiperCore>();
    const [isBeginning, setBeginning] = React.useState(true);
    const [isEnd, setEnd] = React.useState(false);
    const [isAutoPlaying, setAutoPlayning] = React.useState(autoPlay);
    const [activeIndex, setActiveIndex] = React.useState(0);

    const showDotTimer = loop ? isAutoPlaying : isAutoPlaying && !isEnd;
    const dotTimerDelay = autoPlayDelay / 1000;
    const navArrowTheme = navTheme === NavTheme.DARK ? ArrowTheme.DARK : ArrowTheme.PURPLE;

    const increaseAutoplayDelay = React.useCallback(
        ({ params, autoplay }: SwiperCore) => {
            if (typeof params.autoplay !== 'object' || !autoplay.running) {
                return;
            }

            autoplay.stop();
            // eslint-disable-next-line no-param-reassign
            params.autoplay.delay = autoPlayDelay * 3;
            autoplay.start();
        },
        [autoPlayDelay],
    );

    const handlePrevClick = React.useCallback(() => {
        if (!swiperInstance) {
            return;
        }

        swiperInstance.slidePrev();
        onPrevClick?.(swiperInstance.realIndex);
        increaseAutoplayDelay(swiperInstance);
    }, [swiperInstance, onPrevClick, increaseAutoplayDelay]);

    const handleNextClick = React.useCallback(() => {
        if (!swiperInstance) {
            return;
        }

        swiperInstance.slideNext();
        onNextClick?.(swiperInstance.realIndex);
        increaseAutoplayDelay(swiperInstance);
    }, [swiperInstance, onNextClick, increaseAutoplayDelay]);

    const handleDotClick = React.useCallback(
        (index: number) => {
            if (!swiperInstance) {
                return;
            }

            if (loop) {
                swiperInstance.slideToLoop(index);
            } else {
                swiperInstance.slideTo(index);
            }

            onDotClick?.(swiperInstance.realIndex);
            increaseAutoplayDelay(swiperInstance);
        },
        [swiperInstance, loop, onDotClick, increaseAutoplayDelay],
    );

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

    const handleSlideChange = React.useCallback(
        ({ realIndex }: SwiperCore) => {
            setActiveIndex(realIndex);
            onChange?.(realIndex);
        },
        [onChange],
    );

    const handleAutoplayStop = React.useCallback(() => {
        setAutoPlayning(false);
    }, []);

    return (
        <div {...filterDataAttrs(dataAttrs?.root)} className={cn({ 'nav-theme': navTheme }, className)}>
            <Swiper
                {...filterDataAttrs(dataAttrs?.swiper)}
                className={cn('swiper')}
                loop={loop}
                autoplay={autoPlay ? getAutoPlayConfig(autoPlayDelay) : false}
                onSwiper={handleSwiper}
                onReachBeginning={handleReachBeginning}
                onReachEnd={handleReachEnd}
                onFromEdge={handleFromEdge}
                onSlideChange={handleSlideChange}
                onAutoplayStop={handleAutoplayStop}
                onTouchEnd={increaseAutoplayDelay}
            >
                {React.Children.map(children, (child, i) => (
                    <SwiperSlide
                        {...filterDataAttrs(dataAttrs?.slide, i + 1)}
                        key={i}
                        className={cn('slide', classes?.slide)}
                    >
                        {child}
                    </SwiperSlide>
                ))}
            </Swiper>
            <NavArrow
                {...filterDataAttrs(dataAttrs?.arrowPrev)}
                className={cn('arrow', { prev: true }, [classes.arrow])}
                onClick={handlePrevClick}
                disabled={!loop && isBeginning}
                theme={navArrowTheme}
            />
            <NavArrow
                {...filterDataAttrs(dataAttrs?.arrowNext)}
                className={cn('arrow', { next: true }, [classes.arrow])}
                view="next"
                onClick={handleNextClick}
                disabled={!loop && isEnd}
                theme={navArrowTheme}
            />
            <div
                {...filterDataAttrs(dataAttrs?.pagination)}
                className={cn('pagination', { theme: navTheme, 'bottom-offset': withPaginationBottomOffset })}
            >
                {React.Children.map(children, (_, i) => (
                    <BannerDot
                        dataAttrs={{
                            root: { ...filterDataAttrs(dataAttrs?.dot, i + 1) },
                        }}
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
    className: PropTypes.string,
    loop: PropTypes.bool,
    classes: PropTypes.shape({
        slide: PropTypes.string,
    }),
    withPaginationBottomOffset: PropTypes.bool,
    dataAttrs: PropTypes.shape({
        root: PropTypes.objectOf(PropTypes.string.isRequired),
        swiper: PropTypes.objectOf(PropTypes.string.isRequired),
        slide: PropTypes.objectOf(PropTypes.string.isRequired),
        arrowPrev: PropTypes.objectOf(PropTypes.string.isRequired),
        arrowNext: PropTypes.objectOf(PropTypes.string.isRequired),
        pagination: PropTypes.objectOf(PropTypes.string.isRequired),
        dot: PropTypes.objectOf(PropTypes.string.isRequired),
    }),
    autoPlay: PropTypes.bool,
    autoPlayDelay: PropTypes.number,
    navTheme: PropTypes.oneOf(Object.values(NavTheme)),
    onNextClick: PropTypes.func,
    onPrevClick: PropTypes.func,
    onDotClick: PropTypes.func,
    onChange: PropTypes.func,
};

export default Banner;
