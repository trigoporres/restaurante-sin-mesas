/**
 * Tokens para uso en TypeScript (por ejemplo, gráficos con D3).
 * Los valores de color deben coincidir con tokens.css.
 */
export const colores = {
  papel: "#F4ECDF",
  kraft: "#E6D5B8",
  tinta: "#211C17",
  pimenton: "#EB6834",
  yema: "#EDA100",
  jade: "#1BAF7A",
  azulejo: "#2A78D6",
} as const;

/**
 * Paleta categórica para gráficos, en orden fijo.
 * Validada contra daltonismo sobre el fondo papel. El contraste con el papel
 * es bajo, así que los gráficos deben llevar siempre etiquetas visibles.
 */
export const paletaGraficos = [
  colores.azulejo,
  colores.pimenton,
  colores.jade,
  colores.yema,
] as const;
