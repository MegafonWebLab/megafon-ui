import * as React from 'react';
import * as PropTypes from 'prop-types';

interface Props {
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

const Link: React.StatelessComponent<Props> = props => {
    const { target, children, ...rest } = props;

    return (
        <a target={target} {...rest}>
            {children}
        </a>
    );
};

Link.propTypes = {
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

Link.defaultProps = {
    href: '#',
    target: '_blank',
};

export default Link;
