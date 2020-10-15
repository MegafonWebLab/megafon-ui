import * as React from 'react';
import PropTypes from 'prop-types';
import './VideoBlock.less';
import { Header, Button, Paragraph, Grid, GridColumn, cnCreate } from '@megafon/ui-core';

export interface IContent {
    title: string;
    description: string[];
    buttonTitle: string;
    href?: string;
    onButtonClick?: (e: React.SyntheticEvent<EventTarget>) => void;
}

export interface Props {
    /** Content */
    content?: IContent;
    /** Video type */
    videoType?: 'video' | 'youtube';
    /** Video source */
    videoSrc: string;
    /** Custom className */
    className?: string;
}

const cn = cnCreate('mfui-beta-video-block');
const VideoBlock: React.FC<Props> = ({
    content,
    videoType = 'video',
    videoSrc,
    className,
}) => {
    const renderVideo = React.useMemo(() => {
        if (videoType === 'youtube') {
            const src = `https://www.youtube.com/embed/${videoSrc}?&autoplay=1&mute=1&loop=1&rel=0&controls=0&showinfo=0e&iv_load_policy=3&playlist=${videoSrc}`;

            return (
                <iframe src={src} width="100%" height="100%" frameBorder="0" allow="autoplay"/>
            );
        }

        return (
            <video className={cn('video')} autoPlay muted loop>
                <source src={videoSrc} type="video/mp4" />
            </video>
        );

    }, [videoType]);

    const renderContent = React.useMemo(() => {
        if (!content) {
            return;
        }

        const { title, description, href, buttonTitle, onButtonClick } = content;

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
    }, [content]);

    const renderGridColumns = React.useMemo(() => {
        const columns: JSX.Element[] = [];
        const columnWidth = content ? '7' : '10';

        if (content) {
            columns.push(
                <GridColumn all="5" tablet="12" mobile="12" orderTablet="2" orderMobile="2" key={1}>
                    {renderContent}
                </GridColumn>
            );
        }

        columns.push(
            <GridColumn all={columnWidth} tablet="12" mobile="12" key={0}>
                <div className={cn('video-wrapper', {'with-content': !!content })}>
                    {renderVideo}
                </div>
            </GridColumn>
        );

        return columns;
    }, [renderContent, renderVideo]);

    return (
        <div className={cn([className])}>
            <Grid hAlign="center" className={cn('grid')}>
                {renderGridColumns}
            </Grid>
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
    videoType: PropTypes.oneOf(['video', 'youtube']),
    videoSrc: PropTypes.string.isRequired,
    className: PropTypes.string,
};

export default VideoBlock;
