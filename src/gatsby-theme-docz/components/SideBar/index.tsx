import React from 'react';
import { Logo } from '@megafon/ui-core';
import { cnCreate } from '@megafon/ui-helpers';
import { useCurrentDoc } from 'docz';
import Menu from '../Menu';
import ThemeSwitcher from '../ThemeSwitcher';
import './SideBar.less';

const cn = cnCreate('docz-sidebar');

const SideBar: React.FC = () => {
    const currentDoc = useCurrentDoc();

    React.useEffect(() => {
        const current = document.getElementById(currentDoc.route);
        const option = { threshold: 0 };

        current &&
            window.IntersectionObserver &&
            new window.IntersectionObserver((entries, obs) => {
                const [entry] = entries;
                if (entry && !entry.isIntersecting) {
                    current.scrollIntoView();
                }
                obs.disconnect();
            }, option).observe(current);
    }, [currentDoc.route]);

    return (
        <div className={cn()}>
            <div className={cn('logo-wrapper')}>
                <Logo className={cn('logo')} href="/intro" target="_self" />
                <ThemeSwitcher />
            </div>
            <div className={cn('menu')}>
                <Menu />
            </div>
        </div>
    );
};

export default SideBar;
