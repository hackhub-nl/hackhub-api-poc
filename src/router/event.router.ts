import BaseRoutes from "./base/base.router";
import EventController from "../controllers/event.controller";
import validate from "../middlewares/validateResource";
import { createEventSchema, updateEventSchema } from "../schema/event.schema";
import { auth } from "../middlewares/auth";

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
