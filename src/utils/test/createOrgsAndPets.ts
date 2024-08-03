import { InMemoryOrgsRepository } from "@/repositories/orgs/inMemory/inMemoryOrgsRepository";
import { InMemoryPetsRepository } from "@/repositories/pets/inMemory/inMemoryPetsRepository";
import { PetAge, PetEnvironment, PetSize } from "@prisma/client";
import { hash } from "bcryptjs";

export async function createOrgsAndPets(
  orgsRepository: InMemoryOrgsRepository,
  petsRepository: InMemoryPetsRepository,
) {
  const newOrg = await orgsRepository.create({
    id: "1",
    address: "Av 51, 1000",
    cep: "13450-980",
    email: "petcollective@gmail.com",
    name: "Pet Collective",
    passwordHash: await hash("some password", 6),
    phone: "12345678901",
    userName: "June August",
    city: "Another City",
    state: "SP",
  });

  await petsRepository.create({
    about: "cachorro velho médio",
    energyLevel: 3,
    environment: PetEnvironment.MEDIUM,
    humanDependencyLevel: 1,
    name: "Totó",
    org: {
      connect: {
        id: newOrg.id,
      },
    },
    petAge: PetAge.ELDERLY,
    petSize: PetSize.MEDIUM,
  });

  await petsRepository.create({
    about: "cachorro novo grande e4 h5",
    energyLevel: 4,
    environment: PetEnvironment.MEDIUM,
    humanDependencyLevel: 5,
    name: "Macadâmea",
    org: {
      connect: {
        id: newOrg.id,
      },
    },
    petAge: PetAge.PUPPY,
    petSize: PetSize.LARGE,
  });

  await petsRepository.create({
    about: "cachorro novo 40tão e2 h1",
    energyLevel: 2,
    environment: PetEnvironment.MEDIUM,
    humanDependencyLevel: 1,
    name: "Muxinga",
    org: {
      connect: {
        id: newOrg.id,
      },
    },
    petAge: PetAge.MIDAGE,
    petSize: PetSize.SMALL,
  });
}
