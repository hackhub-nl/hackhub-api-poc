import { Request, Response } from "express";
import {
  CreateHackerspaceInput,
  DeleteHackerspaceInput,
  GetHackerspaceInput,
  UpdateHackerspaceInput,
} from "../schema/hackerspace.schema";
import {
  createHackerspace,
  findAndUpdateHackerspace,
  findHackerspace,
} from "../service/hackerspace.service";

export async function getHackerspaceHandler(
  req: Request<GetHackerspaceInput["params"]>,
  res: Response
) {}

export async function createHackerspaceHandler(
  req: Request<{}, {}, CreateHackerspaceInput["body"]>,
  res: Response
) {
  const userId = res.locals.user.id;

  const body = req.body;

  const hspace = await createHackerspace(userId, body.name, body.city);

  return res.send(hspace);
}

export async function updateHackerspaceHandler(
  req: Request<UpdateHackerspaceInput["params"]>,
  res: Response
) {
  const userId = res.locals.user.id;

  const hackerspaceId = req.params.id;
  const body = req.body;

  const hspace = await findHackerspace(Number(hackerspaceId));

  if (!hspace) {
    return res.sendStatus(404);
  }

  if (String(hspace.user) !== userId) {
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
) {}

// import { Request, Response } from "express";
// import { Hackerspace } from "../models/hackerspace.model";
// import { HackerspaceRepo } from "../repositories/hackerspace.repo";

// class HackerspaceController {
//   async create(req: Request, res: Response) {
//     try {
//       const hspace = new Hackerspace();
//       hspace.name = req.body.name;
//       hspace.city = req.body.city;

//       await new HackerspaceRepo().save(hspace);

//       res.status(201).json({
//         status: "Created!",
//         message: "Successfully created hackerspace!",
//       });
//     } catch (err) {
//       res.status(500).json({
//         status: "Internal Server Error!",
//         message: "Internal Server Error!",
//       });
//     }
//   }

//   async delete(req: Request, res: Response) {
//     try {
//       let id = parseInt(req.params["id"]);
//       await new HackerspaceRepo().delete(id);

//       res.status(200).json({
//         status: "Ok!",
//         message: "Successfully deleted hackerspace!",
//       });
//     } catch (err) {
//       res.status(500).json({
//         status: "Internal Server Error!",
//         message: "Internal Server Error!",
//       });
//     }
//   }

//   async findById(req: Request, res: Response) {
//     try {
//       let id = parseInt(req.params["id"]);
//       const hspace = await new HackerspaceRepo().retrieveById(id);

//       res.status(200).json({
//         status: "Ok!",
//         message: "Successfully fetched hackerspace by id!",
//         data: hspace,
//       });
//     } catch (err) {
//       res.status(500).json({
//         status: "Internal Server Error!",
//         message: "Internal Server Error!",
//       });
//     }
//   }

//   async findAll(req: Request, res: Response) {
//     try {
//       const hspace = await new HackerspaceRepo().retrieveAll();

//       res.status(200).json({
//         status: "Ok!",
//         message: "Successfully fetched all hackerspaces!",
//         data: hspace,
//       });
//     } catch (err) {
//       res.status(500).json({
//         status: "Internal Server Error!",
//         message: "Internal Server Error!",
//       });
//     }
//   }

//   async update(req: Request, res: Response) {
//     try {
//       let id = parseInt(req.params["id"]);
//       const hspace = new Hackerspace();
//       hspace.id = id;
//       hspace.name = req.body.name;
//       hspace.city = req.body.city;

//       await new HackerspaceRepo().update(hspace);

//       res.status(200).json({
//         status: "Ok!",
//         message: "Successfully updated hackerspace!",
//       });
//     } catch (err) {
//       res.status(500).json({
//         status: "Internal Server Error!",
//         message: "Internal Server Error!",
//       });
//     }
//   }
// }

// export default new HackerspaceController();
