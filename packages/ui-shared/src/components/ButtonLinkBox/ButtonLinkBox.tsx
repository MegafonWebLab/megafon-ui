import * as React from 'react';
import * as PropTypes from 'prop-types';
import { cnCreate, Button, TextLink } from '@megafon/ui-core';
import './ButtonLinkBox.less';

export interface IButtonLinkBoxProps {
    /** Дополнительный класс корневого элемента */
    className?: string;
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
}

const cn = cnCreate('mfui-beta-button-link-box');
const ButtonLinkBox: React.FC<IButtonLinkBoxProps> = ({
    buttonTitle,
    buttonUrl,
    buttonColor = 'green',
    linkTitle,
    linkUrl,
    hAlign,
    className,
}) => (
    <div className={cn({ 'h-align': hAlign }, className)}>
        {buttonTitle && (
            <div className={cn('row')}>
                <Button
                    href={buttonUrl}
                    theme={buttonColor}
                >
                    {buttonTitle}
                </Button>
            </div>
        )}
        {linkTitle && (
            <div className={cn('row')}>
                <TextLink href={linkUrl} underlineVisibility="always">
                    {linkTitle}
                </TextLink>
            </div>
        )}
    </div>
);

ButtonLinkBox.propTypes = {
    className: PropTypes.string,
    buttonTitle: PropTypes.string,
    buttonUrl: PropTypes.string,
    buttonColor: PropTypes.oneOf(['green', 'purple']),
    linkTitle: PropTypes.string,
    linkUrl: PropTypes.string,
    hAlign: PropTypes.oneOf(['center']),
};

export default ButtonLinkBox;
