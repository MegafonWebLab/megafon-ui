import * as React from 'react';
import * as PropTypes from 'prop-types';
import './Carousel.less';
import cnCreate from 'utils/cnCreate';
import checkBreakpointsPropTypes from './checkBreakpointsPropTypes';
import SwiperCore, { Autoplay, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
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
    /** Сss класс для внешнего контейнера */
    className?: string;
    /** Сss класс для задания внутренних оступов */
    innerIndentsClass?: string;
    /** Настройки слайдов */
    slidesSettings?: SlidesSettingsType;
    /** Смена слайдов с зацикливанием */
    loop?: boolean;
    /** Автоматическая прокрутка */
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
    className,
    innerIndentsClass,
    slidesSettings = defaultSlidesSettings,
    autoPlay = false,
    autoPlayDelay = 5000,
    loop = false,
    navTheme = NavTheme.LIGHT,
    children,
    onNextClick,
    onPrevClick,
    onChange,
}) => {
    const [swiperInstance, setSwiperInstance] = React.useState<SwiperCore>();
    const [isBeginning, setBeginning] = React.useState(true);
    const [isEnd, setEnd] = React.useState(false);

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

    const handleSwiper = React.useCallback((swiper: SwiperCore) => {
        setSwiperInstance(swiper);
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

    return (
        <div className={cn({ 'nav-theme': navTheme }, [className])}>
            <Swiper
                className={cn(
                    'swiper',
                    { 'default-inner-indents': !innerIndentsClass },
                    [innerIndentsClass]
                )}
                breakpoints={slidesSettings}
                watchSlidesVisibility
                loop={loop}
                pagination={{ clickable: true }}
                autoplay={autoPlay ? getAutoPlayConfig(autoPlayDelay) : false}
                onSwiper={handleSwiper}
                onReachBeginning={handleReachBeginnig}
                onReachEnd={handleReachEnd}
                onFromEdge={handleFromEdge}
                onSlideChange={handleSlideChange}
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
                theme={ArrowTheme.PURPLE}
            />
            <NavArrow
                className={cn('arrow', { next: true })}
                view="next"
                onClick={handleNextClick}
                disabled={!loop && isEnd}
                theme={ArrowTheme.PURPLE}
            />
        </div>
    );
};

Carousel.propTypes = {
    className: PropTypes.string,
    innerIndentsClass: PropTypes.string,
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
