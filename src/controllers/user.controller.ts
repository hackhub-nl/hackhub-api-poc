import { Request, Response } from "express";
import { omit } from "lodash";
import logger from "../utils/logger";
import { RegisterUserInput } from "../schema/user.schema";
import { registerUser } from "../service/user.service";

export async function registerUserHandler(
  req: Request<{}, {}, RegisterUserInput["body"]>,
  res: Response
) {
  try {
    const { email, name, password } = req.body;
    const user = await registerUser(email, name, password);
    return res.send(omit(JSON.parse(JSON.stringify(user)), "password"));
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message); // 409 - conflict
  }
}