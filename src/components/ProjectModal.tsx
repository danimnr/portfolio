import { useEffect, useId, useRef, useState } from 'react';
import type { AnimationEvent, MouseEvent } from 'react';
import { ArrowUpRight, Download, Github, Globe, Mail, Store, X } from 'lucide-react';
import { socials } from '../data/site';
import type { LinkKind, Project } from '../data/site';

const linkIcons: Record<LinkKind, typeof Globe> = { play: Store, web: Globe, github: Github, download: Download };

export function ProjectModal({ project, onClosed }: { project: Project; onClosed: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    el.showModal();
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = '';
      if (el.open) el.close();
    };
  }, []);

  function onPanelAnimationEnd(event: AnimationEvent<HTMLDivElement>) {
    if (!closing || event.target !== event.currentTarget) return;
    dialog.current?.close();
    onClosed();
  }

  function onDialogClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget) setClosing(true);
  }

  const mailto = `${socials.email}?subject=${encodeURIComponent(`Sobre ${project.name}`)}`;

  return <dialog ref={dialog} className={`pmodal${closing ? ' closing' : ''}`} aria-labelledby={titleId} onCancel={event => { event.preventDefault(); setClosing(true); }} onClick={onDialogClick}>
    <div className="pmodal-panel" onAnimationEnd={onPanelAnimationEnd}>
      <button type="button" className="icon-btn pmodal-close" onClick={() => setClosing(true)} aria-label="Cerrar"><X size={18} /></button>
      <div className="pmodal-scroll">
        <header className="pmodal-head">
          <img className="pmodal-logo" src={project.logo} alt={`Logo de ${project.name}`} width={84} height={84} />
          <div className="pmodal-titles">
            <p className="pmodal-kicker">{project.highlight}</p>
            <h2 id={titleId}>{project.name}</h2>
            <p className="pmodal-subtitle">{project.subtitle}</p>
          </div>
        </header>
        <div className="pmodal-grid">
          <div className="pmodal-main">
            <p className="pmodal-overview">{project.overview}</p>
            <h3>Qué hace</h3>
            <ul className="pmodal-list">{project.features.map(item => <li key={item}>{item}</li>)}</ul>
            <h3>Detalles técnicos</h3>
            <ul className="pmodal-list">{project.technical.map(item => <li key={item}>{item}</li>)}</ul>
          </div>
          <aside className="pmodal-side">
            <section className="pmodal-box">
              <h3>Enlaces</h3>
              {project.links.length > 0
                ? <ul className="pmodal-links">{project.links.map(link => {
                  const Icon = linkIcons[link.kind];
                  return <li key={link.href}><a href={link.href} target="_blank" rel="noopener noreferrer"><span className="pmodal-link-icon"><Icon size={18} /></span><span className="pmodal-link-text"><strong>{link.label}</strong><small>{link.note}</small></span><ArrowUpRight size={16} /></a></li>;
                })}</ul>
                : <p className="pmodal-note">{project.noLinksNote}</p>}
            </section>
            <section className="pmodal-box">
              <h3>Tecnologías</h3>
              <div className="tags">{project.stack.map(tag => <span key={tag} className="tag">{tag}</span>)}</div>
            </section>
            <section className="pmodal-box">
              <h3>Ficha</h3>
              <dl className="pmodal-facts">
                <div><dt>Estado</dt><dd>{project.status}</dd></div>
                <div><dt>Plataformas</dt><dd>{project.platformLabel}</dd></div>
              </dl>
            </section>
            <a className="btn btn-primary btn-lg pmodal-contact" href={mailto}><Mail size={17} /> Hablar de este proyecto</a>
          </aside>
        </div>
      </div>
    </div>
  </dialog>;
}
