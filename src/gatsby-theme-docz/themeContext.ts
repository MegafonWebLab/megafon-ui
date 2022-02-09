import React from 'react';

type ContextType = {
    theme: 'light' | 'dark';
    setTheme: (theme: 'light' | 'dark') => void;
};

export const ThemeContext = React.createContext({
    theme: 'light',
    setTheme: () => undefined,
} as ContextType);
