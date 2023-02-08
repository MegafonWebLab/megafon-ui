import React, { Ref } from 'react';
import { Button, TextLink } from '@megafon/ui-core';
import { cnCreate, filterDataAttrs } from '@megafon/ui-helpers';
import * as PropTypes from 'prop-types';
import './ButtonLinkBox.less';

export interface IButtonLinkBoxProps {
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
    };
    /** Ссылка на корневой элемент */
    rootRef?: Ref<HTMLDivElement>;
    /** Заголовок кнопки */
    buttonTitle?: string;
    /** Ссылка кнопки */
    buttonUrl?: string;
    /** Добавляет атрибут download для тега <a> компонента Button */
    buttonDownload?: boolean;
    /** Цвет кнопки */
    buttonColor?: 'green' | 'purple';
    /** Target свойство кнопки */
    buttonTarget?: '_self' | '_blank' | '_parent' | '_top';
    /** Rel - атрибут тега <a> для кнопки */
    buttonRel?: string;
    /** Заголовок ссылки */
    linkTitle?: string;
    /** Добавляет атрибут download для тега <a> компонента Button */
    linkUrl?: string;
    /** Target свойство ссылки */
    linkTarget?: '_self' | '_blank' | '_parent' | '_top';
    /** Rel - атрибут тега <a> для ссылки */
    linkRel?: string;
    /** Добавляет атрибут download к свойству тега <a> */
    linkDownload?: boolean;
    /** Горизонтальное выравнивание */
    align?: 'center' | 'left';
    /** Обработчик клика по кнопке */
    onButtonClick?: (e: React.SyntheticEvent<EventTarget>) => void;
    /** Обработчик клика по ссылке */
    onLinkClick?: (e: React.SyntheticEvent<EventTarget>) => void;
}

const cn = cnCreate('mfui-button-link-box');
const ButtonLinkBox: React.FC<IButtonLinkBoxProps> = ({
    dataAttrs,
    rootRef,
    buttonTitle,
    buttonUrl,
    buttonDownload,
    buttonColor = 'green',
    buttonRel,
    linkTitle,
    linkUrl,
    linkDownload,
    linkRel,
    align,
    className,
    buttonTarget,
    linkTarget,
    classes = {},
    onButtonClick,
    onLinkClick,
}) => (
    <div
        {...filterDataAttrs(dataAttrs?.root)}
        className={cn({ 'h-align': align }, [className, classes.root])}
        ref={rootRef}
    >
        {buttonTitle && (
            <div className={cn('row')}>
                <Button
                    dataAttrs={{ root: dataAttrs?.button }}
                    className={classes.button}
                    href={buttonUrl}
                    theme={buttonColor}
                    onClick={onButtonClick}
                    target={buttonTarget}
                    download={buttonDownload}
                    rel={buttonRel}
                >
                    {buttonTitle}
                </Button>
            </div>
        )}
        {linkTitle && (
            <div className={cn('row')}>
                <TextLink
                    dataAttrs={{ root: dataAttrs?.link }}
                    className={classes.link}
                    href={linkUrl}
                    download={linkDownload}
                    underlineVisibility="always"
                    target={linkTarget}
                    rel={linkRel}
                    onClick={onLinkClick}
                >
                    {linkTitle}
                </TextLink>
            </div>
        )}
    </div>
);

ButtonLinkBox.propTypes = {
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
    }),
    rootRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.oneOfType([PropTypes.shape({ current: PropTypes.elementType }), PropTypes.any]),
    ]),
    buttonTitle: PropTypes.string,
    buttonUrl: PropTypes.string,
    buttonDownload: PropTypes.bool,
    buttonColor: PropTypes.oneOf(['green', 'purple']),
    buttonRel: PropTypes.string,
    linkTitle: PropTypes.string,
    linkUrl: PropTypes.string,
    linkDownload: PropTypes.bool,
    linkRel: PropTypes.string,
    align: PropTypes.oneOf(['center']),
    onButtonClick: PropTypes.func,
    onLinkClick: PropTypes.func,
};

export default ButtonLinkBox;
