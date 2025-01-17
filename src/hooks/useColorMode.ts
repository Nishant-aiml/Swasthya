import { useState, useEffect } from 'react';

type ColorMode = 'light' | 'dark';

export function useColorMode() {
  const [colorMode, setColorMode] = useState<ColorMode>(() => {
    if (typeof window === 'undefined') return 'light';
    return (localStorage.getItem('colorMode') as ColorMode) || 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(colorMode);
    localStorage.setItem('colorMode', colorMode);
  }, [colorMode]);

  return {
    colorMode,
    setColorMode,
    toggleColorMode: () => setColorMode(prev => prev === 'light' ? 'dark' : 'light')
  };
}
