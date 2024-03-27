import { Sequelize } from "sequelize-typescript";
import * as dotenv from "dotenv";
import { Hackerspace } from "../model/Hackerspace";
import { Event } from "../model/Event";
import { User } from "../model/User";
dotenv.config();

class Database {
  public sequelize: Sequelize | undefined;

  private POSTGRES_DB = process.env.POSTGRES_DB as string;
  private POSTGRES_HOST = process.env.POSTGRES_HOST as string;
  private POSTGRES_PORT = process.env.POSTGRES_PORT as unknown as number;
  private POSTGRES_USER = process.env.POSTGRES_USER as string;
  private POSTGRES_PASSWORD = process.env
    .POSTGRES_PASSWORD as unknown as string;

  constructor() {
    this.connectToPostgreSQL();
  }

  private async connectToPostgreSQL() {
    this.sequelize = new Sequelize({
      database: this.POSTGRES_DB,
      host: this.POSTGRES_HOST,
      port: this.POSTGRES_PORT,
      username: this.POSTGRES_USER,
      password: this.POSTGRES_PASSWORD,
      dialect: "postgres",
      models: [Hackerspace, Event, User],
    });

    await this.sequelize
      .authenticate()
      .then(() => {
        console.log("Connected to the database!");
      })
      .catch((err) => {
        console.log("Unable to conned to the database!", err);
      });
  }
}

export default Database;
