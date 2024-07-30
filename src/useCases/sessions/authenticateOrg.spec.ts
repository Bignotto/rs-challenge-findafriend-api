import { InvalidCredentialsError } from "@/global/errors/InvalidCredentials";
import { InMemoryOrgsRepository } from "@/repositories/orgs/inMemory/inMemoryOrgsRepository";
import { hash } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";
import { AuthenticateOrgUseCase } from "./authenticateOrg";

let orgsRepository: InMemoryOrgsRepository;
let sut: AuthenticateOrgUseCase;

describe("Authenticate Org Use Case", () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository();
    sut = new AuthenticateOrgUseCase(orgsRepository);

    orgsRepository.create({
      address: "Av 51, 1000",
      cep: "13450-980",
      email: "petcollective@gmail.com",
      name: "Pet Collective",
      passwordHash: await hash("some password", 6),
      phone: "12345678901",
      userName: "June August",
      city: "River Clear",
      state: "SP",
    });
  });

  it("should be able to authenticate as an org", async () => {
    const { org } = await sut.execute({
      email: "petcollective@gmail.com",
      password: "some password",
    });

    expect(org.id).toEqual(expect.any(String));
  });

  it("should not be able to authenticate with wrong email", async () => {
    await expect(
      sut.execute({
        email: "wrong@gmail.com",
        password: "some password",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate with wrong password", async () => {
    await expect(
      sut.execute({
        email: "petcollective@gmail.com",
        password: "wrong password",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
