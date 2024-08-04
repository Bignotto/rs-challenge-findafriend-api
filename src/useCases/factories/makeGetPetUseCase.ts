import { PrismaPetsRepository } from "@/repositories/pets/prisma/prismaPetsRepository";
import { GetPetUseCase } from "../pets/getPet";

export function makeGetPetsUseCase() {
  const petsRepository = new PrismaPetsRepository();
  const useCase = new GetPetUseCase(petsRepository);

  return useCase;
}
