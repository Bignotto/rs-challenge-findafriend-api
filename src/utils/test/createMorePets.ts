import { PetAge, PetEnvironment, PetSize } from "@prisma/client";
import { FastifyInstance } from "fastify";
import request from "supertest";
import { createAuthenticatedUser } from "./createAuthenticatedUser";

export async function createMorePets(app: FastifyInstance) {
  const { token } = await createAuthenticatedUser(app, { city: "Limefields" });

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

  const { token: newToken } = await createAuthenticatedUser(app, {
    city: "River Clear",
    email: "new@mail.com",
    phone: "12335469400",
  });

  await request(app.server)
    .post("/pets")
    .set("Authorization", `Bearer ${newToken}`)
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
    .set("Authorization", `Bearer ${newToken}`)
    .send({
      about: "some about",
      energyLevel: 5,
      environment: PetEnvironment.MEDIUM,
      humanDependencyLevel: 3,
      name: "Caramelo",
      petAge: PetAge.MIDAGE,
      petSize: PetSize.SMALL,
    });
}
