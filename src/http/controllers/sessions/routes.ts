import { FastifyInstance } from "fastify";
import { authenticate } from "./authenticate";
import { refreshToken } from "./refresh";

export async function sessionRoutes(app: FastifyInstance) {
  app.post("/sessions", authenticate);
  app.post("/sessions/refresh", refreshToken);
}
