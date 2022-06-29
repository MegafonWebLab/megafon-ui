import React from 'react';
import { cnCreate, applyTheme } from '@megafon/ui-helpers';
import { ThemeContext } from '../../themeContext';
import DarkIcon from './i/dark-icon.svg';
import LightIcon from './i/light-icon.svg';
import './ThemeSwitcher.less';

const cn = cnCreate('docz-theme-switcher');

const SideBar: React.FC = () => {
    const themeContext = React.useContext(ThemeContext);
    const isLightTheme = themeContext.theme === 'light';

    const toggleTheme = React.useCallback(() => {
        const newTheme = isLightTheme ? 'dark' : 'light';

        // update context
        themeContext.setTheme(newTheme);

        // apply theme to document
        applyTheme(newTheme);
    }, [themeContext, isLightTheme]);

    return (
        <button
            type="button"
            className={cn({
                light: isLightTheme,
                dark: !isLightTheme,
            })}
            data-current-theme={themeContext.theme}
            onClick={toggleTheme}
        >
            <span className={cn('icons')}>
                <LightIcon className={cn('icon', { light: true })} />
                <DarkIcon className={cn('icon', { dark: true })} />
            </span>
            <span className={cn('dot')} />
            <span className={cn('dot', { blue: true })} />
        </button>
    );
};

export default SideBar;
