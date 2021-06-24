import * as React from 'react';
import * as PropTypes from 'prop-types';
import './Logo.less';
import { cnCreate } from '@megafon/ui-helpers';
import greenHorizontalImg from 'docIcons/green-horizontal.svg';
import greenVerticalImg from 'docIcons/green-vertical.svg';
import Link from '../Link/Link';

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
class Logo extends React.Component<ILogoProps, {}> {
    static propTypes = {
        color: PropTypes.string,
        view: PropTypes.oneOf(['horizontal', 'vertical']),
        target: PropTypes.string,
        href: PropTypes.string,
        className: PropTypes.string,
    };

    static defaultProps: Partial<ILogoProps> = {
        color: 'green',
        view: 'horizontal',
        target: '_blank',
        href: '/',
    };

    render() {
        const { color, view, className, href, target } = this.props;
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
    }
}

export default Logo;
