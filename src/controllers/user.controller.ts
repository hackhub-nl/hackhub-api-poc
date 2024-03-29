import { Request, Response } from "express";
import { UserService } from "../services/user.service";

class UserController {
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const token = await new UserService().login(email, password);

      if (token === "") {
        return res.status(400).json({
          status: "Bad request!",
          message: "Wrong email or password!",
        });
      }
      const res_token = { type: "Bearer", token: token };

      return res.status(200).json({
        status: "Ok!",
        message: "Successfully logged in!",
        result: res_token,
      });
    } catch (error) {
      return res.status(500).json({
        status: "Internal server error!",
        message: "Internal server error!",
      });
    }
  }
  async register(req: Request, res: Response) {
    try {
      const { name, username, email, password } = req.body;
      await new UserService().register(email, password, name, username);

      return res.status(200).json({
        status: "Ok!",
        message: "Successfully registered!",
      });
    } catch (error) {
      return res.status(500).json({
        status: "Internal server error!",
        message: "Internal server error!",
      });
    }
  }
}

export default new UserController();