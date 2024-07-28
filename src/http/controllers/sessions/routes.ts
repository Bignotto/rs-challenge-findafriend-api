import { FastifyInstance } from "fastify";
import { authenticate } from "./authenticate";

export async function sessionRoutes(app: FastifyInstance) {
  app.post("/sessions", authenticate);
}
