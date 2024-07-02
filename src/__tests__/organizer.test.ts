import supertest from "supertest";
import { app } from "../app";
import { Sequelize } from "sequelize-typescript";
import config from "config";
import { Hackerspace } from "../models/hackerspace.model";
import { User } from "../models/user.model";
import { Session } from "../models/session.model";
import { HackerEvent } from "../models/hackerEvent.model";
import { Organizer } from "../models/organizer.model";
import { HackerEventOrganizer } from "../models/hackerEventOrganizer.model";
import logger from "../utils/logger";

describe("organizer", () => {
  let mockedSequelize: Sequelize;

  beforeEach(async () => {
    mockedSequelize = new Sequelize({
      database: config.get<string>("postgresDB"),
      host: config.get<string>("postgresHost"),
      port: config.get<number>("postgresPort"),
      username: config.get<string>("postgresUser"),
      password: config.get<string>("postgresPassword"),
      dialect: "postgres",
      models: [
        Hackerspace,
        User,
        Session,
        Organizer,
        HackerEvent,
        HackerEventOrganizer,
      ],
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
  describe("get organizer route", () => {
    describe("given the organizer does not exist", () => {
      it("should return a 404", async () => {
        const id = "222";

        await supertest(app).get(`/api/admin/organizers/${id}`).expect(404);
      });
    });
  });

  describe("create organizer route", () => {
    describe("given the user is not logged in", () => {
      it("should return a 403", async () => {
        const { statusCode } = await supertest(app).post(
          "/api/admin/organizers"
        );

        expect(statusCode).toBe(403);
      });
    });
  });
});
