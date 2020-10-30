import React from 'react';
import { Logo, cnCreate } from '@megafon/ui-core';
import './SideBar.less';
import Menu from '../Menu';

const cn = cnCreate('docz-sidebar');

const SideBar: React.FC = () => {
    return (
        <div className={cn()}>
            <div className={cn('logo-wrapper')}>
                <Logo className={cn('logo')} />
            </div>
            <Menu />
        </div>
    )
};

export default SideBar;
