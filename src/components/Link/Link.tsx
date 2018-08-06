import * as React from 'react';

interface Props {
    href?: string;
    children?: JSX.Element[] | Element[] | JSX.Element | string | Element;
    target?: '_self' | '_blank' | '_parent' | '_top';
    className?: string;
    onClick?(e: React.SyntheticEvent<EventTarget>): void;
}

const Link: React.StatelessComponent<Props> = props => {
    const { target, children, ...rest } = props;

    return (
        <a target={target} {...rest}>
            {children}
        </a>
    );
};

Link.defaultProps = {
    href: '#',
    target: '_blank',
};

export default Link;
