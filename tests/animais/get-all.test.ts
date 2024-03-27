import { faker } from "@faker-js/faker";
import { Sexo } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { db } from "../../src/server/lib/prisma";
import { testServer } from "../jest.setup";

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
});

afterAll(async () => {
  const deleteAll = db.animal.deleteMany();

  await db.$transaction([deleteAll]);
});


describe("Animais - get all", () => {

  it("should get all animals", async () => {

    const res = await testServer
      .get("/animais")
      .send();

    expect(Number(res.header["x-total-count"])).toBeGreaterThan(0);
    expect(res.statusCode).toEqual(StatusCodes.OK);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
