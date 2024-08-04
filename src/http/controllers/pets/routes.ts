import { verifyJwt } from "@/http/middlewares/verifyJwt";
import { FastifyInstance } from "fastify";
import { createPet } from "./createPet";
import { getAllPets } from "./getAll";
import { getPet } from "./getPet";
import { searchPet } from "./searchPet";

export async function petRoutes(app: FastifyInstance) {
  app.post("/pets", { onRequest: [verifyJwt] }, createPet);

  app.get("/pets", getAllPets);
  app.get("/pets/:petId", getPet);

  app.get("/pets/search", searchPet);

  // app.post("/pets", createPet);
}
