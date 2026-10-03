import { useEffect, useState } from "react";
import TechText from "./TechText";

// En pantallas angostas el eslogan se parte en dos renglones para que no quede diminuto.
function useEstrecho(px = 700) {
  const consulta = `(max-width: ${px}px)`;
  const [estrecho, setEstrecho] = useState(() => window.matchMedia(consulta).matches);
  useEffect(() => {
    const m = window.matchMedia(consulta);
    const f = () => setEstrecho(m.matches);
    m.addEventListener("change", f);
    return () => m.removeEventListener("change", f);
  }, [consulta]);
  return estrecho;
}

const estilo = {
  fontFamily: '"Fraunces", Georgia, serif',
  fontWeight: 800,
  fontSize: 150,
  letterSpacing: -0.02,
  color: "#0A1D4B", // azul marino
  accentColor: "#9E0E18", // carmesí
};

export default function Eslogan() {
  const estrecho = useEstrecho();
  return (
    <>
      {/* Texto real para lectores de pantalla y buscadores; el canvas es solo visual */}
      <h1 className="sr-only">Tu marca en cada click</h1>
      <div className="eslogan" aria-hidden="true">
        {estrecho ? (
          <>
            <div className="eslogan-linea dos"><TechText text="Tu marca en" {...estilo} /></div>
            <div className="eslogan-linea dos"><TechText text="cada click" {...estilo} /></div>
          </>
        ) : (
          <div className="eslogan-linea uno"><TechText text="Tu marca en cada click" {...estilo} /></div>
        )}
      </div>
    </>
  );
}
