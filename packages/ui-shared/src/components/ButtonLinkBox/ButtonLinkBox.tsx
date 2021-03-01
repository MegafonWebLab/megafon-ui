import * as React from 'react';
import * as PropTypes from 'prop-types';
import { cnCreate, Button, TextLink, dataAttrs as filterDataAttrs } from '@megafon/ui-core';
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
    /** Заголовок кнопки */
    buttonTitle?: string;
    /** Ссылка кнопки */
    buttonUrl?: string;
    /** Цвет кнопки */
    buttonColor?: 'green' | 'purple';
    /** Заголовок ссылки */
    linkTitle?: string;
    /** Адрес ссылки */
    linkUrl?: string;
    /** Горизонтальное выравнивание */
    hAlign?: 'center' | 'left';
    /** Обработчик клика по кнопке */
    onButtonClick?: (e: React.SyntheticEvent<EventTarget>) => void;
    /** Обработчик клика по ссылке */
    onLinkClick?: (e: React.SyntheticEvent<EventTarget>) => void;
}

const cn = cnCreate('mfui-beta-button-link-box');
const ButtonLinkBox: React.FC<IButtonLinkBoxProps> = ({
    dataAttrs,
    buttonTitle,
    buttonUrl,
    buttonColor = 'green',
    linkTitle,
    linkUrl,
    hAlign,
    className,
    classes = {},
    onButtonClick,
    onLinkClick,
}) => (
    <div {...filterDataAttrs(dataAttrs)} className={cn({ 'h-align': hAlign }, [className, classes.root])}>
        {buttonTitle && (
            <div className={cn('row')}>
                <Button
                    className={classes.button}
                    href={buttonUrl}
                    theme={buttonColor}
                    onClick={onButtonClick}
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
                    underlineVisibility="always"
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
    buttonTitle: PropTypes.string,
    buttonUrl: PropTypes.string,
    buttonColor: PropTypes.oneOf(['green', 'purple']),
    linkTitle: PropTypes.string,
    linkUrl: PropTypes.string,
    hAlign: PropTypes.oneOf(['center']),
    onButtonClick: PropTypes.func,
    onLinkClick: PropTypes.func,
};

export default ButtonLinkBox;
