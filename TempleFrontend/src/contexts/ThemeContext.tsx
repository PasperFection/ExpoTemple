import React, { createContext, useContext, ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import { useGlobal } from './GlobalContext';

interface ThemeContextType {
  isDarkMode: boolean;
  colors: {
    background: string;
    text: string;
    primary: string;
  };
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isDarkMode } = useGlobal();
  const systemColorScheme = useColorScheme();

  const theme: ThemeContextType = {
    isDarkMode: isDarkMode ?? systemColorScheme === 'dark',
    colors: {
      background: isDarkMode ? '#000' : '#fff',
      text: isDarkMode ? '#fff' : '#000',
      primary: '#007AFF',
    },
  };

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};