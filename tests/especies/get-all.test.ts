import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";


describe("Especies - get all", () => {

  it("should get all especies", async () => {
    const res = await testServer
      .post("/especies")
      .send({ nome: "Cachorro" });

    expect(res.statusCode).toEqual(StatusCodes.CREATED);

    const res2 = await testServer
      .get("/especies")
      .send();

    expect(Number(res2.header["x-total-count"])).toBeGreaterThan(0);
    expect(res2.statusCode).toEqual(StatusCodes.OK);
    expect(res2.body.length).toBeGreaterThan(0);
  });
});
