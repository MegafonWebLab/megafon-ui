import React, { Ref } from 'react';
import { Header, Button, Grid, GridColumn } from '@megafon/ui-core';
import { cnCreate, filterDataAttrs } from '@megafon/ui-helpers';
import PropTypes from 'prop-types';
import './VideoBlock.less';

export interface IContent {
    /** Заголовок */
    title: string;
    /** Текст-описание */
    description: string | React.ReactNode[] | React.ReactNode;
    /** Текст кнопки */
    buttonTitle: string;
    /** Добавляет атрибут download для тега <a> компонента Button */
    buttonDownload?: boolean;
    /** Ссылка на кнопке */
    href?: string;
    /** Обработчик клика по кнопке */
    onButtonClick?: (e: React.SyntheticEvent<EventTarget>) => void;
}

export const VideoTypes = {
    YOUTUBE: 'youtube',
    VIDEO: 'video',
} as const;

type VideoType = typeof VideoTypes[keyof typeof VideoTypes];

export interface IVideoBlockProps {
    /** Дата атрибуты для корневого элемента */
    dataAttrs?: { [key: string]: string };
    /** Дополнительный класс корневого элемента */
    className?: string;
    /** Дополнительные классы для корневого и внутренних элементов */
    classes?: {
        root?: string;
        button?: string;
        description?: string;
    };
    /** Ссылка на корневой элемент */
    rootRef?: Ref<HTMLDivElement>;
    /** Данные для блока с контентом */
    content?: IContent;
    /** Тип видео */
    videoType?: VideoType;
    /** Источник видео. Если видео с youtube, то необходимо указать id */
    videoSrc: string;
    /** Наличие звука в видео */
    isMuted?: boolean;
    /** Автоматическое проигрывание видео */
    isAutoplay?: boolean;
}

const cn = cnCreate('mfui-beta-video-block');
const VideoBlock: React.FC<IVideoBlockProps> = ({
    dataAttrs,
    className,
    classes = {},
    rootRef,
    content,
    videoType = 'video',
    videoSrc,
    isMuted = true,
    isAutoplay = false,
}) => {
    const renderVideo = React.useCallback(() => {
        switch (videoType) {
            case VideoTypes.YOUTUBE: {
                const src = `https://www.youtube.com/embed/${videoSrc}?&autoplay=${isAutoplay ? 1 : 0}&mute=${
                    isMuted ? 1 : 0
                }&loop=1&rel=0&controls=0&showinfo=0e&iv_load_policy=3&playlist=${videoSrc}`;

                return <iframe src={src} width="100%" height="100%" frameBorder="0" allow="autoplay" title="iframe" />;
            }

            case VideoTypes.VIDEO: {
                return (
                    // eslint-disable-next-line jsx-a11y/media-has-caption
                    <video className={cn('video')} autoPlay={isAutoplay} muted={isMuted} controls={!isAutoplay} loop>
                        <source src={videoSrc} type="video/mp4" />
                    </video>
                );
            }

            default: {
                return null;
            }
        }
    }, [isAutoplay, isMuted, videoType, videoSrc]);

    const renderContent = React.useCallback(
        ({ title, description, href, buttonDownload, buttonTitle, onButtonClick }: IContent) => (
            <div className={cn('content')}>
                <Header as="h2" className={cn('header')}>
                    {title}
                </Header>
                <div className={cn('description', [classes.description])}>{description}</div>
                <Button
                    className={cn('button', [classes.button])}
                    href={href}
                    onClick={onButtonClick}
                    download={buttonDownload}
                >
                    {buttonTitle}
                </Button>
            </div>
        ),
        [classes.button, classes.description],
    );

    const renderGridColumns = React.useCallback(() => {
        const columns: JSX.Element[] = [];
        const columnWidth = content ? '7' : '10';

        if (content) {
            columns.push(
                <GridColumn all="5" tablet="12" mobile="12" orderTablet="2" orderMobile="2" key="column-content">
                    {renderContent && renderContent(content)}
                </GridColumn>,
            );
        }

        columns.push(
            <GridColumn all={columnWidth} tablet="12" mobile="12" key="column-video">
                <div className={cn('video-wrapper', { 'with-content': !!content })}>{renderVideo()}</div>
            </GridColumn>,
        );

        return columns;
    }, [renderContent, renderVideo, content]);

    return (
        <div {...filterDataAttrs(dataAttrs)} className={cn([className, classes.root])} ref={rootRef}>
            <Grid hAlign="center" className={cn('grid')}>
                {renderGridColumns()}
            </Grid>
        </div>
    );
};

VideoBlock.propTypes = {
    dataAttrs: PropTypes.objectOf(PropTypes.string.isRequired),
    className: PropTypes.string,
    classes: PropTypes.shape({
        root: PropTypes.string,
        button: PropTypes.string,
        description: PropTypes.string,
    }),
    rootRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.oneOfType([PropTypes.shape({ current: PropTypes.elementType }), PropTypes.any]),
    ]),
    content: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.node), PropTypes.node])
            .isRequired,
        href: PropTypes.string,
        buttonTitle: PropTypes.string.isRequired,
        buttonDownload: PropTypes.bool,
        onButtonClick: PropTypes.func,
    }),
    videoType: PropTypes.oneOf(Object.values(VideoTypes)),
    videoSrc: PropTypes.string.isRequired,
    isMuted: PropTypes.bool,
    isAutoplay: PropTypes.bool,
};

export default VideoBlock;
