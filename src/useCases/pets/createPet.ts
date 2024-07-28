import { NotFoundError } from "@/global/errors/NotFoundError";
import { IOrgsRepository } from "@/repositories/orgs/IOrgsRepository";
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
  constructor(
    private petsRepository: IPetsRepository,
    private orgsRepository: IOrgsRepository,
  ) {}

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
    const org = await this.orgsRepository.findById(orgId);
    if (!org) throw new NotFoundError();

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
