import React from 'react';
import './Menu.less';
import { cnCreate } from '@megafon/ui-helpers';
import { useMenus } from 'docz'
import NavGroup from '../NavGroup';
import NavLink from '../NavLink';

const cn = cnCreate('docz-menu');

const Menu: React.FC = () => {
    const menus = useMenus({ query: ''}) || [];

    return (
        <div className={cn()}>
            {menus.map(menu => {
                if (!menu.route) {
                    return <NavGroup key={menu.id} item={menu} />
                }

                return (
                    <NavLink className={cn('item')} key={menu.id} to={menu.route}>
                        {menu.name}
                    </NavLink>
                );
            })}
        </div>
    )
}

export default Menu;
