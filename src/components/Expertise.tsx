import { skills } from '../data/site';
import { Reveal } from './Reveal';

export function Expertise() {
  return <section id="stack" className="section section-anchor"><div className="wrap">
    <Reveal><div className="sec-head">
      <p className="prompt mono">stack</p>
      <h2 className="sec-title">Una mentalidad.<br /><em>Muchas herramientas.</em></h2>
      <p className="sec-lead">No me caso con una tecnología. Elijo la que mejor resuelve cada problema, desde el núcleo hasta los últimos píxeles.</p>
    </div></Reveal>
    <div className="skills">{skills.map((skill, index) => <Reveal key={skill.id} delay={index * 60}><div className="skill"><span className="skill-no">[{skill.number}]</span><h3>{skill.label}</h3><p>{skill.description}</p><ul>{skill.items.map(item => <li key={item}>{item}</li>)}</ul></div></Reveal>)}</div>
    <Reveal><div className="edu"><span className="gt">&gt;</span><span>ahora mismo:</span><strong>3.º de Ingeniería Informática · Ingeniería del Software</strong><span className="school">Universidad de Zaragoza</span></div></Reveal>
  </div></section>;
}
