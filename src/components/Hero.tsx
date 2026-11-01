import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowDownRight, ArrowUpRight, Github, Mail } from 'lucide-react';
import { projects, socials } from '../data/site';

const roles = ['Software Engineer', 'Product Builder', 'Systems Enthusiast'];
const languages = ['Rust', 'C++', 'TypeScript', 'Dart', 'Kotlin'];

function Typed({ text, reduce }: { text: string; reduce: boolean | null }) {
  const [count, setCount] = useState(reduce ? text.length : 0);
  useEffect(() => {
    if (reduce) { setCount(text.length); return; }
    const timer = setInterval(() => setCount(value => {
      if (value >= text.length) { clearInterval(timer); return value; }
      return value + 1;
    }), 70);
    return () => clearInterval(timer);
  }, [text, reduce]);
  return <><span className="sr-only">{text}</span><span aria-hidden="true">{text.slice(0, count)}</span></>;
}

const info: [string, string][] = [
  ['nombre', 'Daniel Agud Sorli'],
  ['alias', 'danimnr'],
  ['ubicación', 'Zaragoza, España'],
  ['estudios', '3.º Ing. Informática · Unizar'],
  ['empresa', 'D.A.S. Interactive Software'],
  ['lenguajes', languages.join(', ')],
  ['proyectos', String(projects.length)],
  ['lema', 'De la idea a la tienda'],
];

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return;
    const interval = setInterval(() => setRoleIndex(index => (index + 1) % roles.length), 3200);
    return () => clearInterval(interval);
  }, [reduce]);

  return <section id="inicio" className="hero section-anchor">
    <div className="wrap hero-layout">
      <div>
        <p className="prompt mono anim-enter" style={{ animationDelay: '40ms' }}><Typed text="whoami" reduce={reduce} /></p>
        <p className="whoami-out anim-enter" style={{ animationDelay: '600ms' }}>Daniel Agud Sorli · Desarrollador de software · Zaragoza</p>
        <h1 className="hero-title anim-enter" style={{ animationDelay: '700ms' }}>Ideas que se convierten en <span className="hl">producto</span>.<span className="caret" aria-hidden="true" /></h1>
        <p className="hero-intro anim-enter" style={{ animationDelay: '820ms' }}>Del bajo nivel con <strong>Rust y C++</strong> a experiencias cuidadas con <strong>React y Flutter</strong>. Diseño, desarrollo y publico productos de principio a fin.</p>
        <div className="roles anim-enter" style={{ animationDelay: '900ms' }}>
          <span className="gt">&gt;</span>
          <div className="role-viewport"><AnimatePresence mode="wait" initial={false}><motion.span key={roleIndex} initial={{ opacity: 0, y: reduce ? 0 : 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduce ? 0 : -10 }} transition={{ duration: reduce ? .01 : .2 }}>{roles[roleIndex]}</motion.span></AnimatePresence></div>
        </div>
        <div className="hero-ctas anim-enter" style={{ animationDelay: '980ms' }}>
          <a href={socials.email} className="btn btn-primary btn-lg"><Mail size={17} /> Contactar</a>
          <a href="#proyectos" className="btn btn-lg">Ver proyectos <ArrowDownRight size={16} /></a>
          <a href={socials.github} target="_blank" rel="noopener noreferrer" className="btn btn-lg"><Github size={16} /> GitHub <ArrowUpRight size={13} /></a>
        </div>
        <p className="hero-mail anim-enter" style={{ animationDelay: '1040ms' }}>o escríbeme a <a href={socials.email}>{socials.email.replace('mailto:', '')}</a></p>
      </div>
      <div className="term sysinfo anim-enter" style={{ animationDelay: '500ms' }} role="group" aria-label="Resumen de perfil">
        <div className="term-bar"><span className="term-dots" aria-hidden="true"><i /><i /><i /></span><span className="term-title">danimnr@das: ~</span></div>
        <div className="term-body">
          <div className="sysinfo-head"><b>danimnr</b>@das</div>
          <div className="sysinfo-rule" aria-hidden="true">────────────────────────────</div>
          <dl style={{ margin: 0 }}>
            {info.map(([key, value]) => <div className="kv-row" key={key}><dt>{key}</dt><dd>{value}</dd></div>)}
          </dl>
          <div className="swatches" aria-hidden="true"><i /><i /><i /><i /><i /><i /></div>
        </div>
      </div>
    </div>
  </section>;
}
