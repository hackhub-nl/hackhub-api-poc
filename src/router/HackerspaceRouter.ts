import BaseRoutes from "./BaseRouter";
import HackerspaceController from "../Controller/HackerspaceController";
import { createHackerspaceSchema } from "../schema/HackerspaceSchema";
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
      validate(createHackerspaceSchema),
      HackerspaceController.update
    );
    this.router.delete("/:id", HackerspaceController.delete);
    this.router.get("", HackerspaceController.findAll);
    this.router.get("/:id", HackerspaceController.findById);
  }
}

export default new HackerspaceRoutes().router;
