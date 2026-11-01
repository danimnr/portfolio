import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Check, Copy, Mail } from 'lucide-react';
import { socials } from '../data/site';
import { Reveal } from './Reveal';

const links = [
  { key: 'GitHub', href: socials.github },
  { key: 'Ko-fi', href: socials.kofi },
  { key: 'Atenea', href: socials.atenea },
];

const PROTOCOL = /^(https?:\/\/|mailto:)/;
const MAIL = socials.email.replace(PROTOCOL, '');

export function Contact() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number>(0);
  useEffect(() => () => clearTimeout(timer.current), []);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(MAIL);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 2200);
    } catch { /* Clipboard unavailable: the address stays visible and selectable. */ }
  }

  return <section id="contacto" className="section section-anchor"><div className="wrap contact-grid">
    <Reveal><div>
      <p className="prompt mono">contacto</p>
      <h2 className="contact-title">Hablemos<span className="hl">.</span></h2>
      <p className="contact-lead">¿Tienes un proyecto, una oferta o una idea? Escríbeme con unas líneas sobre lo que necesitas y te respondo por correo.</p>
      <div className="contact-actions">
        <a className="btn btn-primary btn-lg" href={socials.email}><Mail size={18} /> Enviar un email</a>
        <button type="button" className="btn btn-lg" onClick={copyEmail}>{copied ? <Check size={16} /> : <Copy size={16} />}<span aria-live="polite">{copied ? 'Copiado' : 'Copiar dirección'}</span></button>
      </div>
      <p className="contact-address mono"><a href={socials.email}>{MAIL}</a></p>
    </div></Reveal>
    <Reveal delay={100}><div className="term">
      <div className="term-bar"><span className="term-dots" aria-hidden="true"><i /><i /><i /></span><span className="term-title">También puedes encontrarme en</span></div>
      <div className="term-body"><ul className="links">{links.map(link => <li key={link.key}><a href={link.href} target="_blank" rel="noopener noreferrer"><span className="k">{link.key}</span><span className="v">{link.href.replace(PROTOCOL, '')}</span><ArrowUpRight size={15} /></a></li>)}</ul></div>
    </div></Reveal>
  </div></section>;
}
