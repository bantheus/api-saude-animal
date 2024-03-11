import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";
import { IParamProps } from "../../../shared/definitions";
import { validation } from "../../../shared/middlewares";

export const getByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamProps>(z.object({
    id: z.string().uuid({ message: "ID inválido" })
  }))
}));

export const getById = async (req: Request<IParamProps>, res: Response) => {
  console.log(req.params);

  return res.status(StatusCodes.OK).json({
    id: req.params.id,
    nome: "Cachorro"
  });
};
