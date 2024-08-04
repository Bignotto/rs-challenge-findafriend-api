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

  it("should be able to get pet information with a pet id", async () => {
    const { token } = await createAuthenticatedUser(app, {});

    const newPetResponse = await request(app.server)
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

    const response = await request(app.server).get(
      `/pets/${newPetResponse.body.pet.id}`,
    );

    expect(response.statusCode).toEqual(200);
    expect(response.body.pet.name).toEqual("Caramelo");
  });
});
