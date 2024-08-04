import { app } from "@/app";
import { createAuthenticatedUser } from "@/utils/test/createAuthenticatedUser";
import { PetAge, PetEnvironment, PetSize } from "@prisma/client";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Get Pet Controller", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to get all pets", async () => {
    const { token } = await createAuthenticatedUser(app, {});

    await request(app.server)
      .post("/pets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        about: "some about",
        energyLevel: 5,
        environment: PetEnvironment.MEDIUM,
        humanDependencyLevel: 3,
        name: "Caramelo",
        petAge: PetAge.MIDAGE,
        petSize: PetSize.SMALL,
      });

    await request(app.server)
      .post("/pets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        about: "some about",
        energyLevel: 5,
        environment: PetEnvironment.MEDIUM,
        humanDependencyLevel: 3,
        name: "Caramelo",
        petAge: PetAge.MIDAGE,
        petSize: PetSize.SMALL,
      });

    const response = await request(app.server).get("/pets");

    expect(response.statusCode).toEqual(200);
    expect(response.body.pets).toHaveLength(2);
  });
});
