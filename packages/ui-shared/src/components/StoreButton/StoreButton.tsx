import * as React from 'react';
import PropTypes from 'prop-types';
import { cnCreate } from '@megafon/ui-core';
import './StoreButton.less';

export enum Theme {
    GOOGLE_PLAY = 'google-play',
    APP_STORE = 'app-store',
}

export type Props = {
    href: string;
    /** Тема кнопки */
    theme: Theme;
    /** Обработчик клика */
    onClick?: (e: React.MouseEvent<EventTarget>) => void;
    /** Дополнительный класс */
    className?: string;
};

const cn = cnCreate('mfui-beta-store-button');
const StoreButton: React.FC<Props> = ({ href, onClick, theme, className }) => (
    <a href={href} onClick={onClick} className={cn({ theme }, className)} />
);

StoreButton.propTypes = {
    href: PropTypes.string.isRequired,
    theme: PropTypes.oneOf(Object.values(Theme)).isRequired,
    onClick: PropTypes.func,
    className: PropTypes.string,
};

export default StoreButton;
