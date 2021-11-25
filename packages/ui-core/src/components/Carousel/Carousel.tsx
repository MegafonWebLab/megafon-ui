import * as React from 'react';
import { breakpoints, cnCreate, filterDataAttrs, IFilterDataAttrs } from '@megafon/ui-helpers';
import throttle from 'lodash.throttle';
import * as PropTypes from 'prop-types';
import SwiperCore, { Autoplay, Pagination, EffectFade } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { PaginationOptions } from 'swiper/types/components/pagination';
import NavArrow, { Theme as ArrowTheme } from 'components/NavArrow/NavArrow';
import throttleTime from 'constants/throttleTime';
import checkBreakpointsPropTypes from './checkBreakpointsPropTypes';
import './Carousel.less';

SwiperCore.use([Autoplay, Pagination, EffectFade]);

export const NavTheme = {
    LIGHT: 'light',
    GREEN: 'green',
} as const;

export const EffectTheme = {
    SLIDE: 'slide',
    FADE: 'fade',
} as const;

const SlidesPerView = {
    AUTO: 'auto',
} as const;

type SlidesPerViewType = typeof SlidesPerView[keyof typeof SlidesPerView];

type NavThemeType = typeof NavTheme[keyof typeof NavTheme];
type EffectThemeType = typeof EffectTheme[keyof typeof EffectTheme];

export type SlidesSettingsType = {
    [key: number]: {
        // количество отображаемых слайдов
        slidesPerView: number | SlidesPerViewType;
        // расстояние между слайдами в px
        slidesPerGroup?: number;
        // количество переключаемых за 1 раз слайдов
        spaceBetween: number;
    };
};

export interface ICarouselProps extends IFilterDataAttrs {
    /** Ссылка на корневой элемент */
    rootRef?: React.Ref<HTMLDivElement>;
    /** Дополнительные классы для корневого элемента */
    className?: string;
    /** Дополнительные классы для корневого и внутренних элементов */
    classes?: {
        root?: string;
        innerIndents?: string;
        container?: string;
        containerModifier?: string;
        prev?: string;
        next?: string;
        slide?: string;
    };
    /** Настройки слайдов */
    slidesSettings?: SlidesSettingsType;
    /** Смена слайдов с зацикливанием */
    loop?: boolean;
    /** Автоматическая прокрутка */
    autoPlay?: boolean;
    /** Настройки пагинации */
    pagination?: PaginationOptions;
    /** Задержка для авто прокрутки */
    autoPlayDelay?: number;
    /** Скорость смены слайдов */
    transitionSpeed?: number;
    /** Пороговое значение свайпа при котором выполняется сдвиг слайдов в карусели */
    threshold?: number;
    /** Порядковый номер первого видимого слайда */
    initialSlide?: number;
    /** Отключение смены слайда свайпами */
    disableTouchMove?: boolean;
    /** Активный слайд по центру экрана */
    centeredSlides?: boolean;
    /** Тема навигации */
    navTheme?: NavThemeType;
    /** Эффект анимации */
    effectTheme?: EffectThemeType;
    /** Css селектор элемента, при перетаскивании которого не будет происходить смена слайдов */
    noSwipingSelector?: string;
    /** Ref на swiper */
    getSwiper?: (instance: SwiperCore) => void;
    /** Обработчик клика по стрелке вперед (должен быть обернут в useCallback) */
    onNextClick?: (index: number) => void;
    /** Обработчик клика по стрелке назад (должен быть обернут в useCallback) */
    onPrevClick?: (index: number) => void;
    /** Обработчик смены слайда (должен быть обернут в useCallback) */
    onChange?: (currentIndex: number, previousIndex: number, slidesPerView?: number | 'auto') => void;
}

const getAutoPlayConfig = (delay: number) => ({
    delay,
    waitForTransition: false,
    disableOnInteraction: false,
    stopOnLastSlide: true,
});

const defaultSlidesSettings: SlidesSettingsType = {
    [breakpoints.MOBILE_SMALL_START]: {
        slidesPerView: 1,
        spaceBetween: 16,
    },
    [breakpoints.MOBILE_BIG_START]: {
        slidesPerView: 3,
        spaceBetween: 20,
    },
    [breakpoints.DESKTOP_MIDDLE_START]: {
        slidesPerView: 4,
        spaceBetween: 20,
    },
};

const cn = cnCreate('mfui-beta-carousel');
const Carousel: React.FC<ICarouselProps> = ({
    rootRef,
    className,
    classes: {
        root: rootClass,
        innerIndents: innerIndentsClass,
        prev: prevClass,
        next: nextClass,
        container: containerClass,
        containerModifier,
        slide: slideClass,
    } = {},
    dataAttrs,
    slidesSettings = defaultSlidesSettings,
    autoPlay = false,
    autoPlayDelay = 5000,
    loop = false,
    transitionSpeed = 300,
    threshold,
    initialSlide = 1,
    disableTouchMove = false,
    centeredSlides = false,
    navTheme = 'light',
    effectTheme = 'slide',
    noSwipingSelector,
    children,
    pagination,
    getSwiper,
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
        [autoPlayDelay],
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
        getSwiper && getSwiper(swiper);
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

    const handleSlideChange = React.useCallback(
        ({ realIndex, previousIndex, params }: SwiperCore) => {
            onChange && onChange(realIndex, previousIndex, params.slidesPerView);
        },
        [onChange],
    );

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
        }, throttleTime.resize),
        [],
    );

    const handleSlideFocus = (index: number) => (e: React.FocusEvent) => {
        if (loop) {
            // для корректной прокрутки зацикленной карусели к сфокусированному элементу, необходимо получить его реальный индекс
            // в коллекции DOM - элементов слайдов, т.к. swiper такой информацией не владеет,
            // а оперирует data-swiper-slide-index, значения которых находятся в диапазоне от 0 до children.length - 1,
            // но прокрутку методом slideTo осущетсвляет, используя индекс в DOM - коллекции
            const slideSelector = `.${cn('slide')}`;
            const slide = (e.nativeEvent.target as Element).closest(slideSelector);
            const realIndex = Array.prototype.indexOf.call(slide?.parentNode?.children, slide);

            swiperInstance?.slideTo(realIndex);

            return;
        }

        swiperInstance?.slideTo(index);
    };

    return (
        <div
            {...filterDataAttrs(dataAttrs)}
            ref={rootRef}
            className={cn({ 'nav-theme': navTheme }, [className, rootClass])}
            onClick={handleRootClick}
        >
            <Swiper
                {...(containerModifier ? { containerModifierClass: containerModifier } : {})}
                className={cn('swiper', { 'default-inner-indents': !innerIndentsClass }, [
                    innerIndentsClass,
                    containerClass,
                ])}
                breakpoints={slidesSettings}
                watchSlidesVisibility
                watchOverflow
                loop={loop}
                pagination={{ clickable: true, ...pagination }}
                autoplay={autoPlay ? getAutoPlayConfig(autoPlayDelay) : false}
                speed={transitionSpeed}
                threshold={threshold}
                initialSlide={initialSlide - 1}
                allowTouchMove={!disableTouchMove}
                centeredSlides={centeredSlides}
                effect={effectTheme}
                fadeEffect={
                    effectTheme === EffectTheme.FADE
                        ? {
                              crossFade: effectTheme === EffectTheme.FADE,
                          }
                        : undefined
                }
                noSwipingSelector={
                    noSwipingSelector ? `.swiper-pagination, ${noSwipingSelector}` : '.swiper-pagination'
                }
                onSwiper={handleSwiper}
                onReachBeginning={handleReachBeginnig}
                onReachEnd={handleReachEnd}
                onFromEdge={handleFromEdge}
                onSlideChange={handleSlideChange}
                onTouchEnd={increaseAutoplayDelay}
                onResize={handleSwiperResize}
            >
                {React.Children.map(children, (child, i) => (
                    <SwiperSlide key={i} className={cn('slide', slideClass)} onFocus={handleSlideFocus(i)}>
                        {child}
                    </SwiperSlide>
                ))}
            </Swiper>
            <NavArrow
                className={cn('arrow', { prev: true, locked: isLocked }, [prevClass])}
                onClick={handlePrevClick}
                disabled={!loop && isBeginning}
                theme={ArrowTheme.PURPLE}
            />
            <NavArrow
                className={cn('arrow', { next: true, locked: isLocked }, [nextClass])}
                view="next"
                onClick={handleNextClick}
                disabled={!loop && isEnd}
                theme={ArrowTheme.PURPLE}
            />
        </div>
    );
};

Carousel.propTypes = {
    rootRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.oneOfType([PropTypes.shape({ current: PropTypes.elementType }), PropTypes.any]),
    ]),
    className: PropTypes.string,
    classes: PropTypes.shape({
        root: PropTypes.string,
        innerIndents: PropTypes.string,
        container: PropTypes.string,
        containerModifier: PropTypes.string,
        prev: PropTypes.string,
        next: PropTypes.string,
        slide: PropTypes.string,
    }),
    dataAttrs: PropTypes.objectOf(PropTypes.string.isRequired),
    slidesSettings: PropTypes.objectOf(
        checkBreakpointsPropTypes({
            slidesPerView: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(Object.values(SlidesPerView))])
                .isRequired,
            spaceBetween: PropTypes.number.isRequired,
            slidesPerGroup: PropTypes.number,
        }),
    ),
    pagination: PropTypes.shape({
        el: PropTypes.string,
        bulletElement: PropTypes.string,
        dynamicBullets: PropTypes.string,
        clickable: PropTypes.bool,
        renderBullet: PropTypes.func,
        bulletClass: PropTypes.string,
        bulletActiveClass: PropTypes.string,
        modifierClass: PropTypes.string,
    }),
    loop: PropTypes.bool,
    threshold: PropTypes.number,
    autoPlay: PropTypes.bool,
    autoPlayDelay: PropTypes.number,
    disableTouchMove: PropTypes.bool,
    centeredSlides: PropTypes.bool,
    transitionSpeed: PropTypes.number,
    navTheme: PropTypes.oneOf(Object.values(NavTheme)),
    effectTheme: PropTypes.oneOf(Object.values(EffectTheme)),
    noSwipingSelector: PropTypes.string,
    getSwiper: PropTypes.func,
    onNextClick: PropTypes.func,
    onPrevClick: PropTypes.func,
    onChange: PropTypes.func,
};

export default Carousel;
