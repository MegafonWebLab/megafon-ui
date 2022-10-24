import * as React from 'react';
import { breakpoints, cnCreate, filterDataAttrs } from '@megafon/ui-helpers';
import throttle from 'lodash.throttle';
import * as PropTypes from 'prop-types';
import SwiperCore, { Autoplay, Pagination, EffectFade } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { PaginationOptions } from 'swiper/types/components/pagination';
import NavArrow, { Theme as ArrowTheme } from 'components/NavArrow/NavArrow';
import throttleTime from 'constants/throttleTime';
import checkBreakpointsPropTypes from './checkBreakpointsPropTypes';
import './Carousel.less';
import usePrevious from './usePrevious';

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
        // количество переключаемых за 1 раз слайдов
        slidesPerGroup?: number;
        // расстояние между слайдами в px
        spaceBetween: number;
    };
};

export interface ICarouselProps {
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
    /** Дополнительные data атрибуты к внутренним элементам */
    dataAttrs?: {
        root?: Record<string, string>;
        slider?: Record<string, string>;
        prev?: Record<string, string>;
        next?: Record<string, string>;
        slide?: Record<string, string>;
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
    /** Свайп к слайду, по которому произведен клик */
    slideToClickedSlide?: boolean;
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

const cn = cnCreate('mfui-carousel');
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
    slideToClickedSlide = false,
}) => {
    const [swiperInstance, setSwiperInstance] = React.useState<SwiperCore>();
    const [isBeginning, setBeginning] = React.useState(true);
    const [isEnd, setEnd] = React.useState(false);
    const [isLocked, setLocked] = React.useState(false);
    const childrenLen: number = Array.isArray(children) ? children.length : 0;
    const prevChildrenLen: number = usePrevious(childrenLen) || 0;
    const isChildrenLenDiff = childrenLen !== prevChildrenLen;

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

    const handleSwiper = React.useCallback(
        (swiper: SwiperCore) => {
            setSwiperInstance(swiper);
            setLocked(swiper.isBeginning && swiper.isEnd);
            getSwiper?.(swiper);
        },
        [getSwiper],
    );

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
            onChange?.(realIndex, previousIndex, params.slidesPerView);
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

    const handleNavDisplay = (swiper: SwiperCore) => {
        setBeginning(swiper.isBeginning);
        setEnd(swiper.isEnd);
        setLocked(swiper.isBeginning && swiper.isEnd);
    };

    // https://github.com/nolimits4web/Swiper/issues/2346
    const handleSwiperResize = React.useCallback(() => {
        throttle((swiper: SwiperCore) => {
            handleNavDisplay(swiper);

            if (swiper.params.slidesPerView === SlidesPerView.AUTO) {
                swiper.slides.css('width', '');
            }
        }, throttleTime.resize);
    }, []);

    const handleSlideFocus = (index: number) => (e: React.FocusEvent) => {
        if (loop) {
            // for correctly scroll the looped carousel to the focused element, we need to get its real index in the DOM-collection of slides
            // because swiper does not provide this, only data-swiper-slide-index, whose values are in the range from 0 to children.length - 1,
            // but method slideTo needs to be passed a real slide index in DOM-collection
            const slideSelector = `.${cn('slide')}`;
            const slide = (e.nativeEvent.target as Element).closest(slideSelector);
            const realIndex = Array.prototype.indexOf.call(slide?.parentNode?.children, slide);

            swiperInstance?.slideTo(realIndex);

            return;
        }

        swiperInstance?.slideTo(index);
    };

    const disableFocusOnSlideClick = (e: React.MouseEvent) => {
        if ((e.nativeEvent.target as HTMLElement).closest(`.${cn()}`)) {
            e.nativeEvent.preventDefault();
        }
    };

    React.useEffect(() => {
        if (!swiperInstance) {
            return undefined;
        }

        const windowResizeHandler = () => handleNavDisplay(swiperInstance);
        const windowResizeHandlerThrottled = throttle(windowResizeHandler, throttleTime.resize);

        window.addEventListener('resize', windowResizeHandlerThrottled);

        return () => {
            window.removeEventListener('resize', windowResizeHandlerThrottled);
        };
    }, [swiperInstance]);

    React.useEffect(() => {
        if (swiperInstance && isChildrenLenDiff) {
            handleNavDisplay(swiperInstance);
        }
    }, [isChildrenLenDiff, swiperInstance]);

    return (
        <div
            {...filterDataAttrs(dataAttrs?.root)}
            ref={rootRef}
            className={cn({ 'nav-theme': navTheme }, [className, rootClass])}
            onClick={handleRootClick}
        >
            <Swiper
                {...(containerModifier ? { containerModifierClass: containerModifier } : {})}
                {...filterDataAttrs(dataAttrs?.slider)}
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
                slideToClickedSlide={slideToClickedSlide}
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
                    <SwiperSlide
                        {...filterDataAttrs(dataAttrs?.slide, i + 1)}
                        key={i}
                        className={cn('slide', slideClass)}
                        onFocus={handleSlideFocus(i)}
                        onMouseDown={disableFocusOnSlideClick}
                    >
                        {child}
                    </SwiperSlide>
                ))}
            </Swiper>
            <NavArrow
                dataAttrs={{ root: dataAttrs?.prev }}
                className={cn('arrow', { prev: true, locked: isLocked }, [prevClass])}
                onClick={handlePrevClick}
                disabled={!loop && isBeginning}
                theme={ArrowTheme.PURPLE}
            />
            <NavArrow
                dataAttrs={{ root: dataAttrs?.next }}
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
    dataAttrs: PropTypes.shape({
        root: PropTypes.objectOf(PropTypes.string.isRequired),
        slider: PropTypes.objectOf(PropTypes.string.isRequired),
        prev: PropTypes.objectOf(PropTypes.string.isRequired),
        next: PropTypes.objectOf(PropTypes.string.isRequired),
        slide: PropTypes.objectOf(PropTypes.string.isRequired),
    }),
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
