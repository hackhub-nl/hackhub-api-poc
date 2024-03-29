import { Sequelize } from "sequelize-typescript";
import { Hackerspace } from "../models/hackerspace.model";
import { Event } from "../models/event.model";
import { User } from "../models/user.model";
import config from "config";
import logger from "./logger";
import { Session } from "../models/session.model";

class Database {
  public sequelize: Sequelize | undefined;

  constructor() {
    this.connectToPostgreSQL();
  }

  private async connectToPostgreSQL() {
    this.sequelize = new Sequelize({
      database: config.get<string>("postgresDB"),
      host: config.get<string>("postgresHost"),
      port: config.get<number>("postgresPort"),
      username: config.get<string>("postgresUser"),
      password: config.get<string>("postgresPassword"),
      dialect: "postgres",
      models: [Hackerspace, Event, User, Session],
    });

    await this.sequelize
      .authenticate()
      .then(() => {
        logger.info("Connected to the database");
      })
      .catch((err) => {
        logger.error("Unable to conned to the database", err);
      });
  }
}

export default Database;
