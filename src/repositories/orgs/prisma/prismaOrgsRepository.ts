import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { IOrgsRepository } from "../IOrgsRepository";

export class PrismaOrgsRepository implements IOrgsRepository {
  async create(data: Prisma.OrgCreateInput) {
    const org = await prisma.org.create({ data });
    return org;
  }
  async findByEmail(email: string) {
    const found = await prisma.org.findUnique({
      where: {
        email,
      },
    });

    return found;
  }
  async findById(id: string) {
    const found = await prisma.org.findUnique({
      where: {
        id,
      },
    });

    return found;
  }
}
