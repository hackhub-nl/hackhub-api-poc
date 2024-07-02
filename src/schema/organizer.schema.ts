import { object, string, TypeOf } from "zod";

const payload = {
  body: object({
    name: string().min(0, {
      message: "Name must contain at least one character!",
    }),
    description: string(),
  }),
};

const params = {
  params: object({
    id: string({
      required_error: "Organizer id is required",
    }),
  }),
};

export const getOrganizerSchema = object({
  ...params,
});

export const createOrganizerSchema = object({
  ...payload,
});

export const updateOrganizerSchema = object({
  ...payload,
  ...params,
});

export const deleteOrganizerSchema = object({
  ...params,
});

export type GetOrganizerInput = TypeOf<typeof getOrganizerSchema>;
export type CreateOrganizerInput = TypeOf<typeof createOrganizerSchema>;
export type UpdateOrganizerInput = TypeOf<typeof updateOrganizerSchema>;
export type DeleteOrganizerInput = TypeOf<typeof deleteOrganizerSchema>;
