import React from 'react';
import './NavLink.less';
import { cnCreate } from '@megafon/ui-core';
import { Link } from 'docz';

type NavLinkProps = {
    to: string;
    className?: string;
}

const cn = cnCreate('docz-nav-link');

const NavLink: React.FC<NavLinkProps> = ({ to, children, className }) => {
    return <Link className={cn([className])} to={`${to === '/' ? to : '/' + to}`} activeClassName="active">{children}</Link>
};

export default NavLink;
