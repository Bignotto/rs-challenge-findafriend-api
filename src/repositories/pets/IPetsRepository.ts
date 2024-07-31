import { Pet, PetAge, PetEnvironment, PetSize, Prisma } from "@prisma/client";

export interface SearchPetsParams {
  city: string;
  petAge?: PetAge;
  petSize?: PetSize;
  energyLevel?: number;
  environment?: PetEnvironment;
  humanDependencyLevel?: number;
}

export interface IPetsRepository {
  create(data: Prisma.PetCreateInput): Promise<Pet>;

  findById(id: string): Promise<Pet | null>;

  getAll(): Promise<Pet[] | null>;
  search(params: SearchPetsParams): Promise<Pet[] | null>;
}
