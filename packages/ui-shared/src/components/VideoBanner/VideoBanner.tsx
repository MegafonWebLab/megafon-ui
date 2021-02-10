import * as React from 'react';
import * as PropTypes from 'prop-types';
import throttle from 'lodash.throttle';
import './VideoBanner.less';
import { Button, cnCreate, Header, Paragraph, breakpoints, throttleTime, ContentArea } from '@megafon/ui-core';

export const ClassName = {
    BUTTON: 'button',
    VIDEO: 'video',
    BACKGROUND_IMAGE: 'background-image',
    CONTENT: 'content',
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
    href?: string;
    /** Обработчик клика по кнопке */
    onButtonClick?: (e: React.SyntheticEvent<EventTarget>) => void;
    /** Цвет текста */
    textColor?: TextColorType;
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
        href,
        onButtonClick,
        textColor = TextColor.FRESH_ASPHALT,
    }) => (
        <div className={cn(ClassName.CONTENT, { 'text-color': textColor })}>
            <Header className={cn('title')} as="h1" color="inherit">{title}</Header>
            <div className={cn('text')}>
                <Paragraph hasMargin={false} color="inherit">{description}</Paragraph>
            </div>
            <Button className={cn(ClassName.BUTTON)} href={href} onClick={onButtonClick}>{buttonTitle}</Button>
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
                    <iframe className={cn(ClassName.VIDEO)}
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
                    <video className={cn(ClassName.VIDEO)} autoPlay loop muted={isMuted}>
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
                             className={cn(ClassName.BACKGROUND_IMAGE)} />
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
    }),
    isMuted: PropTypes.bool,
    imageMobile: PropTypes.string.isRequired,
    imageTablet: PropTypes.string.isRequired,
    imageDesktop: PropTypes.string,
    imageDesktopWide: PropTypes.string,
};

export default VideoBanner;
