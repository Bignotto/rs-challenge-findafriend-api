import { IPetsRepository } from "@/repositories/pets/IPetsRepository";
import { Pet } from "@prisma/client";

interface GetPetRequest {
  petId: string;
}

interface GetPetResponse {
  pet: Pet | null;
}

export class GetPetUseCase {
  constructor(private petsRepository: IPetsRepository) {}

  async execute({ petId }: GetPetRequest): Promise<GetPetResponse> {
    const pet = await this.petsRepository.findById(petId);
    return { pet };
  }
}
