import { describe, expect, it } from "vitest";
import { alternarPlato, hashDesdePedido, leerPedido, pedidoDesdeHash } from "./pedido";

const validos = ["edicta", "genesys-ui", "stack"];

describe("alternarPlato", () => {
  it("añade un plato que no estaba", () => {
    expect(alternarPlato(["stack"], "edicta")).toEqual(["stack", "edicta"]);
  });

  it("quita un plato que ya estaba", () => {
    expect(alternarPlato(["stack", "edicta"], "stack")).toEqual(["edicta"]);
  });

  it("no modifica la lista original", () => {
    const original = ["stack"];
    alternarPlato(original, "edicta");
    expect(original).toEqual(["stack"]);
  });
});

describe("leerPedido", () => {
  it("descarta ids desconocidos y repetidos, y respeta el orden", () => {
    expect(leerPedido("stack,nada,edicta,stack", validos)).toEqual(["stack", "edicta"]);
  });

  it("devuelve una caja vacía con texto vacío", () => {
    expect(leerPedido("", validos)).toEqual([]);
  });
});

describe("hash del pedido", () => {
  it("ida y vuelta sin pérdida", () => {
    const ids = ["genesys-ui", "stack"];
    expect(pedidoDesdeHash(hashDesdePedido(ids), validos)).toEqual(ids);
  });

  it("un pedido vacío no deja hash", () => {
    expect(hashDesdePedido([])).toBe("");
  });

  it("ignora un hash que no es un pedido", () => {
    expect(pedidoDesdeHash("#otra-cosa", validos)).toEqual([]);
  });
});
