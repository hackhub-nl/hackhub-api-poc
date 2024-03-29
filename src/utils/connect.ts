import { Sequelize } from "sequelize-typescript";
import { Hackerspace } from "../model/Hackerspace";
import { Event } from "../model/Event";
import { User } from "../model/User";
import config from "config";
import logger from "./logger";

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
      models: [Hackerspace, Event, User],
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
