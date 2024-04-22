import { TypeOf, z } from "zod";

export const registerUserSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: "Email is required",
      })
      .email("Not a valid email"),
    name: z.string({
      required_error: "Name is required",
    }),
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(6, "Password too short - should be 6 chars minimum"),
    createdAt: z.date({
      required_error: "Crated at time is required",
    }),
    updatedAt: z.date({
      required_error: "Updated at time is required",
    }),
  }),
});
export type RegisterUserInput = Omit<
  TypeOf<typeof registerUserSchema>,
  "body.passwordConfirmation"
>;
