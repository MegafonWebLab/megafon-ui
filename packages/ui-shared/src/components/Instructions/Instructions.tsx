import React, { Ref } from 'react';
import PropTypes from 'prop-types';
import './Instructions.less';
import throttle from 'lodash.throttle';
import SwiperCore from 'swiper';
import convert from 'htmr';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperClass from 'swiper/types/swiper-class';
import { Grid, GridColumn, Header, Paragraph } from '@megafon/ui-core';
import { breakpoints, cnCreate } from '@megafon/ui-helpers';

const THROTTLE_MILLISECONDS = 100;

export const pictureAlignTypes = {
    LEFT: 'left',
    RIGHT: 'right',
} as const;

export const pictureMaskTypes = {
    ANDROID: 'android',
    NEW_IPHONE: 'new-iphone',
    BLACK_IPHONE: 'black-iphone',
    WHITE_IPHONE: 'white-iphone',
    LAPTOP: 'laptop',
    IPHONE_12: 'iphone-12',
    NONE: 'none',
} as const;

type PictureAlignTypesType = typeof pictureAlignTypes[keyof typeof pictureAlignTypes];

type PictureMaskTypesType = typeof pictureMaskTypes[keyof typeof pictureMaskTypes];

export type InstructionItemType = {
    title: string | React.ReactNode | React.ReactNode[];
    mediaUrl: string;
    isVideo: boolean;
};

export interface IInstructionsProps {
    /** Ссылка на корневой элемент */
    rootRef?: Ref<HTMLDivElement>;
    /** Дополнительные классы для внутренних элементов */
    classes?: {
        instructionItem?: string;
        activeInstructionItem?: string;
        desktopItemTitle?: string;
        mobileItemTitle?: string;
        instructionItemImg?: string;
        additionalText?: string;
    };
    /** Заголовок инструкции */
    title: string;
    /** Пункты инструкции */
    instructionItems: InstructionItemType[];
    /** Описание после инструкции */
    additionalText?: string;
    /** Расположение изображения */
    pictureAlign?: PictureAlignTypesType;
    /** Маска изображения */
    pictureMask?: PictureMaskTypesType;
    /** Ref на swiper */
    getSwiper?: (instance: SwiperCore) => void;
}

const cn = cnCreate('mfui-beta-instructions');
const swiperSlideCn = cn('slide');
const Instructions: React.FC<IInstructionsProps> = ({
    rootRef,
    classes: {
        instructionItem,
        activeInstructionItem,
        desktopItemTitle,
        mobileItemTitle,
        instructionItemImg,
        additionalText,
    } = {},
    title,
    instructionItems,
    pictureAlign = 'left',
    pictureMask = 'none',
    getSwiper,
    additionalText: text,
}) => {
    const [swiperInstance, setSwiperInstance] = React.useState<SwiperClass>();
    const [slideIndex, setSlideIndex] = React.useState(0);
    const [isMobile, setIsMobile] = React.useState(false);

    const getSwiperInstance = React.useCallback((swiper: SwiperClass): void => {
        setSwiperInstance(swiper);
        getSwiper && getSwiper(swiper);
    }, []);

    const getArticleCustomClasses = React.useCallback((articleIndex: number, activeIndex: number) => {
        if (!instructionItem || !activeInstructionItem) {
            return;
        }

        return articleIndex === activeIndex ? `${instructionItem} ${activeInstructionItem}` : instructionItem;
    }, [instructionItem, activeInstructionItem]);

    const handleResize = React.useCallback((): void => {
        const isMobileScreen = window.innerWidth < breakpoints.DESKTOP_SMALL_START;

        setIsMobile(isMobileScreen);
    }, []);

    const handleArticleClick = React.useCallback((ind: number) => (): void => {
        setSlideIndex(ind);
        swiperInstance && swiperInstance.slideTo(ind);
    }, [swiperInstance]);

    const renderTitle = React.useCallback((resolution: string): JSX.Element => (
        <Header className={cn('title', { resolution })} as="h2">
            {title}
        </Header>
    ), []);

    const renderText = React.useCallback((): JSX.Element => (
        <Paragraph className={cn('text', [additionalText])} hasMargin={false}>
            {convert(text as string)}
        </Paragraph>
    ), [text, additionalText]);

    const renderPicture = React.useCallback((): JSX.Element => {
        if (pictureMask === pictureMaskTypes.NONE) {
            return renderSlider();
        }

        return (
            <div className={cn('img-wrapper')}>
                <div className={cn('device-screen')} />
                {renderSlider()}
            </div>
        );
    }, [pictureMask]);

    const renderVideo = React.useCallback((mediaUrl: string): JSX.Element => (
        <video className={cn('swiper-img')} autoPlay muted loop>
            <source src={mediaUrl} type="video/mp4" />
        </video>
    ), []);

    const renderSlider = React.useCallback((): JSX.Element => (
        <Swiper
            className={cn('swiper')}
            onSwiper={getSwiperInstance}
            noSwipingClass={swiperSlideCn}
        >
            {instructionItems.map(({ mediaUrl, isVideo}, ind) => (
                <SwiperSlide className={swiperSlideCn} key={ind + mediaUrl}>
                    {isVideo
                        ? renderVideo(mediaUrl)
                        : <img className={cn('swiper-img', [instructionItemImg])} src={mediaUrl} alt="" />
                    }
                </SwiperSlide>
            ))}
        </Swiper>
    ), [instructionItems]);

    const renderDesktopArticles = React.useCallback((): JSX.Element => (
        <ul className={cn('articles-list', { 'text-after': !!text })}>
            {instructionItems.map(({title: itemTitle}, ind) => (
                <li
                    className={cn(
                        'articles-item',
                        { active: slideIndex === ind },
                        [getArticleCustomClasses(ind, slideIndex)]
                    )}
                    data-index={ind}
                    onClick={handleArticleClick(ind)}
                    key={ind}
                >
                    <div className={cn('articles-item-dot')}>
                        <span className={cn('articles-item-dot-number')}>{ind + 1}</span>
                    </div>
                    <div className={cn('articles-item-title', [desktopItemTitle])}>
                        {itemTitle}
                    </div>
                </li>
            ))}
        </ul>
    ), [instructionItems, slideIndex, handleArticleClick, text]);

    const renderMobileArticles = React.useCallback((): JSX.Element => (
        <>
            <div className={cn('articles-title-block')}>
                {instructionItems.map(({ title: itemTitle }, ind) => (
                    slideIndex === ind &&
                        <div className={cn('articles-title', [mobileItemTitle])} data-index={ind} key={ind}>
                            {itemTitle}
                        </div>
                ))}
            </div>
            <ul className={cn('articles-dots', { 'text-after': !!text })}>
                {instructionItems.map((_item, ind) => (
                    <div
                        key={ind}
                        className={cn(
                            'articles-dot',
                            { active: slideIndex === ind },
                            [getArticleCustomClasses(ind, slideIndex)]
                        )}
                        onClick={handleArticleClick(ind)}
                    >
                        <span className={cn('articles-dot-number')}>{ind + 1}</span>
                    </div>
                ))}
            </ul>
        </>
    ), [instructionItems, slideIndex, handleArticleClick, text]);

    React.useEffect(() => {
        const handleSetThrottled = throttle(handleResize, THROTTLE_MILLISECONDS);

        handleResize();
        window.addEventListener('resize', handleSetThrottled);

        return (): void => {
            window.removeEventListener('resize', handleSetThrottled);
        };
    }, [handleResize]);

    return (
        <div className={cn({ mask: pictureMask })} ref={rootRef}>
            <Grid hAlign="center">
                <GridColumn all="12" >
                    {renderTitle('mobile')}
                    <div className={cn('wrapper')}>
                        <div className={cn('picture', { align: pictureAlign })}>
                            {renderPicture()}
                        </div>
                        <div className={cn('articles', { align: pictureAlign })}>
                            {renderTitle('desktop')}
                            {isMobile
                                ? renderMobileArticles()
                                : renderDesktopArticles()
                            }
                            {text && renderText()}
                        </div>
                    </div>
                </GridColumn>
            </Grid>
        </div>
    );
};

Instructions.propTypes = {
    rootRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.oneOfType([PropTypes.shape({ current: PropTypes.elementType }), PropTypes.any ]),
    ]),
    classes: PropTypes.shape({
        instructionItem: PropTypes.string,
        activeInstructionItem: PropTypes.string,
        desktopItemTitle: PropTypes.string,
        mobileItemTitle: PropTypes.string,
        instructionItemImg: PropTypes.string,
    }),
    title: PropTypes.string.isRequired,
    additionalText: PropTypes.string,
    instructionItems: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.oneOfType([
                PropTypes.string, PropTypes.node, PropTypes.arrayOf(PropTypes.node),
            ]).isRequired,
            mediaUrl: PropTypes.string.isRequired,
            isVideo: PropTypes.bool.isRequired,
        }).isRequired
    ).isRequired,
    pictureAlign: PropTypes.oneOf([pictureAlignTypes.LEFT, pictureAlignTypes.RIGHT]),
    pictureMask: PropTypes.oneOf([
        pictureMaskTypes.ANDROID,
        pictureMaskTypes.NEW_IPHONE,
        pictureMaskTypes.WHITE_IPHONE,
        pictureMaskTypes.BLACK_IPHONE,
        pictureMaskTypes.LAPTOP,
        pictureMaskTypes.IPHONE_12,
        pictureMaskTypes.NONE,
    ]),
    getSwiper: PropTypes.func,
};

export default Instructions;
