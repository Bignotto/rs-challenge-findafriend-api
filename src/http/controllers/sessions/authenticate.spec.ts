import { app } from "@/app";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Authenticate Org Controller", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to get an access token with email and password", async () => {
    await request(app.server).post("/orgs").send({
      address: "Av 51, 1000",
      cep: "13450-980",
      email: "a@b.c",
      name: "Pet Collective",
      password: "password",
      phone: "12345678901",
      userName: "June August",
      city: "River Clear",
      state: "SP",
    });

    const response = await request(app.server).post("/sessions").send({
      email: "a@b.c",
      password: "password",
    });

    expect(response.status).toBe(200);
    expect(response.body.token).toEqual(expect.any(String));
  });
});
