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
  getAllHackerspaces,
} from "../service/hackerspace.service";

export async function getAllHackerspacesHandler(req: Request, res: Response) {
  const hackerspaces = await getAllHackerspaces();

  return res.send(hackerspaces);
}

export async function getHackerspaceHandler(
  req: Request<GetHackerspaceInput["params"]>,
  res: Response
) {
  const hackerspaceId = req.params.id;
  const hspace = await findHackerspace(hackerspaceId);

  if (!hspace) {
    return res.sendStatus(404);
  }

  return res.send({
    name: hspace?.name,
    city: hspace?.city,
    province: hspace?.province,
    website: hspace?.website,
  });
}

export async function createHackerspaceHandler(
  req: Request<{}, {}, CreateHackerspaceInput["body"]>,
  res: Response
) {
  const userId = res.locals.user.id;
  const body = req.body;

  const hspace = await createHackerspace(
    userId,
    body.name,
    body.city,
    body.province,
    body.website
  );

  return res.send(hspace);
}

export async function updateHackerspaceHandler(
  req: Request<UpdateHackerspaceInput["params"]>,
  res: Response
) {
  const userId = res.locals.user.id;

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
    body.city,
    body.province,
    body.website
  );

  return res.send(updatedHackerspace);
}

export async function deleteHackerspaceHandler(
  req: Request<DeleteHackerspaceInput["params"]>,
  res: Response
) {
  const userId = res.locals.user.id;

  const hackerspaceId = req.params.id;

  const hspace = await findHackerspace(hackerspaceId);

  if (!hspace) {
    return res.sendStatus(404);
  }

  if (hspace.userId !== userId) {
    return res.sendStatus(403);
  }

  await deleteHackerspace(Number(hackerspaceId));

  return res.sendStatus(200);
}
