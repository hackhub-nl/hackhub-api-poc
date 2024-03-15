import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";
dotenv.config();

class Database {
  public sequelize: Sequelize | undefined;

  private POSTGRES_DB = process.env.POSTGRES_DB as string;
  private POSTGRES_HOST = process.env.HOST as string;
  private POSTGRES_PORT = process.env.PORT as unknown as number;
  private POSTGRES_USER = process.env.USER as string;
  private POSTGRES_PASSWORD = process.env.PASSWORD as string;

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
