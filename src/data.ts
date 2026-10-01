// Número en formato internacional, sin + ni espacios: 52 (México) + 10 dígitos
export const WHATSAPP = "525616288303";

export const INSTAGRAM_URL = "https://www.instagram.com/tomateweb.mx/";
export const INSTAGRAM_USUARIO = "@tomateweb.mx";

export type Paquete = {
  id: 1 | 2 | 3;
  nombre: string;
  gancho: string; // frase corta que engancha
  ideal: string; // para quién es
  destacados: string[]; // resumen en palabras clave
  precio: number;
  mensualidad: number;
  incluye: string[]; // lo que lleva el paquete (en 2 y 3 empieza con lo del paquete 1)
  extras?: string[]; // lo que lo diferencia, se muestra al final
};

const base = (n: number) => [
  "Sitio web de 1 página con varias secciones, personalizado a tus necesidades dentro del alcance del paquete",
  `Hasta ${n} funciones a medida para tu negocio`,
  "Contacto directo a WhatsApp",
  "Diseño de un logo sencillo para tu marca",
  "Sistemas funcionales",
  "Garantía de 1 mes: correcciones menores después de publicar tu sitio",
];

const panel = [
  "Panel de control para editar tú mismo textos y fotos, tu menú o catálogo (hasta 50 productos) y tus pedidos o inventario",
  "Guía en PDF para aprender a usarlo",
];

const nfc = [
  "50 estampas NFC (stickers adhesivos lisos) programadas para abrir tu página principal al acercar el celular",
  "Pégalas en tu local, empaques o tarjetas y llega a clientes fuera de redes sociales",
];

export const paquetes: Paquete[] = [
  {
    id: 1,
    nombre: "Pa' que te organices",
    gancho: "Tu negocio en línea, bien presentado.",
    ideal: "Ideal para arrancar con presencia en internet.",
    destacados: ["Página hecha a tu medida", "Hasta 2 funciones a medida", "Logo sencillo incluido", "WhatsApp directo", "1 mes de garantía"],
    precio: 800,
    mensualidad: 100,
    incluye: base(2),
  },
  {
    id: 2,
    nombre: "Pa' que lo controles",
    gancho: "Tú mandas en tu menú y tus pedidos.",
    ideal: "Ideal si tu menú o catálogo cambia seguido.",
    destacados: ["Lo esencial: página, logo y WhatsApp", "Hasta 4 funciones a medida", "Panel para editar tu menú o catálogo", "Hasta 50 productos", "Pedidos e inventario", "Guía en PDF"],
    precio: 1200,
    mensualidad: 150,
    incluye: base(4),
    extras: panel,
  },
  {
    id: 3,
    nombre: "Pa' que mejoren las ventas",
    gancho: "Que te encuentren hasta fuera de internet.",
    ideal: "Ideal si tienes local o empaques y quieres llegar a más gente.",
    destacados: ["Lo esencial y el panel de control incluidos", "Hasta 6 funciones a medida", "50 estampas NFC", "Un toque y tu sitio se abre en el celular", "Llegas más allá de las redes sociales"],
    precio: 1500,
    mensualidad: 150,
    incluye: [...base(6), ...panel],
    extras: nfc,
  },
];

export type Proyecto = { nombre: string; descripcion: string; url: string };

export const proyectos: Proyecto[] = [
  { nombre: "Charolas Locas", descripcion: "menú y pedidos por WhatsApp", url: "https://charolas-locas.vercel.app/" },
  { nombre: "Dalto Piercing", descripcion: "joyería y perforaciones con menu interactivo", url: "https://dalto-piercer-green.vercel.app/" },
];
