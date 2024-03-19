import { Request, Response } from "express";
import { Event } from "../model/Event";
import { EventRepo } from "../repository/EventRepo";

class EventController {
  async create(req: Request, res: Response) {
    try {
      const evt = new Event();
      evt.name = req.body.name;
      evt.description = req.body.description;

      await new EventRepo().save(evt);

      res.status(201).json({
        status: "Created!",
        message: "Successfully created event!",
      });
    } catch (error) {
      res.status(500).json({
        status: "Internal Server Error!",
        message: "Internal Server Error!",
      });
    }
  }
}

export default new EventController();
