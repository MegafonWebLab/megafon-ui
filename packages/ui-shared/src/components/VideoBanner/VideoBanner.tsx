import * as React from 'react';
import * as PropTypes from 'prop-types';
import throttle from 'lodash.throttle';
import './VideoBanner.less';
import { Button, cnCreate, ContentArea, Header, Paragraph } from '@megafon/ui-core';
import { MOBILE_BIG_START } from '../../constants/breakpoints';

const THROTTLE_TIME = 750;

export interface IContent {
    title: string;
    description: string;
    buttonTitle: string;
    href?: string;
    onButtonClick?: (e: React.SyntheticEvent<EventTarget>) => void;
}

export interface IImage {
    mobile: string;
    desktop: string;
}

interface IVideoBannerProps {
    image: IImage;
    content?: IContent;
    videoSrc?: string;
    videoType?: 'video' | 'youtube';
    isMuted?: boolean;
}

const cn = cnCreate('mfui-beta-video-banner');
const VideoBanner: React.FC<IVideoBannerProps> = ({ videoSrc, videoType, image, content, isMuted = true}) => {
    const [isMobile, setIsMobile] = React.useState(true);
    const isVideo = !!videoSrc && !!videoType;
    const isRenderVideo = !isMobile && isVideo;

    const renderContent = React.useMemo(() => {
        if (!content) {
            return;
        }

        const { title, description, buttonTitle, href, onButtonClick } = content;

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

    const renderVideo = React.useMemo(() => {
        switch (videoType) {
            case('youtube'): {
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

            case('video'): {
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
            window.innerWidth <= MOBILE_BIG_START ? setIsMobile(true) : setIsMobile(false);
        const resizeHandlerThrottled = throttle(resizeHandler, THROTTLE_TIME);

        resizeHandler();
        window.addEventListener('resize', resizeHandlerThrottled);

        return () => {
            window.removeEventListener('resize', resizeHandlerThrottled);
        };
    }, [isMobile, setIsMobile]);

    return (
        <div className={cn()}>
            <ContentArea>
                <div
                    className={cn('wrapper')}
                    style={{backgroundImage: `url(${isMobile ? image.mobile : image.desktop})`}}>
                    {isRenderVideo && renderVideo}
                    {renderContent}
                </div>
            </ContentArea>
        </div>
    );
};

VideoBanner.propTypes = {
    videoSrc: PropTypes.string,
    videoType: PropTypes.oneOf(['video', 'youtube']),
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
