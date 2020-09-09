import * as React from 'react';
import * as PropTypes from 'prop-types';
import throttle from 'lodash.throttle';
import './VideoBanner.less';
import { Button, cnCreate, ContentArea, Header, Paragraph } from '@megafon/ui-core';
import { MOBILE_BIG_START } from '../../../../ui-core/src/constants/breakpoints';

const THROTTLE_TIME = 750;

interface IContent {
    title: string;
    text: string;
    buttonTitle: string;
    href?: string;
    clickHandler?: (e: React.SyntheticEvent<EventTarget>) => void;
}

interface IImage {
    mobile: string;
    main: string;
}

export const VideoCategory = {
    YOUTUBE: 'youtube',
    VIDEO: 'video',
} as const;

type VideoCategoryType = typeof VideoCategory[keyof  typeof VideoCategory];

interface IVideo {
    src: string;
    type: VideoCategoryType;
}

interface IVideoBanner {
    image: IImage;
    video?: IVideo;
    content?: IContent;
}

const cn = cnCreate('mfui-video-banner');
const VideoBanner: React.FC<IVideoBanner> = ({ video, image, content}) => {
    const [isMobile, setIsMobile] = React.useState(true);
    const isRenderVideo = !isMobile && video;

    const resizeHandler = () => {
        if (window.innerWidth <= MOBILE_BIG_START && !isMobile) {
            setIsMobile(true);
            return;
        }

        if (window.innerWidth > MOBILE_BIG_START && isMobile) {
            setIsMobile(false);
            return;
        }
    };

    const renderContent = (data: IContent): JSX.Element => {
        const { title, text, buttonTitle, href, clickHandler } = data;

        return (
            <div className={cn('content')}>
                <Header className={cn('title')} color="white" as="h1">{title}</Header>
                <div className={cn('text')}>
                    <Paragraph color="clearWhite" hasMargin={false}>{text}</Paragraph>
                </div>
                <Button className={cn('button')} href={href} onClick={clickHandler}>{buttonTitle}</Button>
            </div>
        );
    };

    const renderVideo = () => {
        if (!video) {
            return;
        }

        switch (video.type) {
            case(VideoCategory.YOUTUBE): {
                const src = `${video.src}?controls=0&autoplay=1`;

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

            case(VideoCategory.VIDEO): {
                return (
                    <video className={cn('video')} autoPlay muted loop>
                        <source src={video.src} type="video/mp4" />
                    </video>
                );
            }

            default: {
                return null;
            }
        }
    };

    const resizeHandlerThrottled = throttle(resizeHandler, THROTTLE_TIME);

    React.useEffect(() => {
        resizeHandler();
        window.addEventListener('resize', resizeHandlerThrottled);

        return () => {
            window.removeEventListener('resize', resizeHandlerThrottled);
        };
    }, [isMobile]);

    return (
        <div className={cn()}>
            <ContentArea>
                <div
                    className={cn('wrapper')}
                    style={{backgroundImage: `url(${isMobile ? image.mobile : image.main})`}}>
                    {isRenderVideo && renderVideo()}
                    {content && renderContent(content)}
                </div>
            </ContentArea>
        </div>
    );
};

VideoBanner.propTypes = {
    video: PropTypes.shape({
        src: PropTypes.string.isRequired,
        type: PropTypes.oneOf(Object.values(VideoCategory)).isRequired,
    }),
    image: PropTypes.shape({
        mobile: PropTypes.string.isRequired,
        main: PropTypes.string.isRequired,
    }).isRequired,
};

export default VideoBanner;
