import { StatusCodes } from "http-status-codes";
import { db } from "../../src/server/lib/prisma";
import { testServer } from "../jest.setup";

beforeAll(async () => {
  await db.especie.create({
    data: {
      id: "f7ecbad9-0fe6-445b-a18c-bb157a554fb8",
      nome: "Especie 1",
    }
  });
});

afterAll(async () => {
  const deleteAll = db.especie.deleteMany();

  await db.$transaction([deleteAll]);
});


describe("Especies - get by id", () => {

  it("should get especie by id", async () => {
    const res = await testServer
      .get("/especies/f7ecbad9-0fe6-445b-a18c-bb157a554fb8")
      .send();

    expect(res.statusCode).toEqual(StatusCodes.OK);
    expect(res.body).toHaveProperty("nome");
  });

  it("should not get especie by id that does not exist", async () => {
    const res = await testServer
      .get("/especies/1")
      .send();

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.params.id");
  });
});
