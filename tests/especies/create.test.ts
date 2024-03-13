import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Especies - create", () => {

  it("should create a new especie", async () => {
    const res = await testServer
      .post("/especies")
      .send({ nome: "Cachorro" });

    expect(res.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res.body).toEqual("object");
  });

  it("should not create a new especie with a name that is too short", async () => {
    const res = await testServer
      .post("/especies")
      .send({ nome: "" });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.nome");
  });

  it("should not create a new especie with a name that is too long", async () => {
    const res = await testServer
      .post("/especies")
      .send({ nome: "a".repeat(256) });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.nome");
  });

  it("should not create a new especie without a name", async () => {
    const res = await testServer
      .post("/especies")
      .send({});

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.nome");
  });
});
