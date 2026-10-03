import { useRef } from "react";
import type { MouseEvent } from "react";
import { paquetes, WHATSAPP } from "./data";

const wa = (texto: string) =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`;
const mxn = (n: number) => `$${n.toLocaleString("es-MX")}`;

const AMPLIACION = 0.05; // la tarjeta bajo el cursor crece hasta un 5%

export default function Paquetes() {
  const rejilla = useRef<HTMLDivElement>(null);

  // Magnificación: cada tarjeta crece según qué tan cerca está el cursor de su centro
  const ampliar = (e: MouseEvent) => {
    const contenedor = rejilla.current;
    if (!contenedor) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;
    const tarjetas = Array.from(contenedor.querySelectorAll<HTMLElement>(".tier"));
    const enFila = tarjetas.length < 2 || tarjetas[0].offsetTop === tarjetas[1].offsetTop;
    tarjetas.forEach((t) => {
      const r = t.getBoundingClientRect();
      const distancia = enFila
        ? Math.abs(e.clientX - (r.left + r.width / 2))
        : Math.abs(e.clientY - (r.top + r.height / 2));
      const alcance = (enFila ? r.width : r.height) * 1.1;
      const x = Math.max(0, 1 - distancia / alcance);
      const k = x * x * (3 - 2 * x);
      t.style.setProperty("--escala", String(1 + AMPLIACION * k));
      t.style.zIndex = String(Math.round(k * 10));
    });
  };

  const restablecer = () => {
    rejilla.current?.querySelectorAll<HTMLElement>(".tier").forEach((t) => {
      t.style.removeProperty("--escala");
      t.style.removeProperty("z-index");
    });
  };

  return (
    <section className="paquetes" id="paquetes">
      <h2>Elige lo que va con tu negocio</h2>
      <p className="lead">
        Tres opciones según tu presupuesto y lo que necesitas. Con cualquiera
        tienes una página hecha a tu medida y lista para trabajar por tu negocio.
      </p>

      <div className="paquetes-grid" ref={rejilla} onMouseMove={ampliar} onMouseLeave={restablecer}>
        {paquetes.map((p) => (
          <article
            key={p.id}
            id={`paquete-${p.id}`}
            className={`tier tier-${p.id}`}
          >
            <p className="pq">Paquete</p>
            <h3>{p.nombre}</h3>
            <p className="gancho">{p.gancho}</p>
            <p className="price">{mxn(p.precio)}</p>
            <p className="monthly">+ {mxn(p.mensualidad)} al mes de mantenimiento</p>
            <p className="ideal">{p.ideal}</p>
            <ul className="destacados">
              {p.destacados.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
            <details>
              <summary>Ver todo lo que incluye</summary>
              <ul>
                {p.incluye.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
              {p.extras && (
                <>
                  <p className="extras-title">Y además:</p>
                  <ul>
                    {p.extras.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                </>
              )}
            </details>
            <a className="btn btn-tier" href={wa(`Hola, me interesa el paquete "${p.nombre}".`)}>
              Quiero este paquete
            </a>
            <p className="garantia">Ves tu página antes de publicarla · 1 mes de garantía</p>
          </article>
        ))}
      </div>

      <p className="note">
        La mensualidad cubre hosting, respaldos, soporte y ajustes pequeños.
        Cambios de formato, funciones nuevas o muchos colores después de la entrega se cotizan aparte.
      </p>
    </section>
  );
}
