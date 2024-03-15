import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";
import { IQueryProps } from "../../../shared/definitions";
import { validation } from "../../../shared/middlewares";
import { especiesProviders } from "../../providers/especies";

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
    id: z.string().uuid({ message: "ID inválido" }).optional().default(""),
    filter: z.string().optional(),
  }))
}));

export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {
  const result = await especiesProviders.getAll(req.query.page || 1, req.query.limit || 10, req.query.filter || "", req.query.id || "");

  const count = await especiesProviders.count(req.query.filter);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: result.message }
    });
  } else if (count instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: count.message }
    });
  }


  res.setHeader("access-control-expose-headers", "x-total-count");
  res.setHeader("x-total-count", count);

  return res.status(StatusCodes.OK).json(result);
};
