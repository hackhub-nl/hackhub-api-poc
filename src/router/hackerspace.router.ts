import BaseRoutes from "./base/base.router";
import HackerspaceController from "../controllers/hackerspace.controller";
import {
  createHackerspaceSchema,
  updateHackerspaceSchema,
} from "../schema/hackerspace.schema";
import validate from "../middlewares/validateResource";
import { auth } from "../middlewares/auth";

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
