import { makeGetPetsUseCase } from "@/useCases/factories/makeGetPetUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getPet(request: FastifyRequest, reply: FastifyReply) {
  const getPetSchema = z.object({
    petId: z.string(),
  });

  const { petId } = getPetSchema.parse(request.params);

  try {
    const getPetUseCase = makeGetPetsUseCase();
    const { pet } = await getPetUseCase.execute({ petId });

    if (!pet) return reply.status(404).send({ error: "not found" });

    return reply.status(200).send({ pet });
  } catch (error) {}
}
