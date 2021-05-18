import React from 'react';
import * as PropTypes from 'prop-types';
import './Notification.less';
import cnCreate from 'utils/cnCreate';
import Tile from 'components/Tile/Tile';
import Header from 'components/Header/Header';
import TextLink from 'components/TextLink/TextLink';
import CancelIcon from 'icons/System/32/Cancel_32.svg';
import RightArrow from 'icons/System/16/Arrow_right_16.svg';

export const NotificationTypes = {
    SUCCESS: 'success',
    WARNING: 'warning',
    ERROR: 'error',
    INFO: 'info',
} as const;

type NotificationType = typeof NotificationTypes[keyof typeof NotificationTypes];

export const ShadowTypes = {
    ZERO: 'zero',
    LOW: 'low',
    HIGH: 'high',
    HOVER: 'hover',
} as const;

type ShadowType = typeof ShadowTypes[keyof typeof ShadowTypes];

export interface INotificationProps {
    /** Дополнительный класс корневого элемента */
    className?: string;
    /** Тип отображения */
    type?: NotificationType;
    /** Уровень тени */
    shadowLevel?: ShadowType;
    /** Наличие фоновой заливки у уведомления */
    isColored?: boolean;
    /** Наличие кнопки-крестика "Закрыть" */
    hasCloseButton?: boolean;
    /** Заголовок */
    title?: string;
    /** Контент/текст уведомления */
    content?: string;
    /** Текст ссылки внизу уведомления */
    link?: string;
    /** rel - аргумент тега <a> для ссылки */
    rel?: string;
    /** href - аргумент тега <a> для ссылки */
    href?: string;
    /** target - аргумент тега <a> */
    target?: '_self' | '_blank' | '_parent' | '_top';
    /** Иконка */
    icon: JSX.Element;
    /** Обработчик на закрытие */
    onClose?: () => void;
    /** Обработчик клика по ссылке */
    onLinkClick?: () => void;
}

const cn = cnCreate('mfui-beta-notification');
const Notification: React.FC<INotificationProps> = ({
    className,
    type = 'success',
    shadowLevel = 'zero',
    isColored = false,
    hasCloseButton,
    title,
    content,
    link,
    rel,
    href,
    target,
    icon,
    onClose,
    onLinkClick,
}) => {
    const renderLink = (): JSX.Element => (
        <TextLink className={cn('link')} onClick={onLinkClick} rel={rel} href={href} target={target}>
            {link}
            <RightArrow className={cn('right-arrow')} />
        </TextLink>
    );

    return (
        <Tile radius="rounded"
            shadowLevel={shadowLevel}
            className={cn({
                type, colored: isColored,
            }, className)}
        >
            <div className={cn('container')}>
                <div className={cn('icon-container')}>
                    {icon}
                </div>

                <div className={cn('content')}>
                    {title && (
                        <Header as="h5" className={cn('title')}>
                            {title}
                        </Header>
                    )}
                    {content &&
                        <p className={cn('text')}>{content}</p>
                    }
                    {link && renderLink()}
                </div>
            </div>
            {hasCloseButton && (
                <button className={cn('close')} type="button" onClick={onClose}>
                    <CancelIcon className={cn('close-icon')} />
                </button>
            )}
        </Tile>
    );
};

Notification.propTypes = {
    type: PropTypes.oneOf(Object.values(NotificationTypes)),
    className: PropTypes.string,
    shadowLevel: PropTypes.oneOf(Object.values(ShadowTypes)),
    isColored: PropTypes.bool,
    hasCloseButton: PropTypes.bool,
    title: PropTypes.string,
    content: PropTypes.string,
    link: PropTypes.string,
    rel: PropTypes.string,
    href: PropTypes.string,
    target: PropTypes.oneOf(['_self', '_blank', '_parent', '_top']),
    icon: PropTypes.element.isRequired,
    onClose: PropTypes.func,
    onLinkClick: PropTypes.func,
};
export default Notification;
