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

describe("Especies - delete by id", () => {

  it("should delete a especie", async () => {
    const res2 = await testServer
      .delete(`/especies/${especieId}`)
      .set("Authorization", `Bearer ${process.env.TEST_ACCESS_TOKEN}`)
      .send();

    expect(res2.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it("should not delete a especie that does not exist", async () => {
    const res = await testServer
      .delete("/especies/1")
      .set("Authorization", `Bearer ${process.env.TEST_ACCESS_TOKEN}`)
      .send();

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.params.id");
  });

  it("should not delete a especie without a token", async () => {
    const res = await testServer
      .delete(`/especies/${especieId}`)
      .send();

    expect(res.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res.body).toHaveProperty("erros.default");
  });
});
