import { useStore } from "@nanostores/react";
import { useEffect, useState } from "react";
import { alternarPlato, hashDesdePedido, pedido, pedidoDesdeHash } from "../lib/pedido";
import estilos from "./Carta.module.css";

export interface PlatoVista {
  id: string;
  titulo: string;
  resumen: string;
  formato: "obento" | "tupper";
  seccion: "entrantes" | "principales" | "maridaje" | "la-cuenta";
}

const SECCIONES: ReadonlyArray<{ clave: PlatoVista["seccion"]; titulo: string }> = [
  { clave: "entrantes", titulo: "Entrantes" },
  { clave: "principales", titulo: "Principales" },
  { clave: "maridaje", titulo: "Maridaje" },
  { clave: "la-cuenta", titulo: "La cuenta" },
];

export default function Carta({ platos }: { platos: PlatoVista[] }) {
  const ids = useStore(pedido);
  const [copiado, setCopiado] = useState(false);

  // Recupera la caja desde la URL al abrir la página (solo en el cliente).
  useEffect(() => {
    pedido.set(
      pedidoDesdeHash(
        window.location.hash,
        platos.map((p) => p.id),
      ),
    );
  }, [platos]);

  // Mantiene la URL al día para que el enlace recomponga la caja.
  useEffect(() => {
    const hash = hashDesdePedido(ids);
    const base = `${window.location.pathname}${window.location.search}`;
    window.history.replaceState(null, "", hash === "" ? base : `${base}${hash}`);
  }, [ids]);

  const elegidos = ids
    .map((id) => platos.find((p) => p.id === id))
    .filter((p): p is PlatoVista => p !== undefined);

  async function copiarEnlace() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopiado(true);
      window.setTimeout(() => setCopiado(false), 2000);
    } catch {
      setCopiado(false);
    }
  }

  return (
    <div className={estilos.contenedor}>
      <div className={estilos.carta}>
        {SECCIONES.map(({ clave, titulo }) => {
          const delaSeccion = platos.filter((p) => p.seccion === clave);
          if (delaSeccion.length === 0) return null;
          return (
            <section key={clave} aria-labelledby={`seccion-${clave}`}>
              <h2 id={`seccion-${clave}`} className={estilos.seccion}>
                {titulo}
              </h2>
              <ul className={estilos.lista}>
                {delaSeccion.map((plato) => {
                  const enLaCaja = ids.includes(plato.id);
                  return (
                    <li key={plato.id}>
                      <article
                        className={`${estilos.plato} ${plato.formato === "tupper" ? estilos.tupper : estilos.obento}`}
                      >
                        <p className={estilos.formato}>{plato.formato}</p>
                        <h3>{plato.titulo}</h3>
                        <p>{plato.resumen}</p>
                        <button
                          type="button"
                          className={estilos.boton}
                          aria-pressed={enLaCaja}
                          onClick={() => pedido.set(alternarPlato(pedido.get(), plato.id))}
                        >
                          {enLaCaja ? "Quitar de mi caja" : "Añadir a mi caja"}
                        </button>
                      </article>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>

      <aside className={estilos.caja} aria-live="polite">
        <h2 className={estilos.seccion}>Tu caja</h2>
        {elegidos.length === 0 ? (
          <p className={estilos.vacia}>Todavía vacía. Elige algo de la carta.</p>
        ) : (
          <>
            <ul className={estilos.elegidos}>
              {elegidos.map((p) => (
                <li key={p.id}>
                  <span className={estilos.formato}>{p.formato}</span> {p.titulo}
                </li>
              ))}
            </ul>
            <button type="button" className={estilos.boton} onClick={copiarEnlace}>
              {copiado ? "Enlace copiado" : "Copiar enlace para llevar"}
            </button>
          </>
        )}
      </aside>
    </div>
  );
}
