import { faker } from "@faker-js/faker";
import { Sexo } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { db } from "../../src/server/lib/prisma";
import { testServer } from "../jest.setup";

let animalId: string | undefined = undefined;
let especieId: string | undefined = undefined;
beforeAll(async () => {
  await db.especie.create({
    data: {
      id: faker.string.uuid(),
      nome: faker.lorem.words(),
      slug: faker.lorem.slug(),
    }
  });

  const especie = await db.especie.findFirst();

  especieId = especie?.id;


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

describe("Animais - update by id", () => {

  it("should update a animal", async () => {
    const res = await testServer
      .put(`/animais/${animalId}`)
      .send({
        nome: faker.lorem.word(),
        slug: faker.lorem.slug(),
        sexo: faker.helpers.enumValue(Sexo),
        peso: faker.number.float(),
        foto: faker.image.url(),
        especieId: especieId,
      });

    expect(res.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it("should not update a animal that does not exist", async () => {
    const res = await testServer
      .put("/animais/1")
      .send({
        nome: faker.lorem.word(),

      });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.params.id");
  });

  it("should not create a new animal with a name that is too short", async () => {
    const res = await testServer
      .put(`/animais/${animalId}`)
      .send({
        nome: faker.lorem.words(0),
      });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.nome");
  });

  it("should not create a new animal with a name that is too long", async () => {
    const res = await testServer
      .put(`/animais/${animalId}`)
      .send({
        nome: faker.lorem.words(256),
      });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.nome");
  });

  it("should not create a new animal without a name", async () => {
    const res = await testServer
      .put(`/animais/${animalId}`)
      .send({});

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.nome");
  });

  it("should not create a new animal without a peso", async () => {
    const res = await testServer
      .put(`/animais/${animalId}`)
      .send({
        peso: faker.number.float(0),
      });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body");
  });

  it("should not create a new animal with a negative peso", async () => {
    const res = await testServer
      .put(`/animais/${animalId}`)
      .send({
        peso: -1,
      });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.peso");
  });

  it("should not create a new animal without a foto", async () => {
    const res = await testServer
      .put(`/animais/${animalId}`)
      .send({
        foto: "",
      });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.foto");
  });

  it("should not create a new animal without a sexo", async () => {
    const res = await testServer
      .put(`/animais/${animalId}`)
      .send({
        sexo: "",
      });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.sexo");
  });

  it("should not create a new animal with a invalid sexo", async () => {
    const res = await testServer
      .put(`/animais/${animalId}`)
      .send({
        sexo: "invalid",
      });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.sexo");
  });

  it("should not create a new animal without a especieId", async () => {
    const res = await testServer
      .put(`/animais/${animalId}`)
      .send({
        especieId: "",
      });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body");
  });

  it("should not create a new animal with a invalid especieId", async () => {
    const res = await testServer
      .put(`/animais/${animalId}`)
      .send({
        especieId: "invalid",
      });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body");
  });
});
