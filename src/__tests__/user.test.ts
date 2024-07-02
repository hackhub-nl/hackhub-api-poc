import supertest from "supertest";
import * as UserService from "../service/user.service";
import * as SessionService from "../service/session.service";
import { app } from "../app";
import { loginUserSessionHandler } from "../controllers/session.controller";

const userPayload = {
  id: 1,
  email: "apple@test.com",
  name: "John Doe",
};

const userInput = {
  email: "apple@test.com",
  name: "John Doe",
  password: "Password123",
  passwordConfirmation: "Password123",
};

const sessionPayload = {
  userId: 1,
  valid: true,
  userAgent: "PostmanRuntime/7.39.0",
  createdAt: new Date("2024-06-18 15:41:55.856+02"),
  updatedAt: new Date("2024-06-18 15:41:55.856+02"),
};

describe("user", () => {
  describe("user registration", () => {
    describe("given the username and password are valid", () => {
      it("should return the user payload", async () => {
        const createUserServiceMock = jest
          .spyOn(UserService, "registerUser")
          // @ts-ignore
          .mockReturnValueOnce(userPayload);

        const { statusCode, body } = await supertest(app)
          .post("/api/admin/users")
          .send(userInput);

        expect(statusCode).toBe(200);

        expect(body).toEqual(userPayload);

        expect(createUserServiceMock).toHaveBeenCalledWith(
          userInput.email,
          userInput.name,
          userInput.password
        );
      });
    });

    describe("given the passwords do not match", () => {
      it("should return a 400", async () => {
        const createUserServiceMock = jest
          .spyOn(UserService, "registerUser")
          // @ts-ignore
          .mockReturnValueOnce(userPayload);

        const { statusCode } = await supertest(app)
          .post("/api/admin/users")
          .send({ ...userInput, passwordConfirmation: "does not match" });

        expect(statusCode).toBe(400);

        expect(createUserServiceMock).not.toHaveBeenCalled();
      });
    });

    describe("given the user service throws", () => {
      it("should return a 409 error", async () => {
        const createUserServiceMock = jest
          .spyOn(UserService, "registerUser")
          .mockRejectedValueOnce("rejected!");

        const { statusCode } = await supertest(app)
          .post("/api/admin/users")
          .send(userInput);

        expect(statusCode).toBe(409);

        expect(createUserServiceMock).toHaveBeenCalled();
      });
    });

    describe("create user session", () => {
      describe("given the username and password are valid", () => {
        it("should return a signed accessToken & refresh token", async () => {
          jest
            .spyOn(UserService, "validatePassword")
            // @ts-ignore
            .mockReturnValue(userPayload);

          jest
            .spyOn(SessionService, "loginSession")
            // @ts-ignore
            .mockReturnValue(sessionPayload);

          const req = {
            get: () => {
              return "a user agent";
            },
            body: {
              email: "apple@test.com",
              password: "Password123",
            },
          };

          const send = jest.fn();

          const res = {
            send,
          };

          // @ts-ignore
          await loginUserSessionHandler(req, res);

          expect(send).toHaveBeenCalledWith({
            accessToken: expect.any(String),
            refreshToken: expect.any(String),
          });
        });
      });
    });
  });
});
