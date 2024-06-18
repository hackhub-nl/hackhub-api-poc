import supertest from "supertest";
import { app } from "../app";
import { Sequelize } from "sequelize-typescript";
import config from "config";
import { Hackerspace } from "../models/hackerspace.model";
import { Event } from "../models/event.model";
import { User } from "../models/user.model";
import { Session } from "../models/session.model";
import logger from "../utils/logger";

describe("hackerspace", () => {
  let mockedSequelize: Sequelize;

  beforeEach(async () => {
    mockedSequelize = new Sequelize({
      database: config.get<string>("postgresDB"),
      host: config.get<string>("postgresHost"),
      port: config.get<number>("postgresPort"),
      username: config.get<string>("postgresUser"),
      password: config.get<string>("postgresPassword"),
      dialect: "postgres",
      models: [Hackerspace, Event, User, Session],
    });

    //await mockedSequelize.sync({ force: true });

    await mockedSequelize
      .authenticate()
      .then(() => {
        logger.info("DB connected");
      })
      .catch((err) => {
        logger.error("Could not connect to DB", err);
        process.exit(1);
      });

    await mockedSequelize
      ?.sync()
      .then(() => {
        logger.info("DB synced");
      })
      .catch((err) => {
        logger.error("Could not sync DB", err);
      });
  });

  afterAll(async () => {
    jest.clearAllMocks();
    await mockedSequelize.close();
  });

  describe("get hackerspace route", () => {
    describe("given the hackerspace does not exist", () => {
      it("should return a 404", async () => {
        const id = "123";

        await supertest(app).get(`/api/hackerspaces/${id}`).expect(404);
      });
    });
  });
});
