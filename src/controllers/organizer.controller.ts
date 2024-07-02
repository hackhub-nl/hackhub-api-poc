import { Request, Response } from "express";
import {
  createOrganizer,
  deleteOrganizer,
  findAndUpdateOrganizer,
  findOrganizer,
  getAllOrganizers,
} from "../service/organizer.service";
import {
  CreateOrganizerInput,
  DeleteOrganizerInput,
  GetOrganizerInput,
  UpdateOrganizerInput,
} from "../schema/organizer.schema";

export async function getAllOrganizersHandler(req: Request, res: Response) {
  const organizers = await getAllOrganizers();

  return res.send(organizers);
}

export async function getOrganizerHandler(
  req: Request<GetOrganizerInput["params"]>,
  res: Response
) {
  const organizerId = req.params.id;
  const organizer = await findOrganizer(organizerId);

  if (!organizer) {
    return res.sendStatus(404);
  }

  return res.send({
    name: organizer?.name,
    description: organizer?.description,
  });
}

export async function createOrganizerHandler(
  req: Request<{}, {}, CreateOrganizerInput["body"]>,
  res: Response
) {
  const body = req.body;

  const organizer = await createOrganizer(body.name, body.description);

  return res.send(organizer);
}

export async function updateOrganizerHandler(
  req: Request<UpdateOrganizerInput["params"]>,
  res: Response
) {
  const organizerId = req.params.id;
  const body = req.body;

  const organizer = await findOrganizer(organizerId);

  if (!organizer) {
    return res.sendStatus(404);
  }

  const updatedOrganizer = await findAndUpdateOrganizer(
    Number(organizerId),
    body.name,
    body.description
  );

  return res.send(updatedOrganizer);
}

export async function deleteOrganizerHandler(
  req: Request<DeleteOrganizerInput["params"]>,
  res: Response
) {
  const organizerId = req.params.id;

  const organizer = await findOrganizer(organizerId);

  if (!organizer) {
    return res.sendStatus(404);
  }

  await deleteOrganizer(Number(organizerId));

  return res.sendStatus(200);
}
