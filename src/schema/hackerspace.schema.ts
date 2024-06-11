import { z } from "zod";

export const createHackerspaceSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Name is required",
      })
      .min(0, { message: "Name must contain at least one character!" }),
    city: z
      .string({
        required_error: "City is required",
      })
      .min(0, { message: "City must contain at least one character!" }),
  }),
});

export const updateHackerspaceSchema = z.object({
  params: z.object({ id: z.string() }),
  body: z
    .object({
      name: z
        .string({
          required_error: "Name is required",
        })
        .min(0, { message: "Name must contain at least one character!" }),
      city: z
        .string({
          required_error: "City is required",
        })
        .min(0, { message: "City must contain at least one character!" }),
    })
    .partial(),
});