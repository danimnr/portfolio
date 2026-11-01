import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { projects, socials } from '../data/site';
import type { Project } from '../data/site';
import { ProjectModal } from './ProjectModal';
import { Reveal } from './Reveal';

/** Identical copies of the list in a row so the loop wraps invisibly. Copy 0 is the only one exposed to assistive tech; the buttons in the others are not tabbable. */
const COPIES = 3;
const SPEED = 38; // px/s while idle
const CRUISE_TAU = 0.5; // s, easing between stopped and cruising
const COAST_TAU = 0.35; // s, deceleration after a fling
const RESUME_DELAY = 1200; // ms after any interaction before auto-motion eases back in
const TWEEN_MS = 700;
const DRAG_THRESHOLD = 5; // px
const MAX_FLING = 2600; // px/s

type Controls = { step: (direction: 1 | -1) => void };

function ProjectCard({ project, hidden }: { project: Project; hidden: boolean }) {
  return <article className="pcard" data-project={project.id} aria-label={hidden ? undefined : project.name}>
    <header className="pcard-head">
      <img className="pcard-logo" src={project.logo} alt={hidden ? '' : `Logo de ${project.name}`} width={60} height={60} draggable={false} />
      <div className="pcard-title"><h3>{project.name}</h3><p>{project.subtitle}</p></div>
    </header>
    <span className="pcard-status">{project.status}</span>
    <p className="pcard-desc">{project.description}</p>
    <ul className="pcard-bullets">{project.bullets.map(item => <li key={item}>{item}</li>)}</ul>
    <div className="pcard-foot">
      <p className="pcard-platform">{project.platformLabel}</p>
      <div className="tags">{project.stack.map(tag => <span key={tag} className="tag">{tag}</span>)}</div>
      <button type="button" className="pcard-open" tabIndex={hidden ? -1 : undefined}>Ver detalles y enlaces <ArrowUpRight size={14} /></button>
    </div>
  </article>;
}

export function Projects() {
  const gutter = useRef<HTMLDivElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const controls = useRef<Controls>({ step: () => {} });
  const userPaused = useRef(false);
  const [paused, setPaused] = useState(false);
  const [selected, setSelected] = useState<Project | null>(null);
  const modalOpen = useRef(false);
  const openedByKeyboard = useRef(false);
  modalOpen.current = selected !== null;

  function closeProject() {
    setSelected(null);
    if (openedByKeyboard.current) return;
    // Focus returns to the carousel after the dialog closes; for pointer users it must not count as keyboard focus (which pauses the motion).
    requestAnimationFrame(() => {
      const active = document.activeElement;
      if (active instanceof HTMLElement && viewport.current?.contains(active)) active.blur();
    });
  }

  useEffect(() => {
    const view = viewport.current;
    const strip = track.current;
    const align = gutter.current;
    if (!view || !strip || !align) return;
    const sets = strip.querySelectorAll<HTMLElement>('.car-set');
    const cardStep = () => { const cards = sets[0].children; return (cards[1] as HTMLElement).offsetLeft - (cards[0] as HTMLElement).offsetLeft; };
    const loopWidth = () => sets[1].offsetLeft - sets[0].offsetLeft;
    const mod = (value: number, size: number) => ((value % size) + size) % size;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

    // x: unbounded content offset in px. v: current speed in px/s (positive = content moves left).
    let x = -(view.clientWidth - align.clientWidth) / 2;
    let v = 0;
    let hovered = false;
    let focused = false;
    let onScreen = false;
    let resumeAt = 0;
    let tween: { from: number; to: number; start: number } | null = null;
    let drag: { id: number; startX: number; startPointer: number; active: boolean; samples: { t: number; x: number }[] } | null = null;
    let suppressClick = false;

    if (reduce) { userPaused.current = true; setPaused(true); }

    const glideTo = (target: number, now = performance.now()) => { tween = { from: x, to: target, start: now }; v = 0; };
    controls.current.step = direction => glideTo(x + direction * cardStep());

    const observer = new IntersectionObserver(([entry]) => { onScreen = entry.isIntersecting; });
    observer.observe(view);

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType === 'mouse' && event.button !== 0) return;
      tween = null;
      drag = { id: event.pointerId, startX: x, startPointer: event.clientX, active: false, samples: [{ t: event.timeStamp, x }] };
    };
    const onPointerMove = (event: PointerEvent) => {
      if (!drag || event.pointerId !== drag.id) return;
      const delta = event.clientX - drag.startPointer;
      if (!drag.active) {
        if (Math.abs(delta) < DRAG_THRESHOLD) return;
        drag.active = true;
        view.setPointerCapture(event.pointerId);
        view.classList.add('dragging');
      }
      x = drag.startX - delta;
      drag.samples.push({ t: event.timeStamp, x });
      while (drag.samples.length > 2 && event.timeStamp - drag.samples[0].t > 90) drag.samples.shift();
    };
    const endDrag = (event: PointerEvent) => {
      if (!drag || event.pointerId !== drag.id) return;
      if (drag.active) {
        const first = drag.samples[0];
        const last = drag.samples[drag.samples.length - 1];
        const span = (last.t - first.t) / 1000;
        v = span > 0.01 && event.timeStamp - last.t < 80 ? Math.max(-MAX_FLING, Math.min(MAX_FLING, (last.x - first.x) / span)) : 0;
        suppressClick = true;
        setTimeout(() => { suppressClick = false; }, 60);
        view.classList.remove('dragging');
        resumeAt = performance.now() + RESUME_DELAY;
      }
      drag = null;
    };
    const onClickCapture = (event: MouseEvent) => { if (suppressClick) { event.preventDefault(); event.stopPropagation(); } };
    const onClick = (event: MouseEvent) => {
      openedByKeyboard.current = event.detail === 0;
      const card = (event.target as HTMLElement).closest<HTMLElement>('.pcard');
      const project = projects.find(item => item.id === card?.dataset.project);
      if (project) setSelected(project);
    };
    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
      event.preventDefault();
      tween = null;
      x += event.deltaX;
      v = 0;
      resumeAt = performance.now() + RESUME_DELAY;
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.target !== view) return;
      if (event.key === 'ArrowRight') { event.preventDefault(); controls.current.step(1); }
      if (event.key === 'ArrowLeft') { event.preventDefault(); controls.current.step(-1); }
    };
    const onFocusIn = (event: FocusEvent) => {
      focused = event.target !== view && (event.target as HTMLElement).matches(':focus-visible');
      const card = (event.target as HTMLElement).closest<HTMLElement>('.pcard');
      if (!card) return;
      const left = card.getBoundingClientRect().left - view.getBoundingClientRect().left;
      const right = left + card.offsetWidth;
      if (left >= 8 && right <= view.clientWidth - 8) return;
      // Align the real (non-duplicated) card without crossing a loop boundary, so the focused element stays on screen.
      const target = Math.max(0, card.offsetLeft - 24);
      glideTo(x - mod(x, loopWidth()) + target);
    };
    const onFocusOut = (event: FocusEvent) => { if (!view.contains(event.relatedTarget as Node | null)) focused = false; };
    const onEnter = (event: PointerEvent) => { if (event.pointerType === 'mouse') hovered = true; };
    const onLeave = (event: PointerEvent) => { if (event.pointerType === 'mouse') hovered = false; };
    const onDragStart = (event: Event) => event.preventDefault();

    view.addEventListener('pointerdown', onPointerDown);
    view.addEventListener('pointermove', onPointerMove);
    view.addEventListener('pointerup', endDrag);
    view.addEventListener('pointercancel', endDrag);
    view.addEventListener('click', onClickCapture, true);
    view.addEventListener('click', onClick);
    view.addEventListener('wheel', onWheel, { passive: false });
    view.addEventListener('keydown', onKeyDown);
    view.addEventListener('focusin', onFocusIn);
    view.addEventListener('focusout', onFocusOut);
    view.addEventListener('pointerenter', onEnter);
    view.addEventListener('pointerleave', onLeave);
    view.addEventListener('dragstart', onDragStart);

    const ease = (p: number) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);
    let last = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (tween) {
        const progress = reduce ? 1 : Math.min((now - tween.start) / TWEEN_MS, 1);
        x = tween.from + (tween.to - tween.from) * ease(progress);
        if (progress >= 1) { tween = null; resumeAt = now + RESUME_DELAY; }
      } else if (!drag?.active) {
        const holding = hovered || focused || userPaused.current || modalOpen.current || !onScreen || now < resumeAt;
        const goal = holding ? 0 : SPEED;
        const tau = Math.abs(v) > SPEED * 2 ? COAST_TAU : CRUISE_TAU;
        v += (goal - v) * (1 - Math.exp(-dt / tau));
        if (goal === 0 && Math.abs(v) < 0.4) {
          v = 0;
          const dpr = devicePixelRatio || 1;
          x = Math.round(x * dpr) / dpr;
        } else {
          x += v * dt;
        }
      }
      strip.style.transform = `translate3d(${-mod(x, loopWidth())}px,0,0)`;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      view.removeEventListener('pointerdown', onPointerDown);
      view.removeEventListener('pointermove', onPointerMove);
      view.removeEventListener('pointerup', endDrag);
      view.removeEventListener('pointercancel', endDrag);
      view.removeEventListener('click', onClickCapture, true);
      view.removeEventListener('click', onClick);
      view.removeEventListener('wheel', onWheel);
      view.removeEventListener('keydown', onKeyDown);
      view.removeEventListener('focusin', onFocusIn);
      view.removeEventListener('focusout', onFocusOut);
      view.removeEventListener('pointerenter', onEnter);
      view.removeEventListener('pointerleave', onLeave);
      view.removeEventListener('dragstart', onDragStart);
    };
  }, []);

  function togglePause() {
    userPaused.current = !userPaused.current;
    setPaused(userPaused.current);
  }

  return <section id="proyectos" className="section section-anchor"><div className="wrap" ref={gutter}>
    <Reveal><div className="sec-head carousel-head">
      <div>
        <p className="prompt mono">proyectos</p>
        <h2 className="sec-title">Proyectos con<br /><em>identidad propia.</em></h2>
        <p className="sec-lead">Del primer boceto a una aplicación que puedes utilizar. Estos son algunos de los problemas que me gusta resolver.</p>
      </div>
      <div className="car-controls" role="group" aria-label="Controles del carrusel">
        <button type="button" className="icon-btn" onClick={() => controls.current.step(-1)} aria-label="Proyecto anterior"><ChevronLeft size={18} /></button>
        <button type="button" className="icon-btn" onClick={togglePause} aria-pressed={paused} aria-label={paused ? 'Reanudar movimiento automático' : 'Pausar movimiento automático'}>{paused ? <Play size={16} /> : <Pause size={16} />}</button>
        <button type="button" className="icon-btn" onClick={() => controls.current.step(1)} aria-label="Proyecto siguiente"><ChevronRight size={18} /></button>
      </div>
    </div></Reveal>
  </div>
    <div className="car-stage">
      <div ref={viewport} className="car-viewport" role="region" aria-roledescription="carrusel" aria-label="Proyectos (arrastra o usa las flechas del teclado)" tabIndex={0}>
        <div ref={track} className="car-track">
          {Array.from({ length: COPIES }, (_, copy) => {
            const hidden = copy !== 0;
            return <div key={copy} className="car-set" aria-hidden={hidden || undefined}>{projects.map(project => <ProjectCard key={project.id} project={project} hidden={hidden} />)}</div>;
          })}
        </div>
      </div>
      <div className="car-edge car-edge-left" aria-hidden="true" />
      <div className="car-edge car-edge-right" aria-hidden="true" />
    </div>
    <div className="wrap">
      <div className="proj-cta">
        <p>¿Te interesa lo que hago? Cuéntame qué necesitas.</p>
        <div className="proj-cta-actions">
          <a className="btn btn-primary" href={socials.email}>Contactar <ArrowUpRight size={15} /></a>
          <a className="btn" href={socials.github} target="_blank" rel="noopener noreferrer">Ver más en GitHub <ArrowUpRight size={14} /></a>
        </div>
      </div>
    </div>
    {selected && <ProjectModal project={selected} onClosed={closeProject} />}
  </section>;
}
