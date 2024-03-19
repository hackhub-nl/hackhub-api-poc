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
    } catch (err) {
      res.status(500).json({
        status: "Internal Server Error!",
        message: "Internal Server Error!",
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      let id = parseInt(req.params["id"]);
      await new EventRepo().delete(id);

      res.status(200).json({
        status: "Ok!",
        message: "Successfully deleted event!",
      });
    } catch (err) {
      res.status(500).json({
        status: "Internal Server Error!",
        message: "Internal Server Error!",
      });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      let id = parseInt(req.params["id"]);
      const evt = await new EventRepo().retrieveById(id);

      res.status(200).json({
        status: "Ok!",
        message: "Successfully fetched event by id!",
        data: evt,
      });
    } catch (err) {
      res.status(500).json({
        status: "Internal Server Error!",
        message: "Internal Server Error!",
      });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const evt = await new EventRepo().retrieveAll();

      res.status(200).json({
        status: "Ok!",
        message: "Successfully fetched all events!",
        data: evt,
      });
    } catch (err) {
      res.status(500).json({
        status: "Internal Server Error!",
        message: "Internal Server Error!",
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      let id = parseInt(req.params["id"]);
      const evt = new Event();
      evt.id = id;
      evt.name = req.body.name;
      evt.description = req.body.description;

      await new EventRepo().update(evt);

      res.status(200).json({
        status: "Ok!",
        message: "Successfully updated event!",
      });
    } catch (err) {
      res.status(500).json({
        status: "Internal Server Error!",
        message: "Internal Server Error!",
      });
    }
  }
}

export default new EventController();
