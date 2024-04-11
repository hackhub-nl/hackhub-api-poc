import { Express, Request, Response } from "express";
import { registerUserSchema } from "./schema/user.schema";
import validateResource from "./middleware/validateResource";
import { registerUserHandler } from "./controllers/user.controller";
import { loginSessionSchema } from "./schema/session.schema";
import { loginUserSessionHandler } from "./controllers/session.controller";

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
