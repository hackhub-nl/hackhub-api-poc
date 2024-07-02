import supertest from "supertest";
import { app } from "../app";

describe("organizer", () => {
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
        const { statusCode } = await supertest(app).post("/api/admin/organizers");

        expect(statusCode).toBe(403);
      });
    });
  });
});
