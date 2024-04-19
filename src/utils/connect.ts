import { Sequelize } from "sequelize-typescript";
import config from "config";
import logger from "./logger";
import { Hackerspace } from "../models/hackerspace.model";
import { Event } from "../models/event.model";
import { User } from "../models/user.model";
import { Session } from "../models/session.model";

async function connect() {
  const sequelize = new Sequelize({
    database: config.get<string>("postgresDB"),
    host: config.get<string>("postgresHost"),
    port: config.get<number>("postgresPort"),
    username: config.get<string>("postgresUser"),
    password: config.get<string>("postgresPassword"),
    dialect: "postgres",
    models: [Hackerspace, Event, User, Session],
  });

  try {
    await sequelize.authenticate();
    logger.info("DB connected");
  } catch (error) {
    logger.error("Could not connect to DB");
    process.exit(1);
  }
}

export default connect;
