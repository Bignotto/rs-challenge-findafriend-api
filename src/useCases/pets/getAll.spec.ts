import { InMemoryPetsRepository } from "@/repositories/pets/inMemory/inMemoryPetsRepository";
import { PetAge, PetEnvironment, PetSize } from "@prisma/client";
import { beforeEach, describe, expect, it } from "vitest";
import { GetAllPetsUseCase } from "./getAll";

let petsRepository: InMemoryPetsRepository;
let sut: GetAllPetsUseCase;

describe("Get All Pets Use Case", () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();
    sut = new GetAllPetsUseCase(petsRepository);
  });

  it("should be able to get all pets", async () => {
    await petsRepository.create({
      about: "doguinho",
      energyLevel: 4,
      environment: PetEnvironment.MEDIUM,
      humanDependencyLevel: 5,
      name: "gomes",
      org: {
        connect: {
          id: "some org",
        },
      },
      petAge: PetAge.PUPPY,
      petSize: PetSize.MEDIUM,
    });

    await petsRepository.create({
      about: "doguinho",
      energyLevel: 4,
      environment: PetEnvironment.MEDIUM,
      humanDependencyLevel: 5,
      name: "gomes",
      org: {
        connect: {
          id: "some org",
        },
      },
      petAge: PetAge.PUPPY,
      petSize: PetSize.MEDIUM,
    });

    await petsRepository.create({
      about: "doguinho",
      energyLevel: 4,
      environment: PetEnvironment.MEDIUM,
      humanDependencyLevel: 5,
      name: "gomes",
      org: {
        connect: {
          id: "some org",
        },
      },
      petAge: PetAge.PUPPY,
      petSize: PetSize.MEDIUM,
    });

    const { pets } = await sut.execute();

    expect(pets).toHaveLength(3);
  });
});
