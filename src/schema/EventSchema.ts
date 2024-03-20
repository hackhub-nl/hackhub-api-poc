import { z } from "zod";

export const createEventSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(0, { message: "Name must contain at least one character!" }),
    description: z.string().min(1, {
      message: "Description must contain at least two characters!",
    }),
  }),
});

export const updateEventSchema = z.object({
  params: z.object({ id: z.string() }),
  body: z
    .object({
      name: z
        .string()
        .min(0, { message: "Name must contain at least one character!" }),
      description: z.string().min(1, {
        message: "Description must contain at least two characters!",
      }),
    })
    .partial(),
});
