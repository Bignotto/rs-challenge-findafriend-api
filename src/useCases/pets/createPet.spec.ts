import { NotFoundError } from "@/global/errors/NotFoundError";
import { InMemoryOrgsRepository } from "@/repositories/orgs/inMemory/inMemoryOrgsRepository";
import { InMemoryPetsRepository } from "@/repositories/pets/inMemory/inMemoryPetsRepository";
import { Org, PetAge, PetEnvironment, PetSize } from "@prisma/client";
import { hash } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";
import { CreatePetUseCase } from "./createPet";

let petsRepository: InMemoryPetsRepository;
let sut: CreatePetUseCase;

let orgsRepository: InMemoryOrgsRepository;
let org: Org;

describe("Create Pet Use Case", () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository();
    orgsRepository = new InMemoryOrgsRepository();
    sut = new CreatePetUseCase(petsRepository, orgsRepository);

    org = await orgsRepository.create({
      id: "1",
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

  it("should be able to create a new pet", async () => {
    const { pet } = await sut.execute({
      about: "some about",
      energyLevel: 5,
      environment: PetEnvironment.MEDIUM,
      humanDependencyLevel: 3,
      name: "Caramelo",
      orgId: org.id,
      petAge: PetAge.MIDAGE,
      petSize: PetSize.SMALL,
    });

    expect(pet.id).toEqual(expect.any(String));
  });

  it("should not be able to create new pet with invalid org id", async () => {
    await expect(
      sut.execute({
        about: "some about",
        energyLevel: 5,
        environment: PetEnvironment.MEDIUM,
        humanDependencyLevel: 3,
        name: "Caramelo",
        orgId: "wrong org id",
        petAge: PetAge.MIDAGE,
        petSize: PetSize.SMALL,
      }),
    ).rejects.toBeInstanceOf(NotFoundError);
  });
}); //describe
