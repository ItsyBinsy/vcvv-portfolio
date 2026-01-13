import { createContext, useContext, useState, useEffect } from 'react';

const DarkModeContext = createContext();

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error('useDarkMode must be used within DarkModeProvider');
  }
  return context;
};

export const DarkModeProvider = ({ children }) => {
  // Check localStorage or system preference
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) {
      return saved === 'true';
    }
    // Check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Update localStorage and document class when dark mode changes
  useEffect(() => {
    console.log('Dark Mode State:', isDarkMode); // Debug log
    localStorage.setItem('darkMode', isDarkMode);

    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      console.log('Added dark class to html'); // Debug log
    } else {
      document.documentElement.classList.remove('dark');
      console.log('Removed dark class from html'); // Debug log
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};
