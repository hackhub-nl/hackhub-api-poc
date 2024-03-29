import { z } from "zod";

export const registerUserSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
    }),
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(6, "Password too short - should be 6 chars minimum"),
    email: z
      .string({
        required_error: "Email is required",
      })
      .email("Not a valid email"),
  }),
});
