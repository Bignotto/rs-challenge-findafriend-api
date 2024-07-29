import { EmailInUseError } from "@/global/errors/EmailInUseError";
import { IOrgsRepository } from "@/repositories/orgs/IOrgsRepository";
import { Org } from "@prisma/client";
import { hash } from "bcryptjs";
import { NoAddressError } from "./errors/NoAddressError";
import { NoPhoneError } from "./errors/NoPhoneError";

interface CreateOrgRequest {
  name: string;
  userName: string;
  email: string;
  phone: string;
  password: string;
  cep: string;
  address: string;
  city: string;
  state: string;
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
    city,
    state,
  }: CreateOrgRequest): Promise<CreateOrgResponse> {
    if (!phone) throw new NoPhoneError();
    if (!address || !cep) throw new NoAddressError();

    const found = await this.orgsRepository.findByEmail(email);
    if (found) throw new EmailInUseError();

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
      city,
      state,
    });

    return { org };
  }
}
