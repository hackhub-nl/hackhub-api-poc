import BaseRoutes from "./base/BaseRouter";
import EventController from "../Controller/EventController";
import validate from "../helper/validate";
import { createEventSchema } from "../schema/EventSchema";
import { updateHackerspaceSchema } from "../schema/HackerspaceSchema";

class EventRoutes extends BaseRoutes {
  public routes(): void {
    this.router.post("", validate(createEventSchema), EventController.create);
    this.router.patch("/:id", validate(updateHackerspaceSchema));
    this.router.delete("/:id", EventController.delete);
    this.router.get("", EventController.findAll);
    this.router.get("/:id", EventController.findById);
  }
}

export default new EventRoutes().router;
