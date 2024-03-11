import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";


describe("Especies - update by id", () => {

  it("should update a especie", async () => {
    const res2 = await testServer
      .put("/especies/f7ecbad9-0fe6-445b-a18c-bb157a554fb8")
      .send({
        nome: "Especie 1",
      });

    expect(res2.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it("should not update a especie that does not exist", async () => {
    const res = await testServer
      .put("/especies/1")
      .send({
        nome: "Especie 1",

      });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.params.id");
  });

  it("should not create a new especie with a name that is too short", async () => {
    const res = await testServer
      .put("/especies/f7ecbad9-0fe6-445b-a18c-bb157a554fb8")
      .send({
        nome: "",
      });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.nome");
  });

  it("should not create a new especie with a name that is too long", async () => {
    const res = await testServer
      .put("/especies/f7ecbad9-0fe6-445b-a18c-bb157a554fb8")
      .send({
        nome: "a".repeat(256),
      });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.nome");
  });

  it("should not create a new especie without a name", async () => {
    const res = await testServer
      .put("/especies/f7ecbad9-0fe6-445b-a18c-bb157a554fb8")
      .send({});

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.nome");
  });
});