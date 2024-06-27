import { number, object, string, TypeOf } from "zod";

const payload = {
  body: object({
    name: string().min(0, {
      message: "Name must contain at least one character!",
    }),
    description: string(),
    hackerspaceId: number(),
  }),
};

const params = {
  params: object({
    id: string({
      required_error: "HackerEvent id is required",
    }),
  }),
};

export const getHackerEventSchema = object({
  ...params,
});

export const createHackerEventSchema = object({
  ...payload,
});

export const updateHackerEventSchema = object({
  ...payload,
  ...params,
});

export const deleteHackerEventSchema = object({
  ...params,
});

export type GetHackerEventInput = TypeOf<typeof getHackerEventSchema>;
export type CreateHackerEventInput = TypeOf<typeof createHackerEventSchema>;
export type UpdateHackerEventInput = TypeOf<typeof updateHackerEventSchema>;
export type DeleteHackerEventInput = TypeOf<typeof deleteHackerEventSchema>;
