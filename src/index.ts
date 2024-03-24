import express, { Application, Request, Response } from "express";
import Database from "./config/database";
import HackerspaceRouter from "./router/HackerspaceRouter";
import EventRouter from "./router/EventRouter";
import cors from "cors";

class App {
  public app: Application;
  private CLIENT_URL = process.env.CLIENT_URL as string;

  constructor() {
    this.app = express();
    this.databaseSync();
    this.plugins();
    this.routes();
  }

  protected plugins(): void {
    this.app.use(
      cors({
        origin: this.CLIENT_URL,
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
  }
}

const port: number = 7000;
const app = new App().app;

app.listen(port, () => {
  console.log("Server started!");
});
