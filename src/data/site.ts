export const socials = {
  github: 'https://github.com/danimnr',
  kofi: 'https://ko-fi.com/danimnr',
  email: 'mailto:dasinteractivesoftware@gmail.com',
  atenea: 'https://atenea.sbs',
} as const;

export type ProjectArea = 'desktop' | 'mobile' | 'web';
export type ProjectId = 'atenea' | 'hercules' | 'nubemita' | 'fotoflix';
export type LinkKind = 'play' | 'web' | 'github' | 'download';

export interface ProjectLink {
  kind: LinkKind;
  label: string;
  note: string;
  href: string;
}

export interface Project {
  id: ProjectId;
  index: string;
  logo: string;
  name: string;
  subtitle: string;
  /** Short description shown on the carousel card. */
  description: string;
  highlight: string;
  category: ProjectArea[];
  stack: string[];
  /** Short points shown on the carousel card. */
  bullets: string[];
  platformLabel: string;
  status: string;
  /** Long description shown in the project dialog. */
  overview: string;
  features: string[];
  technical: string[];
  /** Only real, verified URLs. When empty, `noLinksNote` explains why. */
  links: ProjectLink[];
  noLinksNote?: string;
}

export const projects: Project[] = [
  {
    id: 'atenea', index: '01', name: 'Atenea', subtitle: 'Tu tiempo, bajo tu control.',
    logo: '/projects/atenea.png',
    description: 'Agenda y calendario de tareas local-first. Sin registro obligatorio, sin anuncios y con una experiencia igual de cuidada en móvil y escritorio.',
    highlight: 'Producto insignia · D.A.S. Interactive Software',
    category: ['mobile', 'desktop', 'web'],
    stack: ['Flutter', 'React', 'Tauri', 'Firebase', 'Rust'],
    bullets: ['Sincronización opcional en tiempo real con Firestore.', 'Widgets Android y calendario Google en solo lectura.', 'Importación y exportación de calendarios .ics.'],
    platformLabel: 'Android · Windows · Linux · Web', status: 'En producción',
    overview: 'Atenea es mi agenda personal convertida en producto: abres la app y empiezas, sin registrarte ni configurar nada. Funciona sin conexión y sin cuenta, con los datos en tu dispositivo. Si quieres, inicias sesión con Google y tus tareas son las mismas en el móvil, el ordenador y el navegador. La desarrolla y mantiene una sola persona, de la interfaz a la publicación.',
    features: [
      'Tareas con fecha, hora de inicio y fin, descripción y prioridad por colores.',
      'Tres vistas del mes (clásica, compacta y continua) con festivos nacionales de España.',
      'Notas de texto o con casillas, con color, fijadas o privadas.',
      'Widgets de Android: el mes completo y las tareas de hoy.',
      'Google Calendar en solo lectura: Atenea nunca modifica tus calendarios.',
      'Importación y exportación de calendarios .ics sin duplicados.',
    ],
    technical: [
      'App móvil en Flutter, escritorio con Tauri y Rust, y versión web en React.',
      'Local-first: todo funciona sin conexión; Firestore solo interviene en la sincronización opcional, con reglas de acceso por usuario.',
      'Instaladores para Windows (.exe) y Linux (.deb, .rpm y AppImage) con actualización automática.',
      'Sin anuncios y sin venta de datos; la cuenta se puede borrar cuando quieras.',
    ],
    links: [
      { kind: 'play', label: 'Google Play', note: 'Descargar para Android', href: 'https://play.google.com/store/apps/details?id=com.danidev.atenea_mobile' },
      { kind: 'web', label: 'Web oficial', note: 'atenea.sbs · versión web', href: socials.atenea },
      { kind: 'download', label: 'Windows y Linux', note: 'Instaladores en GitHub', href: 'https://github.com/danimnr/atenea-release/releases/latest' },
    ],
  },
  {
    id: 'hercules', index: '02', name: 'Hércules', subtitle: 'Potencia, sin ruido.',
    logo: '/projects/hercules.svg',
    description: 'Monitor del sistema y gestor de procesos con telemetría en tiempo real, herramientas de limpieza y una interfaz nativa translúcida.',
    highlight: 'Ingeniería de sistemas',
    category: ['desktop'],
    stack: ['Tauri v2', 'Rust', 'React', 'TypeScript'],
    bullets: ['Monitorización de CPU por núcleo, RAM, red y disco cada 2 segundos.', 'Gestión y finalización de procesos.', 'Diseño ligero con modo claro y oscuro.'],
    platformLabel: 'Windows · Linux · macOS', status: 'Código abierto',
    overview: 'Hércules es una aplicación de escritorio ligera para monitorizar y optimizar tu sistema, pensada para ser útil y bonita sin consumir los recursos que viene a vigilar. Detecta el sistema operativo y adapta su comportamiento en Windows, Linux y macOS.',
    features: [
      'Panel en tiempo real: CPU por núcleo, RAM, disco y red, actualizados cada 2 segundos.',
      'Lista de procesos ordenable y filtrable, con opción de terminar procesos.',
      'Acciones del sistema: limpieza de temporales y liberación de caché y RAM.',
      'Ventana translúcida con desenfoque, modo claro y oscuro, color de acento y transparencia ajustables.',
    ],
    technical: [
      'Backend en Rust con la biblioteca sysinfo; empaquetado con Tauri v2.',
      'Frontend en React y TypeScript con Zustand, React Router y CSS propio.',
      'Un mismo código para tres sistemas, con instaladores nativos (.msi, .deb, .AppImage, .dmg).',
      'Código abierto con licencia MIT.',
    ],
    links: [
      { kind: 'github', label: 'Repositorio', note: 'Código en GitHub', href: 'https://github.com/danimnr/hercules' },
    ],
  },
  {
    id: 'nubemita', index: '03', name: 'Nubemita', subtitle: 'YouTube y Spotify, sin anuncios.',
    logo: '/projects/nubemita.png',
    description: 'Reproductor de escritorio y Android para el contenido público de YouTube, sin anuncios ni cuenta: vídeos al estilo YouTube y música y podcasts al estilo Spotify, con tus listas e historial guardados en tu equipo.',
    highlight: 'Alternativa a YouTube y Spotify',
    category: ['desktop', 'mobile'],
    stack: ['Electron', 'React', 'Deno', 'Capacitor', 'Kotlin', 'Media3'],
    bullets: ['Búsqueda y canales leídos de páginas públicas, con yt-dlp solo como respaldo.', 'Música y podcasts solo audio, con letra sincronizada y precarga en memoria.', 'Instaladores MSI y DEB autocontenidos, con herramientas verificadas por SHA-256.', 'Android nativo con Media3 y MediaSessionService sobre Capacitor y Kotlin.'],
    platformLabel: 'Windows · Linux · Android', status: 'En desarrollo',
    overview: 'Nubemita reúne en una sola app lo que más se usa de YouTube y de Spotify, sin anuncios y sin necesidad de cuenta. Vídeos, música y podcasts se exploran y se reproducen del contenido público de YouTube, y todo lo tuyo (listas, favoritos, canales seguidos e historial) se queda únicamente en tu equipo. Escritorio y Android son dos proyectos independientes, ambos en desarrollo.',
    features: [
      'Vídeos al estilo YouTube: búsqueda, canales, listas públicas y calidad de hasta 1080p (1440p y 4K cuando existen).',
      'Música y podcasts al estilo Spotify: bibliotecas de artistas, reproducción solo de audio y letra sincronizada cuando el origen la ofrece.',
      'Listas, «Me gusta», canales seguidos e historial, guardados solo en tu equipo y sin sincronización.',
      'Canciones casi instantáneas gracias a la precarga de las pistas siguientes en memoria.',
    ],
    technical: [
      'Escritorio en Electron, React y TypeScript; búsqueda y canales leídos del JSON de las páginas públicas, con yt-dlp solo como respaldo.',
      'Proxy local de streaming MP4/HLS y políticas de reproducción para audio y vídeo.',
      'Instaladores MSI (Windows) y DEB (Linux) autocontenidos: incluyen Electron, yt-dlp y Deno, verificados con SHA-256.',
      'Android: Capacitor, Kotlin y Media3 con MediaSessionService para reproducción nativa, más pruebas JVM y pruebas locales sin conexión.',
    ],
    links: [],
    noLinksNote: 'Los repositorios son privados y por ahora la distribución es de prueba. Si quieres verlo funcionando o hablar del código, escríbeme.',
  },
  {
    id: 'fotoflix', index: '04', name: 'FotoFlix', subtitle: 'Historias que permanecen.',
    logo: '/projects/fotoflix.png',
    description: 'Archivo fotográfico histórico colaborativo para municipios, con aislamiento multi-tenant y una experiencia visual accesible.',
    highlight: 'Plataforma municipal · Piloto Monroyo',
    category: ['web'],
    stack: ['React 19', 'PostgreSQL', 'Hono', 'Tailwind v4'],
    bullets: ['Permisos Scoped RBAC por municipio.', 'Explorador en mosaico y carpetas con visor gestual.', 'Accesibilidad orientada a WCAG AA.'],
    platformLabel: 'Web · Multi-tenant', status: 'En desarrollo',
    overview: 'FotoFlix es una plataforma web para preservar y descubrir la memoria fotográfica de los pueblos. Cada municipio tiene su propio archivo, su identidad visual y su equipo gestor. Cualquiera puede consultar las fotos publicadas sin cuenta; para aportar hace falta iniciar sesión y aceptar las normas. El primer piloto es Monroyo (Teruel), y está diseñada para que la use también gente con poca experiencia digital.',
    features: [
      'Directorio de municipios con búsqueda por nombre y código postal.',
      'Navegación por municipio, año, celebración y fotografías, con galerías visuales en lugar de carpetas técnicas.',
      'Visor de imágenes con zoom, gestos y teclado, y enlaces permanentes para compartir.',
      'Créditos que distinguen al autor, a la entidad acreditada y a quien aporta la foto.',
      'Administración sin tocar código: municipios, gestores, roles y permisos desde la interfaz.',
    ],
    technical: [
      'Aislamiento multi-tenant: los datos, permisos y configuración de cada municipio están separados.',
      'Motor de permisos granular (RBAC con alcance por municipio) con roles personalizables y verificación siempre en el servidor.',
      'React 19 y Tailwind v4 en el cliente; Hono y PostgreSQL en el servidor.',
      'Accesibilidad orientada a WCAG AA y diseño pensado para móvil y para personas mayores.',
    ],
    links: [],
    noLinksNote: 'Todavía no tiene una dirección pública. Si quieres ver cómo funciona o hablar de la arquitectura, escríbeme.',
  },
];

export const skills = [
  { id: 'systems', number: '01', label: 'Sistemas & Desktop', description: 'Rendimiento, recursos y aplicaciones que se integran de verdad con el sistema.', items: ['Rust', 'Tauri', 'C++', 'C', 'Electron'] },
  { id: 'frontend', number: '02', label: 'Frontend & UX', description: 'Interfaces precisas, rápidas y agradables en cada detalle.', items: ['React 19', 'TypeScript', 'Tailwind CSS', 'Astro', 'Vite'] },
  { id: 'mobile', number: '03', label: 'Mobile', description: 'Productos nativos e híbridos construidos para vivir en el bolsillo.', items: ['Flutter', 'Dart', 'Kotlin', 'Capacitor', 'Android'] },
  { id: 'backend', number: '04', label: 'Backend & Cloud', description: 'Datos, servicios y sistemas listos para crecer sin perder simplicidad.', items: ['PostgreSQL', 'Firebase', 'Hono', 'Java', 'Python'] },
] as const;
