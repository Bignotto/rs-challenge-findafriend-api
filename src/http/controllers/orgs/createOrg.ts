import { EmailInUseError } from "@/global/errors/EmailInUseError";
import { makeCreateOrgUseCase } from "@/useCases/factories/makeCreateOrgUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createOrg(request: FastifyRequest, reply: FastifyReply) {
  const newOrgSchema = z.object({
    name: z.string(),
    userName: z.string(),
    email: z.string(),
    password: z.string(),
    phone: z.string(),
    address: z.string(),
    cep: z.string(),
    city: z.string(),
    state: z.string(),
  });

  const { name, userName, email, password, phone, address, cep, city, state } =
    newOrgSchema.parse(request.body);

  try {
    const createOrgUseCase = makeCreateOrgUseCase();
    const { org } = await createOrgUseCase.execute({
      name,
      userName,
      email,
      password,
      phone,
      address,
      cep,
      city,
      state,
    });

    return reply.status(201).send({ org });
  } catch (error) {
    if (error instanceof EmailInUseError) {
      console.log({ error: error.message });
      return reply.status(409).send({ message: error.message });
    }
  }
}
