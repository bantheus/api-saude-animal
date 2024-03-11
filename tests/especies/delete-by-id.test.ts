import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";


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
