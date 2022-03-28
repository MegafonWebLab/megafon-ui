import React from 'react';
import { Logo } from '@megafon/ui-core';
import { cnCreate, applyTheme } from '@megafon/ui-helpers';
import DarkIcon from './i/dark-icon.svg';
import LightIcon from './i/light-icon.svg';
import { useCurrentDoc } from 'docz';
import { ThemeContext } from '../../themeContext';
import Menu from '../Menu';
import './SideBar.less';

const cn = cnCreate('docz-sidebar');

const SideBar: React.FC = () => {
    const currentDoc = useCurrentDoc();

    const themeContext = React.useContext(ThemeContext);
    const isLightTheme = themeContext.theme === 'light';

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

    const toggleTheme = React.useCallback(() => {
        const newTheme = isLightTheme ? 'dark' : 'light';

        // update context
        themeContext.setTheme(newTheme);

        // apply theme to document
        applyTheme(newTheme);
    }, [themeContext]);

    return (
        <div className={cn()}>
            <div className={cn('logo-wrapper')}>
                <Logo className={cn('logo')} href="/intro" target="_self" />
                <button 
                    type="button"
                    className={cn('theme-switcher', { dark: !isLightTheme })}
                    onClick={toggleTheme}
                    data-current-theme={themeContext.theme}
                    >
                        <span className={cn('switch-icons')}>
                            <LightIcon className={cn('icon')}/>
                            <DarkIcon className={cn('icon', {dark: !isLightTheme})}/>
                        </span>
                        <span className={cn('switch-dot')} />
                        <span className={cn('switch-dot', { blue: true})} />
                </button>
            </div>
            <div className={cn('menu')}>
                <Menu />
            </div>
        </div>
    );
};

export default SideBar;
