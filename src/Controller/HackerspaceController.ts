import { Request, Response } from "express";
import { Hackerspace } from "../model/Hackerspace";
import { HackerspaceRepo } from "../repository/HackerspaceRepo";

class HackerspaceController {
  async create(req: Request, res: Response) {
    try {
      const hspace = new Hackerspace();
      hspace.name = req.body.name;
      hspace.city = req.body.city;

      await new HackerspaceRepo().save(hspace);

      res.status(500).json({
        status: "Created!",
        message: "Successfully created hackerspace!",
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
        await new HackerspaceRepo().delete(id);

      res.status(200).json({
        status: "Ok!",
        message: "Successfully deleted hackerspace!",
      });
    } catch (err) {
      res.status(500).json({
        status: "Internal Server Error!",
        message: "Internal Server Error!",
      });
    }
  }

  async findAll(req:Request, res:Response) {
    try {
      const hspace = await new HackerspaceRepo().retrieveAll()

      res.status(200).json({
        status: "Ok!",
        message: "Successfully fetched all hackerspaces!",
        data: hspace
      });
    } catch (err) {
      res.status(500).json({
        status: "Internal Server Error!",
        message: "Internal Server Error!",
      });
    }
  }

  async findById(req:Request,res:Response) {
    try {
        let id = parseInt(req.params["id"]);
        const hspace = await new HackerspaceRepo().retrieveById(id)
  
        res.status(200).json({
          status: "Ok!",
          message: "Successfully fetched hackerspace by id!",
          data: hspace
        });
      } catch (err) {
        res.status(500).json({
          status: "Internal Server Error!",
          message: "Internal Server Error!",
        });
      }
  }
}
