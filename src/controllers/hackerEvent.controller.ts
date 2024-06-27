import { Request, Response } from "express";
import {
  createHackerEvent,
  findHackerEvent,
  getAllHackerEvents,
} from "../service/hackerEvent.service";
import {
  CreateHackerEventInput,
  GetHackerEventInput,
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

  return JSON.parse(JSON.stringify(hackerEvent));
}

export async function findAndUpdateHackerEvent(
  hackerEventId: number,
  name: string,
  description: string
) {
  const hackerEvent = await HackerEvent.findOne({
    where: {
      id: hackerEventId,
    },
  });

  if (!hackerEvent) {
    throw new Error("Hacker event is not found");
  }
  hackerEvent.name = name;
  hackerEvent.description = description;

  return await hackerEvent.save();
}

export async function deleteHackerEvent(hackerEventId: number) {
  const hackerEvent = await HackerEvent.findOne({
    where: {
      id: hackerEventId,
    },
  });

  if (!hackerEvent) {
    throw new Error("Hacker event is not found");
  }
  return await hackerEvent.destroy();
}
