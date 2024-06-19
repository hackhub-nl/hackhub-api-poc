import supertest from "supertest";
// import createServer from "../utils/server";
import * as UserService from "../service/user.service";
import { app } from "../app";
// import { User } from "../models/user.model";

// const app = createServer();

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

describe("user", () => {
  describe("user registration", () => {
    describe("given the username and password are valid", () => {
      it("should return the user payload", async () => {
        const createUserServiceMock = jest
          .spyOn(UserService, "registerUser")
          // @ts-ignore
          .mockReturnValueOnce(userPayload);
        const { statusCode, body } = await supertest(app)
          .post("/api/users")
          .send(userInput);

        console.log(statusCode);
        console.log(body);
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
      it("should return a 400", async () => {});
    });

    describe("given the user service throws", () => {
      it("should return a 409 error", async () => {});
    });

    describe("create user session", () => {
      describe("given the username and password are valid", () => {
        it("should return a signed accessToken & refresh token", async () => {});
      });
    });
  });
});
