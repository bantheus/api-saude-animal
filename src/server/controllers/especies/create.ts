import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";
import { IEspecie } from "../../../shared/definitions";
import { validation } from "../../../shared/middlewares";

export const createValidation = validation((getSchema) => ({
  body: getSchema<IEspecie>(z.object({
    nome: z.string({ required_error: "Nome é obrigatório" })
      .min(1, { message: "Nome deve ter no mínimo 1 caractere" })
      .max(255, { message: "Nome deve ter no máximo 255 caracteres" })
  })),
}));

export const create = async (req: Request<{}, {}, IEspecie>, res: Response) => {

  return res.status(StatusCodes.CREATED).send("created");
};
