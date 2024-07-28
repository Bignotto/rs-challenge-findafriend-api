import { PrismaOrgsRepository } from "@/repositories/orgs/prisma/prismaOrgsRepository";
import { PrismaPetsRepository } from "@/repositories/pets/prisma/prismaPetsRepository";
import { CreatePetUseCase } from "../pets/createPet";

export function makeCreatePetUseCase() {
  const petsRepository = new PrismaPetsRepository();
  const orgsRepository = new PrismaOrgsRepository();

  const useCase = new CreatePetUseCase(petsRepository, orgsRepository);

  return useCase;
}
