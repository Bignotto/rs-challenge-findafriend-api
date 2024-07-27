import { IOrgsRepository } from "@/repositories/orgs/IOrgsRepository";
import { Org } from "@prisma/client";
import { hash } from "bcryptjs";

interface CreateOrgRequest {
  name: string;
  userName: string;
  email: string;
  phone: string;
  password: string;
  cep: string;
  address: string;
}

interface CreateOrgResponse {
  org: Org;
}

export class CreateOrgUseCase {
  constructor(private orgsRepository: IOrgsRepository) {}

  async execute({
    name,
    userName,
    email,
    phone,
    password,
    cep,
    address,
  }: CreateOrgRequest): Promise<CreateOrgResponse> {
    //if (password.length < 6) throw new PasswordLengthError();
    const passwordHash = await hash(password, 6);

    const org = await this.orgsRepository.create({
      address,
      name,
      userName,
      email,
      phone,
      passwordHash,
      cep,
    });

    return { org };
  }
}
