import UserController from "../controllers/user.controller";
import BaseRoutes from "./base/base.router";

class UserRoutes extends BaseRoutes {
  routes(): void {
    this.router.post("/login", UserController.login);
    this.router.post("/register", UserController.register);
  }
}

export default new UserRoutes().router;
