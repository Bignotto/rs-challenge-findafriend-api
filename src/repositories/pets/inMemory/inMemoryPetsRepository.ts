import { Pet, Prisma } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { IPetsRepository } from "../IPetsRepository";

export class InMemoryPetsRepository implements IPetsRepository {
  public pets: Pet[] = [];

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
}
