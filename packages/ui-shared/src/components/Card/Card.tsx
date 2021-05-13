import React, { Ref } from 'react';
import './Card.less';
import { cnCreate, Header, Paragraph, Button, TextLink, Link, dataAttrs as filterDataAttrs } from '@megafon/ui-core';
import PropTypes from 'prop-types';

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
    text: string;
    /** Данные для кнопки */
    button?: IButton;
    /** Данные для ссылки */
    link?: ILink;
    /** Расположение кнопки/ссылки по левой стороне */
    isLeftHAlign?: boolean;
    /** Высота корневого элемента 100% */
    isFullHeight?: boolean;
    /** Ссылка для всей карточки */
    href?: string;
    /** Режим позиционирования изображения */
    objectFit?: ObjectFitType;
}

const cn = cnCreate('mfui-beta-card');
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
    isLeftHAlign = false,
    isFullHeight = false,
    href,
    objectFit = 'fill',
}) => {
    const isAlignAvailable = !button || !link;
    const isCardLink = !!href;
    const isRenderBtn = !!button && !isCardLink;
    const Element = href ? Link : 'div';

    const renderImage = React.useCallback(() => {
        switch (true) {
            case !!imageSrc: {
                return (
                    <div className={cn('pic-wrapper', { 'object-fit': objectFit, 'img': true })}>
                        <img className={cn('img')} src={imageSrc} />
                    </div>
                );
            }

            case !!svgSrc: {
                return (
                    <div className={cn('pic-wrapper')}>
                        {svgSrc}
                    </div>
                );
            }

            default:
                return null;
        }
    }, [imageSrc, svgSrc, objectFit]);

    const renderLink = React.useCallback(({ href: linkHref, title: linkTitle, download }) => {
        const isFakeLink = !linkHref;

        if (isFakeLink || isCardLink) {
            return <span className={cn('fake-link')}>{linkTitle}</span>;
        }

        return (
            <TextLink className={cn('link', [classes.link])} href={linkHref} download={download}>{linkTitle}</TextLink>
        );
    }, [isCardLink]);

    const renderBtn = React.useCallback(({ href: btnHref, title: btnTitle, download: buttonDownload }) => (
        <Button className={cn('button', [classes.button])} href={btnHref} download={buttonDownload}>{btnTitle}</Button>
    ), []);

    return (
        <div
            {...filterDataAttrs(dataAttrs)}
            className={cn('', { 'href': !!href, 'full-height': isFullHeight }, [className, classes.root])}
            ref={rootRef}
        >
            <Element href={href} className={cn('inner', [classes.inner])}>
                <>
                    {renderImage()}
                    <Header as="h3" className={cn('title')}>{title}</Header>
                    <Paragraph hasMargin={false}>{text}</Paragraph>
                    <div className={cn('btns-wrapper', { 'left-align': isAlignAvailable && isLeftHAlign })}>
                        {isRenderBtn && renderBtn(button)}
                        {link && renderLink(link)}
                    </div>
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
        PropTypes.oneOfType([PropTypes.shape({ current: PropTypes.elementType }), PropTypes.any ]),
    ]),
    imageSrc: PropTypes.string,
    svgSrc: PropTypes.node,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
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
    isLeftHAlign: PropTypes.bool,
    isFullHeight: PropTypes.bool,
    href: PropTypes.string,
    objectFit: PropTypes.oneOf(Object.values(ObjectFit)),
};

export default Card;
