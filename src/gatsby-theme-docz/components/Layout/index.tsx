/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { cnCreate, applyTheme } from '@megafon/ui-helpers';
import { ThemeContext } from '../../themeContext';
import PageHeader from '../PageHeader';
import SideBar from '../SideBar';
import './Layout.less';

type Theme = 'light' | 'dark';

const getCurrentTheme = (): Theme =>
    (typeof window !== 'undefined' && (window.localStorage.getItem('theme') as Theme)) || 'light';

const cn = cnCreate('docz-layout');
const Layout: React.FC = ({ children }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [theme, setTheme] = React.useState(getCurrentTheme());

    const handleSetTheme = React.useCallback(
        (newTheme: Theme) => {
            typeof window !== 'undefined' && window.localStorage.setItem('theme', newTheme);
            setTheme(newTheme);
        },
        [setTheme],
    );

    const initialContextValue = { theme, setTheme: handleSetTheme };

    const [contextValue, setContextValue] = React.useState(initialContextValue);

    React.useEffect(() => {
        setContextValue({...initialContextValue, theme});
    }, [theme]);

    React.useEffect(() => {
        const currentTheme = getCurrentTheme();
        setTheme(currentTheme);
        // apply theme to document
        applyTheme(currentTheme);

        const event = new Event('css-var-load');
        document.dispatchEvent(event);
    }, []);

    const handleClick = () => {
        setIsOpen((prev: boolean) => !prev);
    };

    const handleClickOut = () => {
        setIsOpen(false);
    };

    return (
        <ThemeContext.Provider value={contextValue}>
            <div className={cn()}>
                <PageHeader onClick={handleClick} isOpen={isOpen} />
                <div className={cn('side-bar', { open: isOpen })}>
                    <SideBar />
                </div>
                <div className={cn('sep', { open: isOpen })} />
                <div className={cn('bg', { open: isOpen })} onClick={handleClickOut} aria-hidden />
                <div className={cn('content')}>
                    <div className={cn('content-inner')}>{children}</div>
                </div>
            </div>
        </ThemeContext.Provider>
    );
};

export default Layout;
