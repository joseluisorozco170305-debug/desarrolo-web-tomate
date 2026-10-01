const preguntas = [
  {
    q: "¿Cuánto tarda mi página?",
    a: "Depende de tu proyecto y del paquete. Cuando revisemos tu idea te decimos un tiempo aproximado antes de empezar.",
  },
  {
    q: "¿Veo mi página antes de que se publique?",
    a: "Sí. La diseñamos con lo que nos cuentas en el formulario, te la mostramos y puedes afinar detalles pequeños, como el tamaño y la tipografía, antes de publicarla.",
  },
  {
    q: "¿Qué cubre la garantía de 1 mes?",
    a: "Después de publicar tu sitio tienes un mes para pedir correcciones menores y detalles. Los cambios de formato, las funciones nuevas o los muchos colores se cotizan aparte.",
  },
  {
    q: "¿Para qué es la mensualidad?",
    a: "Es el mantenimiento de tu página: hosting, respaldos, soporte y ajustes pequeños. Se paga aparte del costo inicial.",
  },
  {
    q: "¿Puedo editar mi menú o catálogo yo mismo?",
    a: "Sí, con los paquetes \"Pa' que lo controles\" y \"Pa' que mejoren las ventas\": incluyen un panel de control y una guía en PDF para usarlo. En \"Pa' que te organices\" nos pides los cambios y nosotros los hacemos.",
  },
  {
    q: "¿Qué son las estampas NFC?",
    a: "Son stickers que, al acercarles el celular, abren tu página. Las 50 del paquete \"Pa' que mejoren las ventas\" son adhesivas, lisas y vienen programadas con el enlace de tu sitio.",
  },
];

export default function Faq() {
  return (
    <section className="faq" id="preguntas">
      <h2>Preguntas frecuentes</h2>
      <div className="faq-lista">
        {preguntas.map((p) => (
          <details key={p.q}>
            <summary>{p.q}</summary>
            <p>{p.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
