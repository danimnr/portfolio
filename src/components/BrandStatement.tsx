import { ArrowUpRight } from 'lucide-react';
import { Reveal } from './Reveal';

const values = [
  { title: 'Privacidad por diseño', desc: 'Los datos son del usuario, nunca el producto.' },
  { title: 'Rendimiento real', desc: 'La velocidad no es un extra. Es parte del diseño.' },
  { title: 'De extremo a extremo', desc: 'De la arquitectura a la última interacción.' },
];

export function BrandStatement() {
  return <section id="filosofia" className="section section-anchor">
    <div className="wrap">
      <Reveal><div className="sec-head">
        <p className="prompt mono">sobre mí</p>
        <h2 className="sec-title">No solo escribo código.<br /><em>Creo productos propios.</em></h2>
      </div></Reveal>
      <div className="manifest">
        <Reveal delay={80}><div>
          <span className="brand-line">D.A.S. <small>Interactive Software</small></span>
          <p className="manifest-lead">Soy <strong>Daniel Agud Sorli</strong> (Dani Agud), estudiante de Ingeniería Informática en la Universidad de Zaragoza. Fundé <strong>D.A.S. Interactive Software</strong> con una idea sencilla: crear software autónomo, rápido y realmente útil, como <strong>Atenea</strong>, <strong>Nubemita</strong>, <strong>Hércules</strong> y <strong>FotoFlix</strong>. Sin complejidad innecesaria, sin comprometer la privacidad y sin suscripciones abusivas.</p>
          <a className="text-link" href="#proyectos">ver lo que estoy construyendo <ArrowUpRight size={16} /></a>
        </div></Reveal>
        <ul className="values">{values.map((value, index) => <li key={value.title}><Reveal delay={index * 80}><div className="value"><span className="value-idx">0{index + 1}</span><div><h3>{value.title}</h3><p>{value.desc}</p></div></div></Reveal></li>)}</ul>
      </div>
    </div>
  </section>;
}
