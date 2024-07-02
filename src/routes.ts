import express, { Request, Response } from "express";
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
  getAllHackerspacesHandler,
  getHackerspaceHandler,
  updateHackerspaceHandler,
} from "./controllers/hackerspace.controller";
import {
  createHackerEventHandler,
  deleteHackerEventHandler,
  getAllHackerEventsHandler,
  getHackerEventHandler,
  updateHackerEventHandler,
} from "./controllers/hackerEvent.controller";
import {
  createHackerEventSchema,
  deleteHackerEventSchema,
  getHackerEventSchema,
  updateHackerEventSchema,
} from "./schema/hackerEvent.schema";
import {
  createOrganizerHandler,
  deleteOrganizerHandler,
  getAllOrganizersHandler,
  getOrganizerHandler,
  updateOrganizerHandler,
} from "./controllers/organizer.cotroler";
import {
  createOrganizerSchema,
  deleteOrganizerSchema,
  getOrganizerSchema,
  updateOrganizerSchema,
} from "./schema/organizer.schema";

// curl http://localhost:port/healthcheck

function routes(app: express.Application) {
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

  app.get("/api/hackerspaces", getAllHackerspacesHandler);

  app.get(
    "/api/hackerspaces/:id",
    validateResource(getHackerspaceSchema),
    getHackerspaceHandler
  );

  app.post(
    "/api/hackerspaces",
    [requireUser, validateResource(createHackerspaceSchema)],
    createHackerspaceHandler
  );

  app.put(
    "/api/hackerspaces/:id",
    [requireUser, validateResource(updateHackerspaceSchema)],
    updateHackerspaceHandler
  );

  app.delete(
    "/api/hackerspaces/:id",
    [requireUser, validateResource(deleteHackerspaceSchema)],
    deleteHackerspaceHandler
  );

  app.get("/api/hackerevents", getAllHackerEventsHandler);

  app.get(
    "/api/hackerevents/:id",
    validateResource(getHackerEventSchema),
    getHackerEventHandler
  );

  app.post(
    "/api/hackerevents",
    [requireUser, validateResource(createHackerEventSchema)],
    createHackerEventHandler
  );

  app.put(
    "/api/hackerevents/:id",
    [requireUser, validateResource(updateHackerEventSchema)],
    updateHackerEventHandler
  );

  app.delete(
    "/api/hackerevents/:id",
    [requireUser, validateResource(deleteHackerEventSchema)],
    deleteHackerEventHandler
  );

  app.get("/api/organizers", getAllOrganizersHandler);

  app.get(
    "/api/organizers/:id",
    validateResource(getOrganizerSchema),
    getOrganizerHandler
  );

  app.post(
    "/api/organizers",
    [requireUser, validateResource(createOrganizerSchema)],
    createOrganizerHandler
  );

  app.put(
    "/api/organizers/:id",
    [requireUser, validateResource(updateOrganizerSchema)],
    updateOrganizerHandler
  );

  app.delete(
    "/api/organizers/:id",
    [requireUser, validateResource(deleteOrganizerSchema)],
    deleteOrganizerHandler
  );
}

export default routes;
