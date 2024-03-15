import { StatusCodes } from "http-status-codes";
import { db } from "../../src/server/lib/prisma";
import { testServer } from "../jest.setup";

beforeAll(async () => {
  await db.especie.create({
    data: {
      id: "f7ecbad9-0fe6-445b-a18c-bb157a554fb8",
      nome: "Especie 1",
      slug: "especie-1"
    }
  });
});

afterAll(async () => {
  const deleteAll = db.especie.deleteMany();

  await db.$transaction([deleteAll]);
});

describe("Especies - delete by id", () => {

  it("should delete a especie", async () => {
    const res2 = await testServer
      .delete("/especies/f7ecbad9-0fe6-445b-a18c-bb157a554fb8")
      .send();

    expect(res2.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it("should not delete a especie that does not exist", async () => {
    const res = await testServer
      .delete("/especies/1")
      .send();

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.params.id");
  });
});
