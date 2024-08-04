import { PrismaOrgsRepository } from "@/repositories/orgs/prisma/prismaOrgsRepository";
import { PrismaPetsRepository } from "@/repositories/pets/prisma/prismaPetsRepository";
import { SearchPetsUseCase } from "../pets/searchPets";

export default function makeSearchPetUseCase() {
  const petsRepository = new PrismaPetsRepository();
  const orgsRepository = new PrismaOrgsRepository();
  const useCase = new SearchPetsUseCase(petsRepository, orgsRepository);

  return useCase;
}
