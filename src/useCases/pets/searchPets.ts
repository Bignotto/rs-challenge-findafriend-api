import { IOrgsRepository } from "@/repositories/orgs/IOrgsRepository";
import {
  IPetsRepository,
  SearchPetsParams,
} from "@/repositories/pets/IPetsRepository";
import { Pet } from "@prisma/client";

export interface SearchPetsResponse {
  pets: Pet[] | null;
}

export class SearchPetUseCase {
  constructor(
    private petsRepository: IPetsRepository,
    private orgsRepository: IOrgsRepository,
  ) {}

  async execute({
    city,
    petAge,
    petSize,
    energyLevel,
    environment,
    humanDependencyLevel,
  }: SearchPetsParams): Promise<SearchPetsResponse> {
    const petsFound = await this.petsRepository.search({
      city,
      petAge,
      petSize,
      energyLevel,
      environment,
      humanDependencyLevel,
    });

    return {
      pets: petsFound,
    };
  }
}
