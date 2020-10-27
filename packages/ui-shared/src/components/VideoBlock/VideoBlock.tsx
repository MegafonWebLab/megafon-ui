import * as React from 'react';
import PropTypes from 'prop-types';
import './VideoBlock.less';
import { Header, Button, Paragraph, Grid, GridColumn, cnCreate } from '@megafon/ui-core';

export interface IContent {
    /** Заголовок */
    title: string;
    /** Текст-описание */
    description: string[];
    /** Текст кнопки */
    buttonTitle: string;
    /** Ссылка на кнопке */
    href?: string;
    /** Обработчик клика по кнопке */
    onButtonClick?: (e: React.SyntheticEvent<EventTarget>) => void;
}

export interface Props {
    /** Данные для блока с контентом */
    content?: IContent;
    /** Тип видео */
    videoType?: 'video' | 'youtube';
    /** Источник видео. Если видео с youtube, то необходимо указать id, например 2Sps5MnvlKM */
    videoSrc: string;
    /** Наличие звука в видео */
    isMuted?: boolean;
    /** Дополнительный класс для основного контейнера */
    className?: string;
}

const VideoTypes = {
    YOUTUBE: 'youtube',
    VIDEO: 'video',
};

const cn = cnCreate('mfui-beta-video-block');
const VideoBlock: React.FC<Props> = ({
    content,
    videoType = 'video',
    videoSrc,
    isMuted = true,
    className,
}) => {
    const renderVideo = React.useCallback(() => {
        switch (videoType) {
            case(VideoTypes.YOUTUBE): {
                const src = `https://www.youtube.com/embed/${videoSrc}?&autoplay=1&mute=${isMuted ? 1 : 0}&loop=1&rel=0&controls=0&showinfo=0e&iv_load_policy=3&playlist=${videoSrc}`;

                return (
                    <iframe src={src} width="100%" height="100%" frameBorder="0" allow="autoplay"/>
                );
            }

            case (VideoTypes.VIDEO): {
                return (
                    <video className={cn('video')} autoPlay muted={isMuted} loop>
                        <source src={videoSrc} type="video/mp4" />
                    </video>
                );
            }

            default: {
                return null;
            }
        }

    }, [videoType, videoSrc]);

    const renderContent = React.useCallback((data: IContent) => {
        const { title, description, href, buttonTitle, onButtonClick } = data;

        return (
            <div className={cn('content')}>
                <Header as="h3" className={cn('header')}>
                    {title}
                </Header>
                <div>
                    {description && description.map((paragraph, i) => (
                        <Paragraph key={i + paragraph} className={cn('text')} hasMargin={false}>
                            {paragraph}
                        </Paragraph>
                    ))}
                </div>
                <Button className={cn('button')} href={href} onClick={onButtonClick}>
                    {buttonTitle}
                </Button>
            </div>
        );
    }, [content]);

    const renderGridColumns = React.useCallback(() => {
        const columns: JSX.Element[] = [];
        const columnWidth = content ? '7' : '10';

        if (content) {
            columns.push(
                <GridColumn all="5" tablet="12" mobile="12" orderTablet="2" orderMobile="2" key={'column-content'}>
                    {renderContent && renderContent(content)}
                </GridColumn>
            );
        }

        columns.push(
            <GridColumn all={columnWidth} tablet="12" mobile="12" key={'column-video'}>
                <div className={cn('video-wrapper', {'with-content': !!content })}>
                    {renderVideo()}
                </div>
            </GridColumn>
        );

        return columns;
    }, [renderContent, renderVideo, content]);

    return (
        <div className={cn([className])}>
            <Grid hAlign="center" className={cn('grid')}>
                {renderGridColumns()}
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
