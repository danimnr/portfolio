import { useEffect, useRef, useState } from 'react';
import type { MouseEvent } from 'react';
import { flushSync } from 'react-dom';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'das-theme';

function hasManualChoice(): boolean {
  try { return localStorage.getItem(STORAGE_KEY) !== null; } catch { return false; }
}

function currentTheme(): Theme {
  if (typeof document === 'undefined') return 'light';
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

function applyTheme(theme: Theme, persist = true) {
  const dark = theme === 'dark';
  document.documentElement.classList.toggle('dark', dark);
  document.documentElement.style.colorScheme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#0b0e13' : '#ffffff');
  if (!persist) return;
  try { localStorage.setItem(STORAGE_KEY, theme); } catch { /* Storage denied. */ }
}

/** Follows the OS theme until the user toggles manually (persisted); toggling reveals the new theme as a circle from the button. */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(currentTheme);
  const transitioning = useRef(false);

  useEffect(() => {
    const query = matchMedia('(prefers-color-scheme: dark)');
    const onChange = (event: MediaQueryListEvent) => {
      if (hasManualChoice()) return;
      const next: Theme = event.matches ? 'dark' : 'light';
      applyTheme(next, false);
      setTheme(next);
    };
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  function toggleTheme(event: MouseEvent<HTMLButtonElement>) {
    if (transitioning.current) return;
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const prefersReducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

    const update = () => {
      // applyTheme is synchronous. flushSync makes React update inside the snapshot callback.
      applyTheme(next);
      flushSync(() => setTheme(next));
    };

    if (!document.startViewTransition || prefersReducedMotion) {
      update();
      return;
    }

    // Disable ordinary color transitions while snapshots are taken.
    transitioning.current = true;
    document.documentElement.classList.add('theme-switching');
    const transition = document.startViewTransition(update);
    void transition.finished.finally(() => {
      transitioning.current = false;
      document.documentElement.classList.remove('theme-switching');
    });
    transition.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        {
          duration: 650,
          easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
          pseudoElement: '::view-transition-new(root)',
        },
      );
    }).catch(() => { /* Browser may skip an interrupted transition. */ });
  }

  return { theme, toggleTheme };
}
