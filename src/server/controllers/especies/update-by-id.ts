import { Especie } from "@prisma/client";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";
import { IParamProps } from "../../../shared/definitions";
import { validation } from "../../../shared/middlewares";

interface IBodyProps extends Omit<Especie, "id" | "createdAt" | "updatedAt"> { }

export const updateByIdValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(z.object({
    nome: z.string({ required_error: "Nome é obrigatório" })
      .min(1, { message: "Nome deve ter no mínimo 1 caractere" })
      .max(255, { message: "Nome deve ter no máximo 255 caracteres" })
  })),
  params: getSchema<IParamProps>(z.object({
    id: z.string().uuid({ message: "ID inválido" })
  }))
}));

export const updateById = async (req: Request<IParamProps, {}, IBodyProps>, res: Response) => {
  console.log(req.body);
  console.log(req.params);

  return res.status(StatusCodes.NO_CONTENT).send();
};
