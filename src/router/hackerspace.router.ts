import BaseRoutes from "./base/base.router";
import HackerspaceController from "../controllers/hackerspace.controller";
import {
  createHackerspaceSchema,
  updateHackerspaceSchema,
} from "../schema/hackerspace.schema";
import validateResource from "../middleware/validateResource";
import { auth } from "../middleware/auth";

class HackerspaceRoutes extends BaseRoutes {
  public routes(): void {
    this.router.post(
      "",
      auth,
      validateResource(createHackerspaceSchema),
      HackerspaceController.create
    );
    this.router.patch(
      "/:id",
      auth,
      validateResource(updateHackerspaceSchema),
      HackerspaceController.update
    );
    this.router.delete("/:id", auth, HackerspaceController.delete);
    this.router.get("", auth, HackerspaceController.findAll);
    this.router.get("/:id", auth, HackerspaceController.findById);
  }
}

export default new HackerspaceRoutes().router;
