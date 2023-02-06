import React, { Ref } from 'react';
import './Card.less';
import { Header, Button, TextLink, Link } from '@megafon/ui-core';
import { cnCreate, filterDataAttrs, convert, titleConvertConfig, textConvertConfig } from '@megafon/ui-helpers';
import PropTypes from 'prop-types';

export const Target = {
    SELF: '_self',
    BLANK: '_blank',
} as const;

type TargetType = typeof Target[keyof typeof Target];

interface IButton {
    title: string;
    href?: string;
    target?: TargetType;
    download?: boolean;
    onClick?: () => void;
}

interface ILink {
    title: string;
    href?: string;
    target?: TargetType;
    download?: boolean;
}

export const ObjectFit = {
    FILL: 'fill',
    CONTAIN: 'contain',
} as const;

type ObjectFitType = typeof ObjectFit[keyof typeof ObjectFit];

export interface ICard {
    /** Дополнительные data атрибуты к внутренним элементам */
    dataAttrs?: {
        root?: Record<string, string>;
        link?: Record<string, string>;
        button?: Record<string, string>;
    };
    /** Дополнительный класс корневого элемента */
    className?: string;
    /** Дополнительные классы для корневого и внутренних элементов */
    classes?: {
        root?: string;
        button?: string;
        link?: string;
        inner?: string;
    };
    /** Ссылка на корневой элемент */
    rootRef?: Ref<HTMLDivElement>;
    /** Изображение в карточке */
    imageSrc?: string;
    /** Значение тега alt для изображения */
    imageAlt?: string;
    /** Иконка в карточке */
    svgSrc?: React.ReactNode;
    /** Заголовок карточки */
    title: string | React.ReactNode[] | React.ReactNode;
    /** Текст карточки */
    text?: string | React.ReactNode[] | React.ReactNode;
    /** Данные для кнопки */
    button?: IButton;
    /** Данные для ссылки */
    link?: ILink;
    /** Выравнивание текста по центру */
    isCenteredText?: boolean;
    /** Расположение кнопки/ссылки по левой стороне */
    isLeftHAlign?: boolean;
    /** Высота корневого элемента 100% */
    isFullHeight?: boolean;
    /** Ссылка для всей карточки */
    href?: string;
    /** Target свойство, аналогично свойству 'target' тега 'a' */
    target?: TargetType;
    /** Режим позиционирования изображения */
    objectFit?: ObjectFitType;
}

const cn = cnCreate('mfui-card');
const Card: React.FC<ICard> = ({
    dataAttrs,
    className,
    classes = {},
    rootRef,
    imageSrc,
    imageAlt,
    svgSrc,
    title,
    text,
    button,
    link,
    isCenteredText = false,
    isLeftHAlign = false,
    isFullHeight = false,
    href,
    target,
    objectFit = 'fill',
}) => {
    const isAlignAvailable = !button || !link;
    const isCardLink = !!href;
    const Element = href ? Link : 'div';

    const renderImage = React.useCallback(() => {
        switch (true) {
            case !!imageSrc: {
                return (
                    <div className={cn('pic-wrapper', { 'object-fit': objectFit })}>
                        <img className={cn('img')} src={imageSrc} alt={imageAlt} />
                    </div>
                );
            }

            case !!svgSrc: {
                return <div className={cn('svg-wrapper')}>{svgSrc}</div>;
            }

            default:
                return null;
        }
    }, [imageSrc, svgSrc, objectFit, imageAlt]);

    const renderLink = React.useCallback(() => {
        if (!link) {
            return null;
        }

        const { href: linkHref, title: linkTitle, target: linkTarget, download } = link;

        if (!linkHref || isCardLink) {
            return <span className={cn('fake-link')}>{linkTitle}</span>;
        }

        return (
            <TextLink
                href={linkHref}
                download={download}
                target={linkTarget}
                dataAttrs={{ root: dataAttrs?.link }}
                className={cn('link', [classes.link])}
            >
                {linkTitle}
            </TextLink>
        );
    }, [link, isCardLink, classes, dataAttrs?.link]);

    const renderBtn = React.useCallback(() => {
        if (!button || isCardLink) {
            return null;
        }

        const {
            href: btnHref,
            title: btnTitle,
            target: btnTarget,
            download: btnDownload,
            onClick: btnOnClick,
        } = button;

        return (
            <Button
                dataAttrs={{ root: dataAttrs?.button }}
                className={cn('button', [classes.button])}
                href={btnHref}
                target={btnTarget}
                download={btnDownload}
                onClick={btnOnClick}
            >
                {btnTitle}
            </Button>
        );
    }, [button, isCardLink, classes, dataAttrs?.button]);

    const renderBtnsWrapper = React.useCallback(() => {
        const btnElem = renderBtn();
        const linkElem = renderLink();

        if (!btnElem && !linkElem) {
            return null;
        }

        return (
            <div className={cn('btns-wrapper', { 'left-align': isAlignAvailable && isLeftHAlign })}>
                {btnElem}
                {linkElem}
            </div>
        );
    }, [renderBtn, renderLink, isAlignAvailable, isLeftHAlign]);

    return (
        <div
            {...filterDataAttrs(dataAttrs?.root)}
            className={cn(
                '',
                {
                    href: !!href,
                    'full-height': isFullHeight,
                    'centered-text': isCenteredText,
                },
                [className, classes.root],
            )}
            ref={rootRef}
        >
            <Element href={href} target={target} className={cn('inner', [classes.inner])}>
                <>
                    {renderImage()}
                    <Header as="h3" className={cn('title')}>
                        {typeof title === 'string' ? convert(title, titleConvertConfig) : title}
                    </Header>
                    {!!text && (
                        <div className={cn('text')}>
                            {typeof text === 'string' ? convert(text, textConvertConfig) : text}
                        </div>
                    )}
                    {renderBtnsWrapper()}
                </>
            </Element>
        </div>
    );
};

Card.propTypes = {
    dataAttrs: PropTypes.shape({
        root: PropTypes.objectOf(PropTypes.string.isRequired),
        link: PropTypes.objectOf(PropTypes.string.isRequired),
        button: PropTypes.objectOf(PropTypes.string.isRequired),
    }),
    className: PropTypes.string,
    classes: PropTypes.shape({
        root: PropTypes.string,
        button: PropTypes.string,
        link: PropTypes.string,
        inner: PropTypes.string,
    }),
    rootRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.oneOfType([PropTypes.shape({ current: PropTypes.elementType }), PropTypes.any]),
    ]),
    imageSrc: PropTypes.string,
    imageAlt: PropTypes.string,
    svgSrc: PropTypes.node,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
    button: PropTypes.shape({
        title: PropTypes.string.isRequired,
        href: PropTypes.string,
        target: PropTypes.oneOf(Object.values(Target)),
        download: PropTypes.bool,
        onClick: PropTypes.func,
    }),
    link: PropTypes.shape({
        title: PropTypes.string.isRequired,
        href: PropTypes.string,
        target: PropTypes.oneOf(Object.values(Target)),
        download: PropTypes.bool,
    }),
    isCenteredText: PropTypes.bool,
    isLeftHAlign: PropTypes.bool,
    isFullHeight: PropTypes.bool,
    href: PropTypes.string,
    target: PropTypes.oneOf(Object.values(Target)),
    objectFit: PropTypes.oneOf(Object.values(ObjectFit)),
};

export default Card;
