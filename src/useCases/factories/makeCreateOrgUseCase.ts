import { PrismaOrgsRepository } from "@/repositories/orgs/prisma/prismaOrgsRepository";
import { CreateOrgUseCase } from "../orgs/createOrg";

export function makeCreateOrgUseCase() {
  const orgsRepository = new PrismaOrgsRepository();
  const createOrgUseCase = new CreateOrgUseCase(orgsRepository);

  return createOrgUseCase;
}
