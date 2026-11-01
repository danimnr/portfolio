import { renderToString } from 'react-dom/server';
import App from './App';
import { projects, socials } from './data/site';

export function renderApp(): string {
  return renderToString(<App />);
}

/** Structured data for search engines. `siteUrl` has no trailing slash and may be empty when the domain is not decided yet. */
export function buildJsonLd(siteUrl: string) {
  const person = {
    '@type': 'Person',
    '@id': `${siteUrl}/#persona`,
    name: 'Daniel Agud Sorli',
    givenName: 'Daniel',
    familyName: 'Agud Sorli',
    alternateName: ['Dani Agud Sorli', 'Daniel Agud', 'Dani Agud', 'Agud Sorli', 'Daniel Monroyo', 'Dani Monroyo', 'danimnr'],
    jobTitle: 'Desarrollador de software',
    description: 'Desarrollador de software y estudiante de Ingeniería Informática en la Universidad de Zaragoza. Fundador de D.A.S. Interactive Software.',
    address: { '@type': 'PostalAddress', addressLocality: 'Zaragoza', addressCountry: 'ES' },
    alumniOf: { '@type': 'CollegeOrUniversity', name: 'Universidad de Zaragoza' },
    worksFor: { '@type': 'Organization', name: 'D.A.S. Interactive Software' },
    knowsAbout: ['Rust', 'C++', 'TypeScript', 'React', 'Flutter', 'Kotlin', 'Tauri', 'Electron', 'PostgreSQL', 'Firebase'],
    sameAs: [socials.github, socials.kofi],
    ...(siteUrl ? { url: `${siteUrl}/`, image: `${siteUrl}/og-image.png` } : {}),
  };

  const apps = projects
    .filter(project => project.id === 'atenea' || project.id === 'hercules')
    .map(project => ({
      '@type': 'SoftwareApplication',
      name: project.name,
      description: project.description,
      applicationCategory: project.id === 'atenea' ? 'ProductivityApplication' : 'UtilitiesApplication',
      operatingSystem: project.platformLabel.replace(/ · /g, ', '),
      image: siteUrl ? `${siteUrl}${project.logo}` : undefined,
      url: project.links.find(link => link.kind === 'web' || link.kind === 'github')?.href,
      author: { '@id': `${siteUrl}/#persona` },
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
    }));

  return { '@context': 'https://schema.org', '@graph': [person, ...apps] };
}
