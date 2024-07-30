import { PrismaPetsRepository } from "@/repositories/pets/prisma/prismaPetsRepository";
import { GetAllPetsUseCase } from "../pets/getAll";

export function makeGetAllPetsUseCase() {
  const petsRepository = new PrismaPetsRepository();
  const useCase = new GetAllPetsUseCase(petsRepository);

  return useCase;
}
