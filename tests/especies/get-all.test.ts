import { faker } from "@faker-js/faker";
import { StatusCodes } from "http-status-codes";
import { db } from "../../src/server/lib/prisma";
import { testServer } from "../jest.setup";

beforeAll(async () => {
  await db.especie.create({
    data: {
      id: faker.string.uuid(),
      nome: faker.lorem.word(),
      slug: faker.lorem.slug(),
    }
  });
});

afterAll(async () => {
  const deleteAll = db.especie.deleteMany();

  await db.$transaction([deleteAll]);
});


describe("Especies - get all", () => {

  it("should get all especies", async () => {

    const res = await testServer
      .get("/especies")
      .set("Authorization", `Bearer ${process.env.TEST_ACCESS_TOKEN}`)
      .send();

    expect(Number(res.header["x-total-count"])).toBeGreaterThan(0);
    expect(res.statusCode).toEqual(StatusCodes.OK);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should not get all especies without a token", async () => {
    const res = await testServer
      .get("/especies")
      .send();

    expect(res.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res.body).toHaveProperty("erros.default");
  });
});
