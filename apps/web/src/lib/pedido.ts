import { atom } from "nanostores";

/** Ids de los platos que el visitante ha metido en su caja, en orden de pedido. */
export const pedido = atom<string[]>([]);

const CLAVE_HASH = "pedido";

/** Añade el plato si no estaba y lo quita si ya estaba. */
export function alternarPlato(ids: readonly string[], id: string): string[] {
  return ids.includes(id) ? ids.filter((actual) => actual !== id) : [...ids, id];
}

/** Lee una lista de ids separada por comas, descartando los desconocidos y los repetidos. */
export function leerPedido(texto: string, idsValidos: readonly string[]): string[] {
  const validos = new Set(idsValidos);
  const vistos = new Set<string>();
  for (const trozo of texto.split(",")) {
    const id = trozo.trim();
    if (validos.has(id)) vistos.add(id);
  }
  return [...vistos];
}

/** Convierte el pedido en un hash para la URL ("#pedido=a,b"). Vacío si no hay nada pedido. */
export function hashDesdePedido(ids: readonly string[]): string {
  const unicos = [...new Set(ids)];
  return unicos.length > 0 ? `#${CLAVE_HASH}=${unicos.join(",")}` : "";
}

/** Recupera el pedido de un hash de URL. Si el hash no es un pedido, devuelve una caja vacía. */
export function pedidoDesdeHash(hash: string, idsValidos: readonly string[]): string[] {
  const params = new URLSearchParams(hash.replace(/^#/, ""));
  return leerPedido(params.get(CLAVE_HASH) ?? "", idsValidos);
}
