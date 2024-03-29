import express, { Application, Request, Response } from "express";
import Database from "./utils/connect";
import HackerspaceRouter from "./router/HackerspaceRouter";
import EventRouter from "./router/EventRouter";
import cors from "cors";
import AuthenticationRouter from "./router/AuthenticationRouter";
import config from "config";
import logger from "./utils/logger";

class App {
  public app: Application;
  private clientUri: string = config.get<string>("clientUri");

  constructor() {
    this.app = express();
    this.databaseSync();
    this.plugins();
    this.routes();
  }

  protected plugins(): void {
    this.app.use(
      cors({
        origin: this.clientUri,
        credentials: true,
      })
    );
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  protected databaseSync(): void {
    const db = new Database();
    db.sequelize?.sync();
  }

  protected routes(): void {
    this.app.route("/").get((req: Request, res: Response) => {
      res.send("Home route");
    });
    this.app.use("/api/v1/hackerspaces", HackerspaceRouter);
    this.app.use("/api/v1/events", EventRouter);
    this.app.use("/api/v1/auth", AuthenticationRouter);
  }
}

const host = config.get<string>("host");
const port = config.get<number>("port");
const app = new App().app;

app.listen(port, async () => {
  logger.info(`App is running at http://${host}:${port}`);
});
