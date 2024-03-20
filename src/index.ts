import express, { Application, Request, Response } from "express";
import Database from "./config/database";
import HackerspaceRouter from "./router/HackerspaceRouter";
import EventRouter from "./router/EventRouter";

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.databaseSync();
    this.plugins();
    this.routes();
  }

  protected plugins(): void {
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
    this.app.use("/api/v1/hackerspace", HackerspaceRouter);
    this.app.use("/api/v1/event", EventRouter);
  }
}

const port: number = 7000;
const app = new App().app;

app.listen(port, () => {
  console.log("Server started!");
});
