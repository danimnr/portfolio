import { ArrowUp } from 'lucide-react';

export function Footer() {
  return <footer className="statusline"><div className="wrap statusline-inner">
    <div className="left"><span className="mode">NORMAL</span><span>Daniel Agud Sorli / danimnr</span><span>© {new Date().getFullYear()} D.A.S. Interactive Software</span></div>
    <a href="#inicio" aria-label="Volver arriba">volver arriba <ArrowUp size={14} /></a>
  </div></footer>;
}
