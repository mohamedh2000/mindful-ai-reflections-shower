
import React, { createContext, useContext, useEffect, useState } from 'react';

type ThemeColor = 'purple' | 'blue' | 'green' | 'pink' | 'orange' | 'teal';

interface ThemeColorContextType {
  themeColor: ThemeColor;
  setThemeColor: (color: ThemeColor) => void;
}

const ThemeColorContext = createContext<ThemeColorContextType | undefined>(undefined);

export const useThemeColor = () => {
  const context = useContext(ThemeColorContext);
  if (!context) {
    throw new Error('useThemeColor must be used within a ThemeColorProvider');
  }
  return context;
};

interface ThemeColorProviderProps {
  children: React.ReactNode;
}

export const ThemeColorProvider: React.FC<ThemeColorProviderProps> = ({ children }) => {
  const [themeColor, setThemeColorState] = useState<ThemeColor>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme-color');
      if (stored && ['purple', 'blue', 'green', 'pink', 'orange', 'teal'].includes(stored)) {
        return stored as ThemeColor;
      }
    }
    return 'purple';
  });

  useEffect(() => {
    const root = document.documentElement;
    
    // Remove all existing theme color classes
    root.classList.remove('theme-purple', 'theme-blue', 'theme-green', 'theme-pink', 'theme-orange', 'theme-teal');
    
    // Add the current theme color class
    root.classList.add(`theme-${themeColor}`);
    
    // Store in localStorage
    localStorage.setItem('theme-color', themeColor);
    
    console.log('Theme color applied:', themeColor);
  }, [themeColor]);

  const setThemeColor = (color: ThemeColor) => {
    setThemeColorState(color);
  };

  return (
    <ThemeColorContext.Provider value={{ themeColor, setThemeColor }}>
      {children}
    </ThemeColorContext.Provider>
  );
};
