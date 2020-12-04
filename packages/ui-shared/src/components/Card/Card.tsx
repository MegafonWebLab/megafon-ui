import * as React from 'react';
import './Card.less';
import { cnCreate, Header, Paragraph, Button, TextLink, Link } from '@megafon/ui-core';
import PropTypes from 'prop-types';

interface IButton {
    title: string;
    href: string;
}

interface ILink {
    title: string;
    href?: string;
}

export const ObjectFit = {
    FILL: 'fill',
    CONTAIN: 'contain',
} as const;

type ObjectFitType = typeof ObjectFit[keyof typeof ObjectFit];

interface ICard {
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
    /** Ссылка для всей карточки */
    href?: string;
    /** Режим позиционирования изображения */
    objectFit?: ObjectFitType;
}

const cn = cnCreate('mfui-beta-card');
const Card: React.FC<ICard> = ({
    imageSrc,
    svgSrc,
    title,
    text,
    button,
    link,
    isLeftHAlign = false,
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

    const renderLink = React.useCallback(({ href: linkHref, title: linkTitle }) => {
        const isFakeLink = !linkHref;

        if (isFakeLink || isCardLink) {
            return <span className={cn('fake-link')}>{linkTitle}</span>;
        }

        return (
            <TextLink className={cn('link')} href={linkHref}>{linkTitle}</TextLink>
        );
    }, [isCardLink]);

    const renderBtn = React.useCallback(({ href: btnHref, title: btnTitle}) => (
        <Button className={cn('button')} href={btnHref}>{btnTitle}</Button>
    ), []);

    return (
        <div className={cn('', { 'href': !!href })}>
            <Element href={href}>
                <div className={cn('inner')}>
                    {renderImage()}
                    <Header as="h3" className={cn('title')}>{title}</Header>
                    <Paragraph hasMargin={false}>{text}</Paragraph>
                    <div className={cn('btns-wrapper', { 'left-align': isAlignAvailable && isLeftHAlign })}>
                        {isRenderBtn && renderBtn(button)}
                        {link && renderLink(link)}
                    </div>
                </div>
            </Element>
        </div>
    );
};

Card.propTypes = {
    imageSrc: PropTypes.string,
    svgSrc: PropTypes.node,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    button: PropTypes.shape({
        title: PropTypes.string.isRequired,
        href: PropTypes.string.isRequired,
    }),
    link: PropTypes.shape({
        title: PropTypes.string.isRequired,
        href: PropTypes.string,
    }),
    isLeftHAlign: PropTypes.bool,
    href: PropTypes.string,
    objectFit: PropTypes.oneOf(Object.values(ObjectFit)),
};

export default Card;
