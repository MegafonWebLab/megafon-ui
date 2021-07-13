import * as React from 'react';
import PropTypes from 'prop-types';
import SwiperCore from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import throttle from 'lodash.throttle';
import { cnCreate } from '@megafon/ui-helpers';
import './Tabs.less';
import { ITabProps } from './Tab';
import ArrowLeft from 'icons/System/16/Arrow_left_16.svg';
import ArrowRight from 'icons/System/16/Arrow_right_16.svg';

export const TabSize = {
    SMALL: 'small',
    MEDIUM: 'medium',
    LARGE:  'large',
} as const;

export const TabHAlign = {
    LEFT: 'left',
    CENTER: 'center',
} as const;

export const TabColorTheme = {
    WHITE: 'white',
    GREEN: 'green',
} as const;

type TabSizeType = typeof TabSize[keyof typeof TabSize];
type TabHAlignType = typeof TabHAlign[keyof typeof TabHAlign];
type TabColorThemeType = typeof TabColorTheme[keyof typeof TabColorTheme];

export interface ITabsProps {
    /** Дополнительный класс для корневого элемента */
    className?: string;
    /** Дополнительные классы для корневого и внутренних элементов */
    classes?: {
        root?: string;
        innerIndents?: string;
        tab?: string;
        activeTab?: string;
    };
    /** Размер табов */
    size?: TabSizeType;
    /** Горизонтальное выравнивание */
    hAlign?: TabHAlignType;
    /** Цветовая тема табов для определенных фонов */
    tabColorTheme?: TabColorThemeType;
    /** Фиксация табов у верхней границы окна */
    sticky?: boolean;
    /** Индекс активного таба (включает режим управления табами снаружи) */
    currentIndex?: number;
    /** Индекс активного таба по умолчанию (не работает в режиме управления табами снаружи) */
    defaultIndex?: number;
    /** Обработчика клика по табам */
    onTabClick?: (index: number) => void;
    children: Array<React.ReactElement<ITabProps>>;
}

const cn = cnCreate('mfui-beta-tabs');
const Tabs: React.FC<ITabsProps> = ({
    className,
    classes: {
        root: rootClass,
        innerIndents: innerIndentsClass,
        tab: tabClass,
        activeTab: activeTabClass,
    } = {},
    size = 'medium',
    hAlign = 'left',
    tabColorTheme = 'white',
    sticky = false,
    defaultIndex = 0,
    currentIndex: outerIndex,
    children,
    onTabClick,
}) => {
    const tabsRef = React.useRef<HTMLDivElement[]>([]);
    const rootRef = React.useRef<HTMLDivElement>(null);
    const tabListRef = React.useRef<HTMLDivElement>(null);

    const [swiperInstance, setSwiperInstance] = React.useState<SwiperCore>();
    const [isBeginning, setBeginning] = React.useState(true);
    const [isEnd, setEnd] = React.useState(false);

    const [innerIndex, setInnerIndex] = React.useState(defaultIndex);
    const currentIndex = outerIndex === undefined ? innerIndex : outerIndex;

    const [underlineWidth, setUnderlineWidth] = React.useState(0);
    const [underlineTranslate, setUnderlineTranslate] = React.useState(0);
    const [underlineTransition, setUnderlineTransition] = React.useState(
        'none'
    );

    const [tabListHeight, setTabListHeight] = React.useState<number | 'auto'>(
        'auto'
    );

    const [isSticky, setSticky] = React.useState(false);
    const [stickyOffset, setStickyOffset] = React.useState({
        left: 0,
        right: 0,
    });

    const setTabRef = React.useCallback((tab: HTMLDivElement) => {
        tab && tabsRef.current.push(tab);
    }, []);

    const calculateUnderline = React.useCallback(() => {
        if (!tabsRef.current.length) {
            return;
        }

        const tabNodeChild = tabsRef.current[currentIndex].firstElementChild;
        const { clientWidth = 0 } = (tabNodeChild as HTMLDivElement) || {};
        const translate = [...tabsRef.current]
            .splice(0, currentIndex)
            .reduce((accWidth, node) => {
                const { width } = node.getBoundingClientRect();

                return accWidth + width;
            }, 0);

        setUnderlineWidth(clientWidth);
        setUnderlineTranslate(translate);
    }, [currentIndex]);

    const calculateSticky = React.useCallback(() => {
        if (!sticky || !rootRef.current || !tabListRef.current) {
            return;
        }

        const { left, right } = rootRef.current.getBoundingClientRect();
        const documentWidth = document.documentElement.clientWidth;

        setStickyOffset({ left, right: documentWidth - right });

    }, [stickyOffset, isSticky]);

    const handleTabInnerClick = React.useCallback((index: number) => () => {
        setUnderlineTransition('all');

        onTabClick && onTabClick(index);
        if (outerIndex === undefined) {
            setInnerIndex(index);
        }

        swiperInstance?.slideTo(index);
    }, [onTabClick, outerIndex, swiperInstance]);

    const handleSwiper = React.useCallback((swiper: SwiperCore) => {
        setSwiperInstance(swiper);
    }, []);

    const handlePrevArrowClick = React.useCallback(() => {
        swiperInstance?.slidePrev();
    }, [swiperInstance]);

    const handleNextArrowClick = React.useCallback(() => {
        swiperInstance?.slideNext();
    }, [swiperInstance]);

    const renderTab = React.useCallback((
        index: number,
        title?: string,
        icon?: React.ReactNode,
        href?: string
    ) => {
        const ElementType = href ? 'a' : 'div';

        return (
            <ElementType
                href={href}
                className={cn('tab-inner', {
                    current: currentIndex === index,
                })}
                onClick={handleTabInnerClick(index)}
            >
                {!!icon && <div className={cn('tab-icon')}>{icon}</div>}
                {!!title && <div className={cn('tab-title')}>{title}</div>}
            </ElementType>
        );
    }, [handleTabInnerClick, currentIndex]);

    const renderTabs = React.useCallback(() =>
        React.Children.map(children, (child, i) => {
            const {
                props: { title, icon, href, renderTabWrapper },
            } = child;
            const tab = renderTab(i, title, icon, href);

            const activeTabClassName = currentIndex === i ? activeTabClass : undefined;

            return (
                <SwiperSlide className={cn('slide')}>
                    <div className={cn('tab', [tabClass, activeTabClassName])} ref={setTabRef}>
                        {renderTabWrapper ? renderTabWrapper(tab) : tab}
                    </div>
                </SwiperSlide>
            );
    }), [renderTab, children]);

    const renderPanels = React.useCallback(() =>
        React.Children.map(children, (child, i) => {
            return (
                <div
                    className={cn('panel', {
                        current: currentIndex === i,
                    })}
                >
                    {child}
                </div>
            );
    }), [children, currentIndex]);

    const handleReachBeginning = React.useCallback((swiper: SwiperCore) => {
        setBeginning(swiper.isBeginning);
    }, []);

    const handleReachEnd = React.useCallback((swiper: SwiperCore) => {
        setEnd(swiper.isEnd);
    }, []);

    const handleFromEdge = React.useCallback((swiper: SwiperCore) => {
        setBeginning(swiper.isBeginning);
        setEnd(swiper.isEnd);
    }, []);

    React.useEffect(() => {
        const observer =  new IntersectionObserver((entries) => {
            entries.forEach(({ isIntersecting, boundingClientRect: { top, left, right } }) => {
                if (!sticky || !rootRef.current || !tabListRef.current) {
                    return;
                }

                const listHeight = tabListRef.current.clientHeight;

                setTabListHeight(listHeight);

                const stickyON = (leftOffset: number, rightOffset: number) => {
                    const documentWidth = document.documentElement.clientWidth;

                    setStickyOffset({ left: leftOffset, right: documentWidth - rightOffset });
                    setSticky(true);
                };

                const stickyOFF = () => {
                    setStickyOffset({ left: 0, right: 0 });
                    setSticky(false);
                };

                if (isIntersecting) {
                    top < 0 ? stickyON(left, right) : stickyOFF();
                } else {
                    top < 0 && stickyOFF();
                }
          });
        }, { threshold: [ 0 , 1 ] });

        rootRef.current && observer.observe(rootRef.current);

        return () => {
           rootRef.current && observer.unobserve(rootRef.current);
        };
    }, [calculateSticky]);

    React.useEffect(() => {
        const handleResize = throttle(() => {
            calculateUnderline();
            calculateSticky();
        }, 300);

        calculateUnderline();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [calculateUnderline, calculateSticky]);

    React.useEffect(() => {
        if (!swiperInstance) {
            return;
        }

        setBeginning(swiperInstance.isBeginning);
        setEnd(swiperInstance.isEnd);
    }, [swiperInstance]);

    return (
        <div
            className={cn(
                {
                    size,
                    'h-align': hAlign,
                    'tab-color': tabColorTheme,
                    indents: !innerIndentsClass,
                    sticky: isSticky,
                },
                [className, rootClass]
            )}
            ref={rootRef}
        >
            <div
                ref={tabListRef}
                style={{ height: tabListHeight }}
            >
                <div
                    className={cn('swiper-wrapper')}
                    style={{
                        paddingLeft: stickyOffset.left,
                        paddingRight: stickyOffset.right,
                    }}
                >
                    <Swiper
                        simulateTouch={false}
                        className={cn(
                            'swiper',
                            {
                                beginning: isBeginning,
                                end: isEnd,
                            },
                            [innerIndentsClass]
                        )}
                        slidesPerView="auto"
                        initialSlide={currentIndex}
                        onSwiper={handleSwiper}
                        onReachBeginning={handleReachBeginning}
                        onReachEnd={handleReachEnd}
                        onFromEdge={handleFromEdge}
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
                            className={cn('arrow', {
                                prev: true,
                                hide: isBeginning,
                            })}
                            onClick={handlePrevArrowClick}
                        />
                        <ArrowRight
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
        innerIndents: PropTypes.string,
        tab: PropTypes.string,
        activeTab: PropTypes.string,
    }),
    size: PropTypes.oneOf(Object.values(TabSize)),
    hAlign: PropTypes.oneOf(Object.values(TabHAlign)),
    tabColorTheme: PropTypes.oneOf(Object.values(TabColorTheme)),
    sticky: PropTypes.bool,
    currentIndex: PropTypes.number,
    defaultIndex: PropTypes.number,
    onTabClick: PropTypes.func,
};

export default Tabs;
