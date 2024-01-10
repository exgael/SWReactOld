// ThemeContext.tsx
import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react';

type Theme = 'light' | 'dark';

export interface ThemeColors {
    background: string;
    primaryText: string;
    secondaryText: string;
    accent: string;
    divider: string;
}

const lightThemeColors: ThemeColors = {
    background: '#FFFFFF', // White
    primaryText: '#000000', // Black
    secondaryText: '#3C3C43', // Dark gray
    accent: '#007AFF', // Blue
    divider: '#C6C6C8', // Light gray
};

const darkThemeColors: ThemeColors = {
    background: '#1C1C1E', // Almost black
    primaryText: '#FFFFFF', // White
    secondaryText: '#EBEBF5', // Light gray
    accent: '#0A84FF', // Bright blue
    divider: '#48484A', // Dark gray
};

interface ThemeContextType {
    isDark: boolean;
    themeColors: ThemeColors;
    setThemeColors: (theme: ThemeColors) => void;
    toggleTheme: () => void;
}

const defaultState: ThemeContextType = {
    isDark: false,
    themeColors: lightThemeColors,
    setThemeColors: () => {
    },
    toggleTheme: () => {
    },
};

const ThemeContext = createContext<ThemeContextType>(defaultState);

export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({children}) => {
    const [theme, setTheme] = useState<Theme>('light');
    const [themeColors, setThemeColors] = useState<ThemeColors>(lightThemeColors);

    useEffect(() => {
        const hour = new Date().getHours();
        const isNight = hour >= 18 || hour <= 6;

        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const shouldUseDark = prefersDark || isNight;

        if (shouldUseDark) {
            document.body.style.background = darkThemeColors.background;
            setTheme('dark');
            setThemeColors(darkThemeColors);
        } else {
            document.body.style.background = lightThemeColors.background;
            setTheme('light');
            setThemeColors(lightThemeColors);
        }

        const listener = (e: MediaQueryListEvent) => {
            setTheme(e.matches ? 'dark' : 'light');
        };

        window.matchMedia('(prefers-color-scheme: dark)').addListener(listener);
        return () => {
            window.matchMedia('(prefers-color-scheme: dark)').removeListener(listener);
        };
    }, []);

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };
    const isDark = theme === 'dark';

    return (
        <ThemeContext.Provider value={{toggleTheme, isDark, setThemeColors, themeColors}}>
            {children}
        </ThemeContext.Provider>
    );
};
