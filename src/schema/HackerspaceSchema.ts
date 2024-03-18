import { z } from "zod";

export const createHackerspaceSchema = z.object({
  name: z
    .string()
    .min(0, { message: "Name must contain at least one character!" }),
  city: z
    .string()
    .min(0, { message: "City must contain at least one character!" }),
});

export const updateHackerspaceSchema = z.object({
  params: z.object({ id: z.string() }),
  body: z
    .object({
      name: z
        .string()
        .min(0, { message: "Name must contain at least one character!" }),
      city: z
        .string()
        .min(0, { message: "City must contain at least one character!" }),
    })
    .partial(),
});
