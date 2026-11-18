import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// Los platos viven en packages/content para que los pueda leer también el portfolio.
// Si el portfolio los consume, el esquema se extraerá a ese paquete.
const platos = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "../../packages/content/platos" }),
  schema: z.object({
    titulo: z.string(),
    resumen: z.string(),
    formato: z.enum(["obento", "tupper"]),
    seccion: z.enum(["entrantes", "principales", "maridaje", "la-cuenta"]),
    orden: z.number().int().positive(),
    borrador: z.boolean().default(false),
  }),
});

export const collections = { platos };
