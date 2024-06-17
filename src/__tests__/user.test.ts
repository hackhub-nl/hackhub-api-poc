// import supertest from "supertest";
// import createServer from "../utils/server";
// import * as UserService from "../service/user.service";
// import { User } from "../models/user.model";

// const app = createServer();

// const userId = User.USER_ID;

// const userPayload = {
//   id: userId,
//   email: "john.doe@example.com",
//   name: "John Doe",
// };

// const userInput = {
//   email: "test@example.com",
//   name: "John Doe",
//   password: "Password123",
//   passwordConfirmation: "Password123",
// };

describe("user", () => {
  describe("user registration", () => {
    describe("given the username and password are valid", () => {
      it("should return the user payload", async () => {
        //         const createUserServiceMock = jest
        //           .spyOn(UserService, "registerUser")
        //           // @ts-ignore
        //           .mockReturnValueOnce(userPayload);
        //         const { statusCode, body } = await supertest(app)
        //           .post("/api/users")
        //           .send(userInput);
        //         expect(statusCode).toBe(200);
        //         expect(body).toEqual(userPayload);
        //         expect(createUserServiceMock).toHaveBeenCalledWith(userInput);
      });
    });
  });
});
