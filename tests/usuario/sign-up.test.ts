import { faker } from "@faker-js/faker";
import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Usuario - sign-up", () => {
  it("should create a new user", async () => {
    const res = await testServer
      .post("/cadastrar")
      .send({
        nome: faker.lorem.words(),
        email: faker.internet.email(),
        senha: faker.internet.password()
      });

    expect(res.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res.body).toEqual("object");
  });

  it("should not create a new user with a name that is too short", async () => {
    const res = await testServer
      .post("/cadastrar")
      .send({
        nome: faker.lorem.words(0),
        email: faker.internet.email(),
        senha: faker.internet.password()
      });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.nome");
  });

  it("should not create a new user with a name that is too long", async () => {
    const res = await testServer
      .post("/cadastrar")
      .send({
        nome: faker.lorem.words(256),
        email: faker.internet.email(),
        senha: faker.internet.password()
      });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.nome");
  });

  it("should not create a new user without a name", async () => {
    const res = await testServer
      .post("/cadastrar")
      .send({
        email: faker.internet.email(),
        senha: faker.internet.password()
      });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.nome");
  });

  it("should not create a new user with an invalid email", async () => {
    const res = await testServer
      .post("/cadastrar")
      .send({
        nome: faker.lorem.words(),
        email: faker.lorem.words(),
        senha: faker.internet.password()
      });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.email");
  });

  it("should not create a new user without an email", async () => {
    const res = await testServer
      .post("/cadastrar")
      .send({
        nome: faker.lorem.words(),
        senha: faker.internet.password()
      });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.email");
  });

  it("should not create a new user with a password that is too short", async () => {
    const res = await testServer
      .post("/cadastrar")
      .send({
        nome: faker.lorem.words(),
        email: faker.internet.email(),
        senha: faker.lorem.words(0)
      });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.senha");
  });

  it("should not create a new user with a password that is too long", async () => {
    const res = await testServer
      .post("/cadastrar")
      .send({
        nome: faker.lorem.words(),
        email: faker.internet.email(),
        senha: faker.lorem.words(51)
      });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.senha");
  });

  it("should not create a new user without a password", async () => {
    const res = await testServer
      .post("/cadastrar")
      .send({
        nome: faker.lorem.words(),
        email: faker.internet.email()
      });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.senha");
  });

  it("should not create a new user with an email that already exists", async () => {
    const email = faker.internet.email();

    await testServer
      .post("/cadastrar")
      .send({
        nome: faker.lorem.words(),
        email,
        senha: faker.internet.password()
      });

    const res = await testServer
      .post("/cadastrar")
      .send({
        nome: faker.lorem.words(),
        email,
        senha: faker.internet.password()
      });

    expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.body).toHaveProperty("errors.default");
  });
});
