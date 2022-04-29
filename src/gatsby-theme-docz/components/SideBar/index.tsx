import React from 'react';
import { Logo } from '@megafon/ui-core';
import { cnCreate, applyTheme } from '@megafon/ui-helpers';
import { useCurrentDoc } from 'docz';
import { ThemeContext } from '../../themeContext';
import Menu from '../Menu';
import DarkIcon from './i/dark-icon.svg';
import LightIcon from './i/light-icon.svg';
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
    }, [themeContext, isLightTheme]);

    return (
        <div className={cn()}>
            <button
                type="button"
                className={cn('theme-switcher', {
                    light: isLightTheme,
                    dark: !isLightTheme,
                })}
                onClick={toggleTheme}
                data-current-theme={themeContext.theme}
            >
                <span className={cn('switch-icons')}>
                    <LightIcon className={cn('switch-icon', { light: true })} />
                    <DarkIcon className={cn('switch-icon', { dark: true })} />
                </span>
                <span className={cn('switch-dot')} />
                <span className={cn('switch-dot', { blue: true })} />
            </button>
            <div className={cn('logo-wrapper')}>
                <Logo className={cn('logo')} href="/intro" target="_self" />
            </div>
            <div className={cn('menu')}>
                <Menu />
            </div>
        </div>
    );
};

export default SideBar;
