import { Router } from "express";
import IRouter from "./RouterInterface";

abstract class BaseRoutes implements IRouter {
  public router: Router;
  constructor() {
    this.router = Router();
    this.routes();
  }

  routes(): void {
    throw new Error("Method not implemented.");
  }
}

export default BaseRoutes;