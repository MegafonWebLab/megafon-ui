/* eslint-disable import/no-unresolved */
import './Card.less';
import { Header, Paragraph, Button, TextLink, Link } from '@megafon/ui-core';
import { cnCreate, filterDataAttrs } from '@megafon/ui-helpers';
import PropTypes from 'prop-types';
import React, { Ref } from 'react';

interface IButton {
    title: string;
    href: string;
    download?: boolean;
}

interface ILink {
    title: string;
    href?: string;
    download?: boolean;
}

export const ObjectFit = {
    FILL: 'fill',
    CONTAIN: 'contain',
} as const;

type ObjectFitType = typeof ObjectFit[keyof typeof ObjectFit];

export interface ICard {
    /** Дата атрибуты для корневого элемента */
    dataAttrs?: { [key: string]: string };
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
    /** Иконка в карточке */
    svgSrc?: React.ReactNode;
    /** Заголовок карточки */
    title: string;
    /** Текст карточки */
    text?: string;
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
    /** Режим позиционирования изображения */
    objectFit?: ObjectFitType;
}
const cn: (
    param1?: string,
    param2?: Record<string, unknown> | (string | undefined)[],
    param3?: (string | undefined)[],
) => string = cnCreate('mfui-beta-card');
const Card: React.FC<ICard> = ({
    dataAttrs,
    className,
    classes = {},
    rootRef,
    imageSrc,
    svgSrc,
    title,
    text,
    button,
    link,
    isCenteredText = false,
    isLeftHAlign = false,
    isFullHeight = false,
    href,
    objectFit = 'fill',
}) => {
    const isAlignAvailable = !button || !link;
    const isCardLink = !!href;
    const Element = href ? Link : 'div';

    const renderImage = React.useCallback(() => {
        switch (true) {
            case !!imageSrc: {
                return (
                    <div className={cn('pic-wrapper', { 'object-fit': objectFit, img: true })}>
                        <img alt="" className={cn('img')} src={imageSrc} />
                    </div>
                );
            }

            case !!svgSrc: {
                return <div className={cn('pic-wrapper')}>{svgSrc}</div>;
            }

            default:
                return null;
        }
    }, [imageSrc, svgSrc, objectFit]);

    const renderLink = React.useCallback(() => {
        if (!link) {
            return null;
        }

        const { href: linkHref, title: linkTitle, download } = link;

        if (!linkHref || isCardLink) {
            return <span className={cn('fake-link')}>{linkTitle}</span>;
        }

        return (
            <TextLink className={cn('link', [classes.link])} href={linkHref} download={download}>
                {linkTitle}
            </TextLink>
        );
    }, [link, isCardLink, classes]);

    const renderBtn = React.useCallback(() => {
        if (!button || isCardLink) {
            return null;
        }

        const { href: btnHref, title: btnTitle, download: buttonDownload } = button;

        return (
            <Button className={cn('button', [classes.button])} href={btnHref} download={buttonDownload}>
                {btnTitle}
            </Button>
        );
    }, [button, isCardLink, classes]);

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
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...filterDataAttrs(dataAttrs)}
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
            <Element href={href} className={cn('inner', [classes.inner])}>
                <>
                    {renderImage()}
                    <Header as="h3" className={cn('title')}>
                        {title}
                    </Header>
                    {!!text && (
                        <Paragraph hasMargin={false} className={cn('text')}>
                            {text}
                        </Paragraph>
                    )}
                    {renderBtnsWrapper()}
                </>
            </Element>
        </div>
    );
};

Card.propTypes = {
    dataAttrs: PropTypes.objectOf(PropTypes.string.isRequired),
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
    svgSrc: PropTypes.node,
    title: PropTypes.string.isRequired,
    text: PropTypes.string,
    button: PropTypes.shape({
        title: PropTypes.string.isRequired,
        href: PropTypes.string.isRequired,
        download: PropTypes.bool,
    }),
    link: PropTypes.shape({
        title: PropTypes.string.isRequired,
        href: PropTypes.string,
        download: PropTypes.bool,
    }),
    isCenteredText: PropTypes.bool,
    isLeftHAlign: PropTypes.bool,
    isFullHeight: PropTypes.bool,
    href: PropTypes.string,
    objectFit: PropTypes.oneOf(Object.values(ObjectFit)),
};

export default Card;
