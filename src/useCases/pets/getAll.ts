import { IPetsRepository } from "@/repositories/pets/IPetsRepository";
import { Pet } from "@prisma/client";

interface GetAllPetsResponse {
  pets: Pet[] | null;
}

export class GetAllPetsUseCase {
  constructor(private petsRepository: IPetsRepository) {}

  async execute(): Promise<GetAllPetsResponse> {
    const pets = await this.petsRepository.getAll();
    return { pets };
  }
}
