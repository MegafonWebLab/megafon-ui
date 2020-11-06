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
            const option = { threshold: 0 };

            current && window.IntersectionObserver && new window.IntersectionObserver((entries, obs) => {
                const [entry] = entries;
                if (entry && !entry.isIntersecting) {
                    current.scrollIntoView();
                }
                obs.disconnect();
            }, option).observe(current);
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
