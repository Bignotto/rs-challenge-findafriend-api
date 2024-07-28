import { PrismaOrgsRepository } from "@/repositories/orgs/prisma/prismaOrgsRepository";
import { AuthenticateOrgUseCase } from "../sessions/authenticateOrg";

export function makeAuthenticateUseCase() {
  const orgsRepository = new PrismaOrgsRepository();
  const authenticateUseCase = new AuthenticateOrgUseCase(orgsRepository);

  return authenticateUseCase;
}
