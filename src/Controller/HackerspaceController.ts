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
}
