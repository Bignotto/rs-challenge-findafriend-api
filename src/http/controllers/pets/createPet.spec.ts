import { app } from "@/app";
import { createAuthenticatedUser } from "@/utils/test/createAuthenticatedUser";
import { PetAge, PetEnvironment, PetSize } from "@prisma/client";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Create Pet Controller", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create new pet", async () => {
    const { token } = await createAuthenticatedUser(app);

    const response = await request(app.server)
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

    expect(response.statusCode).toEqual(201);
  });
});
