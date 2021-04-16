import React, { Ref } from 'react';
import PropTypes from 'prop-types';
import './Instructions.less';
import throttle from 'lodash.throttle';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperClass from 'swiper/types/swiper-class';
import { breakpoints, cnCreate, Grid, GridColumn, Header, Paragraph, convert, TextLink } from '@megafon/ui-core';

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
    NONE: 'none',
} as const;

type PictureAlignTypesType = typeof pictureAlignTypes[keyof typeof pictureAlignTypes];

type PictureMaskTypesType = typeof pictureMaskTypes[keyof typeof pictureMaskTypes];

export type InstructionItemType = {
    title: string;
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
    };
    /** Заголовок инструкции */
    title: string;
    /** Пункты инструкции */
    instructionItems: InstructionItemType[];
    /** Расположение изображения */
    pictureAlign?: PictureAlignTypesType;
    /** Маска изображения */
    pictureMask?: PictureMaskTypesType;
}

const typographyConfig = {
    a: {
        component: TextLink,
        props: ['href', 'target'],
    },
    b: {
        component: ({ children }) => <b>{children}</b>,
    },
};

const cn = cnCreate('mfui-beta-instructions');
const swiperSlideCn = cn('slide');
const Instructions: React.FC<IInstructionsProps> = ({
    rootRef,
    classes: {
        instructionItem,
        activeInstructionItem,
    } = {},
    title,
    instructionItems,
    pictureAlign = 'left',
    pictureMask = 'none',
}) => {
    const [swiperInstance, setSwiperInstance] = React.useState<SwiperClass>();
    const [slideIndex, setSlideIndex] = React.useState(0);
    const [isMobile, setIsMobile] = React.useState(false);

    const getSwiperInstance = React.useCallback((swiper: SwiperClass): void => {
        setSwiperInstance(swiper);
    }, []);

    const getArticleCustomClasses = React.useCallback((articleIndex: number, activeIndex: number) => {
        if (!instructionItem || !activeInstructionItem) {
            return;
        }

        return articleIndex === activeIndex ? `${instructionItem} ${activeInstructionItem}` : instructionItem;
    }, [instructionItem, activeInstructionItem]);

    const handleResize = React.useCallback((): void => {
        const isMobileScreen = window.innerWidth < breakpoints.desktopSmallStart;

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
                        : <img className={cn('swiper-img')} src={mediaUrl} alt="" />
                    }
                </SwiperSlide>
            ))}
        </Swiper>
    ), [instructionItems]);

    const renderDesktopArticles = React.useCallback((): JSX.Element => (
        <ul className={cn('articles-list')}>
            {instructionItems.map(({title: itemTitle}, ind) => (
                <li
                    className={cn(
                        'articles-item',
                        { active: slideIndex === ind },
                        [getArticleCustomClasses(ind, slideIndex)]
                    )}
                    onClick={handleArticleClick(ind)}
                    key={ind}
                >
                    <div className={cn('articles-item-dot')}>
                        <span className={cn('articles-item-dot-number')}>{ind + 1}</span>
                    </div>
                    <Paragraph className={cn('articles-item-title')} hasMargin={false}>
                        {convert(itemTitle, typographyConfig)}
                    </Paragraph>
                </li>
            ))}
        </ul>
    ), [instructionItems, slideIndex, handleArticleClick]);

    const renderMobileArticles = React.useCallback((): JSX.Element => (
        <>
            <div className={cn('articles-title-block')}>
                {instructionItems.map(({ title: itemTitle }, ind) => (
                    slideIndex === ind &&
                        <Paragraph className={cn('articles-title')} hasMargin={false} key={ind}>
                            {convert(itemTitle, typographyConfig)}
                        </Paragraph>
                ))}
            </div>
            <ul className={cn('articles-dots')}>
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
    ), [instructionItems, slideIndex, handleArticleClick]);

    React.useEffect(() => {
        const handleSetThrottled = throttle(handleResize, 100);

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
    }),
    title: PropTypes.string.isRequired,
    instructionItems: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
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
        pictureMaskTypes.NONE,
    ]),
};

export default Instructions;
