import { verifyJwt } from "@/http/middlewares/verifyJwt";
import { FastifyInstance } from "fastify";
import { createPet } from "./createPet";

export async function petRoutes(app: FastifyInstance) {
  app.post("/pets", { onRequest: [verifyJwt] }, createPet);
}
