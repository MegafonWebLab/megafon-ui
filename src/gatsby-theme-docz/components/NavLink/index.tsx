import React from 'react';
import './NavLink.less';
import { cnCreate } from '@megafon/ui-helpers';
import { Link } from 'docz';

type NavLinkProps = {
    to: string;
    className?: string;
};

const cn = cnCreate('docz-nav-link');

const NavLink: React.FC<NavLinkProps> = ({ to, children, className }) => {
    if (typeof children === 'string' && children.trim()) {
        return (
            <Link id={to} className={cn([className])} to={`${to === '/' ? to : `/${to}`}`} activeClassName="active">
                {children}
            </Link>
        );
    }

    return <div />;
};

export default NavLink;
