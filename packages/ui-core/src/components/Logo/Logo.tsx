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
    color?: 'green';
    /** Отображение */
    view?: 'horizontal' | 'vertical';
    /** Ссылка */
    href?: string;
    /** target - аргумент тега <a> */
    target?: '_self' | '_blank' | '_parent' | '_top';
    /** Дополнительные data атрибуты к внутренним элементам */
    dataAttrs?: {
        root?: Record<string, string>;
    };
}

const cn = cnCreate('mfui-logo');
const Logo: React.FC<ILogoProps> = ({
    className,
    color = 'green',
    view = 'horizontal',
    target = '_blank',
    href = '/',
    dataAttrs,
}) => {
    const images = {
        'green-horizontal': greenHorizontalImg,
        'green-vertical': greenVerticalImg,
    };
    const BackgroundImage = images[`${color}-${view}`];

    return (
        <Link dataAttrs={dataAttrs} href={href} target={target} className={cn('', { view }, className)}>
            <div className={cn('img')}>
                <BackgroundImage className={cn('svg')} />
            </div>
        </Link>
    );
};

Logo.propTypes = {
    color: PropTypes.oneOf(['green']),
    view: PropTypes.oneOf(['horizontal', 'vertical']),
    target: PropTypes.oneOf(['_self', '_blank', '_parent', '_top']),
    href: PropTypes.string,
    className: PropTypes.string,
    dataAttrs: PropTypes.shape({
        root: PropTypes.objectOf(PropTypes.string.isRequired),
    }),
};

export default Logo;
