import { Component } from 'react';
import Link from 'components/Link/Link';
import './Logo.less';
import { cnCreate } from 'utils/cn';
import greenHorizontalImg from './i/green-horizontal.svg';
import greenVerticalImg from './i/green-vertical.svg';

interface Props {
    color?: string;
    view?: string;
    href?: string;
    target?: '_self' | '_blank' | '_parent' | '_top';
}

const cn = cnCreate('logo');
class Logo extends Component<Props, {}> {

    static defaultProps = {
        color: 'green',
        view: 'horizontal',
        target: '_blank',
        href: '/'
    };

    render() {
        const { color, view, ...props } = this.props;
        const images = {
            'green-horizontal': greenHorizontalImg,
            'green-vertical': greenVerticalImg
        };
        const backgroundImage = `url(${images[`${color}-${view}`]})`;

        return (
            <Link {...props} className={cn({ view })}>
                <div className={cn('img')} style={{backgroundImage}} />
            </Link>
        );

    }

}

export default Logo;
