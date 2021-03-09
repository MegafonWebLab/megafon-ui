import React, { Ref } from 'react';
import PropTypes from 'prop-types';
import './VideoBlock.less';
import { Header, Button, Paragraph, Grid, GridColumn, cnCreate, dataAttrs as filterDataAttrs } from '@megafon/ui-core';

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

export const VideoTypes = {
    YOUTUBE: 'youtube',
    VIDEO: 'video',
} as const;

type VideoType = typeof VideoTypes[keyof typeof VideoTypes];

export interface Props {
    /** Дата атрибуты для корневого элемента */
    dataAttrs?: { [key: string]: string };
    /** Дополнительный класс корневого элемента */
    className?: string;
    /** Дополнительные классы для корневого и внутренних элементов */
    classes?: {
        root?: string;
        button?: string;
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
const VideoBlock: React.FC<Props> = ({
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
            case(VideoTypes.YOUTUBE): {
                const src = `https://www.youtube.com/embed/${videoSrc}?&autoplay=${isAutoplay ? 1 : 0}&mute=${isMuted ? 1 : 0}&loop=1&rel=0&controls=0&showinfo=0e&iv_load_policy=3&playlist=${videoSrc}`;

                return (
                    <iframe src={src} width="100%" height="100%" frameBorder="0" allow="autoplay"/>
                );
            }

            case (VideoTypes.VIDEO): {
                return (
                    <video className={cn('video')} autoPlay={isAutoplay} muted={isMuted} controls={!isAutoplay} loop>
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
                <Button className={cn('button', [classes.button])} href={href} onClick={onButtonClick}>
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
    }),
    rootRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.oneOfType([PropTypes.shape({ current: PropTypes.elementType }), PropTypes.any ]),
    ]),
    content: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.array.isRequired,
        href: PropTypes.string,
        buttonTitle: PropTypes.string.isRequired,
        onButtonClick: PropTypes.func,
    }),
    videoType: PropTypes.oneOf(Object.values(VideoTypes)),
    videoSrc: PropTypes.string.isRequired,
    isMuted: PropTypes.bool,
    isAutoplay: PropTypes.bool,
};

export default VideoBlock;
