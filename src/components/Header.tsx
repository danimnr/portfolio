import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Menu, Moon, Sun, X } from 'lucide-react';
import type { MouseEvent } from 'react';
import type { Theme } from '../hooks/useTheme';
import { socials } from '../data/site';

const navItems = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Sobre mí', href: '#filosofia' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Stack', href: '#stack' },
  { label: 'Contacto', href: '#contacto' },
];

export function Header({ theme, onToggleTheme }: { theme: Theme; onToggleTheme: (event: MouseEvent<HTMLButtonElement>) => void }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    addEventListener('keydown', onEscape);
    return () => removeEventListener('keydown', onEscape);
  }, []);

  const dark = theme === 'dark';
  return (
    <header className="topbar">
      <div className="wrap topbar-inner">
        <a className="wordmark" href="#inicio" aria-label="Daniel Agud Sorli, ir al inicio" onClick={() => setOpen(false)}>
          <b>danimnr</b><span className="at">@das</span>:~$
        </a>
        <nav className="desktop-nav" aria-label="Navegación principal">
          {navItems.map(item => <a key={item.href} href={item.href}>{item.label}</a>)}
        </nav>
        <div className="nav-actions">
          <button type="button" className="icon-btn" aria-label={dark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'} aria-pressed={dark} title={dark ? 'Tema claro' : 'Tema oscuro'} onClick={onToggleTheme}>
            {dark ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <a className="nav-contact" href={socials.email}>Contactar <ArrowUpRight size={14} /></a>
          <button type="button" className="icon-btn menu-toggle" onClick={() => setOpen(value => !value)} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? 'Cerrar menú' : 'Abrir menú'}>
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav id="mobile-navigation" className="mobile-nav" aria-label="Navegación móvil" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: .2 }}>
            <div className="wrap">
              {navItems.map(item => <a key={item.href} href={item.href} onClick={() => setOpen(false)}><span>{item.label}</span><ArrowUpRight size={15} /></a>)}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
