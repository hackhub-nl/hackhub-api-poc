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
      required_error: "Hackerevent id is required",
    }),
  }),
};

export const getHackereventSchema = object({
  ...params,
});

export const createHackereventSchema = object({
  ...payload,
});

export const updateHackereventSchema = object({
  ...payload,
  ...params,
});

export const deleteHackereventSchema = object({
  ...params,
});

export type GetHackereventInput = TypeOf<typeof getHackereventSchema>;
export type CreateHackereventInput = TypeOf<typeof createHackereventSchema>;
export type UpdateHackereventInput = TypeOf<typeof updateHackereventSchema>;
export type DeleteHackereventInput = TypeOf<typeof deleteHackereventSchema>;
