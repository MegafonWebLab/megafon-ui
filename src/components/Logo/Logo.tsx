import * as React from 'react';
import './Logo.less';
import { cnCreate } from 'utils/cn';
import greenHorizontalImg from 'icons/green-horizontal.svg';
import greenVerticalImg from 'icons/green-vertical.svg';
import Link from '../Link/Link';

interface Props {
    color?: string;
    view?: string;
    href?: string;
    target?: '_self' | '_blank' | '_parent' | '_top';
}

const cn = cnCreate('logo');
const Logo: React.StatelessComponent<Props> = props => {
    const { color, view, ...args } = props;
    const images = {
        'green-horizontal': greenHorizontalImg,
        'green-vertical': greenVerticalImg,
    };
    const BackgroundImage = images[`${color}-${view}`];

    return (
        <Link {...args} className={cn('', { view })}>
            <div className={cn('img')}>
                <BackgroundImage />
            </div>
        </Link>
    );
};

Logo.defaultProps = {
    color: 'green',
    view: 'horizontal',
    target: '_blank',
    href: '/',
};

export default Logo;
