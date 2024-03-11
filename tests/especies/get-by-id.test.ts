import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";


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
