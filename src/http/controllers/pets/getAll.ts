import { makeGetAllPetsUseCase } from "@/useCases/factories/makeGetAllPetsUseCase";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getAllPets(request: FastifyRequest, reply: FastifyReply) {
  try {
    const getAllPetsUseCase = makeGetAllPetsUseCase();
    const pets = await getAllPetsUseCase.execute();

    return reply.status(200).send(pets);
  } catch (error) {
    throw error;
  }
}
