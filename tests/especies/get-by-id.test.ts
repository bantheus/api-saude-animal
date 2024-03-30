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


describe("Especies - get by id", () => {

  it("should get especie by id", async () => {
    const res = await testServer
      .get(`/especies/${especieId}`)
      .set("Authorization", `Bearer ${process.env.TEST_ACCESS_TOKEN}`)
      .send();

    expect(res.statusCode).toEqual(StatusCodes.OK);
    expect(res.body).toHaveProperty("nome");
  });

  it("should not get especie by id that does not exist", async () => {
    const res = await testServer
      .get("/especies/1")
      .set("Authorization", `Bearer ${process.env.TEST_ACCESS_TOKEN}`)
      .send();

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.params.id");
  });

  it("should not get especie by id without a token", async () => {
    const res = await testServer
      .get(`/especies/${especieId}`)
      .send();

    expect(res.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res.body).toHaveProperty("erros.default");
  });
});
