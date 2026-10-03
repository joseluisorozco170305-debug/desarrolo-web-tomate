import { INSTAGRAM_URL, INSTAGRAM_USUARIO, proyectos, WHATSAPP } from "./data";
import Paquetes from "./Paquetes";
import Eslogan from "./Eslogan";
import Faq from "./Faq";
import Formulario from "./Formulario";

const IconoChat = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.5-4.6A8 8 0 1 1 21 12z" />
  </svg>
);

const IconoInstagram = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const wa = (texto: string) =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`;

export default function App() {
  return (
    <>
      <header className="top">
        <a className="brand" href="#inicio">
          <img src="/logo-tomate.png" alt="Tomate, desarrollo web" />
        </a>
        <a className="btn btn-sky" href={wa("Hola, quiero cotizar una página web.")} aria-label="Cotiza por WhatsApp">
          <IconoChat />
          <span>Cotiza<span className="wa-extra"> por WhatsApp</span></span>
        </a>
      </header>

      <main id="inicio">
        <section className="hero">
          <Eslogan />
          <p>
            Creamos tu página web a tu estilo y a la medida de tu negocio.
            Ayudamos a emprendimientos y negocios locales a llevar mejor
            control de sus menús y catálogos, con precios accesibles para todos.
          </p>
          <a className="btn btn-navy" href="#paquetes">Ver paquetes</a>
        </section>

        <Paquetes />

        <section className="ejemplos" id="portafolio">
          <h2 className="ejemplos-titulo">Algunos ejemplos</h2>
          <ul>
            {proyectos.map((p) => (
              <li key={p.nombre}>
                <a href={p.url} target="_blank" rel="noopener noreferrer">{p.nombre}</a>, {p.descripcion}
              </li>
            ))}
          </ul>
          <div className="ejemplos-cta">
            <p>¿Quieres una página así para tu negocio?</p>
            <a className="btn btn-sky" href="#formulario">Cuéntanos tu idea</a>
          </div>
        </section>

        <section className="proceso">
          <h2>Así trabajamos</h2>
          <ol>
            <li><strong>Nos cuentas tu idea.</strong> Llenas un <a href="#formulario">formulario</a> con lo que necesita tu negocio.</li>
            <li><strong>Diseñamos tu página.</strong> Te la mostramos antes de publicarla.</li>
            <li><strong>Afinas los detalles.</strong> Ajustes pequeños, como el tamaño y la tipografía.</li>
            <li><strong>La publicamos.</strong> Tienes 1 mes de garantía para correcciones menores.</li>
          </ol>
        </section>

        <Faq />

        <Formulario />
      </main>

      <a className="flotante" href={wa("Hola, quiero cotizar una página web.")} aria-label="Escríbenos por WhatsApp">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.5-4.6A8 8 0 1 1 21 12z" />
        </svg>
        <span>Escríbenos</span>
      </a>

      <footer className="foot">
        <img className="foot-logo" src="/logo-tomate-claro.png" alt="Tomate, desarrollo web" />
        <div className="foot-links">
          <a href={wa("Hola, quiero hablar de mi proyecto.")}>Cuéntanos tu proyecto por WhatsApp</a>
          <a className="foot-ig" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram de Tomate">
            <IconoInstagram />
            {INSTAGRAM_USUARIO}
          </a>
        </div>
      </footer>
    </>
  );
}
