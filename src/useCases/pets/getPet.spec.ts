import { InMemoryOrgsRepository } from "@/repositories/orgs/inMemory/inMemoryOrgsRepository";
import { InMemoryPetsRepository } from "@/repositories/pets/inMemory/inMemoryPetsRepository";
import { Org, PetAge, PetEnvironment, PetSize } from "@prisma/client";
import { hash } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";
import { GetPetUseCase } from "./getPet";

let orgsRepository: InMemoryOrgsRepository;
let petsRepository: InMemoryPetsRepository;

let sut: GetPetUseCase;

let org: Org;

describe("Get Pet Use Case", () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository();
    petsRepository = new InMemoryPetsRepository(orgsRepository);

    sut = new GetPetUseCase(petsRepository);

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

  it("should be able to get a pet information by pet id", async () => {
    const newPet = await petsRepository.create({
      about: "cachorro grande",
      energyLevel: 4,
      environment: PetEnvironment.MEDIUM,
      humanDependencyLevel: 5,
      name: "Dunga",
      org: {
        connect: {
          id: org.id,
        },
      },
      petAge: PetAge.PUPPY,
      petSize: PetSize.MEDIUM,
    });

    const { pet } = await sut.execute({ petId: newPet.id });

    expect(pet?.name).toEqual("Dunga");
  });

  it("should not be able to get a pet information by invalid pet id", async () => {
    await petsRepository.create({
      about: "cachorro grande",
      energyLevel: 4,
      environment: PetEnvironment.MEDIUM,
      humanDependencyLevel: 5,
      name: "Dunga",
      org: {
        connect: {
          id: org.id,
        },
      },
      petAge: PetAge.PUPPY,
      petSize: PetSize.MEDIUM,
    });

    const { pet } = await sut.execute({ petId: "wrong id" });

    expect(pet).toBe(null);
  });
});
