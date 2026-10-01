import { FormEvent, useState } from "react";
import { paquetes, WHATSAPP } from "./data";

const mxn = (n: number) => `$${n.toLocaleString("es-MX")}`;

const NECESIDADES = [
  "Menú o catálogo",
  "Pedidos por WhatsApp",
  "Horarios y ubicación",
  "Galería de fotos",
  "Formulario de contacto",
  "Agendar citas",
];

const PASOS = ["Sobre ti", "Tu sitio", "Tu estilo"];

const inicial = {
  nombre: "",
  negocio: "",
  giro: "",
  paquete: "",
  necesidades: [] as string[],
  extra: "",
  estilo: "",
  ejemplos: "",
};

export default function Formulario() {
  const [paso, setPaso] = useState(0);
  const [d, setD] = useState(inicial);
  const [error, setError] = useState("");

  const set = (k: keyof typeof inicial, v: string) => setD({ ...d, [k]: v });
  const alternar = (n: string) =>
    setD({
      ...d,
      necesidades: d.necesidades.includes(n)
        ? d.necesidades.filter((x) => x !== n)
        : [...d.necesidades, n],
    });

  const validar = () => {
    if (paso === 0 && (!d.nombre.trim() || !d.negocio.trim()))
      return "Escribe tu nombre y el nombre de tu negocio.";
    if (paso === 1 && d.necesidades.length === 0 && !d.extra.trim())
      return "Elige al menos una opción o cuéntanos qué necesitas.";
    return "";
  };

  const enviar = (e: FormEvent) => {
    e.preventDefault();
    const msg = validar();
    setError(msg);
    if (msg) return;
    if (paso < PASOS.length - 1) {
      setPaso(paso + 1);
      return;
    }
    const necesita = [...d.necesidades, d.extra.trim()].filter(Boolean).join(", ");
    const texto = [
      "Hola, quiero que me hagan mi página web. Mis datos:",
      `Nombre: ${d.nombre}`,
      `Negocio: ${d.negocio}`,
      `Tipo de negocio: ${d.giro || "-"}`,
      `Paquete: ${d.paquete || "Aún no lo sé"}`,
      `Lo que necesita mi sitio: ${necesita}`,
      `Colores o estilo que me gustan: ${d.estilo || "-"}`,
      `Páginas de ejemplo: ${d.ejemplos || "-"}`,
    ].join("\n");
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`, "_blank");
  };

  const opcionesPaquete = [
    ...paquetes.map((p) => ({
      valor: p.nombre,
      detalle: `${mxn(p.precio)} + ${mxn(p.mensualidad)} al mes`,
    })),
    { valor: "", detalle: "Te ayudamos a elegir" },
  ];

  return (
    <section className="formulario" id="formulario">
      <h2>Cuéntanos tu idea</h2>
      <p className="lead">
        Llena esto y se envía por WhatsApp. Con tus respuestas diseñamos tu página y te la mostramos antes de publicarla.
      </p>

      <div className="cuerpo">
        <p className="paso-texto">
          Paso {paso + 1} de {PASOS.length}: {PASOS[paso]}
        </p>
        <div
          className="progreso"
          role="progressbar"
          aria-label="Progreso del formulario"
          aria-valuemin={1}
          aria-valuemax={PASOS.length}
          aria-valuenow={paso + 1}
        >
          <span style={{ width: `${((paso + 1) / PASOS.length) * 100}%` }} />
        </div>

        <form onSubmit={enviar} noValidate>
          {paso === 0 && (
            <>
              <label>
                Tu nombre
                <input type="text" autoComplete="name" value={d.nombre} onChange={(e) => set("nombre", e.target.value)} />
              </label>
              <label>
                Nombre de tu negocio
                <input type="text" value={d.negocio} onChange={(e) => set("negocio", e.target.value)} />
              </label>
              <label>
                A qué se dedica tu negocio
                <input type="text" value={d.giro} onChange={(e) => set("giro", e.target.value)} placeholder="Cafetería, estética, tienda de ropa…" />
              </label>
            </>
          )}

          {paso === 1 && (
            <>
              <fieldset>
                <legend>Paquete que te interesa</legend>
                <div className="opciones">
                  {opcionesPaquete.map((o) => (
                    <label key={o.valor || "no-se"} className={`opcion${d.paquete === o.valor ? " on" : ""}`}>
                      <input type="radio" name="paquete" checked={d.paquete === o.valor} onChange={() => set("paquete", o.valor)} />
                      <strong>{o.valor || "Aún no lo sé"}</strong>
                      <span>{o.detalle}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend>Qué necesita tu sitio</legend>
                <div className="chips">
                  {NECESIDADES.map((n) => (
                    <label key={n} className={`chip${d.necesidades.includes(n) ? " on" : ""}`}>
                      <input type="checkbox" checked={d.necesidades.includes(n)} onChange={() => alternar(n)} />
                      {n}
                    </label>
                  ))}
                </div>
              </fieldset>

              <label>
                Algo más que quieras contarnos
                <textarea rows={3} value={d.extra} onChange={(e) => set("extra", e.target.value)} placeholder="Cuéntanos con tus palabras lo que necesitas…" />
              </label>
            </>
          )}

          {paso === 2 && (
            <>
              <label>
                Colores o estilo que te gustan
                <input type="text" value={d.estilo} onChange={(e) => set("estilo", e.target.value)} />
              </label>
              <label>
                Páginas que te gusten como ejemplo
                <input type="text" value={d.ejemplos} onChange={(e) => set("ejemplos", e.target.value)} />
              </label>
              <p className="nota-form">Al enviar se abre WhatsApp con tus respuestas ya escritas.</p>
            </>
          )}

          {error && <p className="error" role="alert">{error}</p>}

          <div className="acciones">
            {paso > 0 && (
              <button type="button" className="btn btn-ghost" onClick={() => { setError(""); setPaso(paso - 1); }}>
                Atrás
              </button>
            )}
            <button type="submit" className="btn btn-gold">
              {paso < PASOS.length - 1 ? "Siguiente" : "Enviar por WhatsApp"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
