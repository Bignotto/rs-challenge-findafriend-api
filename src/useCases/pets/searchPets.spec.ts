import { InMemoryOrgsRepository } from "@/repositories/orgs/inMemory/inMemoryOrgsRepository";
import { InMemoryPetsRepository } from "@/repositories/pets/inMemory/inMemoryPetsRepository";
import { Org, PetAge, PetEnvironment, PetSize } from "@prisma/client";
import { hash } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";
import { SearchPetsUseCase } from "./searchPets";

let orgsRepository: InMemoryOrgsRepository;
let petsRepository: InMemoryPetsRepository;

let sut: SearchPetsUseCase;

let org: Org;

const cityToSearch = "River Clear";

describe("Search Pets Use Case", () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository();
    petsRepository = new InMemoryPetsRepository(orgsRepository);

    sut = new SearchPetsUseCase(petsRepository, orgsRepository);

    org = await orgsRepository.create({
      id: "1",
      address: "Av 51, 1000",
      cep: "13450-980",
      email: "petcollective@gmail.com",
      name: "Pet Collective",
      passwordHash: await hash("some password", 6),
      phone: "12345678901",
      userName: "June August",
      city: cityToSearch,
      state: "SP",
    });

    await petsRepository.create({
      about: "doguinho",
      energyLevel: 4,
      environment: PetEnvironment.MEDIUM,
      humanDependencyLevel: 5,
      name: "gomes",
      org: {
        connect: {
          id: org.id,
        },
      },
      petAge: PetAge.PUPPY,
      petSize: PetSize.MEDIUM,
    });
  });

  it("should be able to search pets by city name", async () => {
    const { pets } = await sut.execute({
      city: cityToSearch,
    });

    expect(pets).toHaveLength(1);
  });

  it("should be able to filter pets by city name", async () => {
    const anotherCity = "Another City";

    const newOrg = await orgsRepository.create({
      id: "1",
      address: "Av 51, 1000",
      cep: "13450-980",
      email: "petcollective@gmail.com",
      name: "Pet Collective",
      passwordHash: await hash("some password", 6),
      phone: "12345678901",
      userName: "June August",
      city: anotherCity,
      state: "SP",
    });

    await petsRepository.create({
      about: "doguinho",
      energyLevel: 4,
      environment: PetEnvironment.MEDIUM,
      humanDependencyLevel: 5,
      name: "gomes",
      org: {
        connect: {
          id: newOrg.id,
        },
      },
      petAge: PetAge.ELDERLY,
      petSize: PetSize.MEDIUM,
    });

    const { pets } = await sut.execute({
      city: anotherCity,
    });

    expect(pets).toHaveLength(1);
  });
});
