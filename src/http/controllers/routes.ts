import { FastifyInstance } from "fastify";
import { createOrg } from "./createOrg";

export async function userRoutes(app: FastifyInstance) {
  app.post("/orgs", createOrg);
}
