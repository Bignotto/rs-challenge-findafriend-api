import { InMemoryOrgsRepository } from "@/repositories/orgs/inMemory/inMemoryOrgsRepository";
import { Pet, Prisma } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { IPetsRepository, SearchPetsParams } from "../IPetsRepository";

export class InMemoryPetsRepository implements IPetsRepository {
  public pets: Pet[] = [];

  constructor(private orgsRepository?: InMemoryOrgsRepository) {}

  async create(data: Prisma.PetCreateInput) {
    const newPet: Pet = {
      about: data.about,
      energyLevel: data.energyLevel,
      environment: data.environment,
      humanDependencyLevel: data.humanDependencyLevel,
      name: data.name,
      id: randomUUID(),
      orgId: `${data.org.connect?.id}`,
      petAge: data.petAge,
      petSize: data.petSize,
    };

    this.pets.push(newPet);

    return newPet;
  }

  async findById(id: string) {
    const found = this.pets.find((pet) => pet.id === id);
    if (!found) return null;
    return found;
  }

  async getAll() {
    if (this.pets.length === 0) return null;
    return this.pets;
  }

  async search(params: SearchPetsParams) {
    if (!this.orgsRepository) return null;

    const cityOrgs = this.orgsRepository.orgs.filter(
      (org) => org.city === params.city,
    );

    //BIG: finish this function
  }
}
