import makeSearchPetUseCase from "@/useCases/factories/makeSearchPetUseCase";
import { PetAge, PetEnvironment, PetSize } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function searchPet(request: FastifyRequest, reply: FastifyReply) {
  const searchPetSchema = z.object({
    city: z.string(),
    petAge: z.nativeEnum(PetAge).optional(),
    petSize: z.nativeEnum(PetSize).optional(),
    energyLevel: z.number().optional(),
    environment: z.nativeEnum(PetEnvironment).optional(),
    humanDependencyLevel: z.number().optional(),
  });

  const {
    city,
    petAge,
    petSize,
    energyLevel,
    environment,
    humanDependencyLevel,
  } = searchPetSchema.parse(request.query);

  try {
    const searchPetUseCase = makeSearchPetUseCase();
    const { pets } = await searchPetUseCase.execute({
      city,
      petAge,
      petSize,
      energyLevel,
      environment,
      humanDependencyLevel,
    });

    return reply.status(200).send(pets);
  } catch (error) {}
}
