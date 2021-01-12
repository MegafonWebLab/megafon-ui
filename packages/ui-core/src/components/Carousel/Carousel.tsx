import * as React from 'react';
import * as PropTypes from 'prop-types';
import './Carousel.less';
import cnCreate from 'utils/cnCreate';
import checkBreakpointsPropTypes from './checkBreakpointsPropTypes';
import SwiperCore, { Autoplay, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import throttle from 'lodash.throttle';
import NavArrow, { Theme as ArrowTheme } from 'components/NavArrow/NavArrow';
import breakpoints from 'constants/breakpoints';

SwiperCore.use([Autoplay, Pagination]);

export const NavTheme = {
    LIGHT: 'light',
    GREEN: 'green',
} as const;

const SlidesPerView = {
    AUTO: 'auto',
} as const;

type SlidesPerViewType = typeof SlidesPerView[keyof typeof SlidesPerView];

type NavThemeType = typeof NavTheme[keyof typeof NavTheme];

export type SlidesSettingsType = {
    [key: number]: {
        slidesPerView: number | SlidesPerViewType;
        spaceBetween: number;
    };
};

export interface ICarouselProps {
    /** Дополнительные классы для внутренних элементов */
    classes?: {
        root?: string;
        innerIndents?: string;
    };
    /** Настройки слайдов */
    slidesSettings?: SlidesSettingsType;
    /** Смена слайдов с зацикливанием */
    loop?: boolean;
    /** Автомтическая прокрутка */
    autoPlay?: boolean;
    /** Задержка для авто прокрутки */
    autoPlayDelay?: number;
    /** Тема навигации */
    navTheme?: NavThemeType;
    /** Обработчик клика по стрелке вперед (должен быть обернут в useCallback) */
    onNextClick?: (index: number) => void;
    /** Обработчик клика по стрелке назад (должен быть обернут в useCallback) */
    onPrevClick?: (index: number) => void;
    /** Обработчик смены слайда (должен быть обернут в useCallback) */
    onChange?: (index: number) => void;
}

const getAutoPlayConfig = (delay: number) => ({
    delay,
    waitForTransition: false,
    disableOnInteraction: false,
    stopOnLastSlide: true,
});

const defaultSlidesSettings: SlidesSettingsType = {
    [breakpoints.mobileSmallStart]: {
        slidesPerView: 1,
        spaceBetween: 16,
    },
    [breakpoints.mobileBigStart]: {
        slidesPerView: 3,
        spaceBetween: 20,
    },
    [breakpoints.desktopMiddleStart]: {
        slidesPerView: 4,
        spaceBetween: 20,
    },
};

const cn = cnCreate('mfui-beta-carousel');
const Carousel: React.FC<ICarouselProps> = ({
    classes: { root: rootClass, innerIndents: innerIndentsClass } = {},
    slidesSettings = defaultSlidesSettings,
    autoPlay = false,
    autoPlayDelay = 5000,
    loop = false,
    navTheme = 'light',
    children,
    onNextClick,
    onPrevClick,
    onChange,
}) => {
    const [swiperInstance, setSwiperInstance] = React.useState<SwiperCore>();
    const [isBeginning, setBeginning] = React.useState(true);
    const [isEnd, setEnd] = React.useState(false);
    const [isLocked, setLocked] = React.useState(false);

    const increaseAutoplayDelay = React.useCallback(
        ({ params, autoplay }: SwiperCore) => {
            if (typeof params.autoplay !== 'object' || !autoplay.running) {
                return;
            }

            autoplay.stop();
            params.autoplay.delay = autoPlayDelay * 3;
            autoplay.start();
        },
        [autoPlayDelay]
    );

    const handlePrevClick = React.useCallback(() => {
        if (!swiperInstance) {
            return;
        }

        swiperInstance.slidePrev();
        onPrevClick && onPrevClick(swiperInstance.realIndex);
        increaseAutoplayDelay(swiperInstance);
    }, [swiperInstance, onPrevClick, increaseAutoplayDelay]);

    const handleNextClick = React.useCallback(() => {
        if (!swiperInstance) {
            return;
        }

        swiperInstance.slideNext();
        onNextClick && onNextClick(swiperInstance.realIndex);
        increaseAutoplayDelay(swiperInstance);
    }, [swiperInstance, onNextClick, increaseAutoplayDelay]);

    const handleSwiper = React.useCallback((swiper: SwiperCore) => {
        setSwiperInstance(swiper);
        setLocked(swiper.isBeginning && swiper.isEnd);
    }, []);

    const handleReachBeginnig = React.useCallback(() => {
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
        onChange && onChange(realIndex);
    }, [onChange]);

    const handleRootClick = (e: React.SyntheticEvent<EventTarget>) => {
        const elem = e.target as Element;
        const isBullet = elem.classList.contains('swiper-pagination-bullet');

        if (isBullet && swiperInstance) {
            increaseAutoplayDelay(swiperInstance);
        }
    };

    // https://github.com/nolimits4web/Swiper/issues/2346
    const handleSwiperResize = React.useCallback(
        throttle((swiper: SwiperCore) => {
            setBeginning(swiper.isBeginning);
            setEnd(swiper.isEnd);
            setLocked(swiper.isBeginning && swiper.isEnd);

            if (swiper.params.slidesPerView === SlidesPerView.AUTO) {
                swiper.slides.css('width', '');
            }
        }, 300),
        []
    );

    return (
        <div className={cn({ 'nav-theme': navTheme }, [rootClass])} onClick={handleRootClick}>
            <Swiper
                className={cn(
                    'swiper',
                    { 'default-inner-indents': !innerIndentsClass },
                    [innerIndentsClass]
                )}
                breakpoints={slidesSettings}
                watchSlidesVisibility
                watchOverflow
                loop={loop}
                pagination={{ clickable: true }}
                autoplay={autoPlay ? getAutoPlayConfig(autoPlayDelay) : false}
                onSwiper={handleSwiper}
                onReachBeginning={handleReachBeginnig}
                onReachEnd={handleReachEnd}
                onFromEdge={handleFromEdge}
                onSlideChange={handleSlideChange}
                onTouchEnd={increaseAutoplayDelay}
                onResize={handleSwiperResize}
            >
                {React.Children.map(children, (child, i) => (
                    <SwiperSlide key={i} className={cn('slide')}>
                        {child}
                    </SwiperSlide>
                ))}
            </Swiper>
            <NavArrow
                className={cn('arrow', { prev: true, locked: isLocked })}
                onClick={handlePrevClick}
                disabled={!loop && isBeginning}
                theme={ArrowTheme.PURPLE}
            />
            <NavArrow
                className={cn('arrow', { next: true, locked: isLocked })}
                view="next"
                onClick={handleNextClick}
                disabled={!loop && isEnd}
                theme={ArrowTheme.PURPLE}
            />
        </div>
    );
};

Carousel.propTypes = {
    classes: PropTypes.shape({
        root: PropTypes.string,
        innerIndents: PropTypes.string,
    }),
    slidesSettings: PropTypes.objectOf(
        checkBreakpointsPropTypes({
            slidesPerView: PropTypes.oneOfType([
                PropTypes.number,
                PropTypes.oneOf(Object.values(SlidesPerView)),
            ]).isRequired,
            spaceBetween: PropTypes.number.isRequired,
        })
    ),
    loop: PropTypes.bool,
    autoPlay: PropTypes.bool,
    autoPlayDelay: PropTypes.number,
    navTheme: PropTypes.oneOf(Object.values(NavTheme)),
    onNextClick: PropTypes.func,
    onPrevClick: PropTypes.func,
    onChange: PropTypes.func,
};

export default Carousel;
