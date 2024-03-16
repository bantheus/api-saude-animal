import { faker } from "@faker-js/faker";
import { StatusCodes } from "http-status-codes";
import { db } from "../../src/server/lib/prisma";
import { testServer } from "../jest.setup";

let especieId: string;

beforeAll(async () => {
  const especie = await db.especie.create({
    data: {
      id: faker.string.uuid(),
      nome: faker.lorem.word(),
      slug: faker.lorem.slug(),
    }
  });

  especieId = especie.id;
});

afterAll(async () => {
  const deleteAll = db.especie.deleteMany();

  await db.$transaction([deleteAll]);
});

describe("Especies - update by id", () => {

  it("should update a especie", async () => {
    const res2 = await testServer
      .put(`/especies/${especieId}`)
      .send({
        nome: faker.lorem.word(),
      });

    expect(res2.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it("should not update a especie that does not exist", async () => {
    const res = await testServer
      .put("/especies/1")
      .send({
        nome: faker.lorem.word(),

      });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.params.id");
  });

  it("should not create a new especie with a name that is too short", async () => {
    const res = await testServer
      .put(`/especies/${especieId}`)
      .send({
        nome: faker.lorem.words(0),
      });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.nome");
  });

  it("should not create a new especie with a name that is too long", async () => {
    const res = await testServer
      .put(`/especies/${especieId}`)
      .send({
        nome: faker.lorem.words(256),
      });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.nome");
  });

  it("should not create a new especie without a name", async () => {
    const res = await testServer
      .put(`/especies/${especieId}`)
      .send({});

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.nome");
  });
});
