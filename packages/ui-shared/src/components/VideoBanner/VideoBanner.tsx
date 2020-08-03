import * as React from 'react';
import PropTypes from 'prop-types';
import './VideoBanner.less';
import { Header, Button, Paragraph, ContentArea, Grid, GridColumn, cnCreate } from '@megafon/ui-core';

interface IContentData {
    title?: string;
    description?: string[];
    href?: string;
    onButtonClick?: (e: React.SyntheticEvent<EventTarget>) => void;
}

export interface Props {
    /** Content */
    content?: IContentData;
    /** Video type */
    videoType?: 'youtube' | 'gif';
    /** Video source */
    videoSource: string;
    /** Custom className */
    className?: string;
}

const BUTTON_TITLE = 'Подробнее';

const cn = cnCreate('mfui-video-banner');
const VideoBanner: React.FC<Props> = ({
    content,
    videoType = 'video',
    videoSource,
    className,
}) => {

    const renderSource = (sourceType): JSX.Element => {
        switch (sourceType) {
            case 'youtube':
                return (
                    <iframe className={cn('youtube-wrapper')}
                            src={videoSource}
                            frameBorder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen />
                );
            case 'gif':
                return (
                    <img src={videoSource} alt="gif"/>
                );
            default:
                return (
                    <video className={cn('video')} autoPlay muted>
                        <source className={cn('source')} src={videoSource} type="video/mp4" />
                    </video>
            );
        }
    };

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
                        {renderSource(videoType)}
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
        <div className={cn('', { 'demo': true }, className)}>
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
        description: PropTypes.array,
        href: PropTypes.string,
        onButtonClick: PropTypes.func,
    }),
    videoType: PropTypes.oneOf(['youtube', 'gif']),
    videoSource: PropTypes.string.isRequired,
    className: PropTypes.string,
};

export default VideoBanner;
