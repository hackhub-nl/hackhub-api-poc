import UserController from "../controllers/user.controller";
import BaseRoutes from "./base/base.router";
import validateResource from "../middleware/validateResource";
import { registerUserSchema } from "../schema/user.schema";

class UserRoutes extends BaseRoutes {
  routes(): void {
    this.router.post("/login", UserController.login);
    this.router.post(
      "/register",
      validateResource(registerUserSchema),
      UserController.register
    );
  }
}

export default new UserRoutes().router;
