# danimnr — Portfolio interactivo

Portfolio personal de Daniel Agud Sorli. React 19, TypeScript, Vite, Tailwind CSS v4, Lucide y Motion.

## Ejecutar

Requiere Node.js 20.19+ o 22.12+ (dependiendo de la versión efectiva de Vite).

```bash
npm install
npm run dev
```

Para generar la versión de producción:

```bash
npm run build
npm run preview
```

## Arquitectura

```text
index.html                  # Metadata, fuentes y tema antes de pintar
public/favicon.svg         # Logomark original
src/
  main.tsx                 # React + MotionConfig de accesibilidad
  App.tsx                  # Composición de secciones
  styles.css               # Tailwind v4, tokens oscuro/claro y UI estilo terminal
  data/site.ts             # Perfil, proyectos, enlaces y stack
  hooks/useTheme.ts        # View Transitions circular + fallback
  components/
    Header.tsx             # Barra superior tipo prompt y menú responsive
    Hero.tsx               # Prompt tecleado, roles rotativos y ficha tipo neofetch
    BrandStatement.tsx     # Manifiesto D.A.S.
    Projects.tsx           # Carrusel horizontal: física propia con transform, arrastre con inercia y bordes difuminados
    ProjectModal.tsx       # Pop-up con glassmorfismo (<dialog> nativo) con descripción ampliada y enlaces del proyecto
    Expertise.tsx          # Stack por especialidades
    Contact.tsx            # CTA y enlaces
    Footer.tsx             # Pie de página
    Reveal.tsx             # IntersectionObserver para scroll reveals
```

## Personalización

- Edita `src/data/site.ts` para cambiar textos, tecnologías y enlaces. Cada proyecto tiene `overview`, `features` y `technical` (pop-up) y `links` tipados (`play`, `web`, `github`, `download`). Solo se incluyen URLs verificadas: si un proyecto no tiene ninguna pública, `noLinksNote` lo explica en lugar de inventar un enlace.
- Si tienes CV, sitúalo en `public/cv-daniel-agud.pdf` y añade un enlace con `href="/cv-daniel-agud.pdf"` al hero; **no se incluye un CV ficticio**.
- Personaliza los colores en `src/styles.css` (`:root` y `:root.dark`). El acento es un único verde.
- Los logos de proyecto están en `public/projects/` y se referencian con `logo` en `src/data/site.ts`. Atenea, Nubemita y FotoFlix salen de sus carpetas en `C:\proyectos`; Hércules, de su repositorio público (`src/assets/hercules_logo.svg`). Las tarjetas no incluyen capturas de pantalla.

## Detalles de accesibilidad y movimiento

- El tema sigue `prefers-color-scheme` (también en vivo) hasta que el usuario lo cambia con el botón; esa elección se guarda en `localStorage` (`das-theme`). Cambio con `document.startViewTransition`, animación radial desde el botón y fallback inmediato sin soporte o con movimiento reducido.
- `IntersectionObserver` revela una sola vez cada sección al entrar en el viewport; no requiere observadores permanentes.
- El carrusel de proyectos acelera y frena con suavidad, se pausa al pasar el ratón, enfocar o con el botón de pausa, y se puede arrastrar (ratón y táctil), usar con rueda horizontal y con las flechas del teclado. Con movimiento reducido arranca pausado. Solo una copia del bucle es accesible (`aria-hidden` y enlaces sin tabulación en el resto).
- Estados focus-visible, enlace "saltar al contenido", navegación móvil accesible, enlaces externos protegidos.
- En reducción de movimiento se desactivan los desplazamientos y las animaciones repetitivas.

## Publicar

Genera `dist/` con `npm run build` y súbelo a Cloudflare Pages, Netlify o Vercel como aplicación estática. Este portfolio no necesita backend ni router.
