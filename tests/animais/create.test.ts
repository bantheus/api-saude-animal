import { faker } from "@faker-js/faker";
import { Sexo } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { db } from "../../src/server/lib/prisma";
import { testServer } from "../jest.setup";

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
});

afterAll(async () => {
  const deleteAllAnimals = db.animal.deleteMany();
  const deleteAllEspecies = db.especie.deleteMany();

  await db.$transaction([deleteAllAnimals, deleteAllEspecies]);
});


describe("Animais - create", () => {

  it("should create a new animal", async () => {
    const res = await testServer
      .post("/animais")
      .send({
        nome: faker.lorem.words(),
        peso: faker.number.float(),
        foto: faker.image.url(),
        sexo: faker.helpers.enumValue(Sexo),
        especieId: especieId,
      });

    expect(res.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res.body).toEqual("object");
  });

  it("should not create a new animal with a name that is too short", async () => {
    const res = await testServer
      .post("/animais")
      .send({ nome: faker.lorem.words(0) });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.nome");
  });

  it("should not create a new animal with a name that is too long", async () => {
    const res = await testServer
      .post("/animais")
      .send({ nome: faker.lorem.words(256) });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.nome");
  });

  it("should not create a new animal without a name", async () => {
    const res = await testServer
      .post("/animais")
      .send({});

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.nome");
  });

  it("should not create a new animal without a peso", async () => {
    const res = await testServer
      .post("/animais")
      .send({
        nome: faker.lorem.word(),
        peso: faker.number.float(0),
        foto: faker.image.url(),
        sexo: faker.helpers.enumValue(Sexo),
        especieId: especieId,
      });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.peso");
  });

  it("should not create a new animal with a negative peso", async () => {
    const res = await testServer
      .post("/animais")
      .send({
        nome: faker.lorem.word(),
        peso: -1,
        foto: faker.image.url(),
        sexo: faker.helpers.enumValue(Sexo),
        especieId: especieId,
      });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.peso");
  });

  it("should not create a new animal without a foto", async () => {
    const res = await testServer
      .post("/animais")
      .send({
        nome: faker.lorem.word(),
        peso: faker.number.float(),
        sexo: faker.helpers.enumValue(Sexo),
        especieId: especieId,
      });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.foto");
  });

  it("should not create a new animal with a invalid foto", async () => {
    const res = await testServer
      .post("/animais")
      .send({
        nome: faker.lorem.word(),
        peso: faker.number.float(),
        foto: "invalid-url",
        sexo: faker.helpers.enumValue(Sexo),
        especieId: especieId,
      });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.foto");
  });

  it("should not create a new animal without a sexo", async () => {
    const res = await testServer
      .post("/animais")
      .send({
        nome: faker.lorem.word(),
        peso: faker.number.float(),
        foto: faker.image.url(),
        especieId: especieId,
      });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.sexo");
  });

  it("should not create a new animal with a invalid sexo", async () => {
    const res = await testServer
      .post("/animais")
      .send({
        nome: faker.lorem.word(),
        peso: faker.number.float(),
        foto: faker.image.url(),
        sexo: "invalid-sexo",
        especieId: especieId,
      });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.sexo");
  });

  it("should not create a new animal without a especieId", async () => {
    const res = await testServer
      .post("/animais")
      .send({
        nome: faker.lorem.word(),
        peso: faker.number.float(),
        foto: faker.image.url(),
        sexo: faker.helpers.enumValue(Sexo),
      });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.especieId");
  });

  it("should not create a new animal with a invalid especieId", async () => {
    const res = await testServer
      .post("/animais")
      .send({
        nome: faker.lorem.word(),
        peso: faker.number.float(),
        foto: faker.image.url(),
        sexo: faker.helpers.enumValue(Sexo),
        especieId: "invalid-especieId",
      });

    expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.body).toHaveProperty("errors");
  });
});
