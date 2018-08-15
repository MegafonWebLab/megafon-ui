import * as React from 'react';
import * as PropTypes from 'prop-types';

interface ILinkProps {
    /** Link */
    href?: string;
    children?: JSX.Element[] | Element[] | JSX.Element | string | Element;
    /** target - property tag <a> */
    target?: '_self' | '_blank' | '_parent' | '_top';
    /** Custom class name */
    className?: string;
    /** Click event handler */
    onClick?(e: React.SyntheticEvent<EventTarget>): void;
}

class Link extends React.Component<ILinkProps, {}> {
    static propTypes = {
        href: PropTypes.string,
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.element),
            PropTypes.element,
            PropTypes.string,
            PropTypes.node,
        ]),
        target: PropTypes.oneOf(['_self', '_blank', '_parent', '_top']),
        className: PropTypes.string,
        onClick: PropTypes.func,
    };

    static defaultProps: Partial<ILinkProps> = {
        href: '#',
        target: '_blank',
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
