import { faker } from "@faker-js/faker";
import { Sexo } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { db } from "../../src/server/lib/prisma";
import { testServer } from "../jest.setup";

let animalId: string | undefined = undefined;

beforeAll(async () => {
  await db.animal.create({
    data: {
      id: faker.string.uuid(),
      nome: faker.lorem.word(),
      slug: faker.lorem.slug(),
      sexo: faker.helpers.enumValue(Sexo),
      peso: faker.number.float(),
      foto: faker.image.url(),
      especie: {
        create: {
          id: faker.string.uuid(),
          nome: faker.lorem.word(),
          slug: faker.lorem.slug(),
        }
      }
    }
  });

  const animal = await db.animal.findFirst();

  animalId = animal?.id;
});

afterAll(async () => {
  const deleteAll = db.animal.deleteMany();

  await db.$transaction([deleteAll]);
});


describe("Animais - get by id", () => {

  it("should get animal by id", async () => {
    const res = await testServer
      .get(`/animais/${animalId}`)
      .send();

    expect(res.statusCode).toEqual(StatusCodes.OK);
    expect(res.body).toHaveProperty("nome");
  });

  it("should not get animal by id that does not exist", async () => {
    const res = await testServer
      .get("/animais/1")
      .send();

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.params.id");
  });
});
