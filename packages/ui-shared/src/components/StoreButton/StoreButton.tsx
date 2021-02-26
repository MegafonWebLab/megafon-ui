import * as React from 'react';
import PropTypes from 'prop-types';
import { cnCreate, Link } from '@megafon/ui-core';
import './StoreButton.less';

export enum Theme {
    GOOGLE_PLAY = 'google-play',
    APP_STORE = 'app-store',
}

type LinkPropTypes = React.ComponentProps<typeof Link>;

export type Props = Required<Pick<LinkPropTypes, 'href'>> & Pick<LinkPropTypes, 'onClick'> & {
    /** Тема кнопки */
    theme: Theme;
    /** Дополнительный класс */
    className?: string;
};

const cn = cnCreate('mfui-beta-store-button');
const StoreButton: React.FC<Props> = ({ href, onClick, theme, className }) => (
    <Link href={href} onClick={onClick} className={cn({ theme }, className)} />
);

StoreButton.propTypes = {
    href: PropTypes.string.isRequired,
    theme: PropTypes.oneOf(Object.values(Theme)).isRequired,
    onClick: PropTypes.func,
    className: PropTypes.string,
};

export default StoreButton;
