import React, { Ref } from 'react';
import { Button, Header, ContentArea, TextLink, Grid, GridColumn } from '@megafon/ui-core';
import { breakpoints, cnCreate, filterDataAttrs, convert, titleConvertConfig } from '@megafon/ui-helpers';
import throttle from 'lodash.throttle';
import * as PropTypes from 'prop-types';
import throttleTime from 'constants/throttleTime';
import Breadcrumbs, { Props as BreadcrumbsPropsType } from '../Breadcrumbs/Breadcrumbs';
import './VideoBanner.less';

type BreadCrumbsItemsType = BreadcrumbsPropsType['items'];

const cn = cnCreate('mfui-video-banner');

export enum ClassName {
    BUTTON = 'button',
    LINK = 'link',
}

const typographyConfig = {
    b: {
        component: ({ children }) => (
            <Header className={cn('value')} as="h3" color="inherit">
                {children}
            </Header>
        ),
    },
};

export const VideoType = {
    YOUTUBE: 'youtube',
    VIDEO: 'video',
} as const;

type VideoType = typeof VideoType[keyof typeof VideoType];

export const ButtonColor = {
    GREEN: 'green',
    PURPLE: 'purple',
} as const;

export type ButtonColorType = typeof ButtonColor[keyof typeof ButtonColor];

export const TextColor = {
    BLACK: 'black',
    WHITE: 'white',
} as const;

type TextColorType = typeof TextColor[keyof typeof TextColor];

export interface IContent {
    /** Заголовок */
    title: string;
    /** Текст-описание */
    description: string;
    /** Текст кнопки */
    buttonTitle?: string;
    /** Ссылка на кнопке */
    buttonHref?: string;
    /** Target свойство кнопки */
    buttonTarget?: '_self' | '_blank' | '_parent' | '_top';
    /** Добавляет атрибут download для тега <a> компонента Button */
    buttonDownload?: boolean;
    /** Добавляет атрибут rel для тега <a> компонента Button */
    buttonRel?: string;
    /** Цвет кнопки */
    buttonColor?: ButtonColorType;
    /** Обработчик клика по кнопке */
    onButtonClick?: (e: React.SyntheticEvent<EventTarget>) => void;
    /** Обработчик клика по ссылке */
    onLinkClick?: (e: React.SyntheticEvent<EventTarget>) => void;
    /** Цвет текста */
    textColor?: TextColorType;
    /** Цвет текста на мобильном разрешении */
    textColorMobile?: TextColorType;
    /** Текст ссылки */
    linkTitle?: string;
    /** Адрес ссылки */
    linkUrl?: string;
    /** Target свойство ссылки */
    linkTarget?: '_self' | '_blank' | '_parent' | '_top';
    /** Добавляет атрибут download для тега <a> компонента TextLink */
    linkDownload?: boolean;
    /** Добавляет атрибут rel для тега <a> компонента TextLink */
    linkRel?: string;
    /** Строка со стоимостью услуги */
    cost?: string;
}

interface IVideoBannerProps {
    /** Дополнительные data атрибуты к внутренним элементам */
    dataAttrs?: {
        root?: Record<string, string>;
        breadcrumbs?: Record<string, string>;
        breadcrumbsLink?: Record<string, string>;
        button?: Record<string, string>;
        link?: Record<string, string>;
    };
    /** Дополнительный класс корневого элемента */
    className?: string;
    /** Дополнительные классы для корневого и внутренних элементов */
    classes?: {
        root?: string;
        button?: string;
        link?: string;
        breadcrumbs?: string;
        video?: string;
    };
    /** Ссылка на корневой элемент */
    rootRef?: Ref<HTMLDivElement>;
    /** Данные для блока с контентом */
    content?: IContent;
    /** Источник видео. */
    videoSrc?: string;
    /** Тип видео */
    videoType?: VideoType;
    /** Разрешить проигрывать видео на мобильном разрешении */
    videoMobile?: boolean;
    /** Наличие звука в видео */
    isMuted?: boolean;
    /** Изображение для мобильного разрешения */
    imageMobile: string;
    /** Изображение для планшетного разрешения */
    imageTablet: string;
    /** Изображение для компьютерного разрешения */
    imageDesktop?: string;
    /** Изображение для большого компьютерного разрешения */
    imageDesktopWide?: string;
    /** Значение тега alt для изображения */
    imageAlt?: string;
    /** Хлебные крошки */
    breadcrumbs?: BreadCrumbsItemsType;
    /** Включить микроразметку хлебных крошек */
    hasBreadcrumbsMicrodata?: boolean;
}

const VideoBanner: React.FC<IVideoBannerProps> = ({
    dataAttrs,
    className,
    classes = {},
    rootRef,
    videoSrc,
    videoType,
    imageMobile,
    imageTablet,
    imageDesktop = '',
    imageDesktopWide = '',
    imageAlt,
    content,
    isMuted = true,
    breadcrumbs,
    videoMobile = false,
    hasBreadcrumbsMicrodata = false,
}) => {
    const [isMobile, setIsMobile] = React.useState(true);
    const isVideoData = !!videoSrc && !!videoType;
    const isRenderVideo = (!isMobile || videoMobile) && isVideoData;

    const renderContent = React.useCallback(
        ({
            title,
            description,
            buttonTitle,
            buttonHref,
            buttonTarget,
            buttonDownload,
            buttonColor = ButtonColor.GREEN,
            buttonRel,
            onButtonClick,
            onLinkClick,
            textColor = TextColor.BLACK,
            textColorMobile,
            linkTitle,
            linkUrl,
            linkTarget,
            linkDownload,
            linkRel,
            cost,
        }: IContent) => (
            <Grid className={cn('grid')} guttersLeft="medium">
                <GridColumn mobile="12" tablet="7" desktop="7" wide="6">
                    <div
                        className={cn('content', {
                            'text-color': textColor,
                            'text-color-mobile': textColorMobile,
                        })}
                    >
                        <Header className={cn('title')} as="h1" color="inherit">
                            {convert(title, titleConvertConfig)}
                        </Header>
                        <div className={cn('text')}>
                            <Header as="h5" color="inherit" className={cn('description')}>
                                {convert(description, titleConvertConfig)}
                            </Header>
                            {cost && <div className={cn('cost')}>{convert(cost, typographyConfig)}</div>}
                        </div>
                        <div className={cn('btns-wrapper')}>
                            {buttonTitle && (
                                <Button
                                    dataAttrs={{ root: dataAttrs?.button }}
                                    className={cn(ClassName.BUTTON, [classes.button])}
                                    theme={buttonColor}
                                    href={buttonHref}
                                    target={buttonTarget}
                                    onClick={onButtonClick}
                                    download={buttonDownload}
                                    rel={buttonRel}
                                >
                                    {buttonTitle}
                                </Button>
                            )}
                            {linkTitle && (
                                <TextLink
                                    dataAttrs={{ root: dataAttrs?.link }}
                                    className={cn(ClassName.LINK, [classes.link])}
                                    href={linkUrl}
                                    download={linkDownload}
                                    target={linkTarget}
                                    onClick={onLinkClick}
                                    rel={linkRel}
                                >
                                    {linkTitle}
                                </TextLink>
                            )}
                        </div>
                    </div>
                </GridColumn>
            </Grid>
        ),
        [classes.button, classes.link, dataAttrs?.button, dataAttrs?.link],
    );

    const renderVideo = React.useCallback(() => {
        switch (videoType) {
            case VideoType.YOUTUBE: {
                const url = `https://www.youtube.com/embed/${videoSrc}?`;
                const autoplay = '&autoplay=1';
                const mute = `&mute=${isMuted ? 1 : 0}`;
                const loop = '&loop=1';
                const rel = '&rel=0';
                const controls = '&controls=0';
                const info = '&showinfo=0e';
                const policy = '&iv_load_policy=3';
                const playlist = `&playlist=${videoSrc}`;

                const src = `${url}${autoplay}${mute}${loop}${rel}${controls}${info}${policy}${playlist}`;

                return (
                    <iframe
                        title="iframe"
                        className={cn('video')}
                        src={src}
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        allow="autoplay"
                    />
                );
            }

            case VideoType.VIDEO: {
                return (
                    // eslint-disable-next-line jsx-a11y/media-has-caption
                    <video className={cn('video', [classes.video])} autoPlay loop muted={isMuted}>
                        <source src={videoSrc} type="video/mp4" />
                    </video>
                );
            }

            default: {
                return null;
            }
        }
    }, [videoType, videoSrc, isMuted, classes.video]);

    React.useEffect(() => {
        const resizeHandler = () => {
            setIsMobile(window.innerWidth < breakpoints.DESKTOP_SMALL_START);
        };
        const resizeHandlerThrottled = throttle(resizeHandler, throttleTime.resize);

        resizeHandler();
        window.addEventListener('resize', resizeHandlerThrottled);

        return () => {
            window.removeEventListener('resize', resizeHandlerThrottled);
        };
    }, [setIsMobile]);

    return (
        <div {...filterDataAttrs(dataAttrs?.root)} className={cn([className, classes.root])} ref={rootRef}>
            <ContentArea>
                <div className={cn('wrapper')}>
                    {!!breadcrumbs?.length && (
                        <Breadcrumbs
                            hasMicrodata={hasBreadcrumbsMicrodata}
                            dataAttrs={{ root: dataAttrs?.breadcrumbs, link: dataAttrs?.breadcrumbsLink }}
                            className={cn('breadcrumbs')}
                            items={breadcrumbs}
                            color={content?.textColor}
                            classes={{ item: classes.breadcrumbs }}
                        />
                    )}
                    {content && renderContent(content)}
                    {isRenderVideo && renderVideo()}
                    {!isRenderVideo && (
                        <picture>
                            <source
                                media={`(min-width: ${breakpoints.DESKTOP_MIDDLE_START}px)`}
                                srcSet={imageDesktopWide}
                            />
                            <source media={`(min-width: ${breakpoints.DESKTOP_SMALL_START}px)`} srcSet={imageDesktop} />
                            <source media={`(min-width: ${breakpoints.MOBILE_BIG_START}px)`} srcSet={imageTablet} />

                            <img className={cn('background-image')} src={imageMobile} alt={imageAlt} />
                        </picture>
                    )}
                </div>
            </ContentArea>
        </div>
    );
};

VideoBanner.propTypes = {
    dataAttrs: PropTypes.shape({
        root: PropTypes.objectOf(PropTypes.string.isRequired),
        breadcrumbs: PropTypes.objectOf(PropTypes.string.isRequired),
        breadcrumbsLink: PropTypes.objectOf(PropTypes.string.isRequired),
        button: PropTypes.objectOf(PropTypes.string.isRequired),
        link: PropTypes.objectOf(PropTypes.string.isRequired),
    }),
    className: PropTypes.string,
    classes: PropTypes.shape({
        root: PropTypes.string,
        button: PropTypes.string,
        link: PropTypes.string,
        breadcrumbs: PropTypes.string,
    }),
    rootRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.oneOfType([PropTypes.shape({ current: PropTypes.elementType }), PropTypes.any]),
    ]),
    videoSrc: PropTypes.string,
    videoType: PropTypes.oneOf(Object.values(VideoType)),
    videoMobile: PropTypes.bool,
    content: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        buttonTitle: PropTypes.string,
        buttonHref: PropTypes.string,
        buttonDownload: PropTypes.bool,
        buttonColor: PropTypes.oneOf(Object.values(ButtonColor)),
        buttonRel: PropTypes.string,
        onButtonClick: PropTypes.func,
        onLinkClick: PropTypes.func,
        textColor: PropTypes.oneOf(Object.values(TextColor)),
        textColorMobile: PropTypes.oneOf(Object.values(TextColor)),
        linkTitle: PropTypes.string,
        linkUrl: PropTypes.string,
        linkDownload: PropTypes.bool,
        linkRel: PropTypes.string,
        cost: PropTypes.string,
    }),
    isMuted: PropTypes.bool,
    imageMobile: PropTypes.string.isRequired,
    imageTablet: PropTypes.string.isRequired,
    imageDesktop: PropTypes.string,
    imageDesktopWide: PropTypes.string,
    imageAlt: PropTypes.string,
    breadcrumbs: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            href: PropTypes.string,
        }).isRequired,
    ),
    hasBreadcrumbsMicrodata: PropTypes.bool,
};

export default VideoBanner;
