import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
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
  res.setHeader("access-control-expose-headers", "x-total-count");
  res.setHeader("x-total-count", 1);

  return res.status(StatusCodes.OK).json([
    {
      id: 1,
      nome: "Cachorro"
    }
  ]);
};
