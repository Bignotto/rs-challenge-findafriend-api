import { app } from "@/app";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Create Org Controller", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a new org", async () => {
    const response = await request(app.server).post("/orgs").send({
      address: "Av 51, 1000",
      cep: "13450-980",
      email: "petcollective@gmail.com",
      name: "Pet Collective",
      password: "some password",
      phone: "12345678901",
      userName: "June August",
    });

    expect(response.statusCode).toEqual(201);
  });
});
