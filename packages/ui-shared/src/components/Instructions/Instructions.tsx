/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Ref } from 'react';
import { Grid, GridColumn, Header, Paragraph } from '@megafon/ui-core';
import { cnCreate, filterDataAttrs, titleConvertConfig, convert, textConvertConfig } from '@megafon/ui-helpers';
import PropTypes from 'prop-types';
import SwiperCore from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperClass from 'swiper/types/swiper-class';
import './Instructions.less';

export const pictureAlignTypes = {
    LEFT: 'left',
    RIGHT: 'right',
} as const;

export const pictureVerticalAlignTypes = {
    CENTER: 'center',
    TOP: 'top',
};

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

type PictureVerticalAlignTypesType = typeof pictureVerticalAlignTypes[keyof typeof pictureVerticalAlignTypes];

type PictureMaskTypesType = typeof pictureMaskTypes[keyof typeof pictureMaskTypes];

export type InstructionItemType = {
    title: string | React.ReactNode | React.ReactNode[];
    mediaUrl: string;
    isVideo: boolean;
    imageAlt?: string;
};

export interface IInstructionsProps {
    /** Дополнительные data атрибуты к внутренним элементам */
    dataAttrs?: {
        root?: Record<string, string>;
        item?: Record<string, string>;
        image?: Record<string, string>;
        mobileItemText?: Record<string, string>;
    };
    /** Ссылка на корневой элемент */
    rootRef?: Ref<HTMLDivElement>;
    /** Дополнительные классы для внутренних элементов */
    classes?: {
        instructionItem?: string;
        desktopInstructionItem?: string;
        mobileInstructionItem?: string;
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
    /** Расположение изображения по горизонтали */
    pictureAlign?: PictureAlignTypesType;
    /** Расположение изображения по вертикали */
    pictureVerticalAlign?: PictureVerticalAlignTypesType;
    /** Маска изображения */
    pictureMask?: PictureMaskTypesType;
    /** Ref на swiper */
    getSwiper?: (instance: SwiperCore) => void;
}

const cn = cnCreate('mfui-instructions');
const swiperSlideCn = cn('slide');
const Instructions: React.FC<IInstructionsProps> = ({
    dataAttrs,
    rootRef,
    classes: {
        instructionItem,
        desktopInstructionItem,
        mobileInstructionItem,
        activeInstructionItem,
        desktopItemTitle,
        mobileItemTitle,
        instructionItemImg,
        additionalText,
    } = {},
    title,
    instructionItems,
    pictureAlign = 'left',
    pictureVerticalAlign = 'center',
    pictureMask = 'none',
    getSwiper,
    additionalText: text,
    children,
}) => {
    const [swiperInstance, setSwiperInstance] = React.useState<SwiperClass>();
    const [slideIndex, setSlideIndex] = React.useState(0);

    const getSwiperInstance = React.useCallback(
        (swiper: SwiperClass): void => {
            setSwiperInstance(swiper);
            getSwiper && getSwiper(swiper);
        },
        [getSwiper],
    );

    const getActiveCustomClass = React.useCallback(
        (articleIndex: number, activeIndex: number) => {
            if (articleIndex !== activeIndex) {
                return undefined;
            }

            return activeInstructionItem;
        },
        [activeInstructionItem],
    );

    const handleArticleClick = React.useCallback(
        (ind: number) => (): void => {
            setSlideIndex(ind);
            swiperInstance && swiperInstance.slideTo(ind);
        },
        [swiperInstance],
    );

    const handleSlideChange = React.useCallback(({ activeIndex }: SwiperClass) => {
        setSlideIndex(activeIndex);
    }, []);

    const renderVideo = React.useCallback(
        (mediaUrl: string, index: number): JSX.Element => (
            <video
                loop
                muted
                autoPlay
                playsInline
                className={cn('swiper-img', { video: true })}
                {...filterDataAttrs(dataAttrs?.image, index + 1)}
            >
                <source src={mediaUrl} type="video/mp4" />
            </video>
        ),
        [dataAttrs?.image],
    );

    const renderSlider = React.useCallback(
        (): JSX.Element => (
            <Swiper
                noSwiping={false}
                onSwiper={getSwiperInstance}
                noSwipingClass={swiperSlideCn}
                onSlideChange={handleSlideChange}
                className={cn('swiper')}
            >
                {instructionItems.map(({ mediaUrl, isVideo, imageAlt }, i) => (
                    <SwiperSlide className={swiperSlideCn} key={i + mediaUrl}>
                        {isVideo ? (
                            renderVideo(mediaUrl, i)
                        ) : (
                            <img
                                alt={imageAlt}
                                src={mediaUrl}
                                {...filterDataAttrs(dataAttrs?.image, i + 1)}
                                className={cn('swiper-img', [instructionItemImg])}
                            />
                        )}
                    </SwiperSlide>
                ))}
            </Swiper>
        ),
        [getSwiperInstance, instructionItemImg, instructionItems, renderVideo, dataAttrs?.image, handleSlideChange],
    );

    const renderTitle = React.useCallback(
        (resolution: string): JSX.Element => (
            <Header className={cn('title', { resolution })} as="h2">
                {convert(title, titleConvertConfig)}
            </Header>
        ),
        [title],
    );

    const renderText = React.useCallback(
        (): JSX.Element => (
            <Paragraph className={cn('text', [additionalText])} hasMargin={false}>
                {convert(text as string, textConvertConfig)}
            </Paragraph>
        ),
        [text, additionalText],
    );

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
    }, [pictureMask, renderSlider]);

    const renderDesktopArticles = React.useCallback(
        (): JSX.Element => (
            <ul className={cn('articles-list', { 'text-after': !!text, desktop: true })}>
                {instructionItems.map(({ title: itemTitle }, i) => (
                    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
                    <li
                        {...filterDataAttrs(dataAttrs?.item, i + 1)}
                        className={cn('articles-item', { active: slideIndex === i }, [
                            getActiveCustomClass(i, slideIndex),
                            instructionItem,
                            desktopInstructionItem,
                        ])}
                        data-index={i}
                        onClick={handleArticleClick(i)}
                        key={i}
                    >
                        <div className={cn('articles-item-dot')}>
                            <span className={cn('articles-item-dot-number')}>{i + 1}</span>
                        </div>
                        <div className={cn('articles-item-title', [desktopItemTitle])}>{itemTitle}</div>
                    </li>
                ))}
            </ul>
        ),
        [
            desktopInstructionItem,
            desktopItemTitle,
            getActiveCustomClass,
            handleArticleClick,
            dataAttrs?.item,
            instructionItem,
            instructionItems,
            slideIndex,
            text,
        ],
    );

    const renderMobileArticles = React.useCallback(
        (): JSX.Element => (
            <div className={cn('articles-list', { mobile: true })}>
                <div className={cn('articles-title-block')}>
                    {instructionItems.map(
                        ({ title: itemTitle }, i) =>
                            slideIndex === i && (
                                <div
                                    key={i}
                                    data-index={i}
                                    {...filterDataAttrs(dataAttrs?.mobileItemText, i + 1)}
                                    className={cn('articles-title', [mobileItemTitle])}
                                >
                                    {itemTitle}
                                </div>
                            ),
                    )}
                </div>
                <ul className={cn('articles-dots', { 'text-after': !!text })}>
                    {instructionItems.map((_item, i) => (
                        <div
                            {...filterDataAttrs(dataAttrs?.item, i + 1)}
                            key={i}
                            className={cn('articles-dot', { active: slideIndex === i }, [
                                getActiveCustomClass(i, slideIndex),
                                instructionItem,
                                mobileInstructionItem,
                            ])}
                            onClick={handleArticleClick(i)}
                        >
                            <span className={cn('articles-dot-number')}>{i + 1}</span>
                        </div>
                    ))}
                </ul>
            </div>
        ),
        [
            dataAttrs?.mobileItemText,
            getActiveCustomClass,
            handleArticleClick,
            instructionItem,
            instructionItems,
            mobileInstructionItem,
            mobileItemTitle,
            dataAttrs?.item,
            slideIndex,
            text,
        ],
    );

    return (
        <div {...filterDataAttrs(dataAttrs?.root)} className={cn({ mask: pictureMask })} ref={rootRef}>
            <Grid hAlign="center">
                <GridColumn all="12">
                    {renderTitle('mobile')}
                    <div className={cn('wrapper')}>
                        <div className={cn('picture', { align: pictureAlign, 'vertical-align': pictureVerticalAlign })}>
                            {renderPicture()}
                        </div>
                        <div className={cn('articles', { align: pictureAlign })}>
                            {renderTitle('desktop')}
                            {renderMobileArticles()}
                            {renderDesktopArticles()}
                            {text && renderText()}
                            {children}
                        </div>
                    </div>
                </GridColumn>
            </Grid>
        </div>
    );
};

Instructions.propTypes = {
    dataAttrs: PropTypes.shape({
        root: PropTypes.objectOf(PropTypes.string.isRequired),
        item: PropTypes.objectOf(PropTypes.string.isRequired),
        image: PropTypes.objectOf(PropTypes.string.isRequired),
        mobileItemText: PropTypes.objectOf(PropTypes.string.isRequired),
    }),
    rootRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.oneOfType([PropTypes.shape({ current: PropTypes.elementType }), PropTypes.any]),
    ]),
    classes: PropTypes.shape({
        instructionItem: PropTypes.string,
        desktopInstructionItem: PropTypes.string,
        mobileInstructionItem: PropTypes.string,
        activeInstructionItem: PropTypes.string,
        desktopItemTitle: PropTypes.string,
        mobileItemTitle: PropTypes.string,
        instructionItemImg: PropTypes.string,
    }),
    title: PropTypes.string.isRequired,
    additionalText: PropTypes.string,
    instructionItems: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.arrayOf(PropTypes.node)])
                .isRequired,
            mediaUrl: PropTypes.string.isRequired,
            isVideo: PropTypes.bool.isRequired,
            imageAlt: PropTypes.string,
        }).isRequired,
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
