import { faker } from "@faker-js/faker";
import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Especies - create", () => {
  it("should create a new especie", async () => {
    const res = await testServer
      .post("/especies")
      .set("Authorization", `Bearer ${process.env.TEST_ACCESS_TOKEN}`)
      .send({ nome: faker.lorem.word() });

    expect(res.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res.body).toEqual("object");
  });

  it("should not create a new especie with a name that is too short", async () => {
    const res = await testServer
      .post("/especies")
      .set("Authorization", `Bearer ${process.env.TEST_ACCESS_TOKEN}`)
      .send({ nome: faker.lorem.words(0) });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.nome");
  });

  it("should not create a new especie with a name that is too long", async () => {
    const res = await testServer
      .post("/especies")
      .set("Authorization", `Bearer ${process.env.TEST_ACCESS_TOKEN}`)
      .send({ nome: faker.lorem.words(256) });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.nome");
  });

  it("should not create a new especie without a name", async () => {
    const res = await testServer
      .post("/especies")
      .set("Authorization", `Bearer ${process.env.TEST_ACCESS_TOKEN}`)
      .send({});

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.nome");
  });

  it("should not create a new especie without a token", async () => {
    const res = await testServer
      .post("/especies")
      .send({ nome: faker.lorem.word() });

    expect(res.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res.body).toHaveProperty("erros.default");
  });
});
