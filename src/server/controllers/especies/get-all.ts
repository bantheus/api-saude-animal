import { Request, Response } from "express";
import { z } from "zod";
import { IQueryProps } from "../../../shared/definitions";
import { validation } from "../../../shared/middlewares";

export const getAllValidation = validation((getSchema) => ({
  query: getSchema<IQueryProps>(z.object({
    page: z.coerce.number({
      invalid_type_error: "Deve ser um número"
    }).min(1, {
      message: "Deve ser um número maior que 0"
    }).optional(),
    limit: z.coerce.number({
      invalid_type_error: "Deve ser um número"
    }).min(1, {
      message: "Deve ser um número maior que 0"
    }).optional(),
    filter: z.string().optional(),
  }))
}));

export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {
  console.log(req.query);

  return res.send("OK");
};
