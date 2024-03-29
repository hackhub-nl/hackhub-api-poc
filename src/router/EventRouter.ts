import BaseRoutes from "./base/BaseRouter";
import EventController from "../controller/EventController";
import validate from "../middleware/validateResource";
import { createEventSchema, updateEventSchema } from "../schema/EventSchema";
import { auth } from "../middleware/AuthMiddleware";

class EventRoutes extends BaseRoutes {
  public routes(): void {
    this.router.post(
      "",
      auth,
      validate(createEventSchema),
      EventController.create
    );
    this.router.patch(
      "/:id",
      auth,
      validate(updateEventSchema),
      EventController.update
    );
    this.router.delete("/:id", auth, EventController.delete);
    this.router.get("", auth, EventController.findAll);
    this.router.get("/:id", auth, EventController.findById);
  }
}

export default new EventRoutes().router;
