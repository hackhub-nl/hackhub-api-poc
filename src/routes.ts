import { Express, Request, Response } from "express";
import { registerUserSchema } from "./schema/user.schema";
import validate from "./middleware/validateResource";
import { registerUserHandler } from "./controllers/user.controller";
import { loginSessionSchema } from "./schema/session.schema";
import {
  deleteSessionHandler,
  getUserSessionsHandler,
  loginUserSessionHandler,
} from "./controllers/session.controller";
import requireUser from "./middleware/requireUser";

// curl http://localhost:port/healthcheck
function routes(app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

  app.post("/api/users", validate(registerUserSchema), registerUserHandler);

  app.post(
    "/api/sessions",
    validate(loginSessionSchema),
    loginUserSessionHandler
  );

  app.get("/api/sessions", requireUser, getUserSessionsHandler);
  app.delete("/api/sessions", requireUser, deleteSessionHandler);
}

export default routes;
