import React from 'react';
import { Logo, cnCreate } from '@megafon/ui-core';
import './SideBar.less';
import Menu from '../Menu';
import { useCurrentDoc } from 'docz';

const cn = cnCreate('docz-sidebar');

const SideBar: React.FC = () => {
    const currentDoc = useCurrentDoc();

    React.useEffect(() => {
            const current = document.getElementById(currentDoc.route);

            if (current) {
                current.scrollIntoView()
            }
    }, []);

    return (
        <div className={cn()}>
            <div className={cn('logo-wrapper')}>
                <Logo className={cn('logo')} />
            </div>
            <div className={cn('menu')}>
                <Menu />
            </div>
        </div>
    )
};

export default SideBar;
