import * as React from 'react';
import { cnCreate } from '@megafon/ui-helpers';
import * as PropTypes from 'prop-types';
import Link from '../Link/Link';
import greenHorizontalImg from './green-horizontal.svg';
import greenVerticalImg from './green-vertical.svg';
import './Logo.less';

export interface ILogoProps {
    /** Дополнительный класс корневого элемента */
    className?: string;
    /** Цвет */
    color?: string;
    /** Отображение */
    view?: 'horizontal' | 'vertical';
    /** Ссылка */
    href?: string;
    /** target - аргумент тега <a> */
    target?: '_self' | '_blank' | '_parent' | '_top';
}

const cn = cnCreate('mfui-beta-logo');
const Logo: React.FC<ILogoProps> = ({ className, color, view, target, href }) => {
    const images = {
        'green-horizontal': greenHorizontalImg,
        'green-vertical': greenVerticalImg,
    };
    const BackgroundImage = images[`${color}-${view}`];

    return (
        <Link href={href} target={target} className={cn('', { view }, className)}>
            <div className={cn('img')}>
                <BackgroundImage className={cn('svg')} />
            </div>
        </Link>
    );
};

Logo.propTypes = {
    color: PropTypes.string,
    view: PropTypes.oneOf(['horizontal', 'vertical']),
    target: PropTypes.oneOf(['_self', '_blank', '_parent', '_top']),
    href: PropTypes.string,
    className: PropTypes.string,
};

Logo.defaultProps = {
    color: 'green',
    view: 'horizontal',
    target: '_blank',
    href: '/',
};

export default Logo;
