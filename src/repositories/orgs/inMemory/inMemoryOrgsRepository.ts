import { Org, Prisma } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { IOrgsRepository } from "../IOrgsRepository";

export class InMemoryOrgsRepository implements IOrgsRepository {
  public orgs: Org[] = [];

  async create(data: Prisma.OrgCreateInput) {
    const newOrg: Org = {
      id: randomUUID(),
      address: data.address,
      cep: data.cep,
      email: data.email,
      name: data.name,
      passwordHash: data.passwordHash,
      phone: data.phone,
      userName: data.userName,
      city: data.city,
      state: data.state,
    };

    this.orgs.push(newOrg);

    return newOrg;
  }

  async findByEmail(email: string) {
    const found = this.orgs.find((org) => org.email === email);

    if (!found) return null;

    return found;
  }

  async findById(id: string) {
    const found = this.orgs.find((org) => org.id === id);

    if (!found) return null;

    return found;
  }

  async findByPhone(phone: string) {
    const found = this.orgs.find((org) => org.phone === phone);

    if (!found) return null;

    return found;
  }
}
