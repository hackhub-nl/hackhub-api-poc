import BaseRoutes from "./base/base.router";
import HackerspaceController from "../controllers/hackerspace.controller";
import {
  createHackerspaceSchema,
  updateHackerspaceSchema,
} from "../schema/HackerspaceSchema";
import validate from "../middleware/validateResource";
import { auth } from "../middleware/authMiddleware";

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
