import React, { Ref } from 'react';
import * as PropTypes from 'prop-types';
import throttle from 'lodash.throttle';
import './VideoBanner.less';
import {
    Button,
    cnCreate,
    Header,
    breakpoints,
    throttleTime,
    ContentArea,
    TextLink,
    convert,
    dataAttrs as filterDataAttrs,
} from '@megafon/ui-core';

export enum ClassName {
    BUTTON = 'button',
}

const typographyConfig = {
    b: {
        component: ({ children }) =>
            <Header className={cn('value')} as="h3" color="inherit">{children}</Header>,
    },
};

export const VideoType = {
    YOUTUBE: 'youtube',
    VIDEO: 'video',
} as const;

type VideoType = typeof VideoType[keyof typeof VideoType];

export const TextColor = {
    FRESH_ASPHALT: 'freshAsphalt',
    CLEAR_WHITE: 'clearWhite',
} as const;

type TextColorType = typeof TextColor[keyof typeof TextColor];

export const ButtonColor = {
    GREEN: 'green',
    PURPLE: 'purple',
} as const;

export type ButtonColorType = typeof ButtonColor[keyof typeof ButtonColor];

export interface IContent {
    /** Заголовок */
    title: string;
    /** Текст-описание */
    description: string;
    /** Текст кнопки */
    buttonTitle: string;
    /** Ссылка на кнопке */
    buttonHref?: string;
    /** Цвет кнопки */
    buttonColor?: ButtonColorType;
    /** Обработчик клика по кнопке */
    onButtonClick?: (e: React.SyntheticEvent<EventTarget>) => void;
    /** Цвет текста */
    textColor?: TextColorType;
    /** Цвет текста на мобильном разрешении */
    textColorMobile?: TextColorType;
    /** Текст ссылки */
    linkTitle?: string;
    /** Адрес ссылки */
    linkUrl?: string;
    /** Строка со стоимостью услуги */
    cost?: string;
}

interface IVideoBannerProps {
    /** Дата атрибуты для корневого элемента */
    dataAttrs?: { [key: string]: string };
    /** Дополнительный класс корневого элемента */
    className?: string;
    /** Дополнительные классы для корневого и внутренних элементов */
    classes?: {
        root?: string;
        button?: string;
        link?: string;
    };
    /** Ссылка на корневой элемент */
    rootRef?: Ref<HTMLDivElement>;
    /** Данные для блока с контентом */
    content?: IContent;
    /** Источник видео. */
    videoSrc?: string;
    /** Тип видео */
    videoType?: VideoType;
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
}

const cn = cnCreate('mfui-beta-video-banner');
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
    content,
    isMuted = true,
}) => {
    const [isMobile, setIsMobile] = React.useState(true);
    const [imageSrc, setImageSrc] = React.useState(imageMobile);
    const isVideoData = !!videoSrc && !!videoType;
    const isRenderVideo = !isMobile && isVideoData;

    const renderContent = React.useCallback(({
        title,
        description,
        buttonTitle,
        buttonHref,
        buttonColor = ButtonColor.GREEN,
        onButtonClick,
        textColor = TextColor.FRESH_ASPHALT,
        textColorMobile,
        linkTitle,
        linkUrl,
        cost,
    }) => (
        <div className={cn('content', {
                'text-color': textColor,
                'text-color-mobile': textColorMobile,
            })}
        >
            <Header className={cn('title')} as="h1" color="inherit">{title}</Header>
            <div className={cn('text')}>
                <Header as="h5" color="inherit" className={cn('description')}>
                    {description}
                </Header>
                {cost && (
                    <div className={cn('cost')}>
                        {convert(cost, typographyConfig)}
                    </div>
                )}
            </div>
            <div className={cn('btns-wrapper')}>
                <Button
                    className={cn(ClassName.BUTTON, [classes.button])}
                    theme={buttonColor}
                    href={buttonHref}
                    onClick={onButtonClick}
                >
                    {buttonTitle}
                </Button>
                {linkTitle && (
                    <TextLink className={cn('link', [classes.link])} href={linkUrl}>
                        {linkTitle}
                    </TextLink>
                )}
            </div>
        </div>
    ), []);

    const renderVideo = React.useCallback(() => {
        switch (videoType) {
            case(VideoType.YOUTUBE): {
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
                    <iframe className={cn('video')}
                            src={src}
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            allow="autoplay"
                    />
                );
            }

            case(VideoType.VIDEO): {
                return (
                    <video className={cn('video')} autoPlay loop muted={isMuted}>
                        <source src={videoSrc} type="video/mp4" />
                    </video>
                );
            }

            default: {
                return null;
            }
        }
    }, [videoType, videoSrc, isMuted]);

    React.useEffect(() => {
        const getImageSrc = () => {
            const windowWidth = window.innerWidth;

            switch (true) {
                case windowWidth >= breakpoints.desktopMiddleStart:
                    return imageDesktopWide;
                case windowWidth >= breakpoints.desktopSmallStart && windowWidth <= breakpoints.desktopSmallEnd:
                    return imageDesktop;
                case windowWidth >= breakpoints.mobileBigStart && windowWidth <= breakpoints.mobileBigEnd:
                    return imageTablet;
                default:
                    return imageMobile;
            }
        };
        const resizeHandler = () => {
            setIsMobile(window.innerWidth < breakpoints.desktopSmallStart);
            setImageSrc(getImageSrc());
        };
        const resizeHandlerThrottled = throttle(resizeHandler, throttleTime.resize);

        resizeHandler();
        window.addEventListener('resize', resizeHandlerThrottled);

        return () => {
            window.removeEventListener('resize', resizeHandlerThrottled);
        };
    }, []);

    return (
        <div
            {...filterDataAttrs(dataAttrs)}
            className={cn([className, classes.root])}
            ref={rootRef}
        >
            <ContentArea>
                <div
                    className={cn('wrapper')}
                >
                    {content && renderContent(content)}
                    {isRenderVideo && renderVideo()}
                    {!isRenderVideo && (
                        <div style={{ backgroundImage: `url(${imageSrc})` }}
                             className={cn('background-image')} />
                    )}
                </div>
            </ContentArea>
        </div>
    );
};

VideoBanner.propTypes = {
    dataAttrs: PropTypes.objectOf(PropTypes.string.isRequired),
    className: PropTypes.string,
    classes: PropTypes.shape({
        root: PropTypes.string,
        button: PropTypes.string,
        link: PropTypes.string,
    }),
    rootRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.oneOfType([PropTypes.shape({ current: PropTypes.elementType }), PropTypes.any ]),
    ]),
    videoSrc: PropTypes.string,
    videoType: PropTypes.oneOf(Object.values(VideoType)),
    content: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        buttonTitle: PropTypes.string.isRequired,
        buttonHref: PropTypes.string,
        buttonColor: PropTypes.oneOf(Object.values(ButtonColor)),
        onButtonClick: PropTypes.func,
        textColor: PropTypes.oneOf(Object.values(TextColor)),
        textColorMobile: PropTypes.oneOf(Object.values(TextColor)),
        linkTitle: PropTypes.string,
        linkUrl: PropTypes.string,
        cost: PropTypes.string,
    }),
    isMuted: PropTypes.bool,
    imageMobile: PropTypes.string.isRequired,
    imageTablet: PropTypes.string.isRequired,
    imageDesktop: PropTypes.string,
    imageDesktopWide: PropTypes.string,
};

export default VideoBanner;
