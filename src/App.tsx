import { useTheme } from './hooks/useTheme';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { BrandStatement } from './components/BrandStatement';
import { Projects } from './components/Projects';
import { Expertise } from './components/Expertise';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  const { theme, toggleTheme } = useTheme();

  return <>
    <a className="skip-link" href="#contenido">Saltar al contenido</a>
    <Header theme={theme} onToggleTheme={toggleTheme}/>
    <main id="contenido"><Hero/><BrandStatement/><Projects/><Expertise/><Contact/></main>
    <Footer/>
  </>;
}
