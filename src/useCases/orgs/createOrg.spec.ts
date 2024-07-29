import { InMemoryOrgsRepository } from "@/repositories/orgs/inMemory/inMemoryOrgsRepository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateOrgUseCase } from "./createOrg";

let orgsRepository: InMemoryOrgsRepository;
let sut: CreateOrgUseCase;

describe("Create Org Use Case", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    sut = new CreateOrgUseCase(orgsRepository);
  });

  it("should be able to create new org", async () => {
    const { org } = await sut.execute({
      address: "Av 51, 1000",
      cep: "13450-980",
      email: "petcollective@gmail.com",
      name: "Pet Collective",
      password: "some password",
      phone: "12345678901",
      userName: "June August",
      city: "River Clear",
      state: "SP",
    });

    expect(org.id).toEqual(expect.any(String));
  });
});
