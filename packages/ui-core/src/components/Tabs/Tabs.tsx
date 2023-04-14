import * as React from 'react';
import { cnCreate, filterDataAttrs } from '@megafon/ui-helpers';
import ArrowLeft from '@megafon/ui-icons/system-16-arrow_left_16.svg';
import throttle from 'lodash.throttle';
import PropTypes from 'prop-types';
import SwiperCore from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import usePrevious from '../../hooks/usePrevious';
import './Tabs.less';
import { ITabProps } from './Tab';

export const TabAlign = {
    LEFT: 'left',
    CENTER: 'center',
} as const;

export const TabSize = {
    MEDIUM: 'medium',
    LARGE: 'large',
} as const;

export const TabColorTheme = {
    WHITE: 'white',
    GREEN: 'green',
    GRAY: 'gray',
} as const;

type TabSizeType = typeof TabSize[keyof typeof TabSize];
type TabColorThemeType = typeof TabColorTheme[keyof typeof TabColorTheme];
type TabAlignType = typeof TabAlign[keyof typeof TabAlign];
type RenderTabType = (
    params: Pick<ITabProps, 'title' | 'icon' | 'href' | 'rel'> & { attr?: Record<string, string> },
    index: number,
) => JSX.Element;

export interface ITabsProps {
    /** Дополнительный класс для корневого элемента */
    className?: string;
    /** Дополнительные классы для корневого и внутренних элементов */
    classes?: {
        root?: string;
        wrapper?: string;
        swiperWrapper?: string;
        innerIndents?: string;
        tab?: string;
        activeTab?: string;
    };
    /** Дополнительные data атрибуты к внутренним элементам */
    dataAttrs?: {
        root?: Record<string, string>;
        slider?: Record<string, string>;
        panel?: Record<string, string>;
        prev?: Record<string, string>;
        next?: Record<string, string>;
        wrapper?: Record<string, string>;
        swiperWrapper?: Record<string, string>;
    };
    /** Размер табов */
    size?: TabSizeType;
    /** Цветовая тема табов для определенных фонов */
    tabColorTheme?: TabColorThemeType;
    /** Ширина табов по размеру содержимого */
    autoWidth?: boolean;
    /** Горизонтальное выравнивание (только для autoWidth = true) */
    align?: TabAlignType;
    /** Фиксация табов у верхней границы окна */
    sticky?: boolean;
    /** Индекс активного таба (включает режим управления табами снаружи) */
    currentIndex?: number;
    /** Индекс активного таба по умолчанию (не работает в режиме управления табами снаружи) */
    defaultIndex?: number;
    /** Рендер содержимого только для текущего таба */
    renderOnlyCurrentPanel?: boolean;
    /** Внешний контейнер для режима фиксация табов */
    outerObserveContainer?: HTMLDivElement | null;
    /** Обработчика клика по табам */
    onTabClick?: (index: number) => void;
    children: Array<React.ReactElement<ITabProps>>;
}

const cn = cnCreate('mfui-tabs');
const Tabs: React.FC<ITabsProps> = ({
    className,
    classes = {},
    size = 'medium',
    tabColorTheme = 'white',
    sticky = false,
    align = 'left',
    defaultIndex = 0,
    currentIndex: outerIndex,
    renderOnlyCurrentPanel = false,
    autoWidth = false,
    children,
    dataAttrs,
    onTabClick,
    outerObserveContainer,
}) => {
    const tabsRef = React.useRef<Record<number, HTMLDivElement>>({});
    const rootRef = React.useRef<HTMLDivElement>(null);
    const tabListRef = React.useRef<HTMLDivElement>(null);
    const intersectionObserverRef = React.useRef<IntersectionObserver>();

    const childrenLength: number = Array.isArray(children) ? children.length : 0;
    const prevChildrenLength: number = usePrevious(childrenLength) || 0;
    const isChildrenLengthDiff = childrenLength !== prevChildrenLength;

    const [swiperInstance, setSwiperInstance] = React.useState<SwiperCore>();
    const [isBeginning, setBeginning] = React.useState(true);
    const [isEnd, setEnd] = React.useState(true);

    const [innerIndex, setInnerIndex] = React.useState(defaultIndex);
    const currentIndex = outerIndex === undefined ? innerIndex : outerIndex;

    const [activeTabWidth, setActiveTabWidth] = React.useState(0);
    const [underlineWidth, setUnderlineWidth] = React.useState(0);
    const [underlineTranslate, setUnderlineTranslate] = React.useState(0);
    const [underlineTransition, setUnderlineTransition] = React.useState('none');

    const [tabListHeight, setTabListHeight] = React.useState<number | 'auto'>('auto');

    const [isSticky, setSticky] = React.useState(false);
    const [stickyOffset, setStickyOffset] = React.useState({
        left: 0,
        right: 0,
    });

    const setTabRef = React.useCallback(
        i => (tab: HTMLDivElement) => {
            if (tab) {
                tabsRef.current[i] = tab;
            }
        },
        [],
    );

    const calculateUnderline = React.useCallback(() => {
        const tabs = Object.values(tabsRef.current);
        if (!tabs.length) {
            return;
        }

        const translate = [...tabs].splice(0, currentIndex).reduce((accWidth, node) => {
            const { width } = node.getBoundingClientRect();

            return accWidth + width;
        }, 0);

        setUnderlineWidth(activeTabWidth);
        setUnderlineTranslate(translate);
    }, [currentIndex, activeTabWidth]);

    const calculateSticky = React.useCallback(() => {
        if (!sticky || !rootRef.current || !tabListRef.current) {
            return;
        }

        const { left, right } = rootRef.current.getBoundingClientRect();
        const documentWidth = document.documentElement.clientWidth;

        setStickyOffset({ left, right: documentWidth - right });
    }, [sticky]);

    const stickyON = React.useCallback((leftOffset: number, rightOffset: number) => {
        const documentWidth = document.documentElement.clientWidth;

        setStickyOffset({ left: leftOffset, right: documentWidth - rightOffset });
        setSticky(true);
    }, []);

    const stickyOFF = React.useCallback(() => {
        setStickyOffset({ left: 0, right: 0 });
        setSticky(false);
    }, []);

    const isContainerNotFitViewport = React.useCallback(() => {
        const containerHeight = (outerObserveContainer || rootRef.current)?.clientHeight;

        return containerHeight && containerHeight > window.innerHeight;
    }, [outerObserveContainer]);

    const addIntersectionObserver = React.useCallback(() => {
        const observerOptions: IntersectionObserverInit = {
            threshold: [0, 1],
        };

        if (isContainerNotFitViewport()) {
            observerOptions.rootMargin = '0px 0px -100%';
        }

        intersectionObserverRef.current = new IntersectionObserver(entries => {
            entries.forEach(({ isIntersecting, boundingClientRect: { top, left, right } }) => {
                if (!tabListRef.current) {
                    return;
                }

                const {
                    height,
                    left: tabListNodeLeft,
                    right: tabListNodeRight,
                } = tabListRef.current.getBoundingClientRect();
                const leftOffset = outerObserveContainer ? tabListNodeLeft : left;
                const rightOffset = outerObserveContainer ? tabListNodeRight : right;

                setTabListHeight(height);

                if (isIntersecting) {
                    top < 0 ? stickyON(leftOffset, rightOffset) : stickyOFF();
                } else {
                    stickyOFF();
                }
            });
        }, observerOptions);
    }, [isContainerNotFitViewport, outerObserveContainer, stickyOFF, stickyON]);

    const handleTabInnerClick = React.useCallback(
        (index: number) => () => {
            setUnderlineTransition('all');

            onTabClick?.(index);
            if (outerIndex === undefined) {
                setInnerIndex(index);
            }

            swiperInstance?.slideTo(index);
        },
        [onTabClick, outerIndex, swiperInstance],
    );

    const handleSwiper = React.useCallback((swiper: SwiperCore) => {
        setSwiperInstance(swiper);
    }, []);

    const handlePrevArrowClick = React.useCallback(() => {
        swiperInstance?.slidePrev();
    }, [swiperInstance]);

    const handleNextArrowClick = React.useCallback(() => {
        swiperInstance?.slideNext();
    }, [swiperInstance]);

    const handleReachBeginning = React.useCallback(
        (swiper: SwiperCore) => {
            if (isBeginning === swiper.isBeginning) {
                return;
            }

            setBeginning(swiper.isBeginning);
        },
        [isBeginning],
    );

    const handleReachEnd = React.useCallback(
        (swiper: SwiperCore) => {
            if (isEnd === swiper.isEnd) {
                return;
            }

            setEnd(swiper.isEnd);
        },
        [isEnd],
    );

    const handleFromEdge = React.useCallback(
        (swiper: SwiperCore) => {
            isBeginning !== swiper.isBeginning && setBeginning(swiper.isBeginning);
            isEnd !== swiper.isEnd && setEnd(swiper.isEnd);
        },
        [isBeginning, isEnd],
    );

    const addObserveEvent = React.useCallback(() => {
        const rootRefNode = rootRef.current;

        rootRefNode && intersectionObserverRef.current?.observe(outerObserveContainer || rootRefNode);
    }, [outerObserveContainer]);

    const removeObserveEvent = React.useCallback(() => {
        const rootRefNode = rootRef.current;

        rootRefNode && intersectionObserverRef.current?.unobserve(outerObserveContainer || rootRefNode);
    }, [outerObserveContainer]);

    const renderTab: RenderTabType = React.useCallback(
        ({ title, icon, href, rel, attr }, index) => {
            const ElementType = href ? 'a' : 'div';

            return (
                <ElementType
                    href={href}
                    rel={rel}
                    className={cn('tab-inner', {
                        current: currentIndex === index,
                        'with-icon': !!icon,
                    })}
                    onClick={handleTabInnerClick(index)}
                    {...filterDataAttrs(attr, index + 1)}
                >
                    {!!icon && <div className={cn('tab-icon')}>{icon}</div>}
                    {!!title && <div className={cn('tab-title')}>{title}</div>}
                </ElementType>
            );
        },
        [handleTabInnerClick, currentIndex],
    );

    const renderTabs = React.useCallback(
        () =>
            React.Children.map(children, (child, i) => {
                const {
                    props: { title, icon, href, rel, renderTabWrapper, dataAttrs: data },
                } = child;
                const tab = renderTab({ title, icon, href, rel, attr: data?.inner }, i);

                const activeTabClassName = currentIndex === i ? classes?.activeTab : undefined;

                return (
                    <SwiperSlide className={cn('slide')}>
                        <div
                            className={cn('tab', [classes?.tab, activeTabClassName])}
                            ref={setTabRef(i)}
                            {...filterDataAttrs(data?.root, i + 1)}
                        >
                            {renderTabWrapper ? renderTabWrapper(tab) : tab}
                        </div>
                    </SwiperSlide>
                );
            }),
        [children, renderTab, currentIndex, classes?.activeTab, classes?.tab, setTabRef],
    );

    const renderPanels = React.useCallback(
        () =>
            React.Children.map(children, (child, i) => {
                const {
                    props: { children: panel },
                } = child;
                const isCurrentPanel = currentIndex === i;

                if (!panel || (renderOnlyCurrentPanel && !isCurrentPanel)) {
                    return null;
                }

                return (
                    <div
                        {...filterDataAttrs(dataAttrs?.panel, i + 1)}
                        className={cn('panel', {
                            current: isCurrentPanel,
                        })}
                    >
                        {panel}
                    </div>
                );
            }),
        [children, currentIndex, dataAttrs?.panel, renderOnlyCurrentPanel],
    );

    React.useEffect(() => {
        if (!sticky) {
            return undefined;
        }

        addIntersectionObserver();

        addObserveEvent();

        return () => {
            removeObserveEvent();
        };
    }, [addIntersectionObserver, sticky, addObserveEvent, removeObserveEvent]);

    React.useEffect(() => {
        const handleResize = throttle(() => {
            calculateSticky();

            if (sticky && isContainerNotFitViewport()) {
                removeObserveEvent();
                addIntersectionObserver();
                addObserveEvent();
            }
        }, 300);

        const activeTabNode = tabsRef.current[currentIndex] as HTMLDivElement;

        const resizeObserver = new ResizeObserver(entries => {
            if (!entries.length || !entries[0]) {
                return;
            }

            const { width } = entries[0].contentRect;
            setActiveTabWidth(width);
            calculateUnderline();
        });

        calculateUnderline();

        resizeObserver.observe(activeTabNode);

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            resizeObserver.unobserve(activeTabNode);
        };
    }, [
        sticky,
        currentIndex,
        addObserveEvent,
        calculateSticky,
        removeObserveEvent,
        calculateUnderline,
        addIntersectionObserver,
        isContainerNotFitViewport,
    ]);

    React.useEffect(() => {
        if (!swiperInstance) {
            return;
        }

        if (isChildrenLengthDiff) {
            handleFromEdge(swiperInstance);

            return;
        }

        handleFromEdge(swiperInstance);
    }, [swiperInstance, isChildrenLengthDiff, handleFromEdge]);

    return (
        <div
            {...filterDataAttrs(dataAttrs?.root)}
            className={cn(
                {
                    size,
                    'tab-color': tabColorTheme,
                    'h-align': align,
                    indents: !classes?.innerIndents,
                    sticky: isSticky,
                    'auto-width': autoWidth,
                },
                [className, classes.root],
            )}
            ref={rootRef}
        >
            <div
                ref={tabListRef}
                style={{ height: tabListHeight }}
                {...filterDataAttrs(dataAttrs?.wrapper)}
                className={cn('wrapper', [classes?.wrapper])}
            >
                <div
                    className={cn('swiper-wrapper', [classes?.swiperWrapper])}
                    style={{
                        paddingLeft: stickyOffset.left,
                        paddingRight: stickyOffset.right,
                    }}
                    {...filterDataAttrs(dataAttrs?.swiperWrapper)}
                >
                    <Swiper
                        {...filterDataAttrs(dataAttrs?.slider)}
                        simulateTouch={false}
                        className={cn(
                            'swiper',
                            {
                                beginning: isBeginning,
                                end: isEnd,
                            },
                            [classes?.innerIndents],
                        )}
                        watchOverflow
                        slidesPerView="auto"
                        initialSlide={currentIndex}
                        onSwiper={handleSwiper}
                        onReachBeginning={handleReachBeginning}
                        onReachEnd={handleReachEnd}
                        onFromEdge={handleFromEdge}
                        observer
                    >
                        {renderTabs()}
                        <div
                            className={cn('underline')}
                            slot="wrapper-start"
                            style={{
                                width: `${underlineWidth}px`,
                                transform: `translateX(${underlineTranslate}px)`,
                                transitionProperty: underlineTransition,
                            }}
                        />
                        <ArrowLeft
                            {...filterDataAttrs(dataAttrs?.prev)}
                            className={cn('arrow', {
                                prev: true,
                                hide: isBeginning,
                            })}
                            onClick={handlePrevArrowClick}
                        />
                        <ArrowLeft
                            {...filterDataAttrs(dataAttrs?.next)}
                            className={cn('arrow', { next: true, hide: isEnd })}
                            onClick={handleNextArrowClick}
                        />
                    </Swiper>
                </div>
            </div>
            {renderPanels()}
        </div>
    );
};

Tabs.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.shape({
        root: PropTypes.string,
        wrapper: PropTypes.string,
        swiperWrapper: PropTypes.string,
        innerIndents: PropTypes.string,
        tab: PropTypes.string,
        activeTab: PropTypes.string,
    }),
    dataAttrs: PropTypes.shape({
        root: PropTypes.objectOf(PropTypes.string.isRequired),
        slider: PropTypes.objectOf(PropTypes.string.isRequired),
        panel: PropTypes.objectOf(PropTypes.string.isRequired),
        prev: PropTypes.objectOf(PropTypes.string.isRequired),
        next: PropTypes.objectOf(PropTypes.string.isRequired),
        wrapper: PropTypes.objectOf(PropTypes.string.isRequired),
        swiperWrapper: PropTypes.objectOf(PropTypes.string.isRequired),
    }),
    size: PropTypes.oneOf(Object.values(TabSize)),
    align: PropTypes.oneOf(Object.values(TabAlign)),
    autoWidth: PropTypes.bool,
    tabColorTheme: PropTypes.oneOf(Object.values(TabColorTheme)),
    sticky: PropTypes.bool,
    currentIndex: PropTypes.number,
    defaultIndex: PropTypes.number,
    renderOnlyCurrentPanel: PropTypes.bool,
    outerObserveContainer: PropTypes.oneOfType([PropTypes.elementType, PropTypes.any]),
    onTabClick: PropTypes.func,
};

export default Tabs;
