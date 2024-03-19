import BaseRoutes from "./base/BaseRouter";
import HackerspaceController from "../Controller/HackerspaceController";
import {
  createHackerspaceSchema,
  updateHackerspaceSchema,
} from "../schema/HackerspaceSchema";
import validate from "../helper/validate";

class HackerspaceRoutes extends BaseRoutes {
  public routes(): void {
    this.router.post(
      "",
      validate(createHackerspaceSchema),
      HackerspaceController.create
    );
    this.router.patch(
      "/:id",
      validate(updateHackerspaceSchema),
      HackerspaceController.update
    );
    this.router.delete("/:id", HackerspaceController.delete);
    this.router.get("", HackerspaceController.findAll);
    this.router.get("/:id", HackerspaceController.findById);
  }
}

export default new HackerspaceRoutes().router;
