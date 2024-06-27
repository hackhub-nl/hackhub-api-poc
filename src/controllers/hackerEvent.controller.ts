import { Request, Response } from "express";
import {
  createHackerEvent,
  deleteHackerEvent,
  findAndUpdateHackerEvent,
  findHackerEvent,
  getAllHackerEvents,
} from "../service/hackerEvent.service";
import {
  CreateHackerEventInput,
  DeleteHackerEventInput,
  GetHackerEventInput,
  UpdateHackerEventInput,
} from "../schema/hackerEvent.schema";
import { HackerEvent } from "../models/hackerEvent.model";

export async function getAllHackerEventsHandler(req: Request, res: Response) {
  const hackerEvents = await getAllHackerEvents();

  return res.send(hackerEvents);
}

export async function getHackerEventHandler(
  req: Request<GetHackerEventInput["params"]>,
  res: Response
) {
  const hackerEventId = req.params.id;
  const hackerEvent = await findHackerEvent(hackerEventId);

  if (!hackerEvent) {
    return res.sendStatus(404);
  }

  return res.send({
    name: hackerEvent?.name,
    description: hackerEvent?.description,
  });
}

export async function createHackerEventHandler(
  req: Request<{}, {}, CreateHackerEventInput["body"]>,
  res: Response
) {
  const body = req.body;

  const hackerEvent = await createHackerEvent(body.name, body.description);

  return res.send(hackerEvent);
}

export async function updateHackerEventHandler(
  req: Request<UpdateHackerEventInput["params"]>,
  res: Response
) {
  const hackerEventId = req.params.id;
  const body = req.body;

  const hackerEvent = await findHackerEvent(hackerEventId);

  if (!hackerEvent) {
    return res.sendStatus(404);
  }

  const updatedHackerEvent = await findAndUpdateHackerEvent(
    Number(hackerEventId),
    body.name,
    body.description
  );

  return res.send(updatedHackerEvent);
}

export async function deleteHackerEventHandler(
  req: Request<DeleteHackerEventInput["params"]>,
  res: Response
) {
  const hackerEventId = req.params.id;

  const hackerEvent = await findHackerEvent(hackerEventId);

  if (!hackerEvent) {
    return res.sendStatus(404);
  }

  await deleteHackerEvent(Number(hackerEventId));

  return res.sendStatus(200);
}
