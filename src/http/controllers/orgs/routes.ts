import { FastifyInstance } from "fastify";
import { createOrg } from "./createOrg";

export async function orgRoutes(app: FastifyInstance) {
  app.post("/orgs", createOrg);
}
