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
} from "./controllers/organizer.controller";
import {
  createOrganizerSchema,
  deleteOrganizerSchema,
  getOrganizerSchema,
  updateOrganizerSchema,
} from "./schema/organizer.schema";

function routes(app: express.Application) {
  // app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

  // Admin routes:
  // Admin: users
  app.post(
    "/api/admin/users",
    validateResource(registerUserSchema),
    registerUserHandler
  );

  // Admin: sessions
  app.get("/api/admin/sessions", requireUser, getUserSessionsHandler);

  app.post(
    "/api/admin/sessions",
    validateResource(loginSessionSchema),
    loginUserSessionHandler
  );

  app.delete("/api/admin/sessions", requireUser, deleteSessionHandler);

  // Admin: hackerspaces
  app.get("/api/admin/hackerspaces", getAllHackerspacesHandler);

  app.get(
    "/api/admin/hackerspaces/:id",
    validateResource(getHackerspaceSchema),
    getHackerspaceHandler
  );

  app.post(
    "/api/admin/hackerspaces",
    [requireUser, validateResource(createHackerspaceSchema)],
    createHackerspaceHandler
  );

  app.put(
    "/api/admin/hackerspaces/:id",
    [requireUser, validateResource(updateHackerspaceSchema)],
    updateHackerspaceHandler
  );

  app.delete(
    "/api/admin/hackerspaces/:id",
    [requireUser, validateResource(deleteHackerspaceSchema)],
    deleteHackerspaceHandler
  );

  // Admin: hackerEvents
  app.get("/api/admin/hackerevents", getAllHackerEventsHandler);

  app.get(
    "/api/admin/hackerevents/:id",
    validateResource(getHackerEventSchema),
    getHackerEventHandler
  );

  app.post(
    "/api/admin/hackerevents",
    [requireUser, validateResource(createHackerEventSchema)],
    createHackerEventHandler
  );

  app.put(
    "/api/admin/hackerevents/:id",
    [requireUser, validateResource(updateHackerEventSchema)],
    updateHackerEventHandler
  );

  app.delete(
    "/api/admin/hackerevents/:id",
    [requireUser, validateResource(deleteHackerEventSchema)],
    deleteHackerEventHandler
  );

  // Admin: organizers
  app.get("/api/admin/organizers", getAllOrganizersHandler);

  app.get(
    "/api/admin/organizers/:id",
    validateResource(getOrganizerSchema),
    getOrganizerHandler
  );

  app.post(
    "/api/admin/organizers",
    [requireUser, validateResource(createOrganizerSchema)],
    createOrganizerHandler
  );

  app.put(
    "/api/admin/organizers/:id",
    [requireUser, validateResource(updateOrganizerSchema)],
    updateOrganizerHandler
  );

  app.delete(
    "/api/admin/organizers/:id",
    [requireUser, validateResource(deleteOrganizerSchema)],
    deleteOrganizerHandler
  );

  // Website visitor routes:
  // Website visitor: hackerspaces
  app.get("/api/hackerspaces", getAllHackerspacesHandler);

  app.get(
    "/api/hackerspaces/:id",
    validateResource(getHackerspaceSchema),
    getHackerspaceHandler
  );

  // Website visitor: hackerEvents
  app.get("/api/hackerevents", getAllHackerEventsHandler);

  app.get(
    "/api/hackerevents/:id",
    validateResource(getHackerEventSchema),
    getHackerEventHandler
  );

  // Website visitor: organizers
  app.get("/api/organizers", getAllOrganizersHandler);

  app.get(
    "/api/organizers/:id",
    validateResource(getOrganizerSchema),
    getOrganizerHandler
  );
}

export default routes;
