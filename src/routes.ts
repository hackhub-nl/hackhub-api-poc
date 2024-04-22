import { Express, Request, Response } from "express";
import { registerUserSchema } from "./schema/user.schema";
import validate from "./middleware/validateResource";
import { registerUserHandler } from "./controllers/user.controller";
import { loginSessionSchema } from "./schema/session.schema";
import { loginUserSessionHandler } from "./controllers/session.controller";

// curl http://localhost:port/healthcheck
function routes(app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

  app.post(
    "/api/users",
    validate(registerUserSchema),
    registerUserHandler
  );

  app.post(
    "/api/sessions",
    validate(loginSessionSchema),
    loginUserSessionHandler
  );
}

export default routes;

// class UserRoutes extends BaseRoutes {
//   routes(): void {
//     this.router.post("/login", UserController.login);
//     this.router.post(
//       "/register",
//       validateResource(registerUserSchema),
//       UserController.register
//     );
//   }
// }

// export default new UserRoutes().router;
