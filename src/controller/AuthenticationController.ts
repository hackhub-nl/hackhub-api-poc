import { Request, Response } from "express";
import { AuthenticationService } from "../service/Authentication";

export class AuthenticationController {
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const token = await new AuthenticationService().login(email, password);
      if (token === "") {
        return res.status(400).json({
          status: "Bad request!",
          message: "Wrong email or password!",
        });
      }
      return res.status(500).json({
        status: "Ok!",
        message: "Successfully logged in!",
      });
    } catch (error) {
      return res.status(500).json({
        status: "Internal server error!",
        message: "Internal server error!",
      });
    }
  }
  async register(req: Request, res: Response) {}
}
