import React, { Ref } from 'react';
import { Button, Grid, GridColumn, Header } from '@megafon/ui-core';
import { cnCreate, filterDataAttrs, convert, titleConvertConfig, textConvertConfig } from '@megafon/ui-helpers';
import * as PropTypes from 'prop-types';
import './ButtonBanner.less';

export const ButtonColor = {
    GREEN: 'green',
    PURPLE: 'purple',
} as const;
type ButtonColorType = typeof ButtonColor[keyof typeof ButtonColor];

export const ButtonTarget = {
    SELF: '_self',
    BLANK: '_blank',
} as const;
type ButtonTargetType = typeof ButtonTarget[keyof typeof ButtonTarget];

export const ImageScaling = {
    COVER: 'cover',
    CONTAIN: 'contain',
} as const;
type ImageScalingType = typeof ImageScaling[keyof typeof ImageScaling];

export interface IButtonBannerProps {
    /** Дополнительные data атрибуты к внутренним элементам */
    dataAttrs?: {
        root?: Record<string, string>;
        button?: Record<string, string>;
    };
    /** Дополнительный css класс для корневого элемента */
    className?: string;
    /** Дополнительный css классы для корневого и внутренних элементов */
    classes?: {
        root?: string;
        button?: string;
    };
    /** Ссылка на корневой элемент */
    rootRef?: Ref<HTMLDivElement>;
    /** Заголовок */
    title: string;
    /** Текст */
    text: string | React.ReactNode | React.ReactNode[];
    /** URL изображения */
    imageUrl?: string;
    /** Текст кнопки */
    buttonText: string;
    /** URL кнопки */
    buttonUrl?: string;
    /** Download - свойство тега <a> */
    buttonDownload?: boolean;
    /** Target - свойство тега <a> */
    buttonTarget?: ButtonTargetType;
    /** Цвет кнопки */
    buttonColor?: ButtonColorType;
    /** Rel - атрибут тега <a> */
    buttonRel?: string;
    /** Масштабирование изображения */
    imageScaling?: ImageScalingType;
    /** Обработчик клика по кнопке */
    onButtonClick?: (e: React.SyntheticEvent<EventTarget>) => void;
}

const getMediaStyle = (imageUrl: string) => (imageUrl ? { backgroundImage: `url(${imageUrl})` } : undefined);

const cn = cnCreate('mfui-button-banner');
const ButtonBanner: React.FC<IButtonBannerProps> = ({
    dataAttrs,
    className,
    classes = {},
    rootRef,
    title,
    text,
    imageUrl = '',
    buttonText,
    buttonUrl,
    buttonDownload,
    buttonTarget = '_self',
    buttonColor = 'green',
    buttonRel,
    imageScaling = 'cover',
    onButtonClick,
}) => {
    const buttonElem = (
        <Button
            dataAttrs={{ root: dataAttrs?.button }}
            className={cn('button', [classes.button])}
            href={buttonUrl}
            rel={buttonRel}
            target={buttonTarget}
            theme={buttonColor}
            onClick={onButtonClick}
            download={buttonDownload}
        >
            {buttonText}
        </Button>
    );

    return (
        <div
            {...filterDataAttrs(dataAttrs?.root)}
            className={cn({ image: !!imageUrl, scaling: imageScaling }, [className, classes.root])}
            ref={rootRef}
        >
            <Grid guttersLeft="medium">
                <GridColumn all="6" mobile="12" leftOffsetTablet="1" leftOffsetDesktop="1" leftOffsetWide="1">
                    <div className={cn('content')}>
                        <Header className={cn('header')} as="h2">
                            {convert(title, titleConvertConfig)}
                        </Header>
                        <div className={cn('text')}>
                            {typeof text === 'string' ? convert(text, textConvertConfig) : text}
                        </div>
                        {!!imageUrl && buttonElem}
                    </div>
                </GridColumn>
                <GridColumn all="5" mobile="12">
                    <div className={cn('media')} style={getMediaStyle(imageUrl)}>
                        {!imageUrl && buttonElem}
                    </div>
                </GridColumn>
            </Grid>
        </div>
    );
};

ButtonBanner.propTypes = {
    dataAttrs: PropTypes.shape({
        root: PropTypes.objectOf(PropTypes.string.isRequired),
        button: PropTypes.objectOf(PropTypes.string.isRequired),
    }),
    className: PropTypes.string,
    classes: PropTypes.shape({
        root: PropTypes.string,
        button: PropTypes.string,
    }),
    rootRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.oneOfType([PropTypes.shape({ current: PropTypes.elementType }), PropTypes.any]),
    ]),
    title: PropTypes.string.isRequired,
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
    imageUrl: PropTypes.string,
    buttonText: PropTypes.string.isRequired,
    buttonUrl: PropTypes.string,
    buttonDownload: PropTypes.bool,
    buttonTarget: PropTypes.oneOf(Object.values(ButtonTarget)),
    buttonColor: PropTypes.oneOf(Object.values(ButtonColor)),
    buttonRel: PropTypes.string,
    onButtonClick: PropTypes.func,
};

export default ButtonBanner;
