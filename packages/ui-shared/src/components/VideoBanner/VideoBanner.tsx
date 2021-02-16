import * as React from 'react';
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

export interface IContent {
    /** Заголовок */
    title: string;
    /** Текст-описание */
    description: string;
    /** Текст кнопки */
    buttonTitle: string;
    /** Ссылка на кнопке */
    buttonHref?: string;
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
                <Button className={cn(ClassName.BUTTON)} href={buttonHref} onClick={onButtonClick}>
                    {buttonTitle}
                </Button>
                {linkTitle && (
                    <TextLink className={cn('link')} href={linkUrl}>
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
        <div className={cn()}>
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
    videoSrc: PropTypes.string,
    videoType: PropTypes.oneOf(Object.values(VideoType)),
    content: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        buttonTitle: PropTypes.string.isRequired,
        href: PropTypes.string,
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
