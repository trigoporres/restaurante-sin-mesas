# Restaurante sin mesas

> Nombre definitivo pendiente. Este repositorio es el proyecto de trabajo.

Una casa de comidas sin mesas: llegas, te dan la carta, pides y te lo sirven en un obento o en un tupper para llevar.

Es un proyecto con identidad propia que, además, funciona como el portfolio de Santiago Trigo (frontend senior, Madrid): cada visitante arma su propia caja con lo que le interesa y se la lleva.

## La idea

- **Obento: lo limpio y ordenado.** Stack, trayectoria, proyectos con sus cifras, contacto y CV. Compartimentos exactos.
- **Tupper: lo casero.** Quién cocina, el blog, cómo trabajo, el "cómo se hizo" de cada proyecto. Más orgánico y con humor.
- **Recorrido:** llegas, pides, te sirven, te lo llevas (imagen, PDF o enlace).
- **Web propia**, enlazada desde el portfolio. El contenido (los platos) vive como datos y lo leen los dos sitios.

## Fases

| Fase | Qué incluye | Estado |
|------|-------------|--------|
| 1. Identidad | Universo, paleta, tipografía, voz, nombre | Casi cerrada (falta el nombre) |
| 2. Corte vertical | La carta, el pedido y un tupper servido | En marcha (esqueleto hecho: carta y pedido básico) |
| 3. Motor y datos | Todos los platos como datos | Pendiente |
| 4. Pulido | Animación, rendimiento, accesibilidad, 3D opcional | Pendiente |
| 5. Integración | Enlace desde el portfolio, lanzamiento | Pendiente |

## Identidad (v0.1)

**Paleta**

| Nombre | Hex | Uso |
|--------|-----|-----|
| Papel | `#F4ECDF` | Fondo |
| Kraft | `#E6D5B8` | Bolsa para llevar, superficies secundarias |
| Tinta | `#211C17` | Texto y marco del obento |
| Pimentón | `#EB6834` | Acento principal |
| Yema | `#EDA100` | Destacados |
| Jade | `#1BAF7A` | Frescura, éxito |
| Azulejo | `#2A78D6` | Datos y enlaces |

Los cuatro acentos son también la paleta de los gráficos. Sobre el fondo papel el contraste es bajo, así que los gráficos llevan siempre etiquetas visibles y el texto va en tinta.

**Tipografía:** Fraunces (titulares), Instrument Sans (texto), DM Mono (datos y ticket), Caveat (etiquetas del tupper, solo frases cortas). Máximo tres por pantalla.

**Voz:** cercana, directa y con humor suave. Ejemplos: "Lo de hoy", "La cuenta, por favor", "Ese plato se ha acabado", "Para llevar".

La muestra visual está en [`docs/identidad/index.html`](docs/identidad/index.html).

## Tecnología

- **Astro + islas de React + TypeScript estricto.** Páginas estáticas con SEO y React solo donde hay interacción.
- **Monorepo con pnpm workspaces:**
  - `apps/web`: la web.
  - `packages/tokens`: paleta y tipografía (CSS y TypeScript).
  - `packages/content`: los platos como datos (Markdown con esquema Zod, validado por las content collections de Astro).
- **Estado del pedido:** nanostores, sincronizado con la URL (`#pedido=a,b`) para que el enlace recomponga la caja.
- **Estilos:** CSS con variables y CSS Modules.
- **Calidad:** Biome, Vitest, `astro check` y GitHub Actions.

Previsto para más adelante: Motion para las animaciones, D3 para los gráficos, exportación a imagen y PDF, Playwright y Storybook.

## Cómo empezar

Requiere Node 22 o superior y pnpm.

```bash
pnpm install
pnpm dev        # servidor de desarrollo
pnpm build      # build de producción
pnpm test       # tests con Vitest
pnpm typecheck  # comprobación de tipos
pnpm lint       # Biome
```

## Licencia

Sin definir.
