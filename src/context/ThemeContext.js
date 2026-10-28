import React, { createContext, useContext, useEffect } from 'react';
import { theme as lightTheme } from '../styles/theme';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  useEffect(() => {
    localStorage.removeItem('theme');
    document.body.classList.remove('dark-mode');
  }, []);

  const isDark = false;
  const toggleTheme = () => {};
  const theme = lightTheme.colors;

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
