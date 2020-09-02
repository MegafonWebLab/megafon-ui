import * as React from 'react';
import PropTypes from 'prop-types';
import './VideoBlock.less';
import { Header, Button, Paragraph, ContentArea, Grid, GridColumn, cnCreate } from '@megafon/ui-core';

interface IContentData {
    title: string;
    description: string[];
    buttonTitle: string;
    href?: string;
    onButtonClick?: (e: React.SyntheticEvent<EventTarget>) => void;
}

export interface Props {
    /** Content */
    content?: IContentData;
    /** Media type */
    mediaType?: 'video' | 'youtube' | 'gif';
    /** Media source */
    mediaSource: string;
    /** Custom className */
    className?: string;
}

const cn = cnCreate('mfui-video-block');
const VideoBlock: React.FC<Props> = ({
    content,
    mediaType = 'video',
    mediaSource,
    className,
}) => {

    const renderSource = (sourceType): JSX.Element => {
        switch (sourceType) {
            case 'youtube':
                return (
                    <iframe className={cn('youtube-wrapper')}
                            src={mediaSource}
                            frameBorder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen />
                );
            case 'gif':
                return (
                    <img className={cn('image')} src={mediaSource} alt="gif"/>
                );
            default:
                return (
                    <video className={cn('video')} autoPlay muted>
                        <source className={cn('source')} src={mediaSource} type="video/mp4" />
                    </video>
            );
        }
    };

    const renderContent = (contentData: IContentData): JSX.Element => {
        const { title, description, href, buttonTitle, onButtonClick } = contentData;

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
                    {buttonTitle}
                </Button>
            </div>
        );
    };

    const renderGridColumns = (): JSX.Element[] => {
        const columns: JSX.Element[] = [];
        const columnWidth = content ? '7' : '10';

        if (content) {
            columns.push(
                <GridColumn all="5" tablet="12" mobile="12" orderTablet="2" orderMobile="2" key={1}>
                    {renderContent(content)}
                </GridColumn>
            );
        }

        columns.push(
            <GridColumn all={columnWidth} tablet="12" mobile="12" key={0}>
                <div className={cn('video-wrapper')}>
                    <div className={cn('video-inner')}>
                        {renderSource(mediaType)}
                    </div>
                </div>
            </GridColumn>
        );

        return columns;
    };

    return (
        <div className={cn([className])}>
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

VideoBlock.propTypes = {
    content: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.array.isRequired,
        href: PropTypes.string,
        buttonTitle: PropTypes.string.isRequired,
        onButtonClick: PropTypes.func,
    }),
    mediaType: PropTypes.oneOf(['video', 'youtube', 'gif']),
    mediaSource: PropTypes.string.isRequired,
    className: PropTypes.string,
};

export default VideoBlock;
