import React, { useEffect, useState } from 'react';
import { cnCreate, filterDataAttrs } from '@megafon/ui-helpers';
import ErrorIcon from '@megafon/ui-icons/basic-24-block_24.svg';
import ArrowDown from '@megafon/ui-icons/system-16-arrow-list_down_16.svg';
import ArrowUp from '@megafon/ui-icons/system-16-arrow-list_up_16.svg';
import RightArrow from '@megafon/ui-icons/system-16-arrow_right_16.svg';
import WarningIcon from '@megafon/ui-icons/system-24-attention_invert_24.svg';
import SuccessIcon from '@megafon/ui-icons/system-24-checked_24.svg';
import InfoIcon from '@megafon/ui-icons/system-24-info_invert_24.svg';
import * as PropTypes from 'prop-types';
import Button from 'components/Button/Button';
import Collapse from 'components/Collapse/Collapse';
import Header from 'components/Header/Header';
import TextLink from 'components/TextLink/TextLink';
import Tile from 'components/Tile/Tile';
import CancelIcon from './close-icon.svg';
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
    /** Дополнительные классы для корневого и внутренних элементов */
    classes?: {
        root?: string;
        container?: string;
        content?: string;
    };
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
    /** Короткий текст, отображаемый при закрытом расхлопе */
    shortText?: string;
    /** заголовок закрытого расхлопа */
    closeCollapseTitle?: string;
    /** заголовок открытого расхлопа */
    openCollapseTitle?: string;
    /** Управление состоянием открыт/закрыт расхлопа "Подробнее" */
    isCollapseOpened?: boolean;
    /** Текст кнопки */
    buttonText?: string;
    /** Лоадер кнопки */
    buttonLoader?: boolean;
    /** Заблокировать кнопку */
    buttonDisable?: boolean;
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
    /** Дополнительные data атрибуты к внутренним элементам */
    dataAttrs?: {
        root?: Record<string, string>;
        title?: Record<string, string>;
        text?: Record<string, string>;
        link?: Record<string, string>;
        close?: Record<string, string>;
        button?: Record<string, string>;
        collapseButton?: Record<string, string>;
    };
    /** Обработчик на закрытие */
    onClose?: () => void;
    /** Обработчик клика по ссылке */
    onLinkClick?: () => void;
    /** Обработчик клика по кнопке */
    onButtonClick?: () => void;
    /** Обработчик клика по кнопке расхлопа */
    onCollapseButtonClick?: (value: boolean) => void;
}

const cn = cnCreate('mfui-notification');
const Notification: React.FC<INotificationProps> = ({
    className,
    classes: { root: rootClass, container: containerClass, content: contentClass } = {},
    children,
    type = 'info',
    shadowLevel = 'zero',
    isColored = true,
    hasCloseButton,
    title,
    shortText,
    closeCollapseTitle = 'Подробнее',
    openCollapseTitle = 'Свернуть',
    isCollapseOpened = false,
    buttonText,
    buttonLoader = false,
    buttonDisable = false,
    link,
    rel,
    href,
    target,
    icon,
    dataAttrs,
    onClose,
    onLinkClick,
    onButtonClick,
    onCollapseButtonClick,
}) => {
    const [showFullText, setShowFullText] = useState(isCollapseOpened);

    const hasBottom = shortText || buttonText || link;
    const isErrorType = type === NotificationTypes.ERROR;

    useEffect(() => {
        setShowFullText(isCollapseOpened);
    }, [isCollapseOpened]);

    const handleCollapseButtonClick = (): void => {
        setShowFullText(!showFullText);
        onCollapseButtonClick?.(!showFullText);
    };

    const renderLink = (): JSX.Element => (
        <TextLink
            dataAttrs={{ root: dataAttrs?.link }}
            className={cn('link')}
            onClick={onLinkClick}
            rel={rel}
            href={href}
            target={target}
        >
            {link}
            <RightArrow className={cn('link-arrow')} />
        </TextLink>
    );

    const renderButton = (): JSX.Element => (
        <Button
            className={cn('button')}
            dataAttrs={{ root: dataAttrs?.button }}
            sizeAll="small"
            sizeMobile="extra-small"
            theme={isErrorType && isColored ? 'white' : 'green'}
            showLoader={buttonLoader}
            disabled={buttonDisable}
            ellipsis={!buttonLoader}
            onClick={onButtonClick}
        >
            {buttonText}
        </Button>
    );

    const renderCollapseButton = (): JSX.Element => (
        <button
            {...filterDataAttrs(dataAttrs?.collapseButton)}
            type="button"
            className={cn('collapse-button')}
            onClick={handleCollapseButtonClick}
        >
            {showFullText ? openCollapseTitle : closeCollapseTitle}
            <div className={cn('collapse-arrow', { close: showFullText })}>
                {showFullText ? <ArrowUp /> : <ArrowDown />}
            </div>
        </button>
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
            dataAttrs={{ root: dataAttrs?.root }}
            radius="rounded"
            shadowLevel={shadowLevel}
            className={cn(
                {
                    type,
                    colored: isColored,
                },
                [className, rootClass],
            )}
        >
            <div className={cn('container', [containerClass])}>
                <div className={cn('icon-container')}>{renderIcon()}</div>
                <div className={cn('content', [contentClass])}>
                    <div className={cn('text-container')}>
                        {title && (
                            <Header
                                dataAttrs={{ root: dataAttrs?.title }}
                                as="h5"
                                className={cn('title', { 'close-padding': hasCloseButton })}
                            >
                                {title}
                            </Header>
                        )}
                        <p
                            {...filterDataAttrs(dataAttrs?.text)}
                            className={cn('text', { 'close-padding': hasCloseButton && !title })}
                        >
                            {!showFullText && (shortText || children)}
                            {shortText && (
                                <Collapse
                                    className={cn('collapse', { hidden: !showFullText })}
                                    classNameContainer={cn('collapse-inner')}
                                    isOpened={showFullText}
                                >
                                    {children}
                                </Collapse>
                            )}
                        </p>
                    </div>
                    {hasBottom && (
                        <div className={cn('bottom', { 'has-button': !!buttonText })}>
                            {(buttonText || link) && (
                                <div className={cn('bottom-block')}>
                                    {buttonText && renderButton()}
                                    {link && !shortText && renderLink()}
                                </div>
                            )}
                            {shortText && renderCollapseButton()}
                        </div>
                    )}
                </div>
            </div>
            {hasCloseButton && (
                <button {...filterDataAttrs(dataAttrs?.close)} className={cn('close')} type="button" onClick={onClose}>
                    <CancelIcon className={cn('close-icon')} />
                </button>
            )}
        </Tile>
    );
};

Notification.propTypes = {
    type: PropTypes.oneOf(Object.values(NotificationTypes)),
    className: PropTypes.string,
    classes: PropTypes.shape({
        root: PropTypes.string,
        container: PropTypes.string,
        content: PropTypes.string,
    }),
    shadowLevel: PropTypes.oneOf(Object.values(ShadowTypes)),
    isColored: PropTypes.bool,
    hasCloseButton: PropTypes.bool,
    title: PropTypes.string,
    shortText: PropTypes.string,
    closeCollapseTitle: PropTypes.string,
    openCollapseTitle: PropTypes.string,
    isCollapseOpened: PropTypes.bool,
    buttonText: PropTypes.string,
    buttonLoader: PropTypes.bool,
    buttonDisable: PropTypes.bool,
    link: PropTypes.string,
    rel: PropTypes.string,
    href: PropTypes.string,
    target: PropTypes.oneOf(['_self', '_blank', '_parent', '_top']),
    icon: PropTypes.element,
    dataAttrs: PropTypes.shape({
        root: PropTypes.objectOf(PropTypes.string.isRequired),
        title: PropTypes.objectOf(PropTypes.string.isRequired),
        text: PropTypes.objectOf(PropTypes.string.isRequired),
        link: PropTypes.objectOf(PropTypes.string.isRequired),
        close: PropTypes.objectOf(PropTypes.string.isRequired),
        button: PropTypes.objectOf(PropTypes.string.isRequired),
        collapseButton: PropTypes.objectOf(PropTypes.string.isRequired),
    }),
    onClose: PropTypes.func,
    onLinkClick: PropTypes.func,
    onButtonClick: PropTypes.func,
    onCollapseButtonClick: PropTypes.func,
};
export default Notification;
