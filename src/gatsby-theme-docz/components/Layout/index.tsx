import React from 'react';
import { cnCreate } from '@megafon/ui-core';
import './Layout.less';
import SideBar from '../SideBar';

const cn = cnCreate('docz-layout');

const Layout: React.FC = ({ children }) => {
    return (
        <div className={cn()}>
            <div className={cn('side-bar')}>
                <SideBar />
            </div>
            <div className={cn('sep')} />
            <div className={cn('content')}>
                <div className={cn('content-inner')}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Layout;
