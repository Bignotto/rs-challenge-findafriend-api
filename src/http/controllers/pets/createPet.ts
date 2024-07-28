import { NotFoundError } from "@/global/errors/NotFoundError";
import { makeCreatePetUseCase } from "@/useCases/factories/makeCreatePetUseCase";
import { PetAge, PetEnvironment, PetSize } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createPet(request: FastifyRequest, reply: FastifyReply) {
  const createPetSchema = z.object({
    name: z.string(),
    about: z.string(),
    petAge: z.nativeEnum(PetAge),
    petSize: z.nativeEnum(PetSize),
    energyLevel: z.number(),
    humanDependencyLevel: z.number(),
    orgId: z.string(),
    environment: z.nativeEnum(PetEnvironment),
  });

  const {
    name,
    about,
    petAge,
    petSize,
    energyLevel,
    humanDependencyLevel,
    orgId,
    environment,
  } = createPetSchema.parse(request.body);

  try {
    const createPetUseCase = makeCreatePetUseCase();
    const { pet } = await createPetUseCase.execute({
      name,
      about,
      petAge,
      petSize,
      energyLevel,
      environment,
      humanDependencyLevel,
      orgId,
    });

    return reply.status(201).send({ pet });
  } catch (error) {
    if (error instanceof NotFoundError) {
      return reply.status(404).send({ error: error.message });
    }

    throw error;
  }
}
