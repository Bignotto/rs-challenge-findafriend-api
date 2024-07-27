import { InvalidCredentialsError } from "@/global/errors/InvalidCredentials";
import { NotFoundError } from "@/global/errors/NotFoundError";
import { IOrgsRepository } from "@/repositories/orgs/IOrgsRepository";
import { Org } from "@prisma/client";
import { compare } from "bcryptjs";

interface AuthenticateOrgRequest {
  email: string;
  password: string;
}

interface AuthenticateOrgResponse {
  org: Org;
}

export class AuthenticateOrgUseCase {
  constructor(private orgsRepository: IOrgsRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateOrgRequest): Promise<AuthenticateOrgResponse> {
    const foundOrg = await this.orgsRepository.findByEmail(email);

    if (!foundOrg) throw new NotFoundError();

    const passwordMatch = await compare(password, foundOrg.passwordHash);
    if (!passwordMatch) throw new InvalidCredentialsError();

    return { org: foundOrg };
  }
}
