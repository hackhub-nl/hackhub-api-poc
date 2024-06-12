import { Express, Request, Response } from "express";
import { registerUserSchema } from "./schema/user.schema";
import validateResource from "./middleware/validateResource";
import { registerUserHandler } from "./controllers/user.controller";
import { loginSessionSchema } from "./schema/session.schema";
import {
  deleteSessionHandler,
  getUserSessionsHandler,
  loginUserSessionHandler,
} from "./controllers/session.controller";
import requireUser from "./middleware/requireUser";
import {
  createHackerspaceSchema,
  deleteHackerspaceSchema,
  getHackerspaceSchema,
  updateHackerspaceSchema,
} from "./schema/hackerspace.schema";
import {
  createHackerspaceHandler,
  deleteHackerspaceHandler,
  getHackerspaceHandler,
  updateHackerspaceHandler,
} from "./controllers/hackerspace.controller";

// curl http://localhost:port/healthcheck

function routes(app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

  app.post(
    "/api/users",
    validateResource(registerUserSchema),
    registerUserHandler
  );

  app.post(
    "/api/sessions",
    validateResource(loginSessionSchema),
    loginUserSessionHandler
  );

  app.get("/api/sessions", requireUser, getUserSessionsHandler);
  app.delete("/api/sessions", requireUser, deleteSessionHandler);

  app.get(
    "/api/hackerspaces",
    validateResource(getHackerspaceSchema),
    getHackerspaceHandler
  );

  app.post(
    "/api/hackerspaces",
    [requireUser, validateResource(createHackerspaceSchema)],
    createHackerspaceHandler
  );

  app.put(
    "/api/hackerspaces",
    [requireUser, validateResource(updateHackerspaceSchema)],
    updateHackerspaceHandler
  );

  app.delete(
    "/api/hackerspaces",
    [requireUser, validateResource(deleteHackerspaceSchema)],
    deleteHackerspaceHandler
  );
}

export default routes;
