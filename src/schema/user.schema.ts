import { TypeOf, z } from "zod";

export const registerUserSchema = z.object({
  body: z
    .object({
      email: z
        .string({
          required_error: "Email is required",
        })
        .email("Not a valid email"),
      name: z
        .string({
          required_error: "Name is required",
        })
        .email("Not valid email"),
      password: z
        .string({
          required_error: "Password is required",
        })
        .min(6, "Password too short - should be 6 chars minimum"),
      passwordConfirmation: z.string({
        required_error: "Password confirmation is required",
      }),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
      message: "Passwords do not match",
      path: ["passwordConfirmation"],
    }),
});

export type RegisterUserInput = Omit<
  TypeOf<typeof registerUserSchema>,
  "body.passwordConfirmation"
>;
