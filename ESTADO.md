# Estado del portfolio (1 nov 2026)

Repositorio: <https://github.com/danimnr/portfolio> · Stack: React 19, TypeScript, Vite 6, Tailwind v4, Motion.

## Hecho

**Diseño**
- Rediseño completo con estética terminal/developer: fuente monoespaciada, un solo acento verde, ficha tipo `neofetch` en el hero y sección de contacto con "Hablemos".
- Tema claro/oscuro que **sigue el del dispositivo** (también en vivo) hasta que el usuario lo cambia a mano; esa elección se guarda. Animación circular con View Transitions y alternativa sin ella.
- Enfocado a contratación: botón "Contactar" siempre visible (cabecera, hero, tras el carrusel y en contacto), email visible y botón de copiar dirección.

**Proyectos**
- Carrusel horizontal en bucle con física propia (`transform`): acelera y frena con suavidad, se pausa al pasar el ratón, al enfocar o con un botón de pausa, se arrastra con inercia (ratón y táctil), admite rueda horizontal y flechas del teclado. Bordes con desenfoque progresivo.
- Clic en un proyecto abre un pop-up con glassmorfismo (`<dialog>` nativo): descripción larga, qué hace, detalles técnicos, tecnologías, ficha y enlaces.
- Logos reales: Atenea, Nubemita y FotoFlix de `C:\proyectos`; Hércules de su repositorio público.
- Enlaces verificados: Atenea (Google Play, atenea.sbs, instaladores de Windows y Linux) y Hércules (repositorio). Nubemita y FotoFlix no tienen enlaces públicos y el pop-up lo dice.
- Nubemita descrita como alternativa a YouTube y Spotify sin anuncios, con los puntos técnicos que muestran habilidades.

**SEO** (sin dominio todavía)
- Prerender del HTML en el build, para que el contenido se lea sin JavaScript.
- `h1` con el nombre completo, título y descripción con Atenea y Nubemita, Open Graph y Twitter, imagen para compartir (`public/og-image.png`), `robots.txt`.
- JSON-LD: `Person` con `alternateName` (Dani Agud, Daniel Agud, Agud Sorli, Daniel/Dani Monroyo, danimnr…) y `SoftwareApplication` para Atenea y Hércules.
- `SITE_URL` opcional en el build: añade canonical, `og:url`, imágenes absolutas, `sitemap.xml` y la línea `Sitemap`.

**Comprobado**: build, tema, carrusel (movimiento, frenado, arrastre, clics), pop-up (Esc, X, clic fuera, teclado), móvil de 390 px sin desbordamiento, HTML prerenderizado y consola sin errores.

## Pendiente

**Para publicar**
- [ ] Elegir dominio y alojamiento (Cloudflare Pages, Netlify o Vercel). Decidir el dominio **antes** de indexar: cambiarlo después exige redirecciones.
- [ ] Compilar con `SITE_URL=https://tu-dominio npm run build` (ver README, sección SEO).
- [ ] Verificar el sitio en Google Search Console y Bing Webmaster y enviar `sitemap.xml`.
- [ ] Enlazar el portfolio desde GitHub (perfil y repos), Ko-fi, atenea.sbs y la ficha de Google Play.

**Contenido a confirmar contigo**
- [ ] **Ko-fi:** la web enlaza a `ko-fi.com/danimnr`, pero la ficha de Google Play y el README de Hércules citan `ko-fi.com/danidev_mnr`. Comprobar cuál es la correcta y corregir `socials.kofi` en `src/data/site.ts`.
- [ ] ¿Eres natural de Monroyo? Si sí, añadir una frase visible ("natural de Monroyo, Teruel") para las búsquedas "Daniel/Dani Monroyo". Ahora solo está en los datos estructurados.
- [ ] Revisar los textos de FotoFlix: se redactaron a partir del documento de especificación y no sé hasta dónde llega lo ya implementado.
- [ ] Nubemita: el README advierte de que no se puede garantizar la ausencia de publicidad en todos los contenidos; tenerlo presente si se afirma "sin anuncios".
- [ ] CV: si quieres botón de descarga, añadir `public/cv-daniel-agud.pdf` y el enlace en `Hero.tsx`.
- [ ] Texto de disponibilidad laboral (por ejemplo "abierto a ofertas"), solo si quieres mostrarlo.
- [ ] Enlaces nuevos en `links` de `src/data/site.ts` cuando Nubemita o FotoFlix tengan algo público.

**Calidad**
- [ ] Probar en Firefox y Safari (sobre todo el desenfoque de bordes y del pop-up) y en un móvil real.
- [ ] Auditoría de accesibilidad con lector de pantalla y Lighthouse (rendimiento, SEO, contraste).
- [ ] Iconos PNG (apple-touch-icon) además del `favicon.svg`.
- [ ] Capturas reales de las apps para el pop-up, cuando las tengas.
- [ ] Pruebas automáticas de las interacciones principales (hoy solo hay comprobaciones manuales).
- [ ] Opcional: versión en inglés.
