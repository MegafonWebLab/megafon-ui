/* eslint-disable import/no-unresolved */
import { Button, TextLink } from '@megafon/ui-core';
import { cnCreate, filterDataAttrs } from '@megafon/ui-helpers';
import * as PropTypes from 'prop-types';
import React, { Ref } from 'react';
import './ButtonLinkBox.less';

export interface IButtonLinkBoxProps {
    /** Дата атрибуты для корневого элемента */
    dataAttrs?: { [key: string]: string };
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
    /** Заголовок ссылки */
    linkTitle?: string;
    /** Добавляет атрибут download для тега <a> компонента Button */
    linkUrl?: string;
    /** Target свойство ссылки */
    linkTarget?: '_self' | '_blank' | '_parent' | '_top';
    /** Добавляет атрибут download к свойству тега <a> */
    linkDownload?: boolean;
    /** Горизонтальное выравнивание */
    hAlign?: 'center' | 'left';
    /** Обработчик клика по кнопке */
    onButtonClick?: (e: React.SyntheticEvent<EventTarget>) => void;
    /** Обработчик клика по ссылке */
    onLinkClick?: (e: React.SyntheticEvent<EventTarget>) => void;
}

const cn: (param1?: string | Record<string, unknown>, param2?: (string | undefined)[]) => string =
    cnCreate('mfui-beta-button-link-box');
const ButtonLinkBox: React.FC<IButtonLinkBoxProps> = ({
    dataAttrs,
    rootRef,
    buttonTitle,
    buttonUrl,
    buttonDownload,
    buttonColor = 'green',
    linkTitle,
    linkUrl,
    linkDownload,
    hAlign,
    className,
    buttonTarget,
    linkTarget,
    classes = {},
    onButtonClick,
    onLinkClick,
}) => (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <div {...filterDataAttrs(dataAttrs)} className={cn({ 'h-align': hAlign }, [className, classes.root])} ref={rootRef}>
        {buttonTitle && (
            <div className={cn('row')}>
                <Button
                    className={classes.button}
                    href={buttonUrl}
                    theme={buttonColor}
                    onClick={onButtonClick}
                    target={buttonTarget}
                    download={buttonDownload}
                >
                    {buttonTitle}
                </Button>
            </div>
        )}
        {linkTitle && (
            <div className={cn('row')}>
                <TextLink
                    className={classes.link}
                    href={linkUrl}
                    download={linkDownload}
                    underlineVisibility="always"
                    target={linkTarget}
                    onClick={onLinkClick}
                >
                    {linkTitle}
                </TextLink>
            </div>
        )}
    </div>
);

ButtonLinkBox.propTypes = {
    dataAttrs: PropTypes.objectOf(PropTypes.string.isRequired),
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
    linkTitle: PropTypes.string,
    linkUrl: PropTypes.string,
    linkDownload: PropTypes.bool,
    hAlign: PropTypes.oneOf(['center']),
    onButtonClick: PropTypes.func,
    onLinkClick: PropTypes.func,
};

export default ButtonLinkBox;
