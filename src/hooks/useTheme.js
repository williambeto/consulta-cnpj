import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'cnpj-facil-theme';

function getInitialTheme() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export default function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme);

  const apply = useCallback((t) => {
    document.documentElement.dataset.theme = t;
    localStorage.setItem(STORAGE_KEY, t);
    setTheme(t);
  }, []);

  const toggle = useCallback(() => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    apply(next);
  }, [apply]);

  useEffect(() => {
    apply(theme);
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e) => {
      if (!localStorage.getItem(STORAGE_KEY)) {
        apply(e.matches ? 'dark' : 'light');
      }
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [theme, apply]);

  return { theme, toggle };
}
