import BaseRoutes from "./base/BaseRouter";
import HackerspaceController from "../controller/HackerspaceController";
import {
  createHackerspaceSchema,
  updateHackerspaceSchema,
} from "../schema/HackerspaceSchema";
import validate from "../helper/validate";
import { auth } from "../middleware/AuthMiddleware";

class HackerspaceRoutes extends BaseRoutes {
  public routes(): void {
    this.router.post(
      "",
      auth,
      validate(createHackerspaceSchema),
      HackerspaceController.create
    );
    this.router.patch(
      "/:id",
      auth,
      validate(updateHackerspaceSchema),
      HackerspaceController.update
    );
    this.router.delete("/:id", auth, HackerspaceController.delete);
    this.router.get("", auth, HackerspaceController.findAll);
    this.router.get("/:id", auth, HackerspaceController.findById);
  }
}

export default new HackerspaceRoutes().router;
