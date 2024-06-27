import { Request, Response } from "express";
import {
  findHackerEvent,
  getAllHackerEvents,
} from "../service/hackerEvent.service";
import { GetHackerEventInput } from "../schema/hackerEvent.schema";

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
