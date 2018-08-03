import { Component, SyntheticEvent } from 'react';

interface Props {
    href?: string;
    children?: JSX.Element[] | Element[] | JSX.Element | string | Element;
    target?: '_self' | '_blank' | '_parent' | '_top';
    className?: string;
    onClick?(e: SyntheticEvent<EventTarget>): void;
}

class Link extends Component<Props, {}> {

    static defaultProps = {
        href: '#',
    };

    render() {
        const { target, children, ...rest } = this.props;

        return (
            <a target={target} {...rest}>
                {children}
            </a>
        );
    }

}

export default Link;
