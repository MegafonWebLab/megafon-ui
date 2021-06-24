import React from 'react';
import './NavGroup.less';
import { MenuItem, useCurrentDoc } from 'docz';
import { cnCreate } from '@megafon/ui-helpers';
import NavLink from '../NavLink';

type NavGroupProps = {
    item: MenuItem;
}

const SearchIcon = () => <svg viewBox="0 0 32 32"><path d="M16,24a9.94,9.94,0,0,0,5.7-1.8L26.53,28,28,26.72,23.22,20.9A10,10,0,1,0,16,24ZM16,6a8,8,0,1,1-8,8A8,8,0,0,1,16,6Z"/></svg>;
const ArrowUp = () => <svg width="20" fill="none" viewBox="0 0 20 20"><defs/><path fill="#333" d="M12.976 12L10 9.004 7.023 12 6 10.998 10 7l4 3.998L12.976 12z"/></svg>;
const ArrowDown = () => <svg width="20" fill="none" viewBox="0 0 20 20"><defs/><path fill="#333" d="M7.023 8L10 10.996 12.976 8 14 9.002 10 13 6 9.002 7.023 8z"/></svg>;

const cn = cnCreate('docz-nav-group');
const NavGroup: React.FC<NavGroupProps> = ({ item }) => {
    const currentDoc = useCurrentDoc()
    const { menu: menus = [], name } = item;
    const [open, setOpen] = React.useState(menus.filter(m => m.route === currentDoc.route).length > 0);
    const [search, setSearch] = React.useState('');
    const filteredMenu = menus.filter(({ name = '' }) =>
        name.toLowerCase().search(
            search.toLowerCase()
        ) !== -1
    );

    const handleChangeSearch = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }, []);

    const handleClickTitle = React.useCallback(() => {
        setOpen(o => !o);
    }, []);

    const arrow = !open ? <ArrowDown /> : <ArrowUp />;

    const renderSearch = () => (
        <div className={cn('search')}>
            <div className={cn('search-inner')}>
                <div className={cn('search-icon')}>
                    <SearchIcon />
                </div>
                <input
                    value={search}
                    placeholder='Find'
                    type="text"
                    className={cn('search-field')}
                    onChange={handleChangeSearch}
                />
            </div>
        </div>
    );

    return (
        <div className={cn()}>
            <div className={cn('title-wrapper')} onClick={handleClickTitle}>
                <span className={cn('title')}>{name}</span>{arrow}
            </div>
            <div className={cn('list-wrapper', { active: open })}>
                {renderSearch()}
                <div className={cn('list')}>
                    {filteredMenu.map(menu => {
                        return (
                            <NavLink className={cn('item')} to={menu.route as string} key={menu.id}>
                                {menu.name}
                            </NavLink>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}

export default NavGroup;
