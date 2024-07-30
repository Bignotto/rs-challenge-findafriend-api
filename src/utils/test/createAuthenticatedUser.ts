import { FastifyInstance } from "fastify";
import request from "supertest";

export async function createAuthenticatedUser(app: FastifyInstance) {
  await request(app.server).post("/orgs").send({
    address: "Av 51, 1000",
    cep: "13450-980",
    email: "petcollective@gmail.com",
    name: "Pet Collective",
    password: "some password",
    phone: "12345678901",
    userName: "June August",
    city: "River Clear",
    state: "SP",
  });

  const authResponse = await request(app.server).post("/sessions").send({
    password: "some password",
    email: "petcollective@gmail.com",
  });

  const { token } = authResponse.body;
  return { token };
}
