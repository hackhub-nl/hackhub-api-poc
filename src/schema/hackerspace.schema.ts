import { object, number, string, TypeOf } from "zod";

const payload = {
  body: object({
    name: string({
      required_error: "Name is required",
    }).min(0, { message: "Name must contain at least one character" }),
    city: string({
      required_error: "City is required",
    }).min(0, { message: "City must contain at least one character" }),
  }),
};

const params = {
  params: object({
    id: string({
      required_error: "Hackerspace id is required",
    }),
  }),
};

export const getHackerspaceSchema = object({
  ...params,
});

export const createHackerspaceSchema = object({
  ...payload,
});

export const updateHackerspaceSchema = object({
  ...payload,
  ...params,
});

export const deleteHackerspaceSchema = object({
  ...params,
});

export type GetHackerspaceSchema = TypeOf<typeof getHackerspaceSchema>;
export type CreateHackerspaceSchema = TypeOf<typeof createHackerspaceSchema>;
export type UpdateHackerspaceSchema = TypeOf<typeof updateHackerspaceSchema>;
export type DeleteHackerspaceSchema = TypeOf<typeof deleteHackerspaceSchema>;
