import * as React from 'react';
import * as PropTypes from 'prop-types';
import throttle from 'lodash.throttle';
import './VideoBanner.less';
import { Button, cnCreate, ContentArea, Header, Paragraph, breakpoints } from '@megafon/ui-core';

const THROTTLE_TIME = 750;
export const VideoTypes = {
    YOUTUBE: 'youtube',
    VIDEO: 'video',
} as const;

type VideoType = typeof VideoTypes[keyof typeof VideoTypes];

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
}

export interface IImage {
    /** Изображение для мобильных устройств */
    mobile: string;
    /** Изображение для компьютерных устройств */
    desktop: string;
}

interface IVideoBannerProps {
    /** Фоновые изображения */
    image: IImage;
    /** Данные для блока с контентом */
    content?: IContent;
    /** Источник видео. Если видео с youtube, то необходимо указать id */
    videoSrc?: string;
    /** Тип видео */
    videoType?: VideoType;
    /** Наличие звука в видео */
    isMuted?: boolean;
}

const cn = cnCreate('mfui-beta-video-banner');
const VideoBanner: React.FC<IVideoBannerProps> = ({ videoSrc, videoType, image, content, isMuted = true}) => {
    const [isMobile, setIsMobile] = React.useState(true);
    const isVideo = !!videoSrc && !!videoType;
    const isRenderVideo = !isMobile && isVideo;

    const renderContent = React.useCallback((data) => {
        const { title, description, buttonTitle, href, onButtonClick } = data;

        return (
            <div className={cn('content')}>
                <Header className={cn('title')} color="white" as="h1">{title}</Header>
                <div className={cn('text')}>
                    <Paragraph color="clearWhite" hasMargin={false}>{description}</Paragraph>
                </div>
                <Button className={cn('button')} href={href} onClick={onButtonClick}>{buttonTitle}</Button>
            </div>
        );
    }, [content]);

    const renderVideo = React.useCallback(() => {
        switch (videoType) {
            case(VideoTypes.YOUTUBE): {
                const src = `https://www.youtube.com/embed/${videoSrc}?&autoplay=1&mute=${isMuted ? 1 : 0}&loop=1&rel=0&controls=0&showinfo=0e&iv_load_policy=3&playlist=${videoSrc}`;

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

            case(VideoTypes.VIDEO): {
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
        const resizeHandler = () =>
            window.innerWidth <= breakpoints.mobileBigEnd ? setIsMobile(true) : setIsMobile(false);
        const resizeHandlerThrottled = throttle(resizeHandler, THROTTLE_TIME);

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
                        style={{backgroundImage: `url(${isMobile ? image.mobile : image.desktop})`}}
                    >
                        {content && renderContent(content)}
                        {isRenderVideo && renderVideo()}
                    </div>
            </ContentArea>
        </div>
    );
};

VideoBanner.propTypes = {
    videoSrc: PropTypes.string,
    videoType: PropTypes.oneOf(Object.values(VideoTypes)),
    content: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        buttonTitle: PropTypes.string.isRequired,
        href: PropTypes.string,
        onButtonClick: PropTypes.func,
    }),
    image: PropTypes.shape({
        mobile: PropTypes.string.isRequired,
        desktop: PropTypes.string.isRequired,
    }).isRequired,
    isMuted: PropTypes.bool,
};

export default VideoBanner;
