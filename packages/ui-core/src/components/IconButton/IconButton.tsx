import * as React from 'react';
import PropTypes from 'prop-types';
import cnCreate from 'utils/cnCreate';
import Button from 'components/Button/Button';

export interface IIconButtonProps {
    /** Цветовая тема */
    theme?: 'green' | 'purple' | 'white' | 'black';
    /** Тип отображения */
    type?: 'primary' | 'outline';
    /** Ссылка */
    href?: string;
    /** Target - аргумент тега <a> */
    target?: '_self' | '_blank' | '_parent' | '_top';
    /** Размер на всех разрешениях экрана */
    sizeAll?: 'small' | 'medium' | 'large';
    /** Размер на разрешении экрана 1280+ */
    sizeWide?: 'small' | 'medium' | 'large';
    /** Размер на разрешении экрана 1024+ */
    sizeDesktop?: 'small' | 'medium' | 'large';
    /** Размер на разрешении экрана 768-1023 */
    sizeTablet?: 'small' | 'medium' | 'large';
    /** Размер на разрешении экрана 0-767 */
    sizeMobile?: 'small' | 'medium' | 'large';
    /** Иконка */
    icon: JSX.Element;
    /** Управление возможностью взаимодействия с компонентом */
    disabled?: boolean;
    /** Обработчик клика по кнопке */
    onClick?: (e: React.SyntheticEvent<EventTarget>) => void;
    /** Дополнительный класс корневого элемента */
    className?: string;
}

const cn = cnCreate('mfui-beta-icon-button');
const IconButton: React.FC<IIconButtonProps> = ({
    theme = 'green',
    type = 'primary',
    href,
    target,
    sizeAll = 'medium',
    sizeWide,
    sizeDesktop,
    sizeTablet,
    sizeMobile,
    icon,
    disabled,
    onClick,
    className,
}) => (
    <Button
        className={cn({
            disabled,
            'size-all': sizeAll,
            'size-wide': sizeWide,
            'size-desktop': sizeDesktop,
            'size-tablet': sizeTablet,
            'size-mobile': sizeMobile,
        }, [className])}
        disabled={disabled}
        theme={theme}
        target={target}
        href={href}
        type={type}
        sizeAll={sizeAll}
        sizeWide={sizeWide}
        sizeDesktop={sizeDesktop}
        sizeTablet={sizeTablet}
        sizeMobile={sizeMobile}
        onClick={onClick}
        iconLeft={icon}
    />
);

IconButton.propTypes = {
    theme: PropTypes.oneOf(['green', 'purple', 'white', 'black']),
    type: PropTypes.oneOf(['primary', 'outline']),
    href: PropTypes.string,
    target: PropTypes.oneOf(['_self', '_blank', '_parent', '_top']),
    sizeAll: PropTypes.oneOf(['small', 'medium', 'large']),
    sizeWide: PropTypes.oneOf(['small', 'medium', 'large']),
    sizeDesktop: PropTypes.oneOf(['small', 'medium', 'large']),
    sizeTablet: PropTypes.oneOf(['small', 'medium', 'large']),
    sizeMobile: PropTypes.oneOf(['small', 'medium', 'large']),
    icon: PropTypes.element.isRequired,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    className: PropTypes.string,
};

export default IconButton;
