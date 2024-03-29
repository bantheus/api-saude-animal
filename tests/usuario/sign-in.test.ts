import { faker } from "@faker-js/faker";
import { StatusCodes } from "http-status-codes";
import { db } from "../../src/server/lib/prisma";
import { testServer } from "../jest.setup";

let userId: string | undefined = undefined;

beforeAll(async () => {
  const user = await db.usuario.create({
    data: {
      nome: faker.lorem.words(),
      email: "teste@teste.com",
      senha: "12345678"
    }
  });

  userId = user.id;
});

afterAll(async () => {
  if (userId) {
    const deleteAll = db.usuario.deleteMany();

    await db.$transaction([deleteAll]);
  }
});

describe("Usuario - sign in", () => {
  it("should sign in a user", async () => {
    const res = await testServer
      .post("/entrar")
      .send({
        email: "teste@teste.com",
        senha: "12345678"
      });

    expect(res.statusCode).toEqual(StatusCodes.OK);
    expect(res.body).toHaveProperty("accessToken");
  });

  it("should not sign in a user with an invalid email", async () => {
    const res = await testServer
      .post("/entrar")
      .send({
        email: faker.lorem.words(),
        senha: "12345678"
      });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.email");
  });

  it("should not sign in a user with an invalid password", async () => {
    const res = await testServer
      .post("/entrar")
      .send({
        email: "teste@teste.com",
        senha: faker.lorem.words()
      });

    expect(res.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res.body).toHaveProperty("errors");
  });

  it("should not sign in a user without an email", async () => {
    const res = await testServer
      .post("/entrar")
      .send({
        senha: faker.internet.password()
      });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.email");
  });

  it("should not sign in a user without a password", async () => {
    const res = await testServer
      .post("/entrar")
      .send({
        email: faker.internet.email()
      });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.senha");
  });
});
