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
import { createHackerspace } from "../service/hackerspace.service";
import { signJwt } from "../utils/jwt.utils";

const userPayload = {
  id: 1,
  email: "apple@test.com",
  password: "Password123",
  passwordConfirmation: "Password123",
  name: "John Doe",
};

const hackerspacePayload = {
  userId: 1,
  name: "Space2",
  city: "City2",
};

describe("hackerSpace", () => {
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

  describe("get hackerSpace route", () => {
    describe("given the hackerSpace does not exist", () => {
      it("should return a 404", async () => {
        const id = "123";

        await supertest(app).get(`/api/admin/hackerspaces/${id}`).expect(404);
      });
    });

    // describe("given the hackerspace does exist", () => {
    //   it("should return a 200 status and the hackerspace", async () => {
    //     const hspace = await createHackerspace(1, "Hack42", "Arnhem");

    //     const { body, statusCode } = await supertest(app).get(
    //       `/api/hackerspaces/${hspace.id}`
    //     );

    //     expect(statusCode).toBe(200);

    //     expect(body.id).toBe(hspace.id);
    //   });
    // });
  });

  describe("create hackerSpace route", () => {
    describe("given the user is not logged in", () => {
      it("should return a 403", async () => {
        const { statusCode } = await supertest(app).post("/api/admin/hackerspaces");

        expect(statusCode).toBe(403);
      });
    });

    // describe("given the user is logged in", () => {
    //   it("should return a 200 and create the hackerspace", async () => {
    //     const jwt = signJwt(userPayload);

    //     const { statusCode, body } = await supertest(app)
    //       .post("/api/hackerspaces")
    //       .set("Authorization", `Bearer ${jwt}`)
    //       .send(hackerspacePayload);

    //     expect(statusCode).toBe(200);

    //     expect(body).toEqual({
    //       id: expect.any(Number),
    //       createdAt: expect.any(String),
    //       updatedAt: expect.any(String),
    //       userId: 1,
    //       name: "Space2",
    //       city: "City2",
    //     });
    //   });
    // });
  });
});
