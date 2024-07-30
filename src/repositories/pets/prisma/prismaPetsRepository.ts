import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { IPetsRepository } from "../IPetsRepository";

export class PrismaPetsRepository implements IPetsRepository {
  async create(data: Prisma.PetCreateInput) {
    const newPet = await prisma.pet.create({ data });
    return newPet;
  }

  async findById(id: string) {
    const foundPet = await prisma.pet.findUnique({
      where: {
        id,
      },
    });
    return foundPet;
  }

  async getAll() {
    const found = await prisma.pet.findMany();
    return found;
  }
}
