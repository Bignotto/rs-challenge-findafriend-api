import { app } from "@/app";
import { createMorePets } from "@/utils/test/createMorePets";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Get Pet Controller", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to get all pets from a city", async () => {
    await createMorePets(app);

    const response = await request(app.server)
      .get("/pets/search")
      .query({ city: "River Clear" });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveLength(2);

    const otherResponse = await request(app.server)
      .get("/pets/search")
      .query({ city: "Limefields" });

    expect(otherResponse.statusCode).toEqual(200);
    expect(otherResponse.body).toHaveLength(2);
  });
});
