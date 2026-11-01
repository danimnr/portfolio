// Inserta el HTML renderizado de la app y las etiquetas SEO en dist/index.html.
// SITE_URL (p. ej. https://danimnr.dev) activa canonical, og:url, imágenes absolutas, sitemap.xml y la línea Sitemap de robots.txt.
import { readFileSync, writeFileSync, rmSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const siteUrl = (process.env.SITE_URL ?? '').trim().replace(/\/+$/, '');
if (siteUrl && !/^https?:\/\/[^\s/]+$/.test(siteUrl)) throw new Error(`SITE_URL no válida: "${siteUrl}" (esperado: https://dominio.tld)`);

const { renderApp, buildJsonLd } = await import(pathToFileURL(resolve(root, 'dist-ssr/entry-server.js')).href);

const jsonLd = JSON.stringify(buildJsonLd(siteUrl)).replace(/</g, '\\u003c');
const head = [
  ...(siteUrl ? [
    `<link rel="canonical" href="${siteUrl}/" />`,
    `<meta property="og:url" content="${siteUrl}/" />`,
    `<meta property="og:image" content="${siteUrl}/og-image.png" />`,
    '<meta property="og:image:width" content="1200" />',
    '<meta property="og:image:height" content="630" />',
    `<meta name="twitter:image" content="${siteUrl}/og-image.png" />`,
  ] : []),
  `<script type="application/ld+json">${jsonLd}</script>`,
].join('\n    ');

const indexPath = resolve(root, 'dist/index.html');
let html = readFileSync(indexPath, 'utf8');
for (const marker of ['<!--app-html-->', '<!--seo-head-->']) if (!html.includes(marker)) throw new Error(`Falta el marcador ${marker} en dist/index.html`);
html = html.replace('<!--app-html-->', () => renderApp()).replace('<!--seo-head-->', () => head);
writeFileSync(indexPath, html);

const robots = ['User-agent: *', 'Allow: /', ...(siteUrl ? ['', `Sitemap: ${siteUrl}/sitemap.xml`] : [])].join('\n') + '\n';
writeFileSync(resolve(root, 'dist/robots.txt'), robots);
if (siteUrl) {
  const today = new Date().toISOString().slice(0, 10);
  writeFileSync(resolve(root, 'dist/sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${siteUrl}/</loc><lastmod>${today}</lastmod></url>\n</urlset>\n`);
}

rmSync(resolve(root, 'dist-ssr'), { recursive: true, force: true });
console.log(`Prerender listo (${siteUrl || 'sin SITE_URL: sin canonical ni sitemap'}).`);
