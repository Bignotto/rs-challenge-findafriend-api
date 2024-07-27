import { IPetsRepository } from "@/repositories/pets/IPetsRepository";
import { Pet, PetAge, PetEnvironment, PetSize } from "@prisma/client";

interface CreatePetRequest {
  name: string;
  about: string;
  petAge: PetAge;
  petSize: PetSize;
  energyLevel: number;
  humanDependencyLevel: number;
  environment: PetEnvironment;
  orgId: string;
}

interface CreatePetResponse {
  pet: Pet;
}

export class CreatePetUseCase {
  constructor(private petsRepository: IPetsRepository) {}

  async execute({
    name,
    about,
    petAge,
    petSize,
    energyLevel,
    environment,
    humanDependencyLevel,
    orgId,
  }: CreatePetRequest): Promise<CreatePetResponse> {
    const pet = await this.petsRepository.create({
      about,
      energyLevel,
      environment,
      name,
      petAge,
      petSize,
      humanDependencyLevel,
      org: {
        connect: {
          id: orgId,
        },
      },
    });

    return { pet };
  }
}
