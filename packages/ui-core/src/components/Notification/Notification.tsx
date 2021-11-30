import React from 'react';
import { cnCreate } from '@megafon/ui-helpers';
import ErrorIcon from '@megafon/ui-icons/basic-24-block_24.svg';
import RightArrow from '@megafon/ui-icons/system-16-arrow_right_16.svg';
import WarningIcon from '@megafon/ui-icons/system-24-attention_invert_24.svg';
import SuccessIcon from '@megafon/ui-icons/system-24-checked_24.svg';
import InfoIcon from '@megafon/ui-icons/system-24-info_invert_24.svg';
import CancelIcon from '@megafon/ui-icons/system-32-cancel_32.svg';
import * as PropTypes from 'prop-types';
import Header from 'components/Header/Header';
import TextLink from 'components/TextLink/TextLink';
import Tile from 'components/Tile/Tile';
import './Notification.less';

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
    /** Текст ссылки внизу уведомления */
    link?: string;
    /** rel - аргумент тега <a> для ссылки */
    rel?: string;
    /** href - аргумент тега <a> для ссылки */
    href?: string;
    /** target - аргумент тега <a> */
    target?: '_self' | '_blank' | '_parent' | '_top';
    /** Иконка */
    icon?: JSX.Element;
    /** Обработчик на закрытие */
    onClose?: () => void;
    /** Обработчик клика по ссылке */
    onLinkClick?: () => void;
}

const cn = cnCreate('mfui-notification');
const Notification: React.FC<INotificationProps> = ({
    className,
    children,
    type = 'info',
    shadowLevel = 'zero',
    isColored = true,
    hasCloseButton,
    title,
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

    const renderIcon = (): JSX.Element => {
        if (icon) {
            return icon;
        }

        const { SUCCESS, ERROR, WARNING } = NotificationTypes;

        switch (type) {
            case SUCCESS:
                return <SuccessIcon />;
            case ERROR:
                return <ErrorIcon />;
            case WARNING:
                return <WarningIcon />;
            default:
                return <InfoIcon />;
        }
    };

    return (
        <Tile
            radius="rounded"
            shadowLevel={shadowLevel}
            className={cn(
                {
                    type,
                    colored: isColored,
                },
                className,
            )}
        >
            <div className={cn('container')}>
                <div className={cn('icon-container')}>{renderIcon()}</div>

                <div className={cn('content')}>
                    {title && (
                        <Header as="h5" className={cn('title', { 'close-padding': hasCloseButton })}>
                            {title}
                        </Header>
                    )}
                    <p className={cn('text', { 'close-padding': hasCloseButton && !title })}>{children}</p>
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
    link: PropTypes.string,
    rel: PropTypes.string,
    href: PropTypes.string,
    target: PropTypes.oneOf(['_self', '_blank', '_parent', '_top']),
    icon: PropTypes.element,
    onClose: PropTypes.func,
    onLinkClick: PropTypes.func,
};
export default Notification;
