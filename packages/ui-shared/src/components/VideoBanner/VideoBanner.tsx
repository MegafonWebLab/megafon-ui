import * as React from 'react';
import PropTypes from 'prop-types';
import './VideoBanner.less';
import throttle from 'lodash.throttle';
import { resolution } from '@megafon/ui-core';
import { Header, Button, Paragraph, ContentArea, Grid, GridColumn, cnCreate } from '@megafon/ui-core';

type ScreenSizeTypes = 'desktopWide' | 'desktop' | 'desktopSmall' | 'tablet' | 'mobile';

interface IContentData {
    title?: string;
    description?: string[];
    href?: string;
    onButtonClick?: (e: React.SyntheticEvent<EventTarget>) => void;
}

interface IVideoSrc {
    desktopWide: string;
    desktop: string;
    desktopSmall: string;
    tablet: string;
    mobile: string;
}

export interface Props {
    /** Content */
    content?: IContentData;
    /** Video breakpoints */
    videoSource: IVideoSrc;
    /** Custom className */
    className?: string;
}

const BUTTON_TITLE = 'Подробнее';

const cn = cnCreate('mfui-video-banner');
const VideoBanner: React.FC<Props> = ({
    content,
    videoSource,
    className,
}) => {
    const [screenSize, setScreenSize] = React.useState<ScreenSizeTypes>('desktop');

    const video = React.useRef<HTMLVideoElement>(null);

    const handleResize = (): void => {
        const mobile: boolean = resolution.isMobileScreen();
        const tablet: boolean = resolution.isTabletScreen();
        const desktopSmall: boolean = resolution.isDesktopSmallScreen();
        const desktop: boolean = resolution.isDesktopScreen();
        const desktopWide: boolean = resolution.isDesktopWideScreen();

        switch (true) {
            case mobile: {
                video.current && video.current.load();
                setScreenSize('mobile');
                break;
            }
            case tablet: {
                video.current && video.current.load();
                setScreenSize('tablet');
                break;
            }
            case desktopSmall: {
                video.current && video.current.load();
                setScreenSize('desktopSmall');
                break;
            }
            case desktop: {
                video.current && video.current.load();
                setScreenSize('desktop');
                break;
            }
            case desktopWide: {
                video.current && video.current.load();
                setScreenSize('desktopWide');
                break;
            }
            default: {
                break;
            }
        }
    };

    const handleSetThrottled = throttle(handleResize, 20);

    React.useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleSetThrottled);

        return (): void => {
            window.removeEventListener('resize', handleSetThrottled);
        };
    }, [handleSetThrottled]);

    const renderSource = (): JSX.Element => (
        <video className={cn('video')} loop autoPlay muted ref={video}>
            <source className={cn('source')} src={videoSource[screenSize]} type="video/mp4" />
        </video>
    );

    const renderContent = (contentData: IContentData): JSX.Element => {
        const { title, description, href, onButtonClick } = contentData;

        return (
            <div className={cn('content')}>
                <Header as="h3" className={cn('header')}>
                    {title}
                </Header>
                {description && description.map((paragraph, i) => (
                    <Paragraph key={i + paragraph} className={cn('text')} hasMargin={false}>
                        {paragraph}
                    </Paragraph>
                ))}
                <Button className={cn('button')} href={href} onClick={onButtonClick}>
                    {BUTTON_TITLE}
                </Button>
            </div>
        );
    };

    const renderGridColumns = (): JSX.Element[] => {
        const columns: JSX.Element[] = [];
        const columnWidth = (content !== undefined) ? '7' : '10';

        columns.push(
            <GridColumn all={columnWidth} tablet="12" mobile="12" key={0}>
                <div className={cn('video-wrapper')}>
                    <div className={cn('video-inner')}>
                        {renderSource()}
                    </div>
                </div>
            </GridColumn>
        );

        if (content !== undefined) {
            columns.unshift(
                <GridColumn all="5" tablet="12" mobile="12" orderTablet="2" orderMobile="2" key={1}>
                    {renderContent(content)}
                </GridColumn>
            );
        }

        return columns;
    };

    return (
        <div className={cn(className)}>
            <ContentArea outerBackgroundColor="white">
                <div className={cn('inner')}>
                    <Grid vAlign="center" hAlign="center">
                        {renderGridColumns()}
                    </Grid>
                </div>
            </ContentArea>
        </div>
    );
};

VideoBanner.propTypes = {
    content: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        href: PropTypes.string,
        onButtonClick: PropTypes.func,
    }),
    videoSource: PropTypes.shape({
        desktopWide: PropTypes.string.isRequired,
        desktop: PropTypes.string.isRequired,
        desktopSmall: PropTypes.string.isRequired,
        tablet: PropTypes.string.isRequired,
        mobile: PropTypes.string.isRequired,
    }).isRequired,
    className: PropTypes.string,
};

export default VideoBanner;
