import { Request, Response } from "express";
import {
  CreateHackerspaceInput,
  DeleteHackerspaceInput,
  GetHackerspaceInput,
  UpdateHackerspaceInput,
} from "../schema/hackerspace.schema";
import {
  createHackerspace,
  deleteHackerspace,
  findAndUpdateHackerspace,
  findHackerspace,
} from "../service/hackerspace.service";

export async function getHackerspaceHandler(
  req: Request<GetHackerspaceInput["params"]>,
  res: Response
) {
  const hackerspaceId = req.params.id;
  const hspace = await findHackerspace(hackerspaceId);

  if (!hspace) {
    return res.sendStatus(404);
  }

  return res.send(hspace);
}

export async function createHackerspaceHandler(
  req: Request<{}, {}, CreateHackerspaceInput["body"]>,
  res: Response
) {
  const userId = res.locals.user.dataValues.id;
  const body = req.body;

  const hspace = await createHackerspace(userId, body.name, body.city);

  return res.send(hspace);
}

export async function updateHackerspaceHandler(
  req: Request<UpdateHackerspaceInput["params"]>,
  res: Response
) {
  const userId = res.locals.user.dataValues.id;

  const hackerspaceId = req.params.id;
  const body = req.body;

  const hspace = await findHackerspace(hackerspaceId);

  if (!hspace) {
    return res.sendStatus(404);
  }

  if (hspace.userId !== userId) {
    return res.sendStatus(403);
  }

  const updatedHackerspace = await findAndUpdateHackerspace(
    Number(hackerspaceId),
    body.name,
    body.city
  );

  return res.send(updatedHackerspace);
}

export async function deleteHackerspaceHandler(
  req: Request<DeleteHackerspaceInput["params"]>,
  res: Response
) {
  const userId = res.locals.user.dataValues.id;

  const hackerspaceId = req.params.id;
  console.log("hackerspaceId: " + hackerspaceId);

  const hspace = await findHackerspace(hackerspaceId);

  if (!hspace) {
    return res.sendStatus(404);
  }

  if (hspace.user.id !== userId) {
    return res.sendStatus(403);
  }

  await deleteHackerspace(Number(hackerspaceId));

  return res.sendStatus(200);
}
